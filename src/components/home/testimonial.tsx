"use client"
import { Play } from "lucide-react";
import { motion } from "motion/react"

const TestimonialsSections = () => {
  return (
    <section className="min-h-screen h-full   mt-16">
      <div className="grid grid-cols-8 gap-1 md:gap-4 px-2 sm:px-6 py-10 pt-10">
        {['/1.jpeg', '/2.jpeg', '/3.jpeg', '/4.jpeg', '/5.jpeg', '/1.jpeg', '/2.jpeg', '/3.jpeg', '/4.jpeg', '/5.jpeg', '/1.jpeg', '/2.jpeg'].map((src, index) => (
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.3, delay: index * 0.05, ease: "easeInOut" }}
            key={index} className={`col-span-1 rounded-xl w-full h-[120px] md:h-[220px] relative ${index % 2 == 0 ? "translate-y-14" : ""}
          ${index > 1 && index < 6 ? "row-span-2" : ""}
          `}>
            <img src={src} alt={`Testimonial ${index + 1}`} className="w-full h-full object-cover rounded-xl" />
          </motion.div>
        ))}
      </div>
      <div className="flex flex-col gap-6 justify-center md:-translate-y-44 items-center">
        <span className="bg-gray-100 px-4 text-gray-800 rounded-full">Testimonials</span>
        <h2 className="text-xl md:text-4xl text-center font-semibold max-w-[70%] sm:max-w-lg"><span className="bg-orange-500 text-white px-2">Preferred</span> by  thousands  around the <span className="bg-orange-500 text-white px-2">world</span></h2>
        <p className="max-w-xl text-center">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sapiente earum dolor, hic quisquam iste est. Lorem, ipsum dollar</p>
        <button className='flex w-fit h-fit gap-2 items-center'>
          <span className='bg-amber-600 flex justify-center items-center text-white size-12 rounded-full'>
            <Play className='fill-white' />
          </span>
          <span className='text-left  leading-4 uppercase font-semibold'>Success <br /> Story</span>
        </button>
      </div>
    </section>

  );
};

export default TestimonialsSections;