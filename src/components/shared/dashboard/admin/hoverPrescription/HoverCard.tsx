import { CalendarIcon } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import Image from "next/image";

export function HoverPrescription({
  prescription,
  products,
}: {
  prescription: string;
  products: any;
}) {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Image
          src={prescription}
          alt="Prescription"
          width={80}
          height={80}
          className="object-cover"
        />
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div>
          <Image
            src={prescription}
            alt="Prescription"
            width={600}
            height={600}
            className="object-cover"
          />
          <div className="flex justify-center items-center p-2 space-x-4">
            <div className="space-y-1">
              {products.map((product: any, index: string) => (
                <div
                  key={index}
                  className="text-sm p-1 rounded bg-muted border border-border"
                >
                  <p>
                    <span className="font-medium">{product.name}</span> — Qty:{" "}
                    {product.quantity}, ৳{product.price}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}
