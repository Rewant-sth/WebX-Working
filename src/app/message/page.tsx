import TitleDesc from '@/components/titleDesc/TitleDesc'
import { ChevronRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function MessageFromCEO() {
    return (
        <main>
            <TitleDesc
                title="Message from our CEO"
                desc="Ready to explore the world with us? Let's connect and craft your perfect travel experience - your next adventure starts with a conversation."
            />

            <div className="grid max-w-7xl px-4 sm:px-6 md:px-10 lg:px-4 mt-12 mx-auto lg:grid-cols-2 gap-4 md:gap-8 lg:gap-12">
                <div className="w-full aspect-square relative rounded-2xl overflow-hidden">
                    <Image src={"/narbinmagar.jpg"} alt="Narbin Magar" fill className="object-cover" />
                    <div className="absolute inset-0 p-4 lg:p-6 flex justify-end items-end flex-col bg-gradient-to-t text-white from-black to-transparent">
                        <h2 className='text-2xl font-semibold'>Narbin Magar</h2>
                        <p className='text-lg'>CEO, HighFive</p>
                    </div>
                </div>
                <div className="">
                    <div className="px-4 bg-blue-100 mb-3 text-blue-600 w-fit rounded-full py-2 flex gap-2 items-center"><span className="size-3 flex bg-blue-500 animate-pulse rounded-full"></span> A vision fueled by passion </div>
                    <h2 className='text-3xl font-semibold lg:text-4xl mb-6'>Travel is more than a journey- it's a story waiting to unfold.</h2>
                    <p className='text-lg'>At the heart of our company lies a dream - to make every journey meaningful, immersive, and unforgettable. As CEO, I personally invite you to discover the world with us. Our team is devoted to crafting experiences that speak to your soul, not just your schedule.</p>

                    <p className='text-lg mt-4'>I've always believed that travel is not just about places, but people. The smiles you exchange in a mountain village, the stories shared under desert skies, the silence of a sunrise that leaves you in awe - these are the moments that define a lifetime.</p>

                    <p className='text-lg mt-4'>Our journeys are carefully designed with cultural authenticity, comfort, and creativity. We partner with local communities, embrace sustainability, and go the extra mile to ensure your experience is as unique as you are.</p>

                    <Link href="/package-list/expedition"><button className='bg-blue-600 mt-4  lg:mt-6 text-white px-4 py-2 rounded-xl flex gap-2 items-center'>Explore Packages <ChevronRight /></button></Link>
                </div>
            </div>
        </main>
    )
}
