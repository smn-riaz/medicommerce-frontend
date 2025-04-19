import UserProfile from "@/components/dashboard/user/UserProfile";
import { getCurrentUser } from "@/services/auth";
import { getUserOrders } from "@/services/order";


const UserDashboardPage = async () => {

  const user = await getCurrentUser()
  const {data} =  await getUserOrders(user?.id as string)
    return (
        <div className="flex justify-center items-center p-10">
          <UserProfile user={user} orders={data}/>
        </div>
    );
};

export default UserDashboardPage;
