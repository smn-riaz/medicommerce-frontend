import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";

const FacnyButton = ({ link, title }: { link: string; title: string }) => {
  return (
    <div>
      <Link href={link}>
      <Button
  className="relative border-[2px] border-white overflow-hidden px-8 py-4 rounded-2xl text-xl text-white group transition-all duration-500 transform hover:scale-[1.03]"
  style={{ backgroundColor: '#488BF7' }}
>
  <span
    className="absolute inset-0 w-0 group-hover:w-full h-full transition-all duration-500 ease-in-out origin-left"
    style={{ backgroundColor: '#DFFDE9' }}
  ></span>
  <span className="relative z-10 group-hover:text-black transition duration-300">
    {title}
  </span>
</Button>



      </Link>
    </div>
  );
};

export default FacnyButton;
