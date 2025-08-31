import React from 'react'

export default function Divider() {
    return (
        <div className='h-[70dvh] my-20 flex justify-start items-center  w-dvw overflow-hidden relative'>
            <img src="/divider3.png" alt="divider" className='flex w-full  object-cover object-bottom' />
            <div className="absolute inset-0 z-40 flex justify-end items-center">
                <h2 className='text-5xl max-w-2xl leading-snug uppercase font-bold text-[#262626]'>Leave <span className='text-orange-500'>routine</span> behind, <br /> let nature express your <span className='text-orange-500'>soul</span>.</h2>

            </div>

            <div className="absolute inset-0 z-30 bg-gradient-to-l via-white  from-white to-transparent" />
        </div>
    )
}
