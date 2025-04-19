"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Trash2, Plus, Minus , ImageUp} from "lucide-react";
import {
  addOrderInfo,
  addPrescription,
  clearCart,
  decreaseQuanity,
  increaseQuanity,
  orderSelector,
  removeItemFromCart,
  specificProductQuantitySelector,
} from "@/redux/features/cartSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import { toast } from "sonner";
import ImageUploader from "../shared/dashboard/admin/ImageUploader";
import { useEffect, useState } from "react";
import ImagePreviewer from "../shared/dashboard/admin/ImageUploader/ImagePreviewer";
import { useRouter } from "next/navigation";

import { imageToLink } from "@/services/medicine";
import Image from "next/image";

import {  TMedicineResponse } from "@/types";

const Cart = ({medicines}:{medicines:TMedicineResponse[]}) => {
  const router = useRouter()

  const orderInfo = useAppSelector(orderSelector);


  const [imageFiles, setImageFiles] = useState<File[] | []>([]);

 const [imagePreview, setImagePreview] = useState<string[]>(
  orderInfo?.prescription ? [orderInfo.prescription] : []
)

  const [prescription, setPrescription] = useState<string>(
    orderInfo?.prescription? orderInfo.prescription : ""
  );
  const [showMessage, setShowMessage] = useState(false);


  useEffect(() => {
    const uploadImage = async () => {
      const formData = new FormData();
      formData.append("image", imageFiles[0]);

      const res = await imageToLink(formData)

      const imgUrl = res?.data?.url

      if (imgUrl) {
        setPrescription(imgUrl)
        dispatch(addPrescription(imgUrl))
      }
    };

    if (imageFiles.length > 0) {
      uploadImage();
    }
  }, [imageFiles]);

  const [shippingInfo, setShippingInfo] = useState(orderInfo.shippingInfo);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setShippingInfo((prev) => ({ ...prev, [name]: value }))
    if(shippingInfo){
      dispatch(
        addOrderInfo({
          shippingInfo
        }))
    }
  };

  const { items: cartItems, totalPrice } = useAppSelector(
    (state: RootState) => state.cart
  );
  const dispatch = useAppDispatch();



  const handleIncreaseQuantity = (id: string) => {
    const specificMedicine = medicines?.find((medicine) => medicine._id === id);

    if (!specificMedicine) {
      toast.error("Medicine not found");
      return;
    }

    const cartedProductQuantity = cartItems.find(cartItem => cartItem.id === id)?.quantity as number

    if (cartedProductQuantity >= specificMedicine.quantity) {
      toast.error("Maximum amount carted");
    } else {
      dispatch(increaseQuanity(id));
    }
  }


  const handleDecreaseQuantity = (id: string) => {
    const item = cartItems.find((item) => item.id === id);

    if (item && item.quantity > 1) {
      dispatch(decreaseQuanity(id));
    } else {
      toast.warning("Quantity can't go below 1");
    }
  };

  const handleRemoveItem = (id: string) => {
    dispatch(removeItemFromCart(id));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  useEffect(() => {
    if (prescription) {
      setShowMessage(true);
      const timer = setTimeout(() => {
        setShowMessage(false);
      }, 10000);

      return () => clearTimeout(timer);
    }
  }, [prescription]);

  const handleSubmit = () => {
    if (cartItems.length>0) {
      if(cartItems.some((cart) => cart.prescription) && prescription){
     
        dispatch(
          addOrderInfo({
            shippingInfo
          })
        )
  
        router.push("/user/checkout");
      } else if((cartItems.some((cart) => cart.prescription)) && !prescription) {
        toast.warning("Image Upload Error")
      } else {
       
        dispatch(
          addOrderInfo({
            shippingInfo
          })
        )
        router.push("/user/checkout");
      }
    } else {
      toast.warning("No Product in CART😔")
    }
  };

  return (
    <div className="flex justify-center items-center"> {cartItems.length> 0 ?
    <div className="max-w-6xl mx-auto p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="md:col-span-2 space-y-4">
        {cartItems.map((item) => (
          <Card key={item.id}>
            <CardContent className="flex items-start space-x-4 p-4">
              <Image
              width={40}
              height={40}
                src={item.image}
                alt={item.name}
                className="w-24 h-24 object-cover rounded-xl"
              />
              <div className="flex-1">
                <h3 className="text-md font-semibold">{item.name}</h3>
                <p className="text-sm text-gray-500">{item.type}</p>
                <p className="text-sm mt-1">{item.description}</p>

                <p className="text-md font-medium mt-2">
                  ${item.price.toFixed(2)}
                </p>
                {item.prescription && (
                  <p className="text-sm mt-3  text-red-700 flex gap-x-2">
                    {" "}
                    <span className="font-semibold">PRESCRIPTION</span>{" "}
                    <ImageUp />
                  </p>
                )}
              </div>

              <div className="flex flex-col items-center space-y-2">
                <Button
                  onClick={() => handleDecreaseQuantity(item.id)}
                  variant="ghost"
                  size="icon"
                >
                  <Minus size={16} />
                </Button>
                <span>{item.quantity}</span>
                <Button
                  onClick={() => handleIncreaseQuantity(item.id)}
                  variant="ghost"
                  size="icon"
                >
                  <Plus size={16} />
                </Button>
                <Button
                  onClick={() => handleRemoveItem(item.id)}
                  variant="ghost"
                  size="icon"
                  className="text-red-500"
                >
                  <Trash2 size={16} />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

    <Card className="h-fit">
        <CardContent className="p-4 space-y-4">
          <h2 className="text-lg font-semibold">Order Summary</h2>
          <ul className="space-y-1 text-sm">
            {cartItems.map((item) => (
              <li key={item.id} className="flex justify-between">
                <span>
                  x{item.quantity} {item.name}
                </span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </li>
            ))}
          </ul>
          <Separator />
          <div className="text-sm flex-col justify-between">
            <p>Delivery</p>
            <p>
              <Input
              name="shippingAddress"
                placeholder="Address"
                value={shippingInfo.shippingAddress}
                onChange={handleChange}
                className="mt-2"
              />
              <Input
                name="shippingCity"
                placeholder="City"
                value={shippingInfo.shippingCity}
                onChange={handleChange}
                className="mt-2"
              />
            </p>
          </div>
          <Separator />

          <div className="text-sm flex justify-between">
            <span>Shipping</span>
            <span>৳ 60.00</span>
          </div>

          <Separator />
          <div className="text-md font-semibold flex justify-between">
            <span>Total</span>
            <span>৳ {(totalPrice + 60).toFixed(2)}</span>
          </div>
          {cartItems.some((cart) => cart.prescription) && (
            <div className=" flex justify-center items-center">
              {imagePreview.length > 0 ? (
               <>
                <div className="mt-8">
                  <ImagePreviewer
                    setImageFiles={setImageFiles}
                    imagePreview={imagePreview}
                    setImagePreview={setImagePreview}
                  />
                </div>
                
               </>
              ) : (
                <div className="mt-8">
                  <ImageUploader
                    setImageFiles={setImageFiles}
                    setImagePreview={setImagePreview}
                    label="Upload Prescription"
                  />
                </div>
              )}
              
            </div>
          )}
<div className="m-1">{ (
          <small className={`text-center font-semibold text-sm text-green-600 ${!showMessage ? "hidden" :""}`}>
            Image uploaded successfully
          </small>
        )}</div>

          {shippingInfo.shippingAddress && shippingInfo.shippingCity ?
            <Button
            onClick={handleSubmit}
            disabled={
              cartItems.some((cart) => cart.prescription) &&
              !prescription
            }
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-white"
          >
            Checkout
          </Button> :
          <p className="text-yellow-600 font-medium text-center">Shipping Address Required!</p>
          }
        </CardContent>
      </Card> 
      
    </div> : <div className=" min-h-[50vh] flex justify-center items-center">
    
    <p className="text-yellow-700 font-semibold text-2xl">No Items in Cart</p>

</div>}

    </div>
  );
};

export default Cart;
