"use client"

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TMedicine } from '@/types';
import { useState } from 'react';



export default function MedicineDetail({ medicine }: {medicine:TMedicine}) {

    const [selectedImage, setSelectedImage] = useState(medicine.imageUrl[0]);

  return (
    
    <div className="py-20 px-4 ">
    <div className="max-w-6xl mx-auto">
     
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="">
         <div>
           
          <img
            src={selectedImage}
            alt={medicine.name}
            className="w-full max-w-xs h-64 object-cover rounded-lg shadow-lg"
          />
         </div>

          
          <div className="mt-4 flex space-x-4 justify-start">
            {medicine.imageUrl.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`${medicine.name} Thumbnail ${index + 1}`}
                className={`w-20 h-20 object-cover rounded-lg cursor-pointer transition-transform hover:scale-105 ${selectedImage === image ? "border-2 border-primary":""}`}
                onClick={() => setSelectedImage(image)} 
              />
            ))}
          </div>
        </div>

        <div>
          <Card className="rounded-xl shadow-md p-6">
            <CardHeader>
              <CardTitle className="text-3xl font-semibold">{medicine.name}</CardTitle>
              <CardDescription className="text-sm text-muted-foreground">{medicine.type}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-lg text-muted-foreground">{medicine.description}</p>

              
              <div className="text-sm text-muted-foreground">
                <strong>Manufacturer: </strong>{medicine.manufacturer}
              </div>

             
              <div className="flex items-center space-x-4">
                {medicine.discount > 0 && (
                  <Badge variant="destructive">-{medicine.discount}%</Badge>
                )}
                <span className="text-xl font-semibold">
                  ৳{(medicine.price * (1 - medicine.discount / 100)).toFixed(2)}
                </span>
                {medicine.discount > 0 && (
                  <span className="text-sm line-through text-red-500">৳{medicine.price.toFixed(2)}</span>
                )}
              </div>

             
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>{medicine.inStock ? 'In Stock' : 'Out of Stock'}</span>
                <span>Expires on: {medicine.expireDate}</span>
              </div>

             
              {medicine.requiredPrescription && (
                <div className="text-sm text-red-500">Prescription Required</div>
              )}

            
              <div className="text-sm text-muted-foreground">
                <strong>Quantity Available: </strong>{medicine.quantity}
              </div>
            </CardContent>

           
            <div className="mt-6">
              <Button size="lg" disabled={!medicine.inStock} className="w-full">
                {medicine.inStock ? 'Add to Cart' : 'Out of Stock'}
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  </div>
  );
}
