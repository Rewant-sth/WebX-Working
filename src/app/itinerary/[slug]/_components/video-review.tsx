import { ITravelPackage } from '@/types/IPackages'
import React from 'react'

export default function VideoReview({ data }: { data: ITravelPackage }) {
    return (
        <section className='pb-16'>
            <h1 className="text-2xl text-orange-500 font-semibold mb-6 flex items-center gap-2">
                Video Review
            </h1>
            <div className="grid lg:grid-cols- gap-4">

                {
                    data.videos.map((video, index) => (
                        <>
                            <video controls key={index}>
                                <source src={video.videoUrl} type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>
                        </>
                    ))
                }
            </div>
        </section >
    )
}
