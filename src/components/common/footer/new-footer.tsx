"use client"
import { Icon } from '@iconify/react/dist/iconify.js';
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import React from 'react'
import TalkToExperts from './TalkToExperts/TalkToExperts';
import Link from 'next/link';


gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const divRef = React.useRef<HTMLDivElement>(null);
  const footerRef = React.useRef<HTMLDivElement>(null);



  return (
    <footer ref={footerRef} className="p-6   w-full relative  flex flex-col justify-end items-end   ">

      {/* footer expert part */}

      <div ref={divRef} className=" bg- text-zinc-900 border-  flex justify-center items-center  w-full mb-8 md:mb-24 ">
        <div className="relative  w-full flex flex-col justify-center  items-center">
          <div className="   w-full  mt-6">
            <TalkToExperts />
          </div>
        </div>
      </div>

      <div className="  md:bottom-20 right-0 w-screen overflow-hidden">
        <img src="/Footer/line.png" alt="mountain" className='opacity-80 brightness-90' />
      </div>

      {/* footer bottom part */}
      <div className="w-full relative z-50  flex  flex-col justify-center  ">
        <div className="relative text-center w-full  ">
          <div className=" mx-auto h-[100px] lg:h-[200px]  overflow-hidden">
            <img src="/logo/text.svg" alt="real himalaya" className='w-full lg:-translate-y-5 2-full z-40   mx-auto invert' />
          </div>

          <div className="  b pb-2 mb-2 border-zinc-300 sm:mt-8 w-full flex justify-between items-center gap-4 md:gap-6 flex-wrap mx-auto">
            <div className="flex flex-wrap gap-4 md:gap-6 items-center">
              <p className='md:text-xl shrink-0'>Recommended By : </p>
              <div className="">
                <ul className="flex gap-3 md:gap-4">
                  <li className='size-7 md:size-10'>
                    <Link target='_blank' href="https://www.tripadvisor.com/Attraction_Review-g293890-d10100922-Reviews-Real_Himalaya_Private_Day_Tour-Kathmandu_Kathmandu_Valley_Bagmati_Zone_Central_R.html">
                      <img src="https://uploads-ssl.webflow.com/5ee4030d6fd7285009fe05f5/625835dc5e9a3877c49e9bb7_tripadvisor-logo-5-p-2600.png" alt="trip advisor real himalaya" />
                    </Link>
                  </li>
                  <li className="size-7 md:size-10 bg-gray-200 rounded-full flex justify-center items-center"><Icon icon={"flat-color-icons:google"} className='text-4xl' /></li>
                  {/* <li className='w-24 md:w-32   translate-y-2 '><img src="https://framerusercontent.com/images/ZV0ieMLPHcyWwiRRZTPzNijd0.png" alt="Real Himalaya" /></li> */}
                </ul>
              </div>
            </div>

            <div className="flex gap-4 md:gap-6 flex-wrap items-center">
              <p className='md:text-xl shrink-0'>We Accept : </p>
              <div className="">
                <ul className="flex gap-4 md:gap-6">
                  <li className='w-32 md:w-40 '><img src="https://www.omegla.chat/images/OmeglePaymentOptions.webp" alt="Real Himalaya" /></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="border-t border-dashed pt-4 pb-2 text-sm mt-4 w-full flex flex-col justify-between items-center gap-2  flex-wrap mx-auto">

            <div className=" w-full mx-auto">
              <div className="flex w-full justify-between items-center gap-5 md:gap-6 flex-wrap">
                <p>&copy; Copy Right {new Date().getFullYear()} - Real Himalaya Pvt. Ltd</p>
                <ul className="flex gap-4 md:gap-6">
                  <li>
                    <Link target='_blank' href="https://www.facebook.com/dayula.sherpa">
                      <Icon className='size-7' icon="mdi:facebook" />
                    </Link>
                  </li>
                  <li>
                    <Link target='_blank' href="https://instagram.com/realhimalayanp">
                      <Icon className='size-7' icon="mdi:instagram" />
                    </Link>
                  </li>
                  <li>
                    <Link target='_blank' href="https://www.linkedin.com/company/realhimalaya">
                      <Icon className='size-7' icon="mdi:linkedin" />
                    </Link>
                  </li>
                  <li>
                    <Link target='_blank' href="https://twitter.com/realhimalayanp">
                      <Icon className='size-7' icon="mdi:twitter" />
                    </Link>
                  </li>
                </ul>
                <Link target='parent' href="https://www.webxnep.com" className='flex gap-2 items-center'>Designed and developed by <img src="/logo/black-logo-png.png" alt="webx nepal" width={62} /></Link>
              </div>
            </div>
          </div>
        </div>

      </div>
    </footer>
  )
}
