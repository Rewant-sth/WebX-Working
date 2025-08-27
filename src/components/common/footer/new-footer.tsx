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
      <div className="absolute bottom-20 right-0 w-screen overflow-hidden">
        <img src="https://www.freeiconspng.com/uploads/mountain-png-32.png" alt="mountain" />
        <div id='box' className="h-34 w-full "></div>
      </div>
      {/* footer expert part */}

      <div ref={divRef} className=" bg- text-zinc-900 border-  flex justify-center items-center h-full md:h-[57dvh] w-full mb-24 ">
        <div className="relative  w-full flex flex-col justify-center  items-center">
          <div className="md:h-[30dvh]  max-w-7xl w-full  mt-6">
            <TalkToExperts />
          </div>
        </div>
      </div>

      {/* footer bottom part */}
      <div className="w-full  flex  flex-col justify-center mt-6    relative   pb-4">
        <div className="relative text-center w-full pt-5  h-fit">
          <div className="w-max mx-auto">
            <h2
              ref={textRef}

              className='text-[9vw] text-outline  leading-[90%] tracking-widest font-bold pt-8 font-amanojaku text-[#2E2E2E] opacity' >
              REAL HIMALAYA
            </h2>
          </div>
          <div className="max-w-7xl  b pb-5 mb-5  border-zinc-300 mt-8 w-full flex justify-between items-center gap-4 md:gap-6 flex-wrap mx-auto">
            <div className="flex gap-6 items-center">
              <p className='text-xl'>Recommended By : </p>
              <div className="">
                <ul className="flex gap-4">
                  <li className='size-10'>
                    <img src="https://uploads-ssl.webflow.com/5ee4030d6fd7285009fe05f5/625835dc5e9a3877c49e9bb7_tripadvisor-logo-5-p-2600.png" alt="" />
                  </li>
                  <li className="size-10 bg-gray-200 rounded-full flex justify-center items-center"><Icon icon={"flat-color-icons:google"} className='text-4xl' /></li>
                  <li className='w-32  translate-y-2 '><img src="https://framerusercontent.com/images/ZV0ieMLPHcyWwiRRZTPzNijd0.png" alt="" /></li>
                </ul>
              </div>
            </div>

            <div className="flex gap-6 items-center">
              <p className='text-xl'>We Accept : </p>
              <div className="">
                <ul className="flex gap-6">
                  <li className='w-40 '><img src="https://www.omegla.chat/images/OmeglePaymentOptions.webp" alt="" /></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="max-w-7xl  border-t border-dashed pt-4 text-sm mt-4 w-full flex flex-col justify-between items-center gap-2  flex-wrap mx-auto">
            <div className="flex w-full justify-between items-center gap-6 flex-wrap">
              <p>&copy; Copy Right {new Date().getFullYear()} - Real Himalaya</p>
              <ul className="flex gap-6">
                <li><Icon className='size-7' icon="mdi:facebook" /></li>
                <li><Icon className='size-7' icon="mdi:instagram" /></li>
                <li><Icon className='size-7' icon="mdi:linkedin" /></li>
                <li><Icon className='size-7' icon="mdi:twitter" /></li>
              </ul>
              <p>Designed and developed by WebX Nepal</p>
            </div>
            <div className="">

            </div>
          </div>
        </div>

      </div>
    </footer>
  )
}
