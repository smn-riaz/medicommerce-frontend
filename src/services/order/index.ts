"use server"

export const createOrderWithPrescription = async (orderInfo:any) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/order/create-order-prescription`, {
        method:"POST",
        headers:{
            'Content-type':"application/json"
        },
        body:JSON.stringify(orderInfo)
    })

    const result = res.json()

    return result
}


export const createOrderWithOutPrescription = async (orderInfo:any) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/order/create-order-payment`, {
        method:"POST",
        headers:{
            'Content-type':"application/json"
        },
        body:JSON.stringify(orderInfo)
    })

    const result = res.json()

    return result
}




export const updateOrderStatus = async (orderId: string, newStatus: string) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/order/${orderId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ orderStatus: newStatus }),
      next: {
        tags: ['ORDER'], 
      },
    })

    return await res.json();
  } catch (error: any) {
    throw new Error(error?.message || "Something went wrong");
  }
}



export const updatePrescriptionReviewStatus = async (orderId: string, newStatus: string) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/order/prescription/${orderId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({prescriptionReviewStatus: newStatus }),
      next: {
        tags: ['ORDER'], 
      },
    })

    return await res.json();
  } catch (error: any) {
    throw new Error(error?.message || "Something went wrong");
  }
};



export const getAllOrder = async() => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/order`, {
        next:{
          tags:['ORDER']
        }
      })
      return await res.json()
  
    } catch (error:any) {
      throw Error(error)
    }
  }



export const getUserOrders = async(id:string) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/order/user-order/${id}`, {
        next:{
          tags:['ORDER']
        }
      })
      return await res.json()
  
    } catch (error:any) {
      throw Error(error)
    }
  }


export const getSpecificOrder = async(id:string) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/order/${id}`, {
        next:{
          tags:['ORDER']
        }
      })
      return await res.json()
  
    } catch (error:any) {
      throw Error(error)
    }
  }


  export const paymentPrescriptionOrder = async(paymentInfo:IOrderResponse) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/payment/${paymentInfo._id}`, {
        next:{
          // tags:['ORDER']
        },
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(paymentInfo),
      })
      return await res.json()
  
    } catch (error:any) {
      throw Error(error)
    }
  }