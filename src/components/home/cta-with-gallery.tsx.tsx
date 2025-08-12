import React from 'react'

export default function CTA() {
  return (
    <section className='max-h-[100vh] overflow-hidden relative'>
      <div className="absolute inset-0 z-10 space-y-8 p-10 bg-black/40 text-white flex flex-col justify-center items-center">
        <h2 className="text-5xl font-bold  capitalize skew-[70deg]">They made it <span className='bg-orange-500 px-4'>real</span></h2>
        <h2 className="text-5xl font-bold  capitalize">........... You ?</h2>
      </div>
      <video src="/cta.mp4" autoPlay loop muted className="w-full h-full object-cover"></video>
    </section>
  )
}
