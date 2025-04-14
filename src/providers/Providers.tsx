import React from 'react';
import StoreProvider from './StoreProvider';
import { Toaster } from 'sonner';
import UserProvider from '@/context/UserContext';

const Providers = ({children}:{children:React.ReactNode}) => {
    return (
        <StoreProvider>
            <UserProvider>
            <Toaster position="top-center" richColors/>
            {children}
            </UserProvider>
        </StoreProvider>
    );
};

export default Providers;