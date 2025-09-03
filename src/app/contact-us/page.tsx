"use client"
import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, cubicBezier } from 'framer-motion';
import {
  Mail,
  Phone,
  MapPin,
  Send,
  User,
  MessageSquare,
  Building,
  ArrowRight,
  Sparkles,
  CheckCircle,
  Headset,
  Clock10,
  Footprints,
  DollarSign
} from 'lucide-react';
import { FaSmile } from 'react-icons/fa';
import TitleDesc from '@/components/titleDesc/TitleDesc';
import { useMutation } from '@tanstack/react-query';
import { sendContact } from '@/service/contact';
import toast from 'react-hot-toast';
import Link from 'next/link';

const contactMethods = [
  {
    icon: Mail,
    title: "Email Us",
    description: "Get in touch via email",
    value: "high5adv@gmail.com",
    link: "mailto:high5adv@gmail.com",
    gradient: "from-white/20 to-cyan-500/20",
    hoverColor: "blue"
  },
  {
    icon: Phone,
    title: "Call Us",
    description: "Speak directly with our team",
    value: "+977-9851279322",
    link: "tel:+977-9851279322",
    gradient: "from-green-500/20 to-emerald-500/20",
    hoverColor: "green"
  },
  {
    icon: MapPin,
    title: "Location",
    description: "Our Office",
    value: "Kathmandu, Nepal",
    link: "https://maps.app.goo.gl/p3Fv65ePTBNcYdVM6",
    gradient: "from-purple-500/20 to-pink-500/20",
    hoverColor: "purple"
  }
];

const companyStats = [
  { label: "24 Hrs", value: "Customer Support", icon: Headset },
  { label: "48 Hrs", value: "Response Time", icon: Clock10 },
  { label: "Multiple", value: "Locations", icon: MapPin },
  { label: "500+", value: "Happy Clients", icon: FaSmile },
];

export default function PremiumContact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    number: '',
    goal: '',
    company: "",
    budget: ""
  });

  // State for checkboxes
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);
  const [selectedBudget, setSelectedBudget] = useState<string>('');

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleGoalChange = (goal: string) => {
    setSelectedGoals(prev => {
      if (prev.includes(goal)) {
        return prev.filter(g => g !== goal);
      } else {
        return [...prev, goal];
      }
    });
  };

  const handleBudgetChange = (budget: string) => {
    setSelectedBudget(prevBudget => prevBudget === budget ? '' : budget);
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
      budget: selectedBudget
    };

    fnContact(submitData);
  };





  return (
    <section className="relative   overflow-hidden">
      <div className="absolute  inset-0 brightness-75 h-full w-full flex justify-end">
        <img src="/jhungekoketi.png" alt="img" className='h-full  object-contain' />
      </div>

      <motion.div
        ref={containerRef}
        className=" z-10 relative my-10 sm:my-24 mx-auto "

      >

        <div className="grid grid-cols-3 gap-6  mx-auto  space-y-12 md:space-y-28 ">

          {/* Contact Form */}
          <motion.div
            className="space-y-8 col-span-2 w-full   rounded-sm text-[#01283F p-6"
          >
            <div className=' pb-6 '>
              <h3 className="text-3xl lg:text-4xl font-bold  mb-4 uppercase"><span className='bg-orange-500 px-3 inline-flex  leading-9 pb-1 w-fit text-white'>Start</span> your himalayan <br />adventure <span className='bg-orange-500 px-3 inline-flex  leading-9 pb-1 w-fit text-white'>today</span> with Real Himalaya</h3>
              <p className=" text-lg">
                Tell us about your project and we'll get back to you within 24 hours.
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
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="relative">
                      <div className="relative  rounded-sm overflow-hidden">
                        <input
                          type="text"
                          placeholder="Your Name"
                          value={formData.name}
                          onChange={(e) => handleInputChange('name', e.target.value)}
                          className={`w-full  py-4  border-b border-gray-300    focus:outline-none focus:border-gray-400 transition-all ${errors.name ? 'border-red-400' : ''
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

                    <div className="relative">
                      <div className="relative  rounded-sm overflow-hidden">

                        <input
                          type="email"
                          placeholder="Email Address"
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          className={`w-full  py-4  border-b border-gray-300    focus:outline-none focus:border-gray-400 transition-all ${errors.name ? 'border-red-400' : ''
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
                    <div className="relative">
                      <div className="relative  rounded-sm overflow-hidden">
                        <input
                          type="tel"
                          placeholder="Phone number"
                          value={formData.number}
                          onChange={(e) => handleInputChange('number', e.target.value)}
                          className={`w-full  py-4  border-b border-gray-300    focus:outline-none focus:border-gray-400 transition-all ${errors.name ? 'border-red-400' : ''
                            }`}
                        />
                      </div>
                      {errors.phone && (
                        <motion.p
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-red-400 text-sm mt-2"
                        >
                          {errors.email}
                        </motion.p>
                      )}
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2  gap-6">
                    <div className="relative  rounded-sm overflow-hidden">
                      <h2 className='text-xl font-semibold mb-6'>Your Goal</h2>
                      <div className="flex gap-3 items-center flex-wrap">
                        <div className="flex gap-2 text-lg">
                          <label className="container">
                            <input
                              type="checkbox"
                              checked={selectedGoals.includes('Peak Climbing')}
                              onChange={() => handleGoalChange('Peak Climbing')}
                            />
                            <div className="checkmark"></div>
                          </label>
                          <label htmlFor="" className='shrink-0'>Peak Climbing</label>
                        </div>

                        <div className="flex gap-2 text-lg">
                          <label className="container">
                            <input
                              type="checkbox"
                              checked={selectedGoals.includes('Trekking')}
                              onChange={() => handleGoalChange('Trekking')}
                            />
                            <div className="checkmark"></div>
                          </label>
                          <label htmlFor="" className='shrink-0'>Trekking</label>
                        </div>

                        <div className="flex gap-2 text-lg">
                          <label className="container">
                            <input
                              type="checkbox"
                              checked={selectedGoals.includes('City Tour')}
                              onChange={() => handleGoalChange('City Tour')}
                            />
                            <div className="checkmark"></div>
                          </label>
                          <label htmlFor="" className='shrink-0'>City Tour</label>
                        </div>

                        <div className="flex gap-2 text-lg">
                          <label className="container">
                            <input
                              type="checkbox"
                              checked={selectedGoals.includes('Others')}
                              onChange={() => handleGoalChange('Others')}
                            />
                            <div className="checkmark"></div>
                          </label>
                          <label htmlFor="" className='shrink-0'>Others</label>
                        </div>
                      </div>
                    </div>

                    {/* <div className="relative  rounded-sm overflow-hidden">
                      <h2 className='text-xl font-semibold mb-6'>Your Budget</h2>
                      <div className="flex gap-3 items-center flex-wrap">
                        <div className="flex gap-2 text-lg">
                          <label className="container">
                            <input
                              type="checkbox"
                              checked={selectedBudget === 'Above $25,000'}
                              onChange={() => handleBudgetChange('Above $25,000')}
                            />
                            <div className="checkmark"></div>
                          </label>
                          <label htmlFor="" className='shrink-0'>Above $25,000</label>
                        </div>

                        <div className="flex gap-2 text-lg">
                          <label className="container">
                            <input
                              type="checkbox"
                              checked={selectedBudget === 'Above $50,000'}
                              onChange={() => handleBudgetChange('Above $50,000')}
                            />
                            <div className="checkmark"></div>
                          </label>
                          <label htmlFor="" className='shrink-0'>Above $50,000</label>
                        </div>

                        <div className="flex gap-2 text-lg">
                          <label className="container">
                            <input
                              type="checkbox"
                              checked={selectedBudget === 'Above $75,000'}
                              onChange={() => handleBudgetChange('Above $75,000')}
                            />
                            <div className="checkmark"></div>
                          </label>
                          <label htmlFor="" className='shrink-0'>Above $75,000</label>
                        </div>

                        <div className="flex gap-2 text-lg">
                          <label className="container">
                            <input
                              type="checkbox"
                              checked={selectedBudget === 'Above $100,000'}
                              onChange={() => handleBudgetChange('Above $100,000')}
                            />
                            <div className="checkmark"></div>
                          </label>
                          <label htmlFor="" className='shrink-0'>Above $100,000</label>
                        </div>
                      </div>
                    </div> */}
                  </div>

                  <div className="relative ">

                    <div className="relative  rounded-sm overflow-hidden">
                      <textarea
                        placeholder="Tell us about your enquiry..."
                        rows={5}
                        value={formData.message}
                        minLength={20}
                        onChange={(e) => handleInputChange('message', e.target.value)}
                        className={`w-full  py-4  border-b border-gray-300    focus:outline-none focus:border-gray-400 transition-all ${errors.name ? 'border-red-400' : ''
                          }`}
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
                      disabled={isPending}
                      className="w-fit  relative group border overflow-hidden bg-gradient-to-r  from-white to-white hover:from-white hover:to-white  font-medium py-4 px-6 rounded-sm transition-all disabled:opacity-50"
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
                            <Send className="h-5 w-5" />
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
                  className="text-center py-12"
                >
                  <motion.div
                    className="w-20 h-20 rounded-full bg-green-500/20 border border-green-400/30 flex items-center justify-center mx-auto mb-6"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  >
                    <CheckCircle className="w-10 h-10 text-green-400" />
                  </motion.div>
                  <h3 className="text-2xl font-bold  mb-4">Message Sent!</h3>
                  <p className="/60 text-lg mb-6">
                    Thank you for reaching out. We'll get back to you within 24 hours.
                  </p>
                  <motion.button
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormData({ name: '', email: '', number: '', message: '', goal: '', company: '', budget: '' });
                      setSelectedGoals([]);
                      setSelectedBudget('');
                    }}
                    className="px-6 py-3 bg-white/[0.08] border border-black/[0.15] rounded-sm  hover:bg-white/[0.12] transition-all"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Send Another Message
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>


        </div>


      </motion.div>
    </section>
  );
}
