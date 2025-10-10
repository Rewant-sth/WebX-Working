"use client"
import React, { useState, useRef } from 'react';
import Select, { SingleValue, StylesConfig } from 'react-select';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ArrowRight,
    CheckCircle,
    X,
} from 'lucide-react';
import { useMutation } from '@tanstack/react-query';
import { sendContact } from '@/service/contact';
import toast from 'react-hot-toast';

export default function ContactModal({ packageName = "Real Himalaya Package", onClose }: { packageName: string, onClose?: () => void }) {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
        number: '',
        goal: '',
        company: "",
        budget: "",
        country: ""
    });

    // State for checkboxes
    const [selectedGoals, setSelectedGoals] = useState<string[]>([]);
    const [selectedBudget, setSelectedBudget] = useState<string>('');
    const [selectedCountry, setSelectedCountry] = useState<CountryOption | null>(null);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isSubmitted, setIsSubmitted] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const handleInputChange = (field: string, value: string, event: React.ChangeEvent<HTMLInputElement>) => {
        if (!event.isTrusted) {
            return;
        }
        setFormData(prev => ({ ...prev, [field]: value }));
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: '' }));
        }
    };


    const { mutate: fnContact, isPending } = useMutation({
        mutationKey: ['contact us'],
        mutationFn: sendContact,
        onSuccess: () => { toast.success("Success"); setIsSubmitted(true) },
        onError: (error: any) => (
            toast.error(error?.data?.response?.message || "Message not sent. Please try again")
        )
    })

    const validateForm = () => {
        const newErrors: Record<string, string> = {};

        if (!formData.name.trim()) {
            newErrors.name = 'Name is required';
        }

        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email';
        }

        if (!formData.message.trim()) {
            newErrors.message = 'Message is required';
        } else if (formData.message.trim().length < 10) {
            newErrors.message = 'Message must be at least 10 characters';
        }

        if (!formData.number.trim()) {
            newErrors.number = 'Phone Number is required';
        } else if (formData.number.trim().length > 17 || formData.number.trim().length <= 4) {
            newErrors.number = 'Invalid phone number';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateForm()) return;

        const submitData = {
            ...formData,
            goal: selectedGoals.join(', '),
            budget: selectedBudget,
            country: selectedCountry?.label || formData.country || ''
        };

        fnContact(submitData);
    };





    return (
        <section className="absolute z-[999999]  backdrop-blur-md inset-0 h-full bg-black/40   min-h-screen w-full lg:flex justify-center items-center ">
            <div className="w-full h-full  relative">

                <div className="lg:sticky top-4 lg:top-8 relative   w-full  ">

                    <div
                        ref={containerRef}
                        className=" z-10 border w-full bg-white max-w-3xl border-gray-300 rounded-xl relative my-10 mt-20 sm:my-24 mx-auto p-2 md:p-4 lg:p-6 "
                    >
                        <div className="flex w-full justify-end items-center">
                            <button onClick={onClose} className=" ">
                                <X />
                            </button>
                        </div>
                        <div className=" gap-6  mx-auto  space-y-12 md:space-y-28 ">

                            {/* Contact Form */}
                            <div
                                className="space-y-8 col-span-2 w-full   rounded-sm  p-4 md:p-6"
                            >
                                <div className=' pb-6 '>
                                    <h3 className="text-2xl  font-bold  mb-2 uppercase">Your enquiry about <span className="text-orange-500">{packageName}</span>
                                    </h3>
                                    <p className=" text-lg">
                                        Tell us about your enquiry and we'll get back to you within 24 hours.
                                    </p>
                                </div>

                                <AnimatePresence >
                                    {!isSubmitted ? (
                                        <motion.form
                                            key="form"
                                            onSubmit={handleSubmit}
                                            className="space-y-6"
                                            initial={{ opacity: 1 }}
                                            exit={{ opacity: 0, y: -20 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <div className="grid grid-cols-1 md:grid-cols-2  gap-6">
                                                <div title='Your Name' aria-label='Your Name' className="relative">
                                                    <label htmlFor="name-input" className="block text-sm font-medium mb-2">
                                                        Your Name
                                                    </label>
                                                    <div className="relative  rounded-sm overflow-hidden">
                                                        <input
                                                            id="name-input"
                                                            type="text"
                                                            placeholder="Your Name"
                                                            value={formData.name}
                                                            onChange={(e) => handleInputChange('name', e.target.value, e)}
                                                            className={`w-full px-3 py-2 focus:border-orange-500 border border-[#01283F] rounded-sm focus:outline-none transition-all ${errors.name ? 'border-red-400' : ''
                                                                }`}
                                                        />
                                                    </div>
                                                    {errors.name && (
                                                        <motion.p
                                                            initial={{ opacity: 0, y: -10 }}
                                                            animate={{ opacity: 1, y: 0 }}
                                                            className="text-red-400 text-sm mt-2"
                                                        >
                                                            {errors.name}
                                                        </motion.p>
                                                    )}
                                                </div>

                                                <div title='Your Email' aria-label='Your Email' className="relative">
                                                    <label htmlFor="email-input" className="block text-sm font-medium mb-2">
                                                        Email Address
                                                    </label>
                                                    <div className="relative  rounded-sm overflow-hidden">

                                                        <input
                                                            id="email-input"
                                                            type="email"
                                                            placeholder="Email Address"
                                                            value={formData.email}
                                                            onChange={(e) => handleInputChange('email', e.target.value, e)}
                                                            className={`w-full px-3 py-2 focus:border-orange-500 border border-[#01283F] rounded-sm focus:outline-none transition-all ${errors.email ? 'border-red-400' : ''
                                                                }`}
                                                        />
                                                    </div>
                                                    {errors.email && (
                                                        <motion.p
                                                            initial={{ opacity: 0, y: -10 }}
                                                            animate={{ opacity: 1, y: 0 }}
                                                            className="text-red-400 text-sm mt-2"
                                                        >
                                                            {errors.email}
                                                        </motion.p>
                                                    )}
                                                </div>

                                                <div title='Your Phone Number' aria-label='Your Phone Number' className="relative">
                                                    <label htmlFor="phone-input" className="block text-sm font-medium mb-2">
                                                        Phone Number
                                                    </label>
                                                    <div className="relative  rounded-sm overflow-hidden">
                                                        <input
                                                            id="phone-input"
                                                            type="tel"
                                                            placeholder="Phone number"
                                                            value={formData.number}
                                                            onChange={(e) => handleInputChange('number', e.target.value, e)}
                                                            className={`w-full px-3 py-2 focus:border-orange-500 border border-[#01283F] rounded-sm focus:outline-none transition-all ${errors.number ? 'border-red-400' : ''
                                                                }`}
                                                        />
                                                    </div>
                                                    {errors.number && (
                                                        <motion.p
                                                            initial={{ opacity: 0, y: -10 }}
                                                            animate={{ opacity: 1, y: 0 }}
                                                            className="text-red-400 text-sm mt-2"
                                                        >
                                                            {errors.number}
                                                        </motion.p>
                                                    )}
                                                </div>

                                                {/* select country */}
                                                <div className="relative">
                                                    <label htmlFor="country-select" className="block text-sm font-medium mb-2">
                                                        Country
                                                    </label>
                                                    <Select
                                                        instanceId="country-select"
                                                        placeholder="Select country"
                                                        options={countryOptions}
                                                        value={selectedCountry}
                                                        isClearable
                                                        isSearchable
                                                        onChange={(opt: SingleValue<CountryOption>) => {
                                                            setSelectedCountry(opt ?? null);
                                                            setFormData(prev => ({ ...prev, country: opt?.value || '' }));
                                                            if (errors.country) {
                                                                setErrors(prev => ({ ...prev, country: '' }));
                                                            }
                                                        }}
                                                        styles={reactSelectStyles}
                                                        classNamePrefix="rh-country"
                                                    />
                                                    {errors.country && (
                                                        <motion.p
                                                            initial={{ opacity: 0, y: -10 }}
                                                            animate={{ opacity: 1, y: 0 }}
                                                            className="text-red-400 text-sm mt-2"
                                                        >
                                                            {errors.country}
                                                        </motion.p>
                                                    )}
                                                </div>
                                            </div>



                                            <div title='Your Message' aria-label='Your Message' className="relative ">
                                                <label htmlFor="message-input" className="block text-sm font-medium mb-2">
                                                    Your Message
                                                </label>
                                                <div className="relative  rounded-sm overflow-hidden">
                                                    <textarea
                                                        id="message-input"
                                                        placeholder="Tell us about your enquiry..."
                                                        rows={5}
                                                        value={formData.message}
                                                        minLength={20}
                                                        onChange={(e) => {
                                                            handleInputChange('message', e.target.value, e as any);
                                                            // Auto-resize textarea
                                                            e.target.style.height = 'auto';
                                                            e.target.style.height = Math.max(e.target.scrollHeight, 120) + 'px'; // 120px ≈ 5 rows
                                                        }}
                                                        className={`w-full px-3 py-2 active:border-orange-500 border border-[#01283F] rounded-sm focus:outline-none transition-all resize-none overflow-hidden ${errors.message ? 'border-red-400' : ''
                                                            }`}
                                                        style={{ minHeight: '120px' }}
                                                    />
                                                </div>
                                                {errors.message && (
                                                    <motion.p
                                                        initial={{ opacity: 0, y: -10 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        className="text-red-400 text-sm mt-2"
                                                    >
                                                        {errors.message}
                                                    </motion.p>
                                                )}
                                            </div>

                                            <div className="flex justify-end text-[#01283F]">
                                                <motion.button
                                                    type="submit"
                                                    title='Send Message'
                                                    aria-label='Send Message'
                                                    disabled={isPending}
                                                    className="w-fit  bg-white sm:bg-transparent relative group sm:border overflow-hidden   font-medium py-2 px-6 rounded-sm transition-all disabled:opacity-50"
                                                    whileHover={{ scale: 1.02 }}
                                                    whileTap={{ scale: 0.98 }}
                                                >
                                                    <motion.div
                                                        className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
                                                        initial={{ x: "-100%" }}
                                                        whileHover={{ x: "100%" }}
                                                        transition={{ duration: 0.5 }}
                                                    />
                                                    <span className="relative flex items-center justify-center gap-2">
                                                        {isPending ? (
                                                            <motion.div
                                                                className="w-5 h-5  border-2 /30 border-t-white rounded-full"
                                                                animate={{ rotate: 360 }}
                                                                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                                            />
                                                        ) : (
                                                            <>
                                                                Send Message
                                                                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                                            </>
                                                        )}
                                                    </span>
                                                </motion.button>
                                            </div>
                                        </motion.form>
                                    ) : (
                                        <motion.div
                                            key="success"
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="text- py-8 rounded-sm w-full max-w-xl text-center"
                                        >
                                            <motion.div
                                                className="w-20 h-20 rounded-full bg-green-500/20 border border-green-400/30 mx-auto flex items-center justify-center  mb-6"
                                                initial={{ scale: 0 }}
                                                animate={{ scale: 1 }}
                                                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                                            >
                                                <CheckCircle className="w-10 h-10 text-green-500" />
                                            </motion.div>
                                            <h3 className="text-2xl font-bold  mb-4">Enquiry Received</h3>
                                            <p className="/60 text-lg mb-6">
                                                Thank you for reaching out. We'll get back to you within 24 hours.
                                            </p>
                                            <motion.button
                                                onClick={() => {
                                                    setIsSubmitted(false);
                                                    setFormData({ name: '', email: '', number: '', message: '', goal: '', company: '', budget: '', country: '' });
                                                    setSelectedGoals([]);
                                                    setSelectedBudget('');
                                                    setSelectedCountry(null);
                                                }}
                                                className="px-6 py-2  border border-black/[0.15] rounded-sm bg-orange-500 text-white  hover:bg-white/[0.12] transition-all"
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                            >
                                                Close
                                            </motion.button>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </section >
    );
}

// Types and data for react-select (countries)
type CountryOption = { value: string; label: string };

const countryOptions: CountryOption[] = [
    { value: 'AF', label: 'Afghanistan' },
    { value: 'AL', label: 'Albania' },
    { value: 'DZ', label: 'Algeria' },
    { value: 'AS', label: 'American Samoa' },
    { value: 'AD', label: 'Andorra' },
    { value: 'AO', label: 'Angola' },
    { value: 'AR', label: 'Argentina' },
    { value: 'AM', label: 'Armenia' },
    { value: 'AU', label: 'Australia' },
    { value: 'AT', label: 'Austria' },
    { value: 'AZ', label: 'Azerbaijan' },
    { value: 'BD', label: 'Bangladesh' },
    { value: 'BY', label: 'Belarus' },
    { value: 'BE', label: 'Belgium' },
    { value: 'BT', label: 'Bhutan' },
    { value: 'BO', label: 'Bolivia' },
    { value: 'BA', label: 'Bosnia and Herzegovina' },
    { value: 'BR', label: 'Brazil' },
    { value: 'BG', label: 'Bulgaria' },
    { value: 'KH', label: 'Cambodia' },
    { value: 'CA', label: 'Canada' },
    { value: 'CL', label: 'Chile' },
    { value: 'CN', label: 'China' },
    { value: 'CO', label: 'Colombia' },
    { value: 'CR', label: 'Costa Rica' },
    { value: 'HR', label: 'Croatia' },
    { value: 'CU', label: 'Cuba' },
    { value: 'CY', label: 'Cyprus' },
    { value: 'CZ', label: 'Czechia' },
    { value: 'DK', label: 'Denmark' },
    { value: 'DO', label: 'Dominican Republic' },
    { value: 'EC', label: 'Ecuador' },
    { value: 'EG', label: 'Egypt' },
    { value: 'SV', label: 'El Salvador' },
    { value: 'EE', label: 'Estonia' },
    { value: 'ET', label: 'Ethiopia' },
    { value: 'FI', label: 'Finland' },
    { value: 'FR', label: 'France' },
    { value: 'GE', label: 'Georgia' },
    { value: 'DE', label: 'Germany' },
    { value: 'GH', label: 'Ghana' },
    { value: 'GR', label: 'Greece' },
    { value: 'HK', label: 'Hong Kong' },
    { value: 'HU', label: 'Hungary' },
    { value: 'IS', label: 'Iceland' },
    { value: 'IN', label: 'India' },
    { value: 'ID', label: 'Indonesia' },
    { value: 'IR', label: 'Iran' },
    { value: 'IQ', label: 'Iraq' },
    { value: 'IE', label: 'Ireland' },
    { value: 'IL', label: 'Israel' },
    { value: 'IT', label: 'Italy' },
    { value: 'JP', label: 'Japan' },
    { value: 'JO', label: 'Jordan' },
    { value: 'KZ', label: 'Kazakhstan' },
    { value: 'KE', label: 'Kenya' },
    { value: 'KW', label: 'Kuwait' },
    { value: 'LA', label: 'Laos' },
    { value: 'LV', label: 'Latvia' },
    { value: 'LB', label: 'Lebanon' },
    { value: 'LT', label: 'Lithuania' },
    { value: 'LU', label: 'Luxembourg' },
    { value: 'MY', label: 'Malaysia' },
    { value: 'MV', label: 'Maldives' },
    { value: 'MT', label: 'Malta' },
    { value: 'MX', label: 'Mexico' },
    { value: 'MD', label: 'Moldova' },
    { value: 'MC', label: 'Monaco' },
    { value: 'MN', label: 'Mongolia' },
    { value: 'MA', label: 'Morocco' },
    { value: 'MM', label: 'Myanmar' },
    { value: 'NP', label: 'Nepal' },
    { value: 'NL', label: 'Netherlands' },
    { value: 'NZ', label: 'New Zealand' },
    { value: 'NG', label: 'Nigeria' },
    { value: 'NO', label: 'Norway' },
    { value: 'OM', label: 'Oman' },
    { value: 'PK', label: 'Pakistan' },
    { value: 'PA', label: 'Panama' },
    { value: 'PE', label: 'Peru' },
    { value: 'PH', label: 'Philippines' },
    { value: 'PL', label: 'Poland' },
    { value: 'PT', label: 'Portugal' },
    { value: 'QA', label: 'Qatar' },
    { value: 'RO', label: 'Romania' },
    { value: 'RU', label: 'Russia' },
    { value: 'SA', label: 'Saudi Arabia' },
    { value: 'RS', label: 'Serbia' },
    { value: 'SG', label: 'Singapore' },
    { value: 'SK', label: 'Slovakia' },
    { value: 'SI', label: 'Slovenia' },
    { value: 'ZA', label: 'South Africa' },
    { value: 'KR', label: 'South Korea' },
    { value: 'ES', label: 'Spain' },
    { value: 'LK', label: 'Sri Lanka' },
    { value: 'SE', label: 'Sweden' },
    { value: 'CH', label: 'Switzerland' },
    { value: 'TW', label: 'Taiwan' },
    { value: 'TH', label: 'Thailand' },
    { value: 'TR', label: 'Türkiye' },
    { value: 'UA', label: 'Ukraine' },
    { value: 'AE', label: 'United Arab Emirates' },
    { value: 'GB', label: 'United Kingdom' },
    { value: 'US', label: 'United States' },
    { value: 'VN', label: 'Vietnam' }
];

// Minimal styles to better match the input aesthetic with full border
const reactSelectStyles: StylesConfig<CountryOption, false> = {
    control: (base, state) => ({
        ...base,
        border: `1px solid ${state.isFocused ? '#f97316' : '#01283F'}`,
        boxShadow: 'none',
        borderRadius: '0.125rem',
        paddingTop: '0.25rem',
        paddingBottom: '0.25rem'
    }),
    valueContainer: (base) => ({ ...base, paddingLeft: '0.75rem' }),
    indicatorsContainer: (base) => ({ ...base, paddingRight: '0.5rem' }),
    placeholder: (base) => ({ ...base, color: '#6b7280' })
};
