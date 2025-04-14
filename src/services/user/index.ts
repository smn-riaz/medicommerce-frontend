export const getAllUser = async() => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/user`, {
        next:{
          tags:['USER']
        }
      })
      return await res.json()
  
    } catch (error:any) {
      throw Error(error)
    }
  }




  export const deleteSingleUser = async (medicineId: string) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_API}/product/${medicineId}`,
        {
          next: {
            tags: ["MEDICINE"],
          },
        }
      );
      const data = await res.json();
      return data;
      
    } catch (error: any) {
      return Error(error.message);
    }
  };