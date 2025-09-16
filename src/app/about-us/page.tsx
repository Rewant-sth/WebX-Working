"use client"
import { motion, Variants, useInView } from "framer-motion"
import { useRef } from "react"
import { Icon } from "@iconify/react/dist/iconify.js"
import {
  ArrowUpRight,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"

// Animation variants
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
}

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
}
const values = [
  {
    icon: <Icon icon="mdi:shield-check" className="text-3xl text-orange-500" />,
    title: "Safety First",
    desc: "Your safety is our top priority. We maintain the highest safety standards with certified guides, quality equipment, and comprehensive emergency protocols for every expedition."
  },
  {
    icon: <Icon icon="mdi:account-group" className="text-3xl text-orange-500" />,
    title: "Expert Guides",
    desc: "Our team of experienced local guides has extensive knowledge of the Himalayas, ensuring you have the best possible experience while exploring the mountains safely."
  },
  {
    icon: <Icon icon="mdi:leaf" className="text-3xl text-orange-500" />,
    title: "Sustainable Tourism",
    desc: "We're committed to responsible travel that benefits local communities and preserves the natural beauty of the Himalayas for future generations."
  },
  {
    icon: <Icon icon="mdi:star" className="text-3xl text-orange-500" />,
    title: "True Experiences",
    desc: "From sunrise at Everest Base Camp to remote village homestays, we create unique, authentic experiences that go beyond typical tourist itineraries."
  },
]

interface ValueCardProps {
  icon: React.ReactNode;
  title: string;
  desc: string;
  delay?: number;
}

const ValueCard: React.FC<ValueCardProps> = ({ icon, title, desc, delay = 0 }) => (
  <motion.div
    variants={fadeInUp}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: "-100px" }}
    custom={delay}
    className="p-8 bg-black/30 backdrop-blur-sm rounded-sm border border-white/20 hover:shadow-lg transition-all duration-300 hover:border-white/40"
  >
    <div className="flex flex-col space-y-4">
      <div className="flex items-start space-x-3">
        <div className="text-orange-400">
          {icon}
        </div>
        <h3 className="text-xl font-bold text-white drop-shadow-sm">{title}</h3>
      </div>
      <p className="text-gray-100 leading-relaxed">{desc}</p>
    </div>
  </motion.div>

);

const AboutUsPage: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <main className="bg-white">
      {/* Hero Section */}
      <section className="relative h-[75dvh] min-h-[500px] md:min-h-[600px] flex items-center justify-center overflow-hidden">
        <Image
          src={"/EVEREST REGION/NIKOND80013076.JPG"}
          alt="Everest Region"
          fill
          className="object-cover object-bottom brightness-60"
          priority
          sizes="100vw"
        />
        <div className="relative z-10 text-center text-white w-full px-4 sm:px-6 md:px-8">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <h1 className="text-2xl uppercase  md:text-3xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-tight">
              Pioneering Himalayan Adventures Since 2014
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl font-light text-orange-300 max-w-3xl mx-auto">
              Experience the majesty of the world's highest peaks with Nepal's most trusted adventure company
            </p>
          </div>
        </div>
      </section>

      {/* Intro Section */}
      <section className="min-h-screen flex items-center py-12 sm:py-16 px-4 sm:px-6 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-6xl  mx-auto w-full text-justify">
          <div className="mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4 sm:mb-6 text-gray-800">Our Story</h2>
            <div className="space-y-4 sm:space-y-6">
              <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
                Founded in <span className="text-orange-500">2014</span>, <span className="text-orange-500">Real Himalaya</span> is more than just a trekking company, it is a family of mountain dreamers, guides, and storytellers born in the heart of Nepal. Our journey is led by seasoned mountaineers who have carved their legacy on the world’s highest peaks.
              </p>
              <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
                <span className="text-orange-500">Dayula Sherpa</span>, our Founder and Director, carries over <span className="font-bold">20 years of mountaineering experience</span> , with successful climbs of <span className="font-bold">Everest, Shishapangma (twice), and Makalu (five times)</span>. His wisdom and resilience guide every expedition we lead. Alongside him stands <span className="text-orange-500">Gokul Thapa</span>, Co-Founder and Lead Guide, with <span className="font-bold">15+ years of high-altitude expertise</span>, having conquered  <span className="font-bold">Everest, Manaslu, Makalu, Ama Dablam, Mera Peak, Island Peak, and Lobuche.</span> Together, they built the <span className="text-orange-500">Real Himalaya</span> with one vision to share the beauty, culture, and adventure of Nepal with the world, while ensuring  <span className="font-bold">safety, authenticity, and unforgettable </span>experiences for every traveler.
              </p>
              <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
                We are a fully  <span className="font-bold">licensed and certified trekking agency</span>, proudly recognized by the <span className="font-bold"> Nepal Mountaineering Association (NMA), Trekking Agencies’ Association of Nepal (TAAN), and the Nepal Tourism Board (NTB)</span>. Our team of local Sherpa guides and climbing experts are not only skilled in navigating the high Himalayas but also deeply connected to its culture, ensuring every trek is both an adventure and a cultural immersion.
              </p>
              <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
                At <span className="text-orange-500">Real Himalaya</span> , we believe the mountains are more than summits - they are journeys of the soul. Whether you dream of <span className="font-bold">Everest Base Camp, the Three Passes, Gokyo Lakes, Manaslu, Annapurna, or a life-changing peak climb</span>, we walk beside you every step of the way.
              </p>
              <p className="text-lg sm:text-xl text-gray-700 font-medium italic leading-relaxed mt-8 border-t border-gray-200 pt-6">
                <span className="text-orange-500">Real Himalaya</span> where every step is guided by experience, and every trail tells a story.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mt-8">
              <Link
                href="/ourteam"
                className="w-full sm:w-auto text-center bg-orange-500 hover:bg-orange-600 text-white px-6 py-2.5 sm:py-3 rounded-md font-medium transition-colors duration-200"
              >
                Meet Our Team
              </Link>
              <Link
                href="/certificate"
                className="w-full sm:w-auto text-center sm:text-left text-orange-500 hover:text-orange-600 font-medium transition-colors duration-200 group"
              >
                <span className="inline-flex items-center justify-center sm:justify-start gap-1">
                  Our Achievements
                  <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 ml-1 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </Link>
            </div>
          </div>
        </div>

      </section>

      {/* Values Section */}
      <section
        className="relative py-16 px-6"
      >
        <motion.div
          className="absolute inset-0 bg-[url('/EVEREST%20REGION/NIKOND50001920.JPG')] bg-cover bg-center opacity-100"

        />
        <motion.div
          className=" mx-auto py-10 relative z-10"
        >
          <motion.div
            className="text-center mb-16"
          >
            <h1
              className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
            >
              Our Core Values
            </h1>
            <p
              className="text-xl text-gray-800 max-w-3xl mx-auto"
            >
              Discover the passion and dedication that drives our team to create unforgettable Himalayan experiences.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={staggerContainer}
          >
            {values.map((item, index) => (
              <ValueCard
                key={index}
                icon={item.icon}
                title={item.title}
                desc={item.desc}
                delay={index * 0.1}
              />
            ))}
          </motion.div>
        </motion.div>
      </ section>

      {/* Team & Specialties */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="lg:sticky lg:top-24 lg:self-start">
              <div className="mb-8 flex items-center gap-4">
                <h2 className="text-4xl md:text-5xl font-bold text-gray-800">
                  <span className="text-orange-500">Vision</span> Behind The Journey
                </h2>
                <div className="flex-1 h-1 bg-orange-500 rounded-full max-w-[80px]"></div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4 mb-8">
                <div className="relative h-[300px] w-full rounded-sm overflow-hidden shadow-md">
                  <Image
                    src={"/Avtar/gokul.jpg"}
                    alt="Dayula Sherpa - Founder"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 50vw, 25vw"
                    priority
                  />
                </div>
                <div className="relative h-[300px] w-full rounded-sm overflow-hidden shadow-md">
                  <Image
                    src={"/Avtar/dyaula.jpg"}
                    alt="Gokul Thapa - Co-Founder"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 50vw, 25vw"
                    priority
                  />
                </div>
              </div>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Gokul Thapa, a seasoned mountaineer with 15+ years of Himalayan experience, founded High Five Adventures to share his passion for Nepal's majestic peaks with the world. His expertise has been instrumental in developing unique expedition routes and safety protocols.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                Under Gokul's leadership, our team has grown to include some of the most experienced Sherpa guides in Nepal, all sharing a commitment to excellence and sustainable tourism.
              </p>
            </div>

            <div>
              <h2 className="text-4xl font-bold mb-6 text-gray-800">Our Specialities</h2>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                We offer a diverse range of adventures tailored to different experience levels and interests, all with our signature attention to detail and commitment to excellence.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[

                  {
                    name: "Trekking",
                    bgImage: "/banner.webp"
                  },
                  {
                    name: "Expeditions",
                    bgImage: "/EVEREST REGION/NIKON D50001898.JPG"
                  },
                  {
                    name: "Peak Climbing",
                    // icon: <Mountain className="w-6 h-6" />,
                    bgImage: "/EVEREST REGION/NIKON D50001920.JPG"
                  },

                  {
                    name: "City Tours",
                    // icon: <MapPin className="w-6 h-6" />,
                    bgImage: "/citytour.jpeg"
                  },
                  {
                    name: "Cultural Experiences",
                    // icon: <Palette className="w-6 h-6" />,
                    bgImage: "/culture.jpeg"
                  },
                  {
                    name: "Jungle Safari",
                    // icon: <Camera className="w-6 h-6" />,
                    bgImage: "/gaida.JPG"
                  }
                ].map((specialty, idx) => (
                  <div
                    key={idx}
                    className="relative group h-48 rounded-sm overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <Image
                      src={specialty.bgImage}
                      alt={specialty.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-black/40 hover:bg-black/50 transition-colors duration-300 flex flex-col items-center justify-center p-4 text-center">
                      {/* <div className="bg-white/10 backdrop-blur-sm p-3 rounded-full mb-3 group-hover:scale-110 transition-transform">
                        {specialty.icon}
                      </div> */}
                      <h3 className="text-xl font-bold text-white">{specialty.name}</h3>
                    </div>
                  </div>
                ))}
              </div>



            </div>
          </div>
        </div>

      </section>
    </main>
  )
}

export default AboutUsPage;