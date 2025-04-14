"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Trash2, Plus, Minus, Image } from "lucide-react";
import {
  addOrderInfo,
  clearCart,
  decreaseQuanity,
  increaseQuanity,
  removeItemFromCart,
} from "@/redux/features/cartSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import { toast } from "sonner";
import ImageUploader from "../shared/dashboard/admin/ImageUploader";
import { useEffect, useState } from "react";
import ImagePreviewer from "../shared/dashboard/admin/ImageUploader/ImagePreviewer";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { imageToLink } from "@/services/medicine";

const Cart = () => {
  const router = useRouter();
  const [imageFiles, setImageFiles] = useState<File[] | []>([]);

  const [imagePreview, setImagePreview] = useState<string[] | []>([]);

  const [prescription, setPrescription] = useState("");

  useEffect(() => {
    const uploadImage = async () => {
      const formData = new FormData();
      formData.append("image", imageFiles[0]);

      const res = await imageToLink(formData);
      if (res?.data?.url) {
        setPrescription(res.data.url);
      }
    };

    if (imageFiles.length > 0) {
      uploadImage();
    }
  }, [imageFiles]);

  const [shippingInfo, setShippingInfo] = useState({
    shippingAddress: "",
    shippingCity: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setShippingInfo((prev) => ({ ...prev, [name]: value }));
  };

  const { items: cartItems, totalPrice } = useAppSelector(
    (state: RootState) => state.cart
  );
  const dispatch = useAppDispatch();

  const handleIncreaseQuantity = (id: string) => {
    dispatch(increaseQuanity(id));
  };

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

  const handleSubmit = () => {
    if (cartItems.length>0) {
      dispatch(
        addOrderInfo({
          prescription: prescription,
          shippingInfo,
        })
      )

      router.push("/user/checkout");
    } else {
      toast.warning("No Product in CART😔")
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="md:col-span-2 space-y-4">
        {cartItems.map((item) => (
          <Card key={item.id}>
            <CardContent className="flex items-start space-x-4 p-4">
              <img
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
                    <Image />
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
            <div className=" flex justify-center">
              {imagePreview.length > 0 ? (
                <div className="mt-8">
                  <ImagePreviewer
                    setImageFiles={setImageFiles}
                    imagePreview={imagePreview}
                    setImagePreview={setImagePreview}
                  />
                </div>
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

          {shippingInfo.shippingAddress && shippingInfo.shippingCity ?
            <Button
            onClick={handleSubmit}
            disabled={
              cartItems.some((cart) => cart.prescription) &&
              imageFiles.length < 1
            }
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-white"
          >
            Checkout
          </Button> :
          <p className="text-yellow-600 font-medium text-center">Shipping Address Required!</p>
          }
        </CardContent>
      </Card>
    </div>
  );
};

export default Cart;
