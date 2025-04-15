"use server"

export const makeOrder = async (orderInfo:any) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/order/create-order`, {
        method:"POST",
        headers:{
            'Content-type':"application/json"
        },
        body:JSON.stringify(orderInfo)
    })

    const result = res.json()

    return result
}