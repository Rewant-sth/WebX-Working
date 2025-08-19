"use client"
import { Icon } from '@iconify/react/dist/iconify.js'
import React, { useState } from 'react'

export default function Navbar() {
  const [showNav, setShowNav] = useState(false);

  const handleShow = () => {
    setShowNav(true);

  }

  return (
    <nav className='sticky top-0 border-b border-zinc-300 z-[99999] backdrop-blur-md p-6 py-3 flex justify-between items-center'>
      <div className="w-40">
        <img src="/logo/main.svg" alt="" />
      </div>

      <button className='  w-fit px-6 pr-2  py-1 rounded-full flex gap-4 items-center bg-orange-500 shrink-0 text-white'>
        Menu
        <span className='bg-white size-9 flex justify-center items-center text-orange-500 rounded-full'><Icon icon={"fa6-solid:bars"} className='text-lg' /></span>
      </button>

      <div className="absolute top-0 overflow-hidden left-1/2 -translate-x-1/2  h-[100dvh] w-[4dvw] bg-white  py-0 ">
        <div className="flex border-b border-zinc-300 p-6 py-3 justify-between items-center">
          <div className="w-40">
            <img src="/logo/main.svg" alt="" />
          </div>

          <button className='  w-fit px-6 pr-2  py-1 rounded-full flex gap-4 items-center bg-orange-500 shrink-0 text-white'>
            Close
            <span className='bg-white size-9 flex justify-center items-center text-orange-500 rounded-full'><Icon icon={"bitcoin-icons:cross-filled"} className='text-lg' /></span>
          </button>
        </div>
      </div>
    </nav>
  )
}
