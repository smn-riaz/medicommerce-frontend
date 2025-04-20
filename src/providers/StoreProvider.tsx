"use client"

import PreLoading from '@/components/home/PreLoading';
import { AppStore, makeStore } from '@/redux/store';
import  { useRef } from 'react';
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';

const StoreProvider = ({children}:{children:React.ReactNode})  => {
    const storeRef = useRef<AppStore>(undefined)

    if(!storeRef.current){
        storeRef.current = makeStore()
    }


    const persistedStore = persistStore(storeRef.current)
    
    return (
        <Provider store={storeRef.current}>
            <PersistGate loading={null} persistor={persistedStore} >
            {children}
            </PersistGate>
        </Provider>
    );
};

export default StoreProvider;