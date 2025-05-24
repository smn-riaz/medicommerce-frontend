export const dynamic = "force-dynamic";

import AdminDashboard from "@/components/dashboard/admin/AdminDashboard";
import { getAllMedicine } from "@/services/medicine";
import { getAllOrder } from "@/services/order";
import { getAllUser } from "@/services/user";


const AdminDashboardPage
 = async () => {

    const [orders, users ] = await Promise.all([getAllOrder(), getAllUser()])
    const {data, meta} = await getAllMedicine()
  

    return (
        <div>
            <AdminDashboard totalProducts={meta.total} orders={orders.data} users={users.data} products={data}/>
        </div>
    );
};

export default AdminDashboardPage