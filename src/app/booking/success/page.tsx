import React from 'react';
import { CheckCircle, Mail, Clock, MessageCircle, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

const TrekBookingSuccess = () => {
    return (
        <div className="min-h-screen flex items-center flex-col justify-center p-4 lg:p-8 bg-slate-50">
            <Link href={"/"} className="flex hover:text-blue-600 font-semibold gap-2 items-center w-full max-w-3xl pb-4">
                <ArrowLeft size={18} /> Back to Home
            </Link>
            <div className="max-w-3xl w-full bg-white/95 backdrop-blur-sm rounded-3xl  border border-slate-200 relative">

                {/* Success Icon */}
                <div className="text-center p-2 sm:p-8 md:p-12 md:pb-6 text-green-600">
                    <div className="flex gap-3 items-center justify-center mb-2">
                        <h1 className="text-4xl md:text-5xl font-bold text-slate-800">
                            Booking Confirmed!
                        </h1>
                    </div>
                    <p className="text-lg md:text-xl text-slate-600 leading-relaxed">
                        Your adventure is officially booked. Get ready for an unforgettable journey!
                    </p>
                </div>

                {/* Details Card */}
                <div className="bg-slate-50 p-2 sm:p-8 md:m-12 mt-8 rounded-2xl  mb-8 border border-slate-200">
                    <div className="space-y-4">
                        {[
                            {
                                icon: <CheckCircle className="w-full h-full" />,
                                text: 'Your booking has been successfully processed',
                            },
                            {
                                icon: <Mail className="w-full h-full" />,
                                text: 'Confirmation details sent to your email',
                            },
                            {
                                icon: <Clock className="w-full h-full" />,
                                text: 'Our team will contact you within 24 hours',
                            },
                        ].map((item, index) => (
                            <div
                                key={index}
                                className="flex items-center p-4 bg-white rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow"
                            >
                                <div className="flex-shrink-0 w-6 h-6 text-indigo-600 mr-4">
                                    {item.icon}
                                </div>
                                <span className="text-base md:text-lg font-medium text-slate-700">
                                    {item.text}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Contact Section */}
                <div className="text-center m-4 sm:m-8">
                    <h2 className="text-xl md:text-2xl font-semibold text-slate-800 mb-6">
                        Need immediate assistance?
                    </h2>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            href="mailto:high5adv@gmail.com"
                            className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white font-medium rounded-full hover:from-indigo-700 hover:to-indigo-800 transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5"
                        >
                            <Mail className="w-5 h-5" />
                            Send Email
                        </Link>

                        <Link
                            href={`https://api.whatsapp.com/send?phone=9779851279322&text=Namaste%2C%20Highfive%20Adventures%20Nepal`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-green-600 to-green-700 text-white font-medium rounded-full hover:from-green-700 hover:to-green-800 transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" viewBox="0 0 24 24"><path fill="currentColor" d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967c-.273-.099-.471-.148-.67.15c-.197.297-.767.966-.94 1.164c-.173.199-.347.223-.644.075c-.297-.15-1.255-.463-2.39-1.475c-.883-.788-1.48-1.761-1.653-2.059c-.173-.297-.018-.458.13-.606c.134-.133.298-.347.446-.52s.198-.298.298-.497c.099-.198.05-.371-.025-.52s-.669-1.612-.916-2.207c-.242-.579-.487-.5-.669-.51a13 13 0 0 0-.57-.01c-.198 0-.52.074-.792.372c-.272.297-1.04 1.016-1.04 2.479c0 1.462 1.065 2.875 1.213 3.074s2.096 3.2 5.077 4.487c.709.306 1.262.489 1.694.625c.712.227 1.36.195 1.871.118c.571-.085 1.758-.719 2.006-1.413s.248-1.289.173-1.413c-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214l-3.741.982l.998-3.648l-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884c2.64 0 5.122 1.03 6.988 2.898a9.82 9.82 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.82 11.82 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.9 11.9 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.82 11.82 0 0 0-3.48-8.413"></path></svg>                            WhatsApp
                        </Link>
                    </div>
                </div>

                {/* Footer Note */}
                <div className="pt-8 border-t border-slate-200 text-center">
                    <p className="font-semibold text-slate-800 mb-2 text-base md:text-lg">
                        What happens next?
                    </p>
                    <p className="text-sm md:text-base text-slate-600">
                        You'll receive a detailed itinerary, packing list, and pre-trip information via email.
                        Our expedition team will also reach out to discuss any specific requirements or questions you may have.
                    </p>
                </div>

                {/* Decorative Bottom Element */}
                <div className="">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className='fill-blue-600'><path fillOpacity="1" d="M0,96L40,85.3C80,75,160,53,240,53.3C320,53,400,75,480,101.3C560,128,640,160,720,192C800,224,880,256,960,261.3C1040,267,1120,245,1200,213.3C1280,181,1360,139,1400,117.3L1440,96L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z"></path></svg>
                </div>
            </div>
        </div>
    );
};

export default TrekBookingSuccess;
