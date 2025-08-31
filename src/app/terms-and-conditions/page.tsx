"use client"
import { Mountain, Shield, FileText, Users, CreditCard, AlertTriangle, Phone, Mail, MapPin, ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'

export default function Page() {
    const router = useRouter()
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <section className="bg-gray-900 text-white py-16">
                <div className="max-w-7xl mx-auto px-4 lg:px-8">
                    <div className="text-center">

                        <h1 className="text-4xl lg:text-5xl font-bold mb-6">
                            Terms and Conditions
                        </h1>
                        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                            Please read these terms carefully before booking your adventure with Real Himalaya
                        </p>
                        <div className="mt-8 text-sm text-gray-400">
                            Last updated: {new Date().toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                            })}
                        </div>
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <section className="py-16">
                <div className="max-w-7xl mx-auto px-4 lg:px-8">

                    <button onClick={() => router.back()} className=" mb-6  flex gap-2 items-center">
                        <ArrowLeft />   Go Back
                    </button>

                    {/* Introduction */}
                    <div className="bg-white rounded-sm border border-gray-200 p-8 mb-8">
                        <div className="prose max-w-none">
                            <p className="text-lg text-gray-600 leading-relaxed">
                                Welcome to <strong className='text-orange-500'>Real Himalaya</strong>. By accessing and using our website or booking any of our services,
                                you agree to comply with and be bound by the following Terms and Conditions. These terms govern all
                                activities related to trekking, mountaineering, expeditions, and other adventure travel services
                                provided by Real Himalaya. If you do not agree with these terms, please do not use our services.
                            </p>
                        </div>
                    </div>

                    {/* Terms Sections */}
                    <div className="space-y-8">

                        {/* Company Information */}
                        <div className="bg-white rounded-sm border border-gray-200 p-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">Company Information</h2>
                            <div className="prose max-w-none">
                                <p className="mb-4">
                                    Real Himalaya is a licensed and registered adventure travel company operating in Nepal,
                                    specializing in high-altitude trekking, mountaineering expeditions, and cultural tours
                                    throughout the Himalayan region.
                                </p>
                                <div className="bg-gray-100 p-4 rounded-sm">
                                    <div className="flex items-center gap-2 mb-2">
                                        <MapPin className="w-4 h-4 text-gray-600" />
                                        <strong>Registered Address:</strong> Kathmandu, Nepal
                                    </div>
                                    <div className="flex items-center gap-2 mb-2">
                                        <Phone className="w-4 h-4 text-gray-600" />
                                        <strong>Contact:</strong> +977-XXXX-XXXXXX
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Mail className="w-4 h-4 text-gray-600" />
                                        <strong>Email:</strong> info@realhimalaya.com
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Booking Terms */}
                        <div className="bg-white rounded-sm border border-gray-200 p-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">Booking Terms</h2>
                            <div className="space-y-6">
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Reservation Policy</h3>
                                    <ul className="space-y-3 text-gray-600">
                                        <li className="flex items-start gap-3">
                                            <div className="w-2 h-2 bg-gray-600 rounded-full mt-2 flex-shrink-0"></div>
                                            All bookings are subject to availability and confirmation by Real Himalaya
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <div className="w-2 h-2 bg-gray-600 rounded-full mt-2 flex-shrink-0"></div>
                                            A deposit of 30% is required to secure your booking
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <div className="w-2 h-2 bg-gray-600 rounded-full mt-2 flex-shrink-0"></div>
                                            Full payment is required 30 days prior to departure
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <div className="w-2 h-2 bg-gray-600 rounded-full mt-2 flex-shrink-0"></div>
                                            Group bookings may have different payment terms
                                        </li>
                                    </ul>
                                </div>

                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Cancellation Policy</h3>
                                    <div className="bg-gray-100 p-4 rounded-sm">
                                        <ul className="space-y-2 text-gray-700">
                                            <li><strong>60+ days before departure:</strong> 10% cancellation fee</li>
                                            <li><strong>30-59 days before departure:</strong> 25% cancellation fee</li>
                                            <li><strong>15-29 days before departure:</strong> 50% cancellation fee</li>
                                            <li><strong>Less than 15 days:</strong> 100% cancellation fee</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Risk and Safety */}
                        <div className="bg-white rounded-sm border border-gray-200 p-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">Risk Acknowledgment and Safety</h2>
                            <div className="space-y-6">
                                <div className="bg-gray-100 p-6 rounded-sm">
                                    <h3 className="text-lg font-semibold text-gray-800 mb-3">
                                        Important Safety Notice
                                    </h3>
                                    <p className="text-gray-700">
                                        Adventure travel activities including trekking, mountaineering, and high-altitude expeditions
                                        carry inherent risks that may result in injury, illness, or in extreme cases, death.
                                        These activities take place in remote areas with limited rescue capabilities.
                                    </p>
                                </div>

                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Participant Requirements</h3>
                                    <ul className="space-y-3 text-gray-600">
                                        <li className="flex items-start gap-3">
                                            <div className="w-2 h-2 bg-gray-600 rounded-full mt-2 flex-shrink-0"></div>
                                            Participants must be in good physical and mental health
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <div className="w-2 h-2 bg-gray-600 rounded-full mt-2 flex-shrink-0"></div>
                                            Medical certificate may be required for high-altitude expeditions
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <div className="w-2 h-2 bg-gray-600 rounded-full mt-2 flex-shrink-0"></div>
                                            Previous trekking experience recommended for advanced routes
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <div className="w-2 h-2 bg-gray-600 rounded-full mt-2 flex-shrink-0"></div>
                                            Participants must follow all safety instructions from guides
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* Insurance and Liability */}
                        <div className="bg-white rounded-sm border border-gray-200 p-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">Insurance and Liability</h2>
                            <div className="space-y-6">
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Insurance Requirements</h3>
                                    <div className="bg-gray-100 p-6 rounded-sm">
                                        <p className="text-gray-800 mb-4">
                                            <strong>Mandatory Travel Insurance:</strong> All participants must have comprehensive
                                            travel insurance covering:
                                        </p>
                                        <ul className="space-y-2 text-gray-700">
                                            <li>• Medical expenses and emergency treatment</li>
                                            <li>• Helicopter rescue and evacuation up to 6,000m</li>
                                            <li>• Trip cancellation and interruption</li>
                                            <li>• Personal accident and disability coverage</li>
                                            <li>• Equipment loss and damage</li>
                                        </ul>
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Limitation of Liability</h3>
                                    <p className="text-gray-600 mb-4">
                                        Real Himalaya acts as an organizer and facilitator of adventure travel services.
                                        We work with experienced local guides, porters, and suppliers but cannot control
                                        all aspects of your journey.
                                    </p>
                                    <ul className="space-y-2 text-gray-600">
                                        <li>• Weather conditions and natural disasters</li>
                                        <li>• Flight delays and cancellations</li>
                                        <li>• Political situations and permit issues</li>
                                        <li>• Individual health conditions and reactions</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* Service Modifications */}
                        <div className="bg-white rounded-sm border border-gray-200 p-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">Service Modifications</h2>
                            <div className="space-y-6">
                                <p className="text-gray-600">
                                    Real Himalaya reserves the right to modify itineraries, accommodation, and services
                                    due to circumstances beyond our control, including but not limited to:
                                </p>
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div className="bg-gray-100 p-4 rounded-sm">
                                        <h4 className="font-semibold text-gray-800 mb-2">Weather Conditions</h4>
                                        <p className="text-sm text-gray-700">
                                            Extreme weather may require route changes or delays for safety
                                        </p>
                                    </div>
                                    <div className="bg-gray-100 p-4 rounded-sm">
                                        <h4 className="font-semibold text-gray-800 mb-2">Government Regulations</h4>
                                        <p className="text-sm text-gray-700">
                                            Changes in permits, regulations, or restricted areas
                                        </p>
                                    </div>
                                    <div className="bg-gray-100 p-4 rounded-sm">
                                        <h4 className="font-semibold text-gray-800 mb-2">Force Majeure</h4>
                                        <p className="text-sm text-gray-700">
                                            Natural disasters, political unrest, or other unforeseeable events
                                        </p>
                                    </div>
                                    <div className="bg-gray-100 p-4 rounded-sm">
                                        <h4 className="font-semibold text-gray-800 mb-2">Safety Concerns</h4>
                                        <p className="text-sm text-gray-700">
                                            Any situation that may compromise participant safety
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Participant Responsibilities */}
                        <div className="bg-white rounded-sm border border-gray-200 p-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">Participant Responsibilities</h2>
                            <div className="space-y-4">
                                <div className="border-l-4 border-gray-500 pl-4">
                                    <h3 className="font-semibold text-gray-900 mb-2">Physical Preparation</h3>
                                    <p className="text-gray-600">
                                        Maintain appropriate fitness levels and undergo medical checkups before departure
                                    </p>
                                </div>
                                <div className="border-l-4 border-gray-500 pl-4">
                                    <h3 className="font-semibold text-gray-900 mb-2">Equipment</h3>
                                    <p className="text-gray-600">
                                        Bring proper gear as specified in our equipment list
                                    </p>
                                </div>
                                <div className="border-l-4 border-gray-500 pl-4">
                                    <h3 className="font-semibold text-gray-900 mb-2">Conduct</h3>
                                    <p className="text-gray-600">
                                        Respect local customs, environment, and follow all guide instructions
                                    </p>
                                </div>
                                <div className="border-l-4 border-gray-500 pl-4">
                                    <h3 className="font-semibold text-gray-900 mb-2">Documentation</h3>
                                    <p className="text-gray-600">
                                        Ensure valid passport, visas, and permits are obtained before travel
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Contact Information */}
                        <div className="bg-gray-800 text-white rounded-sm p-8">
                            <h2 className="text-2xl font-bold mb-6">Questions About These Terms?</h2>
                            <p className="mb-6 text-gray-300">
                                If you have any questions about these Terms and Conditions, please contact us:
                            </p>
                            <div className="grid md:grid-cols-3 gap-6">
                                <div className="flex items-center gap-3">
                                    <Phone className="w-5 h-5 text-gray-400" />
                                    <div>
                                        <div className="font-semibold">Phone</div>
                                        <div className="text-sm text-gray-400">+977-XXXX-XXXXXX</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Mail className="w-5 h-5 text-gray-400" />
                                    <div>
                                        <div className="font-semibold">Email</div>
                                        <div className="text-sm text-gray-400">info@realhimalaya.com</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <MapPin className="w-5 h-5 text-gray-400" />
                                    <div>
                                        <div className="font-semibold">Address</div>
                                        <div className="text-sm text-gray-400">Kathmandu, Nepal</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>
        </div>
    )
}
