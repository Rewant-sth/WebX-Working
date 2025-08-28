"use client"
import { Icon } from '@iconify/react/dist/iconify.js';
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import React, { useLayoutEffect } from 'react'
import TalkToExperts from './TalkToExperts/TalkToExperts';


gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const divRef = React.useRef<HTMLDivElement>(null);
  const footerRef = React.useRef<HTMLDivElement>(null);
  const textRef = React.useRef<HTMLHeadingElement | null>(null);



  return (
    <footer ref={footerRef} className="min-h-screen   w-full relative  flex flex-col justify-end items-end   ">

      {/* footer expert part */}

      <div ref={divRef} className=" bg- text-zinc-900 border-  flex justify-center items-center  w-full mb-8 md:mb-24 ">
        <div className="relative  w-full flex flex-col justify-center  items-center">
          <div className="  max-w-7xl w-full  mt-6 px-4">
            <TalkToExperts />
          </div>
        </div>
      </div>

      <div className="  md:bottom-20 right-0 w-screen overflow-hidden">
        <img src="/Footer/footer.png" alt="mountain" />
      </div>

      {/* footer bottom part */}
      <div className="w-full  flex  flex-col justify-center  p-4 md:p-0   relative   pb-4">
        <div className="relative text-center w-full  ">
          <div className=" mx-auto max-h-[200px] overflow-hidden">
            <img src="/logo/text.svg" alt="" className='w-full -translate-y-5 invert max-w-7xl mx-auto ' />
          </div>

          <div className="max-w-7xl  b pb-5 mb-5  border-zinc-300 sm:mt-8 w-full flex justify-between items-center gap-4 md:gap-6 flex-wrap mx-auto">
            <div className="flex flex-wrap gap-4 md:gap-6 items-center">
              <p className='md:text-xl shrink-0'>Recommended By : </p>
              <div className="">
                <ul className="flex gap-3 md:gap-4">
                  <li className='size-7 md:size-10'>
                    <img src="https://uploads-ssl.webflow.com/5ee4030d6fd7285009fe05f5/625835dc5e9a3877c49e9bb7_tripadvisor-logo-5-p-2600.png" alt="" />
                  </li>
                  <li className="size-7 md:size-10 bg-gray-200 rounded-full flex justify-center items-center"><Icon icon={"flat-color-icons:google"} className='text-4xl' /></li>
                  <li className='w-24 md:w-32   translate-y-2 '><img src="https://framerusercontent.com/images/ZV0ieMLPHcyWwiRRZTPzNijd0.png" alt="" /></li>
                </ul>
              </div>
            </div>

            <div className="flex gap-4 md:gap-6 flex-wrap items-center">
              <p className='md:text-xl shrink-0'>We Accept : </p>
              <div className="">
                <ul className="flex gap-4 md:gap-6">
                  <li className='w-32 md:w-40 '><img src="https://www.omegla.chat/images/OmeglePaymentOptions.webp" alt="" /></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="  border-t border-dashed pt-4 text-sm mt-4 w-full flex flex-col justify-between items-center gap-2  flex-wrap mx-auto">

            <div className="max-w-7xl w-full mx-auto">
              <div className="flex w-full justify-between items-center gap-4 md:gap-6 flex-wrap">
                <p>&copy; Copy Right {new Date().getFullYear()} - Real Himalaya</p>
                <ul className="flex gap-4 md:gap-6">
                  <li><Icon className='size-7' icon="mdi:facebook" /></li>
                  <li><Icon className='size-7' icon="mdi:instagram" /></li>
                  <li><Icon className='size-7' icon="mdi:linkedin" /></li>
                  <li><Icon className='size-7' icon="mdi:twitter" /></li>
                </ul>
                <p>Designed and developed by WebX Nepal</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </footer>
  )
}
