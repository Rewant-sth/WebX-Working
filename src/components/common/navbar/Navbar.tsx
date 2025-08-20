"use client"
import { Icon } from '@iconify/react/dist/iconify.js'
import React, { useState, useRef, useEffect } from 'react'
import { gsap } from 'gsap'

export default function Navbar() {
  const [showNav, setShowNav] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const popupNavref = useRef<HTMLDivElement>(null);



  const handleShow = () => {
    setShowNav(true);
    if (menuRef.current) {
      const timeline = gsap.timeline()

      timeline.to(menuRef.current, {
        clipPath: "inset(0% 0% 100% 0%)"
      })
      // Animate to full width
      timeline.to(menuRef.current, {
        display: "block",
        duration: 0,
        ease: "none",
        x: 0
      });
      timeline.to(menuRef.current, {
        clipPath: "inset(0% 0% 0% 0%)",
        duration: 0.9
      });
    }
  }

  const handleClose = () => {
    if (menuRef.current) {
      // Animate back to small width
      gsap.to(menuRef.current, {
        clipPath: "inset(0% 0% 100% 0%)",
        duration: 0.9,
        ease: "none",
        onComplete: () => {
          setShowNav(false);
        }
      });
    }
  }

  return (
    <nav className='sticky top-0 border-b border-zinc-300 z-[99999] backdrop-blur-md p-6 py-3 flex justify-between items-center '>
      <div className="w-40">
        <img src="/logo/main.svg" alt="" />
      </div>

      <button onClick={handleShow} className='  w-fit px-6 pr-2  py-1 rounded-full flex gap-4 items-center bg-orange-500 shrink-0 text-white'>
        Menu
        <span className='bg-white size-9 flex justify-center items-center text-orange-500 rounded-full'><Icon icon={"fa6-solid:bars"} className='text-lg' /></span>
      </button>

      <div
        ref={menuRef}
        className={`absolute hidden top-0   left-0 min-h-[100dvh] overflow-auto w-[100vw] bg-[#01283F]  ${showNav ? 'block' : 'hidden'}`}
      >
        <div ref={popupNavref} className="flex border-b border-white/10  p-6 py-3 justify-between items-center">
          <div className="w-40">
            <img src="/logo/white.svg" alt="" />
          </div>

          <button onClick={handleClose} className='w-fit px-6 pr-2 mr-4  py-1 rounded-full flex gap-4 items-center bg-white shrink-0 text-[#01283F]'>
            Close
            <span className='bg-[#01283F] size-9 flex justify-center items-center text-white rounded-full'><Icon icon={"bitcoin-icons:cross-filled"} className='text-lg' /></span>
          </button>
        </div>

        <div className="flex gap-12 text-white  ">
          <div className=" w-full max-w-[15rem] text-xl space-y-4 col-span-2 p-6">
            <h2 className='text-3xl uppercase font-semibold'>Categories</h2>
            <h2>Expedition</h2>
            <h2>Peak Climbing</h2>
            <h2>Trekking</h2>
            <h2>About Us</h2>
            <h2>Contact Us</h2>
          </div>
          <div className=" w-full text-xl p-6 space-y-4  col-span-2 max-w-[18rem]">
            <h2 className='text-3xl uppercase font-semibold'>SUB Categories</h2>
            <h2 className='flex gap-2 items-center '> Everest Base Camp</h2>
            <h2 className='flex gap-2 items-center '> Gokyo Lakes</h2>
            <h2 className='flex gap-2 items-center '> Island Peak</h2>
            <h2 className='flex gap-2 items-center '> Makalu Base Camp</h2>
            <h2 className='flex gap-2 items-center '> K2 Base Camp</h2>
            <h2 className='flex gap-2 items-center '> Manaslu Base Camp</h2>
            <h2 className='flex gap-2 items-center '> Lhotse Base Camp</h2>
            <h2 className='flex gap-2 items-center '> Cho Oyu Base Camp</h2>
          </div>
          <div className="p-6 h-full w-full flex flex-col">
            <h2 className='text-3xl uppercase font-semibold'>Packages</h2>
            <div className="grid grid-cols-2 max-w-3xl gap-5 mt-6 overflow-y-auto flex-1 pr-4">
              {[...Array(8)].map((data, idx) => (
                <div className="w-full h-[250px] border" key={idx} >

                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
