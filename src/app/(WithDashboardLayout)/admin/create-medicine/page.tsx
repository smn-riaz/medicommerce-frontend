export const dynamic = "force-dynamic";


import CreateMedicineForm from '@/components/shared/dashboard/admin/create-medicine/CreateMedicineForm';
import React from 'react';

const CreateMedicinePage = () => {
  return (
    <div className='flex justify-center items-center'>
      <CreateMedicineForm />
    </div>
  );
};

export default CreateMedicinePage;