"use server"

import LoginForm from '@/components/shared/auth/login/LoginForm';


const LoginPage = () => {
    return (
      <div className='flex justify-center md:items-center px-4 md:px-8 py-8 lg:py-12 xl:min-h-screen xl:max-w-[1300px] xl:mx-auto'>
            <LoginForm />
        </div>
    );
};

export default LoginPage;