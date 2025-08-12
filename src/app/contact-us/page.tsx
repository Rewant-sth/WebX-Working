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
    gradient: "from-blue-500/20 to-cyan-500/20",
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

    fnContact(formData)
  };





  return (
    <section className="relative   overflow-hidden">
      {/* Enhanced Background Effects */}
      <TitleDesc title='Get in Touch With Us' desc='Ready to explore the world with us? Let’s connect and craft your perfect travel experience – your next adventure starts with a conversation.' />

      <motion.div
        ref={containerRef}
        className="relative z-10 my-10 sm:my-16 lg:px-20 mx-auto px-6"
      // variants={staggerContainer}
      // initial="hidden"
      // whileInView="visible"
      // viewport={{ once: true, margin: "-100px" }}
      >



        <div className="grid grid-cols-1 lg:grid-cols-2 max-w-[1500px] mx-auto  space-y-12 md:space-y-28 ">

          {/* Contact Methods */}
          <motion.div
            className="space-y-8  col-span-4"
          >
            <div className='text-center pb-6'>
              <h3 className="text-3xl lg:text-4xl font-bold  mb-4">You can reach us through</h3>
              <p className="text-lg">
                You can choose any method below according to your preference
              </p>
            </div>

            <div className=" grid  gap-4 md:gap-6 lg:gap-12 lg:grid-cols-3 ">
              {contactMethods.map((method, index) => (
                <Link
                  key={index}
                  href={method.link}
                  target='_blank'
                  className="block p-6 bg-white/[0.05] backdrop-blur-xl rounded-2xl border border-black/[0.15] hover:bg-white/[0.08] transition-all group"

                >
                  <div className="flex items-center gap-4 lg:gap-6">
                    <motion.div
                      className={`w-14 h-14 rounded-xl bg-gradient-to-br ${method.gradient} border border-white/20 flex items-center justify-center`}
                      whileHover={{ scale: 1.1, rotateY: 180 }}
                      transition={{ duration: 0.6 }}
                    >
                      <method.icon className="w-7 h-7 " />
                    </motion.div>
                    <div className="flex-1">
                      <h4 className="text-xl font-semibold  mb-1">{method.title}</h4>
                      {/* <p className="/60 text-sm mb-2">{method.description}</p> */}
                      <p className=" font-medium">{method.value}</p>
                    </div>
                    <ArrowRight className="w-5 h-5 /40 group-hover: group-hover:translate-x-1 transition-all" />
                  </div>
                </Link>
              ))}
            </div>

          </motion.div>

          {/* Contact Form */}
          <motion.div
            className="space-y-8 col-span-2 w-full  "
          >
            <div className='text-center pb-6 mx-auto'>
              <h3 className="text-3xl lg:text-4xl font-bold  mb-4">Send us a message</h3>
              <p className="/60 text-lg">
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
                      <div className="relative bg-blue-50 rounded-xl overflow-hidden">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 /40" />
                        <input
                          type="text"
                          placeholder="Your Name"
                          value={formData.name}
                          onChange={(e) => handleInputChange('name', e.target.value)}
                          className={`w-full pl-10 pr-4 py-4  border rounded-xl  placeholder-black/50 focus:outline-none focus:border-indigo-400 transition-all ${errors.name ? 'border-red-400' : 'border-black/[0.15]'
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
                      <div className="relative bg-blue-50 rounded-xl overflow-hidden">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 /40" />

                        <input
                          type="email"
                          placeholder="Email Address"
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          className={`w-full pl-10 pr-4 py-4 bg-white/[0.08] border rounded-xl  placeholder-black/50 focus:outline-none focus:border-indigo-400 transition-all ${errors.email ? 'border-red-400' : 'border-black/[0.15]'
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
                      <div className="relative bg-blue-50 rounded-xl overflow-hidden">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 /40" />
                        <input
                          type="tel"
                          placeholder="Phone number"
                          value={formData.number}
                          onChange={(e) => handleInputChange('number', e.target.value)}
                          className="w-full pl-10 pr-4 py-4 bg-white/[0.08] border border-black/[0.15] rounded-xl  placeholder-black/50 focus:outline-none focus:border-indigo-400 transition-all"
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

                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="relative bg-blue-50 rounded-xl overflow-hidden">
                      <Footprints className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 /40" />
                      <input
                        type="text"
                        placeholder="Goal (Peak climbing, etc..)"
                        value={formData.goal}
                        onChange={(e) => handleInputChange('goal', e.target.value)}
                        className="w-full pl-10 pr-4 py-4 bg-white/[0.08] border border-black/[0.15] rounded-xl  placeholder-black/50 focus:outline-none focus:border-indigo-400 transition-all"
                      />
                    </div>

                    <div className="relative bg-blue-50 rounded-xl overflow-hidden">
                      <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 /40" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path fill="currentColor" fillRule="evenodd" d="M9.111 4.663A2 2 0 1 1 6.89 1.337a2 2 0 0 1 2.222 3.326zm-.555-2.494A1 1 0 1 0 7.444 3.83a1 1 0 0 0 1.112-1.66zm2.61.03a1.494 1.494 0 0 1 1.895.188a1.513 1.513 0 0 1-.487 2.46a1.49 1.49 0 0 1-1.635-.326a1.512 1.512 0 0 1 .228-2.321zm.48 1.61a.499.499 0 1 0 .705-.708a.5.5 0 0 0-.351-.15a.5.5 0 0 0-.5.503a.5.5 0 0 0 .146.356zM3.19 12.487H5v1.005H3.19a1.2 1.2 0 0 1-.842-.357a1.2 1.2 0 0 1-.348-.85v-1.81a1 1 0 0 1-.71-.332A1 1 0 0 1 1 9.408V7.226c.003-.472.19-.923.52-1.258c.329-.331.774-.52 1.24-.523H4.6a2.9 2.9 0 0 0-.55 1.006H2.76a.8.8 0 0 0-.54.232a.78.78 0 0 0-.22.543v2.232h1v2.826a.2.2 0 0 0 .05.151a.24.24 0 0 0 .14.05zm7.3-6.518a1.77 1.77 0 0 0-1.25-.523H6.76a1.77 1.77 0 0 0-1.24.523c-.33.335-.517.786-.52 1.258v3.178a1.06 1.06 0 0 0 .29.734a1 1 0 0 0 .71.332v2.323a1.2 1.2 0 0 0 .35.855c.18.168.407.277.65.312h2a1.15 1.15 0 0 0 1-1.167V11.47a1 1 0 0 0 .71-.332a1 1 0 0 0 .29-.734V7.226a1.8 1.8 0 0 0-.51-1.258zM10 10.454H9v3.34a.2.2 0 0 1-.06.14a.17.17 0 0 1-.14.06H7.19a.21.21 0 0 1-.2-.2v-3.34H6V7.226c0-.203.079-.398.22-.543a.8.8 0 0 1 .54-.232h2.48a.78.78 0 0 1 .705.48a.8.8 0 0 1 .055.295zm2.81 3.037H11v-1.005h1.8a.24.24 0 0 0 .14-.05a.2.2 0 0 0 .06-.152V9.458h1V7.226a.78.78 0 0 0-.22-.543a.8.8 0 0 0-.54-.232h-1.29a2.9 2.9 0 0 0-.55-1.006h1.84a1.77 1.77 0 0 1 1.24.523c.33.335.517.786.52 1.258v2.182c0 .273-.103.535-.289.733c-.186.199-.44.318-.711.333v1.81c0 .319-.125.624-.348.85a1.2 1.2 0 0 1-.842.357M4 1.945a1.49 1.49 0 0 0-1.386.932A1.52 1.52 0 0 0 2.94 4.52A1.497 1.497 0 0 0 5.5 3.454c0-.4-.158-.784-.44-1.067A1.5 1.5 0 0 0 4 1.945m0 2.012a.5.5 0 0 1-.5-.503a.504.504 0 0 1 .5-.503a.51.51 0 0 1 .5.503a.504.504 0 0 1-.5.503" clipRule="evenodd" /></svg>
                      <input
                        type="text"
                        placeholder="Organization Name"
                        value={formData.company}
                        onChange={(e) => handleInputChange('company', e.target.value)}
                        className="w-full pl-10 pr-4 py-4 bg-white/[0.08] border border-black/[0.15] rounded-xl  placeholder-black/50 focus:outline-none focus:border-indigo-400 transition-all"
                      />
                    </div>
                    <div className="relative bg-blue-50 rounded-xl overflow-hidden">
                      <svg xmlns="http://www.w3.org/2000/svg" className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 /40" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" color="currentColor"><path d="M20.943 16.835a15.76 15.76 0 0 0-4.476-8.616c-.517-.503-.775-.754-1.346-.986C14.55 7 14.059 7 13.078 7h-2.156c-.981 0-1.472 0-2.043.233c-.57.232-.83.483-1.346.986a15.76 15.76 0 0 0-4.476 8.616C2.57 19.773 5.28 22 8.308 22h7.384c3.029 0 5.74-2.227 5.25-5.165" /><path d="M7.257 4.443c-.207-.3-.506-.708.112-.8c.635-.096 1.294.338 1.94.33c.583-.009.88-.268 1.2-.638C10.845 2.946 11.365 2 12 2s1.155.946 1.491 1.335c.32.37.617.63 1.2.637c.646.01 1.305-.425 1.94-.33c.618.093.319.5.112.8l-.932 1.359c-.4.58-.599.87-1.017 1.035S13.837 7 12.758 7h-1.516c-1.08 0-1.619 0-2.036-.164S8.589 6.38 8.189 5.8zm6.37 8.476c-.216-.799-1.317-1.519-2.638-.98s-1.53 2.272.467 2.457c.904.083 1.492-.097 2.031.412c.54.508.64 1.923-.739 2.304c-1.377.381-2.742-.214-2.89-1.06m1.984-5.06v.761m0 5.476v.764" /></g></svg>
                      <input
                        type="number"
                        placeholder="Your Budget"
                        value={formData.budget}
                        onChange={(e) => handleInputChange('budget', e.target.value)}
                        className="w-full px-10 pr-12 md:pr-20 py-4 bg-white/[0.08] border border-black/[0.15] rounded-xl  placeholder-black/50 focus:outline-none focus:border-indigo-400 transition-all"
                      />
                      <div className="absolute bg-blue-50 right-0 top-0 h-full flex justify-center items-center px-4 lg:px-6 border rounded-r-xl  border-black/10">
                        <DollarSign />
                      </div>
                    </div>

                  </div>

                  <div className="relative ">

                    <div className="relative bg-blue-50 rounded-xl overflow-hidden">
                      <MessageSquare className="absolute left-3 top-4 h-5 w-5 /40" />
                      <textarea
                        placeholder="Tell us about your project..."
                        rows={8}
                        value={formData.message}
                        onChange={(e) => handleInputChange('message', e.target.value)}
                        className={`w-full pl-10 pr-4 py-4 bg-white/[0.08] border rounded-xl  placeholder-black/50 focus:outline-none focus:border-indigo-400 transition-all resize-none ${errors.message ? 'border-red-400' : 'border-black/[0.15]'
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

                  <div className="flex justify-end ">
                    <motion.button
                      type="submit"
                      disabled={isPending}
                      className="w-fit  relative group overflow-hidden bg-gradient-to-r text-white from-blue-500 to-blue-700 hover:from-indigo-600 hover:to-purple-700  font-medium py-4 px-6 rounded-xl transition-all disabled:opacity-50"
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
                            className="w-5 h-5  border-2 border-white/30 border-t-white rounded-full"
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
                    }}
                    className="px-6 py-3 bg-white/[0.08] border border-black/[0.15] rounded-xl  hover:bg-white/[0.12] transition-all"
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
