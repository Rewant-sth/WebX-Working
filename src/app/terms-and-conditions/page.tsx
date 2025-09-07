"use client";
import { useState } from 'react';

const TermsOfService = () => {
    const [activeSection, setActiveSection] = useState('agreement');

    const sections = [
        { id: 'agreement', title: 'Agreement' },
        { id: 'services', title: 'Our Services' },
        { id: 'ip', title: 'Intellectual Property' },
        { id: 'userreps', title: 'User Representations' },
        { id: 'purchases', title: 'Purchases' },
        { id: 'prohibited', title: 'Prohibited Activities' },
        { id: 'ugc', title: 'User Content' },
        { id: 'copyright', title: 'Copyright' },
        { id: 'terms', title: 'Term & Termination' },
        { id: 'liability', title: 'Liability' },
        { id: 'contact', title: 'Contact' },
    ];

    const scrollToSection = (sectionId: string) => {
        setActiveSection(sectionId);
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-7xl mx-auto px-4">
                {/* Header */}
                <div className="bg-white rounded-sm  p-6 mb-4">
                    <div className="flex flex-col md:flex-row  justify-between">
                        <div>
                            <h1 className="text-3xl md:text-4xl font-bold text-gray-800">Terms of Service</h1>
                            <p className="text-gray-600 mt-2">Last updated: September 05, 2025</p>
                        </div>
                        <div className="mt-4 md:mt-0">
                            <img src="/logo/main.svg" alt="real himalaya logo" className=' w-28' />
                        </div>
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row gap-4">
                    {/* Sidebar Navigation */}
                    <div className="lg:w-1/4">
                        <div className="bg-white rounded-sm  p-5 sticky top-6">
                            <h2 className="text-lg font-semibold text-gray-800 mb-4">Table of Contents</h2>
                            <ul className="space-y-2">
                                {sections.map((section) => (
                                    <li key={section.id}>
                                        <button
                                            onClick={() => scrollToSection(section.id)}
                                            className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${activeSection === section.id
                                                ? 'bg-blue-100 text-blue-700 font-medium'
                                                : 'text-gray-600 hover:bg-gray-100'
                                                }`}
                                        >
                                            {section.title}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="lg:w-3/4">
                        <div className="bg-white rounded-sm  p-6 md:p-8">
                            {/* Agreement Section */}
                            <section id="agreement" className="mb-10 scroll-mt-20">
                                <h2 className="text-2xl font-bold text-gray-800 mb-4">1. AGREEMENT TO OUR LEGAL TERMS</h2>
                                <p className="text-gray-700 mb-4">
                                    We are <span className="font-semibold">REAL Himalaya Pvt. Ltd.</span> ("Company," "we," "us," "our").
                                    We operate the website <a href="https://realhimalaya.webxnepal.com" className="text-blue-600 hover:underline">https://realhimalaya.webxnepal.com</a>
                                    (the "Site"), as well as any other related products and services that refer or link to these legal terms
                                    (the "Legal Terms") (collectively, the "Services").
                                </p>
                                <p className="text-gray-700 mb-4">
                                    You can contact us by email at <span className="font-semibold">info@realhimalaya.com</span> or by mail to
                                    <span className="font-semibold"> kathmandu, Nepal, kathmandu, Bagmati 44600, Nepal</span>.
                                </p>
                                <p className="text-gray-700 mb-4">
                                    These Legal Terms constitute a legally binding agreement made between you, whether personally or on behalf
                                    of an entity ("you"), and REAL Himalaya Pvt. Ltd., concerning your access to and use of the Services.
                                    You agree that by accessing the Services, you have read, understood, and agreed to be bound by all of these
                                    Legal Terms. IF YOU DO NOT AGREE WITH ALL OF THESE LEGAL TERMS, THEN YOU ARE EXPRESSLY PROHIBITED FROM USING
                                    THE SERVICES AND YOU MUST DISCONTINUE USE IMMEDIATELY.
                                </p>
                            </section>

                            {/* Our Services Section */}
                            <section id="services" className="mb-10 scroll-mt-20">
                                <h2 className="text-2xl font-bold text-gray-800 mb-4">2. OUR SERVICES</h2>
                                <p className="text-gray-700">
                                    The information provided when using the Services is not intended for distribution to or use by any person
                                    or entity in any jurisdiction or country where such distribution or use would be contrary to law or regulation
                                    or which would subject us to any registration requirement within such jurisdiction or country. Accordingly,
                                    those persons who choose to access the Services from other locations do so on their own initiative and are
                                    solely responsible for compliance with local laws, if and to the extent local laws are applicable.
                                </p>
                            </section>

                            {/* Intellectual Property Section */}
                            <section id="ip" className="mb-10 scroll-mt-20">
                                <h2 className="text-2xl font-bold text-gray-800 mb-4">3. INTELLECTUAL PROPERTY RIGHTS</h2>
                                <h3 className="text-xl font-semibold text-gray-800 mb-3">Our intellectual property</h3>
                                <p className="text-gray-700 mb-4">
                                    We are the owner or the licensee of all intellectual property rights in our Services, including all source
                                    code, databases, functionality, software, website designs, audio, video, text, photographs, and graphics
                                    in the Services (collectively, the "Content"), as well as the trademarks, service marks, and logos contained
                                    therein (the "Marks").
                                </p>
                                <h3 className="text-xl font-semibold text-gray-800 mb-3">Your use of our Services</h3>
                                <p className="text-gray-700 mb-4">
                                    Subject to your compliance with these Legal Terms, we grant you a non-exclusive, non-transferable, revocable
                                    license to:
                                </p>
                                <ul className="list-disc pl-5 text-gray-700 mb-4 space-y-2">
                                    <li>Access the Services</li>
                                    <li>Download or print a copy of any portion of the Content to which you have properly gained access</li>
                                </ul>
                                <p className="text-gray-700">
                                    solely for your personal, non-commercial use.
                                </p>
                            </section>

                            {/* Additional sections would follow the same pattern */}

                            {/* Contact Section */}
                            <section id="contact" className="scroll-mt-20">
                                <h2 className="text-2xl font-bold text-gray-800 mb-4">3. CONTACT US</h2>
                                <p className="text-gray-700 mb-4">
                                    In order to resolve a complaint regarding the Services or to receive further information regarding use of
                                    the Services, please contact us at:
                                </p>
                                <div className="bg-gray-100 p-4 rounded-lg">
                                    <p className="font-semibold">REAL Himalaya Pvt. Ltd.</p>
                                    <p>kathmandu, Nepal</p>
                                    <p>kathmandu, Bagmati 44600</p>
                                    <p>Nepal</p>
                                    <p className="mt-2">Email: info@realhimalaya.com</p>
                                </div>
                            </section>
                        </div>

                        {/* Acceptance Footer */}
                        <div className="mt-4 bg-white rounded-sm  p-6 text-center">
                            <p className="text-gray-700 mb-4">By using our services, you acknowledge that you have read and agree to these Terms of Service.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TermsOfService;