import PrescriptionOrderPayment from "@/components/dashboard/user/PrescriptionOrderPayment";
import { getCurrentUser } from "@/services/auth";
import { getSpecificOrder } from "@/services/order";


const PrescriptionOrderPaymentPage = async ({ params}: { params: Promise<{ orderId: string }>}) => {
    const { orderId } = await params;
  
    const { data: order } = await getSpecificOrder(orderId)

    const user = await getCurrentUser()

    
    return (
        <div>
            <PrescriptionOrderPayment order={order} user={user}/>
        </div>
    );
};

export default PrescriptionOrderPaymentPage;