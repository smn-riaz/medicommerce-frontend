export const dynamic = "force-dynamic";


import AdminUserProfile from '@/components/dashboard/admin/user/AdminUserProfile';

import { getCurrentUser } from '@/services/auth';
import { getUserOrders } from '@/services/order';
import { getSingleUser } from '@/services/user';
import React from 'react';

const AdminUserProfilePage = async({params}:{params:Promise<{id:string}>}) => {

  const reviews = [
    {
      id: "rev1",
      productName: "Wireless Headphones",
      comment: "Great sound quality and battery life. Highly recommended!",
      rating: 5,
    },
    {
      id: "rev2",
      productName: "Smartwatch Pro X",
      comment: "Good features but the strap quality could be better.",
      rating: 3,
    },
    {
      id: "rev3",
      productName: "Eco-Friendly Water Bottle",
      comment: "Stylish, leak-proof, and keeps water cold for hours!",
      rating: 4,
    },
  ];
  
  const userId = (await params).id

const {data:user} = await getSingleUser(userId)
  const {data:userOrders} =  await getUserOrders(userId)

 

    return (
        <div className="flex justify-center items-center p-10">
          <AdminUserProfile reviews={reviews} user={user} orders={userOrders}/>
        </div>
    );
};

export default AdminUserProfilePage;