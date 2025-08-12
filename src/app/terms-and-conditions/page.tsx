"use client"
import { useRouter } from 'next/navigation'
import React from 'react'

export default function Page() {
    const router = useRouter()

    return (
        <section className='py-12 lg:py-24 max-w-5xl mx-auto'>
            <div className="bg-white dark:text-white">
                <div className=" mx-auto px-4 lg:px-0 py-8">
                    <div className='w-full flex'>
                        <h1 className="text-3xl font-bold mb-4 text-blue-600">Terms of Service - HIGH5 ADVENTURES Nepal</h1>
                    </div>
                    <br />
                    <p className="mb-4 text-base">
                        Welcome to ExploreNepal Adventures. By accessing and using our website, you agree to be bound by the following Terms of Service. These terms govern all activities related to trekking, mountaineering, expeditions, and other travel-related services provided by our platform. If you do not agree with these terms, kindly refrain from using our services.
                    </p>
                    <br />

                    <div className='pb-5'>
                        <h2 className='font-bold text-blue-600 dark:text-white text-lg'>General Terms</h2>
                        <br />
                        <ul>
                            <li className='list-disc'>
                                <p className="text-base">
                                    By booking any travel service (including but not limited to trekking, mountaineering, or expeditions) through this website, you acknowledge that you meet the physical, legal, and experience requirements to participate in such activities and accept any inherent risks involved.
                                </p>
                            </li>
                            <br />
                            <li className='list-disc'>
                                <p className="text-base">
                                    We strive to provide accurate and up-to-date information on routes, itineraries, and safety protocols. However, natural calamities, political situations, or unforeseen circumstances may result in changes or cancellations. We reserve the right to modify, postpone, or cancel any activity in such cases without prior notice.
                                </p>
                            </li>
                            <br />
                            <li className='list-disc'>
                                <p className="text-base">
                                    All bookings made through our website are subject to confirmation and availability. Payment terms, cancellation policies, and refund conditions will be clearly stated during the booking process and must be agreed upon before confirmation.
                                </p>
                            </li>
                            <br />
                            <li className='list-disc'>
                                <p className="text-base">
                                    The use of this website is governed by local tourism laws, adventure safety guidelines, and international ethical standards. Misuse of our services, false bookings, or illegal activities will result in immediate termination of access.
                                </p>
                            </li>
                            <br />
                            <li className='list-disc'>
                                <p className="text-base">
                                    We may update these Terms of Service at any time to reflect regulatory changes or improvements to our offerings. Users will be notified via email or website announcement.
                                </p>
                            </li>
                        </ul>
                    </div>

                    <div className='pb-5'>
                        <h2 className='font-bold text-blue-600  text-lg dark:text-white'>Assumption of Risk</h2>
                        <p className="text-base">
                            Participation in mountaineering, trekking, or adventure expeditions involves potential risks, including injury, altitude sickness, unpredictable weather, or natural disasters. By using our services, you acknowledge and voluntarily accept these risks.
                        </p>
                    </div>

                    <div className='pb-5'>
                        <h2 className='font-bold  text-lg text-blue-600 dark:text-white'>Insurance & Liability</h2>
                        <p className="text-base">
                            We strongly recommend all clients to purchase comprehensive travel and medical insurance that covers high-altitude activities, emergency evacuation, and trip cancellation. ExploreNepal Adventures is not liable for any personal injuries, loss of equipment, or delays caused by third parties or natural circumstances.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}
