
import preLoader from "../../assets/preLoading.gif"
import Image from 'next/image';

const PreLoading = () => {

    return (
        <div className="w-screen overflow-hidden h-screen flex justify-center items-center bg-[#2A2A2A]"> 
            <Image src={preLoader} width={600}  height={600}
        priority alt='MediCommerce'/>
         <img src="https://readme-typing-svg.demolab.com?font=Fira+Code&size=20&duration=2000&pause=1000&center=true&vCenter=true&width=435&lines=Your Trusted + MediCommerce;" alt="Typing SVG" />
        </div>
    );
};

export default PreLoading;