"use server"

export const getAllNotifications = async () => {
    try {

      const res = await fetch(`${process.env.BASE_API}/notification`);
  

      if (!res.ok) {
        throw new Error(`Failed to fetch reviews, status: ${res.status}`);
      }


      return await res.json();
    } catch (error: any) {
      console.error("Error fetching reviews:", error);
      return { error: error.message || "Something went wrong" };
    }
  }