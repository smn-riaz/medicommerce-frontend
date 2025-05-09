export const dynamic = "force-dynamic";


import UserProfile from '@/components/dashboard/user/UserProfile';
import { useUser } from '@/context/UserContext';
import { cartSelector } from '@/redux/features/cartSlice';
import { useAppSelector } from '@/redux/hooks';
import { getCurrentUser } from '@/services/auth';
import { getUserOrders } from '@/services/order';
import { getSpecificUserProductReview } from '@/services/review';
import { getSingleUser } from '@/services/user';
import React from 'react';

const UserProfilePage = async() => {

  const user = await getCurrentUser()
  

  if (!user?.id) {
    throw new Error("User is not logged in");
  }

  const { data: userInfo } = await getSingleUser(user.id);



  const { data: userOrders } = await getUserOrders(user.id);

  const sanitizedOrders = Array.isArray(userOrders) ? userOrders : [];

  const { data: userReviews } =await getSpecificUserProductReview(user.id)
    




    return (
        <div className="flex justify-center items-center p-10">
          <UserProfile 
          user={userInfo} 
          orders={sanitizedOrders}
          reviews={userReviews}
          />
        </div>
    );
};

export default UserProfilePage;