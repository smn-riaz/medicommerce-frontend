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
    });

    if (!res.ok) {
      throw new Error("Failed to update order status");
    }

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


  export const paymentPrescriptionOrder = async(id:string) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/payment/${id}`, {
        next:{
          // tags:['ORDER']
        }
      })
      return await res.json()
  
    } catch (error:any) {
      throw Error(error)
    }
  }