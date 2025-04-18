import React from "react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import Image from "next/image";

const PrescriptionPopup = ({ image }: { image: string }) => {
  return (
    <div className="flex justify-center items-center">
      <HoverCard>
        <HoverCardTrigger>Prescription</HoverCardTrigger>
        <HoverCardContent>
          <Image src={image} height={500} width={500} alt="prescription" />
        </HoverCardContent>
      </HoverCard>
    </div>
  );
};

export default PrescriptionPopup;
