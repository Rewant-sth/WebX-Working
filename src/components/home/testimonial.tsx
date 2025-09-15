"use client"
import { Play } from "lucide-react";
import { motion } from "motion/react"
import Link from "next/link";

const TestimonialsSections = () => {
  return (
    <section className=" h-full   my-16 mb-20">
      <div className="grid sm:grid-cols-2 md:grid-cols-8 gap-1 md:gap-2 px-2 sm:px-6 py-10 pt-10">
        {['/Avtar/1.jpg', '/Avtar/2.jpg', '/Avtar/3.jpg', '/Avtar/4.jpg', '/Avtar/5.jpg', '/Avtar/6.jpg', '/Avtar/7.jpg', '/Avtar/8.jpg', '/Avtar/9.jpg', '/Avtar/10.jpg', '/Avtar/11.jpg', '/Avtar/12.jpg'].map((src, index) => (
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.3, delay: index * 0.05, ease: "easeInOut" }}
            key={index} className={`col-span-1 rounded-xl w-full h-[220px] relative ${index % 2 == 0 ? " md:translate-y-14" : ""}
          ${index > 1 && index < 6 ? "md:row-span-2" : ""}
          `}>
            <img src={src} alt={`Testimonial ${index + 1}`} className="w-full h-full object-cover object-center rounded-[2px]" />
          </motion.div>
        ))}
      </div>
      <div className="flex flex-col gap-6 justify-center md:-translate-y-44 items-center">
        <span className="bg-gray-100 px-4 text-gray-800 rounded-full">Testimonials</span>
        <h2 className="text-xl md:text-4xl text-center font-semibold max-w-[80%] sm:max-w-xl uppercase"><span className="bg-orange-500 text-white px-2">Preferred</span> by  thousands  around the <span className="bg-orange-500 text-white px-2">world</span></h2>
        <p className="max-w-[45rem] text-center px-4 xl:px-0">Over the years, Real Himalaya has become the trusted choice of trekkers and climbers from across the globe. Our commitment to safety, authentic experiences, and expert guidance has earned us the loyalty of thousands who return to the Himalayas with us time and again. Each journey is crafted with care, ensuring that every traveler takes home not just memories, but a lifelong connection to the mountains.</p>
        <Link href={"https://www.tripadvisor.com/Attraction_Review-g293890-d10100922-Reviews-Real_Himalaya_Private_Day_Tour-Kathmandu_Kathmandu_Valley_Bagmati_Zone_Central_R.html"} target="_blank" rel="noopener noreferrer">
          <button className='flex w-fit h-fit gap-2 items-center'>
            <span className='bg-amber-600 flex justify-center items-center text-white size-12 rounded-full'>
              <Play className='fill-white' />
            </span>
            <span className='text-left  leading-4 uppercase font-semibold'>View <br /> More</span>
          </button>
        </Link>
      </div>
    </section>

  );
};

export default TestimonialsSections;