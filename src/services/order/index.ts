"use server"

export const makeOrder = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/payment/make-payment`, {
        method:"POST",
        headers:{
            'Content-type':"application/json"
        },
        body:JSON.stringify({totalAmount:50, name:"user", email:'user@yahoo.com', shippingAddress:"banianagar", shippingCity:'Dhaka'})
    })

    const result = res.json()

    return result
}