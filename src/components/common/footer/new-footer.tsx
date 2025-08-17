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


  useLayoutEffect(() => {
    const path = document.querySelector("#visualpath") as SVGPathElement;
    const length = path.getTotalLength();

    gsap.set(path, {
      strokeDasharray: length,
      strokeDashoffset: length
    });

    gsap.timeline({
      scrollTrigger: {
        trigger: footerRef.current,
        start: "top center",
        end: "+=100%",
        scrub: 0.5,
      }
    }).to(path, {
      strokeDashoffset: 0,
      duration: 2,
      ease: "power2.inOut",

    })


  });

  return (
    <footer ref={footerRef} className="min-h-screen  text-[#01283F] w-full relative  flex flex-col justify-end items-end   ">
      <div className="absolute bottom-0 right-0 w-screen overflow-hidden">
        <svg id="visual" viewBox="0 0 900 600" className='w-full scale-105 drop-shadow-2xl shadow-black-300 fill-none' xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" stroke="#01283F"
          strokeWidth="2" >
          <path id='visualpath' d="M0 429L45 411L90 391L135 407L180 392L225 454L270 420L315 412L360 384L405 406L450 448L495 454L540 407L585 448L630 402L675 447L720 398L765 401L810 415L855 384L900 438L900 601L855 601L810 601L765 601L720 601L675 601L630 601L585 601L540 601L495 601L450 601L405 601L360 601L315 601L270 601L225 601L180 601L135 601L90 601L45 601L0 601Z" strokeLinecap="square" strokeLinejoin="bevel"></path>
        </svg>
        <div id='box' className="h-34 w-full "></div>
      </div>
      {/* footer expert part */}

      <div ref={divRef} className=" bg- text-zinc-900 border-  flex justify-center items-center h-[57dvh] w-full  ">
        <div className="relative  w-full flex flex-col justify-center  items-center">
          <div className="h-[30dvh]  max-w-7xl w-full  mt-6">
            <TalkToExperts />
          </div>
        </div>
      </div>

      {/* footer bottom part */}
      <div className="w-full flex pt-10 flex-col justify-center  text-[#01283F]  relative   pb-4">
        <div className="relative text-center w-full pt-5  h-fit">
          <div className="w-max mx-auto">
            <h2
              ref={textRef}

              className='text-[9vw] text-outline text- leading-[90%] tracking-widest font-bold pt-8 '>
              <span >R</span ><span >E</span><span >A</span><span >L</span><span >H</span><span >I</span><span >M</span>
              <span >A</span><span >L</span><span >A</span><span >Y</span><span >A</span>
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
                  <li className='w-32  translate-y-2'><img src="https://framerusercontent.com/images/ZV0ieMLPHcyWwiRRZTPzNijd0.png" alt="" /></li>
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
