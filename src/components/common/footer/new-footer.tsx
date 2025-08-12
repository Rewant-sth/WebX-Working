import { Icon } from '@iconify/react/dist/iconify.js';
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import React, { useLayoutEffect } from 'react'

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const divRef = React.useRef<HTMLDivElement>(null);
  const footerRef = React.useRef<HTMLDivElement>(null);
  const textRef = React.useRef<HTMLHeadingElement[] | null>([]);


  useLayoutEffect(() => {
    const context = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top center",   // start earlier
          end: "+=700",     // end later
          scrub: 0.5,
        }
      });

      tl.fromTo(divRef.current, {
        borderRadius: "0px 0px 0px 0px"

      }, {
        borderRadius: "0px 0px 100px 100px",
        duration: 0.3,
        ease: "power2.out"
      });
    });

    return () => context.revert();
  })
  return (
    <footer ref={footerRef} className="min-h-screen w-full  flex flex-col justify-end items-end bg-orange-500  text-zinc-900">
      {/* footer expert part */}

      <div ref={divRef} className=" bg-white text-zinc-900  flex justify-center items-center h-[50dvh] w-full  ">
        <div className="relative  w-full flex flex-col justify-center  items-center">
          <h2 className='text-4xl font-semibold'>Talk To Experts</h2>
          <div className="h-[30dvh] max-w-7xl w-full bg-yellow-50 mt-6"></div>
        </div>
      </div>

      {/* footer bottom part */}
      <div className="w-full flex flex-col justify-center   text-white relative   pb-4">



        <div className="relative text-center w-full  h-fit">
          <div className="w-max mx-auto">
            <h2 className='text-[12vw] leading-[90%] tracking-widest font-bold pt-8 '>
              <span ref={el => {
                if (textRef.current != null) {
                  textRef.current[0] = el as HTMLHeadingElement
                }
              }} >R</span >
              <span ref={el => {
                if (textRef.current != null) {
                  textRef.current[1] = el as HTMLHeadingElement
                }
              }} >E</span>
              <span ref={el => {
                if (textRef.current != null) {
                  textRef.current[2] = el as HTMLHeadingElement
                }
              }} >A</span>
              <span ref={el => {
                if (textRef.current != null) {
                  textRef.current[3] = el as HTMLHeadingElement
                }
              }} >L</span>
            </h2>
            <h2 className='text-right text-4xl max-w-7xl mx-auto'>HIMALAYA</h2>
          </div>
          <div className="max-w-7xl border-b b pb-5 mb-5 border-dashed border-zinc-300 mt-8 w-full flex justify-between items-center gap-4 md:gap-6 flex-wrap mx-auto">
            <p>&copy; 2023 REAL HIMALAYA, All Rights Reserved.</p>
            <div className="">
              <ul className="flex gap-6">
                <li>Home</li>
                <li>About</li>
                <li>Contact</li>
                <li>Privacy Policy</li>
              </ul>
            </div>
          </div>
          <div className="max-w-7xl  text-sm mt-4 w-full flex flex-col justify-between items-center gap-4  flex-wrap mx-auto">
            <p>Designed and developed by WebX Nepal</p>
            <div className="">
              <ul className="flex gap-6">
                <li><Icon className='size-7' icon="mdi:facebook" /></li>
                <li><Icon className='size-7' icon="mdi:instagram" /></li>
                <li><Icon className='size-7' icon="mdi:linkedin" /></li>
                <li><Icon className='size-7' icon="mdi:twitter" /></li>
              </ul>
            </div>
          </div>
        </div>

      </div>
    </footer>
  )
}
