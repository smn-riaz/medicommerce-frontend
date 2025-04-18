"use server"

import RegisterForm from '@/components/shared/auth/register/registerForm';


const RegisterPage = () => {
    return (
        <div className='flex justify-center items-center my-18 py-18'>
                   <RegisterForm />
               </div>
    );
};

export default RegisterPage;