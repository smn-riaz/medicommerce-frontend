import logo from "../../assets/logo.png"
import Image from 'next/image'

const Logo = () => {
    return (
        <div>
            <Image src={logo} alt='MediCommerce' width={70} height={70}/>
        </div>
    );
};

export default Logo;