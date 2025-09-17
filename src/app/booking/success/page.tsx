import React from 'react';
import { CheckCircle, Mail, Clock, ArrowLeft, Phone, MapPin } from 'lucide-react';
import Link from 'next/link';

const TrekBookingSuccess = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30 flex flex-col justify-center items-center">


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
                        Your Himalayan adventure is officially booked. Get ready for an unforgettable journey through Nepal's majestic mountains. check <strong>email</strong> for more info
                    </p>
                </div>


                {/* Navigation */}
                <div className="max-w-4xl w-full text-center mx-auto px-4 pt-6">
                    <Link
                        href={"/"}
                        className="inline-flex justify-center items-center gap-2 text-orange-500 text-center w-full hover:text-blue-600 font-medium transition-colors duration-200"
                    >
                        <ArrowLeft size={20} />
                        Back to Home
                    </Link>
                </div>


            </div>

        </div>
    );
};

export default TrekBookingSuccess;
