import React from 'react';
import { CheckCircle, Mail, Clock, ArrowLeft, Phone, MapPin } from 'lucide-react';
import Link from 'next/link';

const TrekBookingSuccess = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30">
            {/* Navigation */}
            <div className="max-w-5xl mx-auto px-4 pt-6">
                <Link
                    href={"/"}
                    className="inline-flex items-center gap-2 text-slate-600 hover:text-blue-600 font-medium transition-colors duration-200"
                >
                    <ArrowLeft size={20} />
                    Back to Home
                </Link>
            </div>

            {/* Main Content */}
            <div className="max-w-4xl mx-auto px-4 py-12">
                {/* Success Header */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-6">
                        <CheckCircle className="w-8 h-8 text-green-600" />
                    </div>
                    <h1 className="text-2xl   font-bold text-slate-800 mb-4">
                        Booking Confirmed!
                    </h1>
                    <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
                        Your Himalayan adventure is officially booked. Get ready for an unforgettable journey through Nepal's majestic mountains.
                    </p>
                </div>

                {/* Status Cards */}
                <div className="grid md:grid-cols-3 gap-6 mb-12">
                    {[
                        {
                            icon: <CheckCircle className="w-6 h-6" />,
                            title: 'Booking Processed',
                            description: 'Your booking has been successfully confirmed',
                            color: 'text-green-600 bg-green-50 border-green-200'
                        },
                        {
                            icon: <Mail className="w-6 h-6" />,
                            title: 'Email Sent',
                            description: 'Confirmation details sent to your inbox',
                            color: 'text-blue-600 bg-blue-50 border-blue-200'
                        },
                        {
                            icon: <Clock className="w-6 h-6" />,
                            title: '24-Hour Response',
                            description: 'Our team will contact you within 24 hours',
                            color: 'text-amber-600 bg-amber-50 border-amber-200'
                        },
                    ].map((item, index) => (
                        <div
                            key={index}
                            className={`bg-white border-2 rounded-sm p-6 ${item.color} transition-all duration-200 hover:scale-105`}
                        >
                            <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full ${item.color} mb-4`}>
                                {item.icon}
                            </div>
                            <h3 className="font-semibold text-slate-800 mb-2">{item.title}</h3>
                            <p className="text-sm text-slate-600">{item.description}</p>
                        </div>
                    ))}
                </div>

                {/* What's Next Section */}
                <div className="bg-white border-2 border-slate-200 rounded-sm p-8 md:p-10 mb-8">
                    <h2 className="text-2xl font-bold text-slate-800 mb-6 text-center">
                        What happens next?
                    </h2>

                    <div className="grid md:grid-cols-2 gap-8">
                        <div>
                            <h3 className="font-semibold text-slate-800 mb-3 flex items-center gap-2">
                                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                                    <span className="text-blue-600 text-sm font-bold">1</span>
                                </div>
                                Documentation Package
                            </h3>
                            <p className="text-slate-600 mb-4">
                                You'll receive a comprehensive email package including detailed itinerary, packing checklist, and pre-trip preparation guide.
                            </p>
                        </div>

                        <div>
                            <h3 className="font-semibold text-slate-800 mb-3 flex items-center gap-2">
                                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                                    <span className="text-blue-600 text-sm font-bold">2</span>
                                </div>
                                Personal Consultation
                            </h3>
                            <p className="text-slate-600 mb-4">
                                Our expedition team will reach out to discuss specific requirements, dietary needs, and answer any questions you may have.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Contact Section */}
                <div className="border to rounded-sm border-gray-200 p-8 md:p-10 ">
                    <div className="text-center mb-8">
                        <h2 className="text-2xl font-bold mb-3">
                            Need immediate assistance?
                        </h2>
                        <p className="text-slate-100">
                            Our team is here to help with any urgent questions or concerns
                        </p>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        <Link
                            href="mailto:realhimalaya@gmail.com"
                            className="flex items-center justify-center gap-3 px-6 py-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-sm transition-colors duration-200"
                        >
                            <Mail className="w-5 h-5" />
                            Send Email
                        </Link>

                        <Link
                            href={`https://api.whatsapp.com/send?phone=9812345678&text=Namaste`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-3 px-6 py-4 bg-green-600 hover:bg-green-700 text-white font-medium rounded-sm transition-colors duration-200"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                                <path fill="currentColor" d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967c-.273-.099-.471-.148-.67.15c-.197.297-.767.966-.94 1.164c-.173.199-.347.223-.644.075c-.297-.15-1.255-.463-2.39-1.475c-.883-.788-1.48-1.761-1.653-2.059c-.173-.297-.018-.458.13-.606c.134-.133.298-.347.446-.52s.198-.298.298-.497c.099-.198.05-.371-.025-.52s-.669-1.612-.916-2.207c-.242-.579-.487-.5-.669-.51a13 13 0 0 0-.57-.01c-.198 0-.52.074-.792.372c-.272.297-1.04 1.016-1.04 2.479c0 1.462 1.065 2.875 1.213 3.074s2.096 3.2 5.077 4.487c.709.306 1.262.489 1.694.625c.712.227 1.36.195 1.871.118c.571-.085 1.758-.719 2.006-1.413s.248-1.289.173-1.413c-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214l-3.741.982l.998-3.648l-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884c2.64 0 5.122 1.03 6.988 2.898a9.82 9.82 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.82 11.82 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.9 11.9 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.82 11.82 0 0 0-3.48-8.413" />
                            </svg>
                            WhatsApp
                        </Link>

                        <Link
                            href="tel:+9779812345678"
                            className="flex items-center justify-center gap-3 px-6 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-sm transition-colors duration-200"
                        >
                            <Phone className="w-5 h-5" />
                            Call Direct
                        </Link>
                    </div>
                </div>

                {/* Trust Indicators */}
                <div className="text-center mt-12 pt-8 border-t border-slate-200">
                    <div className="flex items-center justify-center gap-6 text-sm text-slate-500 mb-4">
                        <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4" />
                            <span>Licensed Nepal Tour Operator</span>
                        </div>
                        <div className="hidden sm:block w-1 h-1 bg-slate-400 rounded-full"></div>
                        <div className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4" />
                            <span>15+ Years Experience</span>
                        </div>
                    </div>
                    <p className="text-slate-600 max-w-2xl mx-auto">
                        Thank you for choosing RealHimalaya Adventures Nepal. We're committed to providing you with a safe, memorable, and transformative Himalayan experience.
                    </p>
                </div>
            </div>

        </div>
    );
};

export default TrekBookingSuccess;
