import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import aboutus from '../../assets/aboutus.jpg'
import Image from 'next/image';

export default function AboutUs() {
  return (
    <div className="py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">About Us</h1>

        
        <div className="text-center mb-12">
          <h2 className="text-2xl font-semibold mb-4">Your Trusted Source for Medicines</h2>
          <p className="text-lg text-muted-foreground mb-6">
            We are an online platform dedicated to providing a wide range of quality medicines at affordable prices. Our mission is to make healthcare products easily accessible, ensuring that everyone, regardless of location, can get the medical help they need.
          </p>

         
          <Image
            src={aboutus}
            alt="Medicine Warehouse"
            className="w-full h-64 object-cover rounded-lg shadow-lg mb-6"
          />
        </div>

        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <Card className="shadow-lg rounded-xl p-6">
            <CardHeader>
              <CardTitle className="text-xl font-semibold">Our Mission</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg text-muted-foreground">
                Our mission is to provide customers with access to high-quality medicines at affordable prices, ensuring their health and wellness needs are met with utmost care and efficiency.
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-lg rounded-xl p-6">
            <CardHeader>
              <CardTitle className="text-xl font-semibold">Our Vision</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg text-muted-foreground">
                We envision a world where access to essential medicines is easy and affordable for everyone. By leveraging technology and providing outstanding customer service, we strive to transform healthcare accessibility across the country.
              </p>
            </CardContent>
          </Card>
        </div>

        

    
        <div className="mt-12 text-center">
          <h2 className="text-2xl font-semibold mb-4">Join Us Today!</h2>
          <p className="text-lg text-muted-foreground mb-6">
            Start shopping now to take care of your health needs with ease and convenience.
          </p>
          <Link href="/shop"><Button size="lg" className="w-full md:w-auto" >
            Shop Now
          </Button></Link>
        </div>
      </div>
    </div>
  );
}
