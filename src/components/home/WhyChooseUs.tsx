"use client";

import { ShieldCheck, UserCheck, Truck, Tag, FileText } from "lucide-react";
import { useRef, useEffect } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import Image from "next/image";

import whychooseus from '../../assets/whychooseus.gif'

const reasons = [
  {
    icon: ShieldCheck,
    title: "100% Genuine Medicines",
    description:
      "Sourced from licensed suppliers to ensure your safety and quality every time.",
  },
  {
    icon: UserCheck,
    title: "Certified Pharmacist Support",
    description:
      "Get expert advice whenever you need it from our licensed pharmacists.",
  },
  {
    icon: Truck,
    title: "Fast & Reliable Delivery",
    description:
      "On-time, tracked delivery with secure packaging for your medicines.",
  },
  {
    icon: Tag,
    title: "Affordable Pricing & Discounts",
    description:
      "Best prices guaranteed with regular discounts and loyalty rewards.",
  },
  {
    icon: FileText,
    title: "Secure Prescription Management",
    description:
      "Easily upload and manage prescriptions with refill reminders.",
  },
];

export default function WhyChooseUs() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  return (
    <section ref={sectionRef} className="xl:max-w-[1300px] xl:mx-auto">
      <motion.div
        initial="hidden"
        animate={controls}
        variants={{
          hidden: { opacity: 0, y: 50 },
          visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: "easeOut" },
          },
        }}
        className="flex flex-col lg:flex-row items-center justify-between gap-10 bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-8"
      >
        {/* Left: Video */}
        <div className="w-full lg:w-1/2 p-1">

<Image
  src={whychooseus}
  alt="Demo animation"
  width={800} 
  height={450}
  className="rounded-xl shadow-md w-full h-auto"
/>



        </div>

        {/* Right: List */}
        <div className="w-full lg:w-1/2 flex flex-col gap-6">
          <div className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            Why Choose{" "}
            <span className="text-blue-600 dark:text-blue-300">
              MediCommerce
            </span>
            ?
          </div>

          {reasons.map(({ icon: Icon, title, description }, idx) => (
            <motion.div
              key={title}
              variants={{
                hidden: { opacity: 0, x: 20 },
                visible: { opacity: 1, x: 0 },
              }}
              initial="hidden"
              animate={controls}
              transition={{ delay: 0.3 + idx * 0.1 }}
              className="flex items-start gap-4"
            >
              <div className="text-blue-600 dark:text-blue-300 mt-1">
                <Icon className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                  {title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
