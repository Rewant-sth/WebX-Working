"use client"
import { useRouter } from "next/navigation";

const TermsOfService = () => {

    const router = useRouter()

    const handleGoBack = () => {
        router.back()
    }


    return (
        <div className="min-h-screen  py-8 max-w-7xl mx-auto p-6">
            <button className="border px-6 py-1.5 mb-6 rounded-sm" onClick={handleGoBack}>Go Back</button>
            <div className="bg-zinc-100 sm:p-6 rounded-sm">
                {/* Header */}
                <div className=" rounded-sm   mb-4">
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


                    {/* Main Content */}
                    <div className="">
                        <div className=" rounded-sm">
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
                                    Legal Terms. <strong>IF YOU DO NOT AGREE WITH ALL OF THESE LEGAL TERMS, THEN WE WILL NOT BE RESPONSIBLE FOR ANY DAMAGES OR LOSSES RESULTING FROM YOUR USE OF THE SERVICES.</strong>
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
                        <div className="mt-4  rounded-sm text-center">
                            <p className="text-gray-700 mb-4">By using our services, you acknowledge that you have read and agree to these Terms of Service.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TermsOfService;