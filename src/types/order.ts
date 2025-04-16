interface IShippingInfo {
    shippingAddress: string;
    shippingCity: string;
  }
  
  interface IProduct {
    productId: string;
    name: string;
    quantity: number;
    price: number;
  }
  
  interface IOrderResponse {
    _id: string;
    userId: string;
    createdAt: string;
    updatedAt: string;
    prescriptionReviewStatus:"pending" | "ok" | "cancelled"
    orderStatus: "pending" | "shipped" | "delivered" | "cancelled"
    paymentStatus:boolean
    products: IProduct[]
    shippingCost: number;
    shippingInfo: IShippingInfo;
    status: 'pending' | 'completed' | 'cancelled'; 
    totalPrice: number;
    __v: number;
  }
  