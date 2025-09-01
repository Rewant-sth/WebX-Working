'use client'
import { useQuery } from '@tanstack/react-query'
import { Icon } from '@iconify/react/dist/iconify.js'
import React, { useState, useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import Link from 'next/link';
import api from '@/service/api';
import { ICategoryResponse } from '@/types/ICategory';
import { ITravelPackageResponse } from '@/types/IPackages';
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { StarBorder } from '@/components/ui/moving-border'
import './NavBar.css'

interface Category {
  _id: string;
  name: string;
  subCategories: SubCategory[];
}

interface SubCategory {
  _id: string;
  name: string;
  slug: string;
}

interface Package {
  _id: string;
  name: string;
  coverImage: string;
  overview: string;
  slug: string;
}

const navs = [{
  name: "About Us",
  href: "/about-us"
}, {
  name: "Contact Us",
  href: "/contact-us"
},
{
  name: "Our Teams",
  href: "/ourteam"
},
{
  name: "Useful Info",
  href: "/useful-info"
},
{
  name: "Certificates",
  href: "/certificate"
},
{
  name: "Blogs",
  href: "/blogs"
}
]

export default function Navbar() {
  const [showNav, setShowNav] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [selectedSubcategoryId, setSelectedSubcategoryId] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const popupNavref = useRef<HTMLDivElement>(null);

  // Fetch categories with React Query
  const { data: categories } = useQuery<ICategoryResponse>({
    queryKey: ['categories'],
    queryFn: async () => {
      const response = await api.get('/category');
      return response.data;
    },
    staleTime: 5 * 60 * 1000,
  });

  // Fetch packages when subcategory is selected
  const { data: packages, isLoading: packagesLoading } = useQuery<ITravelPackageResponse>({
    queryKey: ['packages', selectedSubcategoryId],
    queryFn: async () => {
      const response = await api.get(`/package/subcategory/${selectedSubcategoryId}`);
      return response.data;
    },
    enabled: !!selectedSubcategoryId,
    staleTime: 5 * 60 * 1000,
  });

  const handleShow = () => {
    setShowNav(true);
    if (menuRef.current) {
      const timeline = gsap.timeline()
      timeline.to(menuRef.current, {
        clipPath: "inset(0% 0% 100% 0%)"
      })
      timeline.to(menuRef.current, {
        display: "block",
        duration: 0,
        ease: "none",
        x: 0
      });
      timeline.to(menuRef.current, {
        clipPath: "inset(0% 0% 0% 0%)",
        duration: 0.9
      });
    }
  }

  const handleClose = () => {
    if (menuRef.current) {
      gsap.to(menuRef.current, {
        clipPath: "inset(0% 0% 100% 0%)",
        duration: 0.2,
        ease: "none",
        onComplete: () => {
          setShowNav(false);
          setSelectedCategory(null);
          setSelectedSubcategoryId(null);
        }
      });
    }
  }

  useEffect(() => {
    if (categories?.data && categories.data.length > 0 && !selectedCategory) {
      const firstCategory = categories.data[0];
      setSelectedCategory(firstCategory);
      if (firstCategory.subCategories.length > 0) {
        setSelectedSubcategoryId(firstCategory.subCategories[0]._id);
      }
    }
  }, [categories, selectedCategory]);

  // Fix for SSR hydration issues with fixed positioning
  useEffect(() => {
    // Force reflow to ensure fixed positioning is applied correctly
    const navbar = document.querySelector('nav');
    if (navbar) {
      navbar.style.position = 'fixed';
      navbar.style.top = '0';
      navbar.style.left = '0';
      navbar.style.right = '0';
    }
  }, []);

  return (
    <nav
      className={`navbar-fixed navbar-ssr-fix w-full p-4 md:px-6 py-4 flex justify-between items-center`}
      style={{
        zIndex: showNav ? 999999999 : 99999,
      }}
    >
      <Link href={"/"} className="w-28 md:w-40 transition-transform duration-300 hover:scale-105">
        <img src="/logo/main.svg" alt="Real Himalaya Logo" className="w-full h-auto " />
      </Link>

      <div className="flex gap-3 md:gap-6 items-center">
        <div className='hidden sm:block'>
          <Link
            href="/customize-trip"
            className="group relative px-4 md:px-6 py-2 md:py-2.5 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-medium text-sm md:text-base rounded-sm transition-all duration-300 hover:shadow-lg hover:shadow-green-500/25 hover:scale-105 active:scale-95 flex items-center gap-2"
          >
            <span className="relative z-10 flex items-center gap-2">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
              Live Chat
              <Icon icon="logos:whatsapp-icon" className="text-lg" />
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-green-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </Link>
        </div>
        <button
          onClick={handleShow}
          className='w-fit px-4 md:px-6 pr-0.5 md:pr-1 py-0.5 md:py-1 rounded-sm flex gap-4 items-center bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 shrink-0 text-white transition-all duration-300 hover:shadow-lg hover:scale-105 active:scale-95'
        >
          <span className="font-medium text-sm md:text-base">Menu</span>
          <span className='bg-white size-9 flex justify-center items-center text-orange-500 rounded-sm transition-transform duration-300 group-hover:rotate-180'>
            <Icon icon={"fa6-solid:bars"} className='md:text-lg' />
          </span>
        </button>
      </div>

      <div
        ref={menuRef}
        className={`absolute hidden top-0 left-0 min-h-[100dvh] overflow-auto w-[100vw] bg-[#0d1117] ${showNav ? 'block' : 'hidden'}`}
      >
        <div ref={popupNavref} className="flex border-b border-white/10 backdrop-blur-sm bg-black/10 p-4 md:p-4 py-3 justify-between items-center">
          <Link href={"/"} className="w-28 md:w-40 transition-transform duration-300 hover:scale-105">
            <img src="/logo/white.svg" alt="Real Himalaya Logo" className="w-full h-auto" />
          </Link>

          <div className="flex gap-10 items-center">
            <button
              onClick={handleClose}
              className='w-fit px-4 md:px-6 pr-0.5 md:pr-1 py-0.5 md:py-1 rounded-sm flex gap-4 items-center bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 shrink-0 text-white transition-all duration-300 hover:shadow-lg hover:scale-105 active:scale-95'
            >
              <span className="font-medium text-sm md:text-base">Close</span>
              <span className='bg-white text-orange-500 size-9 flex justify-center items-center  rounded-sm  duration-300 '>
                <Icon icon={"bitcoin-icons:cross-filled"} className='text-lg' />
              </span>
            </button>
          </div>
        </div>

        <div className="flex  text-white min-h-[calc(100dvh-4rem)]">
          <div className="w-full max-w-[16rem] text-xl space-y-4  border-white/20 col-span-2 p-4 md:p-6">
            <h2 className='text-2xl uppercase font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-6'>Categories</h2>
            <div className="grid gap-5">
              {categories?.data?.map((category) => (
                <Link className='' href={`/package-list/${category.slug}`} key={category._id} onClick={handleClose}>
                  <h2
                    onMouseEnter={() => {
                      setSelectedCategory(category);
                      if (category.subCategories.length > 0) {
                        setSelectedSubcategoryId(category.subCategories[0]._id);
                      }
                    }}
                    className={`cursor-pointer px-2 transition-all flex justify-between items-center duration-300 hover:text-orange-300 py-1 ${selectedCategory?._id === category._id ? 'text-orange-300 bg-orange-500/5 ' : ''}`}
                  >

                    {category.name}
                    <Icon icon="fluent:arrow-right-20-filled" className={`ml-2 inline-block transition-all duration-500 ${selectedCategory?._id === category._id ? 'translate-x-0 opacity-100' : '-translate-x-3 opacity-0'}`} />
                  </h2>
                </Link>
              ))}
              {navs.map((item, idx) => (
                <Link href={item.href} onClick={handleClose} key={idx} className='cursor-pointer transition-all duration-300 hover:text-orange-300  py-1 flex  hover:border-orange-400 '>
                  {item.name}
                </Link>
              ))}
            </div>

          </div>

          <div className="w-full text-xl p-6  space-y-4  border-white/20 col-span-2 max-w-[22rem] hidden md:block">
            <h2 className='text-2xl uppercase font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-6'>SUB Categories</h2>
            {selectedCategory?.subCategories.map((subCategory) => (
              <h2
                key={subCategory._id}
                onMouseEnter={() => setSelectedSubcategoryId(subCategory._id)}
                className={`flex gap-2 justify-between items-center cursor-pointer transition-all duration-300 hover:text-orange-300 hover:translate-x-2 p-2 ${selectedSubcategoryId === subCategory._id ? 'text-orange-300 bg-orange-500/5' : ''}`}
              >
                {subCategory.name}
                <Icon icon="fluent:arrow-right-20-filled" className={`ml-2 inline-block transition-all duration-500 ${selectedSubcategoryId === subCategory._id ? 'translate-x-0 opacity-100' : '-translate-x-3 opacity-0'}`} />

              </h2>
            ))}
          </div>

          <div className="p-6 w-full hidden lg:flex flex-col h-[calc(100dvh-8rem)] ">
            <h2 className='text-2xl uppercase font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-6'>Packages</h2>
            {packagesLoading ? (
              <div className="flex justify-center items-center h-full">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
              </div>
            ) : (
              <div className="grid grid-cols-2 grid-rows-2 max-w-3xl max-h-[80dvh] gap-5 flex-1 pr-4  scrollbar-none scrollbar-thumb-orange-500">
                {packages?.data?.slice(0, 3).map((pkg) => (
                  <Link
                    key={pkg._id}
                    href={`/itinerary/${pkg.slug}`}
                    onClick={handleClose}
                    className="w-full h-[220px]   border border-white/20 rounded-sm  transition-all duration-300 hover:border-orange-400/50 hover:shadow-2xl hover:scale-[1.02] cursor-pointer group"
                  >
                    <div className="w-full h-full group relative rounded-sm   group-hover:opacity-70 transition-opacity duration-300 overflow-hidden">
                      <div className="absolute inset-0 z-10 p-4 flex items-end">
                        <h2
                          style={{
                            textShadow: '2px 2px 2px rgba(0, 0, 0, 1)'
                          }}
                          className='text-xl font-bold text-white'>{pkg.name}</h2>
                      </div>
                      <Image
                        height={400}
                        width={400}
                        quality={80}
                        src={pkg.coverImage}
                        alt={pkg.name}
                        className="w-full h-full object-cover group-hover:blur-[3px]"
                      />
                    </div>

                  </Link>
                ))}
              </div>
            )}
            {
              packages?.data && packages.data.length > 4 && (
                <div className="w-full max-w-3xl  flex justify-end items-center">
                  <Link href={`/package-list/${selectedSubcategoryId}`} className='flex items-center gap-2 text-white hover:text-orange-400 transition-colors duration-300 uppercase'>
                    View All <ArrowRight />
                  </Link>
                </div>
              )
            }
          </div>
        </div>
      </div>
    </nav>
  )
}