export const dynamic = "force-dynamic";


import UserProfile from '@/components/dashboard/user/UserProfile';
import { getCurrentUser } from '@/services/auth';
import { getUserOrders } from '@/services/order';
import React from 'react';

const UserProfilePage = async() => {


  const user = await getCurrentUser()
  const {data} =  await getUserOrders(user?.id as string)
    return (
        <div className="flex justify-center items-center p-10">
          <UserProfile user={user} orders={data}/>
        </div>
    );
};

export default UserProfilePage;