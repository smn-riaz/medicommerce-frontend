
import preLoader from "../../assets/preLoading.gif"
import Image from 'next/image';

const PreLoading = () => {

    return (
        <div className="w-screen overflow-hidden h-screen flex justify-center items-center bg-[#2A2A2A]"> 
            <Image src={preLoader} width={600}  height={600}
        priority alt='MediCommerce'/>
        </div>
    );
};

export default PreLoading;