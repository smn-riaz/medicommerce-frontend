import UpdateMedicineForm from "@/components/shared/dashboard/admin/update-medicine/UpdateMedicineForm";
import { getSingleMedicine } from "@/services/medicine";


const UpdateMedicinePage = async({params}:{params:{id:string}}) => {

  const {data:medicine} = await getSingleMedicine(params.id)


  return (
    <div className='flex justify-center items-center'>
      <UpdateMedicineForm medicine={medicine}/>
    </div>
  );
};

export default UpdateMedicinePage;