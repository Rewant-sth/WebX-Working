"use client"
import { Icon } from '@iconify/react/dist/iconify.js'
import React, { useState, useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import Link from 'next/link';

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
    <nav className='fixed left-0 w-full top-0 z-[99999]  bg-transparent p-6 py-3 flex justify-between items-center '>
      <Link href={"/"} className="w-40 transition-transform duration-300 hover:scale-105">
        <img src="/logo/main.svg" alt="Real Himalaya Logo" className="w-full h-auto" />
      </Link>

      <div className="flex gap-10 items-center">
        <ul>
          <li className='text-lg text-white'>Customize Trip</li>
        </ul>
        <button
          onClick={handleShow}
          className='w-fit px-6 pr-1 py-1 rounded-sm flex gap-4 items-center bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 shrink-0 text-white transition-all duration-300 hover:shadow-lg hover:scale-105 active:scale-95'
        >
          <span className="font-medium">Menu</span>
          <span className='bg-white size-9 flex justify-center items-center text-orange-500 rounded-sm transition-transform duration-300 group-hover:rotate-180'>
            <Icon icon={"fa6-solid:bars"} className='text-lg' />
          </span>
        </button>
      </div>

      <div
        ref={menuRef}
        className={`absolute hidden top-0 left-0 min-h-[100dvh] overflow-auto w-[100vw] bg-gradient-to-br from-[#01283F] via-[#012a42] to-[#01334d] ${showNav ? 'block' : 'hidden'}`}
      >
        <div ref={popupNavref} className="flex border-b border-white/10 backdrop-blur-sm bg-black/10 p-6 py-3 justify-between items-center">
          <Link href={"/"} className="w-40 transition-transform duration-300 hover:scale-105">
            <img src="/logo/white.svg" alt="Real Himalaya Logo" className="w-full h-auto" />
          </Link>

          <div className="flex gap-10 items-center">
            <ul>
              <li className='text-lg text-white'>Customize Trip</li>
            </ul>
            <button
              onClick={handleClose}
              className='w-fit px-6 pr-1 py-1 rounded-sm flex gap-4 items-center bg-white hover:bg-gray-100 shrink-0 text-[#01283F] transition-all duration-300 hover:shadow-lg hover:scale-105 active:scale-95'
            >
              <span className="font-medium">Close</span>
              <span className='bg-[#01283F] size-9 flex justify-center items-center text-white rounded-sm transition-transform duration-300 hover:rotate-90'>
                <Icon icon={"bitcoin-icons:cross-filled"} className='text-lg' />
              </span>
            </button>
          </div>
        </div>

        <div className="flex gap-12 text-white min-h-[calc(100dvh-6rem)]">
          <div className="w-full max-w-[15rem] text-xl space-y-4 col-span-2 p-6">
            <h2 className='text-3xl uppercase font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-6'>Categories</h2>
            {['Expedition', 'Peak Climbing', 'Trekking', 'About Us', 'Contact Us'].map((item, idx) => (
              <h2 key={idx} className='cursor-pointer transition-all duration-300 hover:text-orange-400 hover:translate-x-2 hover:font-medium py-2 border-l-2 border-transparent hover:border-orange-400 pl-4'>{item}</h2>
            ))}
          </div>

          <div className="w-full text-xl p-6 space-y-4 col-span-2 max-w-[18rem]">
            <h2 className='text-3xl uppercase font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-6'>SUB Categories</h2>
            {[
              'Everest Base Camp', 'Gokyo Lakes', 'Island Peak', 'Makalu Base Camp',
              'K2 Base Camp', 'Manaslu Base Camp', 'Lhotse Base Camp', 'Cho Oyu Base Camp'
            ].map((item, idx) => (
              <h2 key={idx} className='flex gap-2 items-center cursor-pointer transition-all duration-300 hover:text-orange-400 hover:translate-x-2 py-2 border-l-2 border-transparent hover:border-orange-400 pl-4'>
                <Icon icon="material-symbols:arrow-forward-ios" className="text-sm opacity-60" />
                {item}
              </h2>
            ))}
          </div>

          <div className="p-6 w-full flex flex-col h-[calc(100dvh-6rem)] overflow-hidden">
            <h2 className='text-3xl uppercase font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-6'>Packages</h2>
            <div className="grid grid-cols-2 max-w-3xl gap-5 flex-1 pr-4 overflow-y-auto scrollbar-thin scrollbar-track-gray-800 scrollbar-thumb-orange-500">
              {[...Array(12)].map((data, idx) => (
                <div key={idx} className="w-full h-[250px] bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/20 rounded-xl p-4 transition-all duration-300 hover:border-orange-400/50 hover:shadow-2xl hover:scale-105 cursor-pointer group">
                  <div className="w-full h-32 bg-gradient-to-br from-gray-300 to-gray-400 rounded-lg mb-3 opacity-50 group-hover:opacity-70 transition-opacity duration-300"></div>
                  <h3 className="text-white font-semibold text-sm mb-2 group-hover:text-orange-300 transition-colors duration-300">Package {idx + 1}</h3>
                  <p className="text-gray-300 text-xs leading-relaxed group-hover:text-gray-200 transition-colors duration-300">Explore amazing destinations with our premium travel packages designed for adventure seekers.</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
