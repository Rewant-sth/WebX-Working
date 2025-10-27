"use client"
import { Icon } from '@iconify/react/dist/iconify.js';
import { X } from 'lucide-react';
import React from 'react';

export default function TermsAndConditions() {
    const [showPaymentInfo, setShowPaymentInfo] = React.useState(false);
    return (
        <main className="min-h-screen  text-zinc-800 py-12 pt-[5rem] px-4 sm:px-6 lg:px-24">
            <div className="max-w-5xl mx-auto">
                <header className="mb-8">
                    <div className="flex items-center justify-between">
                        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight">Terms &amp; Conditions</h1>
                    </div>
                    <p className="mt-3 text-xl text-zinc-600">A clear, user-friendly summary of booking rules, payments, cancellations and responsibilities.</p>
                </header>



                <article className="space-y-8">

                    <section id="booking" className="  ">
                        <h2 className="text-3xl font-semibold mb-4 ">Booking process</h2>
                        <div className="grid  gap-6">
                            <div>
                                <h3 className="font-semibold text-2xl mb-2">1. How to book</h3>
                                <p className="text-xl text-zinc-700">Book online through our site or via authorised partners. We issue a confirmation email with a booking form and a local contact for questions.</p>
                            </div>

                            <div>
                                <h3 className="font-semibold text-2xl mb-2 ">2. Deposit &amp; currency</h3>
                                <p className="text-xl text-zinc-700"><strong className='text-[#f05e25] font-medium'>Trip prices are shown in USD.</strong> If you pay in another currency we convert at the Nepal Central Bank rate on the day of payment. A deposit is required to secure your space (see the relevant trip type for deposit amount). Deposits <b className='text-[#f05e25] font-medium'>30% are non-refundable</b> unless explicitly stated otherwise in a supplementary agreement.</p>
                            </div>
                        </div>
                    </section>

                    <section id="payment" className=" ">
                        <h2 className="text-3xl  mb-2 ">Payment methods</h2>
                        <ul className="list-disc ml-5 space-y-2 text-xl text-zinc-700">
                            <li><strong className='font-medium text-black'>Online platform:</strong> We use a secure payment gateway that accepts multiple currencies. Processing fees may apply depending on card type.</li>
                            <li><strong className='font-medium text-black'>Bank transfer / wire:</strong> Bank details provided on request. Clients cover any transfer fees charged by their bank. <button onClick={() => setShowPaymentInfo(true)} className='text-orange-500 font-semibold hover:underline'>click here to view details</button></li>
                            <li><strong className='font-medium text-black'>Credit card:</strong> We accept major cards; a small card-processing surcharge may be applied.</li>
                            <li><strong className='font-medium text-black'>Cash:</strong> Cash payments are accepted in major currencies; notes must be clean and recent series as required for authenticity checks.</li>
                        </ul>
                    </section>

                    <section id="cancellation" className=" ">
                        <h2 className="text-3xl  mb-2">Cancellation &amp; refund policy</h2>

                        <div className="space-y-4 text-xl text-zinc-700">
                            <div>
                                <p>If you cancel at least <strong className='font-medium text-[#f05e25]'>3 Weeks</strong> before departure, we will retain the deposit ( deduct  30% of the total trip cost as stated in your booking confirmation) and refund any remaining balance. Cancellations made with less than 20 days' notice are subject to full payment and are non-refundable.</p>
                            </div>
                        </div>
                    </section>

                    <section id="reschedule" className=" ">
                        <h2 className="text-3xl  mb-2">Rescheduling &amp; transfers</h2>
                        <p className="text-xl text-zinc-700">If you need to move your trip dates, notify us in writing within the timeframes listed in your booking confirmation. A rescheduling fee applies per person. If you wish to transfer your booking to another person, you are responsible for finding a suitable replacement; additional fees may apply.</p>
                        <ul className="mt-3 text-xl text-zinc-700 list-disc ml-5">
                            <li>Rescheduling fees vary by destination and the notice period.</li>
                            <li>If the new departure is more expensive, you are responsible for the price difference.</li>
                        </ul>
                    </section>

                    <section id="visa" className=" ">
                        <h2 className="text-3xl  mb-2">Passports &amp; visas</h2>
                        <p className="text-xl text-zinc-700">Travelers must hold passports valid for at least six months beyond their planned return date. For some destinations we handle permits and visas on your behalf — see the trip description for details and the documents we will request at booking.</p>
                    </section>

                    <section id="insurance" className=" ">
                        <h2 className="text-3xl  mb-2">Travel insurance</h2>
                        <p className="text-xl text-zinc-700">Comprehensive travel insurance is mandatory. Policies should cover medical costs, evacuation, trip cancellation, helicopter rescue, baggage loss and other risks common in mountain travel. Clients must ensure their policy covers the activities in the itinerary.</p>
                    </section>

                    <section id="risk" className=" ">
                        <h2 className="text-3xl  mb-2">Risk, behaviour &amp; responsibilities</h2>
                        <p className="text-xl text-zinc-700">Mountain travel involves inherent risks including injury, illness, and natural hazards. By booking you accept these risks and agree that Real Himalaya and its staff are not liable for personal injury, loss or damage to property except where caused by proven negligence.</p>
                        <p className="mt-3 text-xl text-zinc-700">We reserve the right to remove any participant whose behaviour endangers others or violates local laws. No refunds or claims for unused services will be made in such cases.</p>
                    </section>

                    <section id="helicopter" className=" ">
                        <h2 className="text-3xl  mb-2">Domestic flight disruptions &amp; helicopter rescue</h2>
                        <p className="text-xl text-zinc-700">Weather can disrupt mountain flights. If flights are cancelled and a helicopter is required to start or finish a trek, the client will cover helicopter costs. We recommend allowing extra buffer days in your schedule and ensuring your insurance covers emergency evacuation.</p>
                    </section>

                    <section id="publicity" className=" ">
                        <h2 className="text-3xl  mb-2">Photography &amp; publicity</h2>
                        <p className="text-xl text-zinc-700">By joining a Real Himalaya trip you give permission for us to use photos or videos taken during the trip for promotional purposes, unless you advise us otherwise in writing before departure.</p>
                    </section>

                    <section id="complaints" className=" ">
                        <h2 className="text-3xl  mb-2">Complaints</h2>
                        <p className="text-xl text-zinc-700">Please raise any complaints with our staff during the trip so we can try to resolve them immediately. For unresolved matters, submit a written complaint within 30 days of trip completion.</p>
                    </section>

                    <section id="jurisdiction" className=" ">
                        <h2 className="text-3xl  mb-2">Governing law &amp; jurisdiction</h2>
                        <p className="text-xl text-zinc-700">These terms are governed by the laws of Nepal. Any disputes will be handled in Kathmandu courts. This clause does not prevent either party from seeking urgent injunctive relief in other competent courts if necessary.</p>
                    </section>

                </article>
            </div>

            {showPaymentInfo && (
                <div className="backdrop-blur-sm flex items-center justify-center p-4 fixed inset-0 bg-black/30 z-[9999999]">
                    <div className="bg-white rounded-2xl shadow-xl max-w-3xl w-full relative">
                        <button
                            onClick={() => setShowPaymentInfo(false)}
                            className="absolute top-4 right-4 hover:bg-gray-100 rounded-full p-1 transition-colors"
                        >
                            <X className="size-6" />
                        </button>

                        <div className="p-8">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="">
                                    <Icon icon={'ph:info-fill'} className="size-7 text-orange-600" />
                                </div>
                                <h2 className="text-xl font-semibold text-zinc-800">Payment Information</h2>
                            </div>

                            <div className="space-y-4 rounded-2xl p-4 bg-zinc-100/70">
                                <img src="/logo/global.png" alt="global bank logo" className="w-52" />
                                <div className="">

                                    <div className="space-y-3 grid lg:grid-cols-2">
                                        <div>
                                            <p className="text-base text-zinc-800 mb-1">A/C Holder Name</p>
                                            <p className="font-medium text-orange-500 text-lg">Real Himalaya Pvt. Ltd</p>
                                        </div>

                                        <div>
                                            <p className="text-base text-zinc-800 mb-1">A/C Holder Address</p>
                                            <p className="font-medium text-orange-500 text-lg">Changunarayan 3, Bhaktapur, Nepal</p>
                                        </div>

                                        <div>
                                            <p className="text-base text-zinc-800 mb-1">A/C Number</p>
                                            <p className="font-medium text-orange-500 text-lg font-mono">00101020005129</p>
                                        </div>

                                        <div>
                                            <p className="text-base text-zinc-800 mb-1">Bank Name</p>
                                            <p className="font-medium text-orange-500 text-lg">Global IME Bank Ltd</p>
                                        </div>

                                        <div>
                                            <p className="text-base text-zinc-800 mb-1">Bank Address</p>
                                            <p className="font-medium text-orange-500 text-lg">Kantipath branch, Kathmandu, Nepal</p>
                                        </div>

                                        <div>
                                            <p className="text-base text-zinc-800 mb-1">SWIFT Code</p>
                                            <p className="font-medium text-orange-500 text-lg font-mono">GLBBNPKA</p>
                                        </div>
                                    </div>
                                </div>


                            </div>

                            <div className="mt-4">
                                <p className="">
                                    <strong>Note:</strong> Please use these bank details for wire transfer or direct bank deposit. After payment, kindly share the transaction receipt with us.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
}
