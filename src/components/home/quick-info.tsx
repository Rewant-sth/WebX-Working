import { ArrowRight } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

export default function QuickInfo() {
    return (
        <div className='min-h-screen flex-col flex items-center justify-center'>
            <h2 className='text-4xl pb-4 text-center font-semibold max-w-xl leading-12'>
                <span className='bg-orange-500 text-white px-4 '>Understand</span>
                Tales of Reak
                <span className='bg-orange-500 text-white px-4'>platforms</span>
            </h2>
            <p className='max-w-3xl text-center'> Discover insider secrets, survival stories, and expert tips from seasoned mountaineers.
                Our curated collection of adventure guides will transform your next expedition into an unforgettable journey.</p>
            <div className="mt-10 grid grid-cols-4 w-full max-w-7xl mx-auto gap-4">
                {[...Array(4)].map((_, idx) => (
                    <div key={idx} className="bg-gray-200 group p-4 relative w-full rounded-sm overflow-hidden min-h-[60dvh]">
                        <Image src={`/three.jpg`} fill alt='one' className='object-cover group-hover:blur-sm transition-all object-center' />
                        <div className="absolute inset-0 group-hover:bg-[#01283F]/50 transition-all p-3  flex justify-center items-center flex-col text-center text-white   ">
                            <p className=" text-4xl  max-w-[250px] text-center -rotate-[20deg] hover:font-sans  z-[99] font-semibold" style={{ fontFamily: "var(--font-dancing-script), 'Brush Script MT', cursive" }}>
                                Mount Everest Via Gokyo Lakes
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
