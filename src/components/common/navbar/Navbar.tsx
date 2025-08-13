"use client"
import { ArrowRight, ChevronDown, ChevronRight, ChevronUp, Dot, Menu, X } from 'lucide-react'
import Image from 'next/image'
import React, { useState, useRef, useEffect } from 'react'
import './NavBar.css'

export default function Navbar() {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setActiveDropdown(null)
      }
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setActiveDropdown(null)
        setIsMobileMenuOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  const toggleDropdown = (dropdown: string) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown)
  }

  const expeditionData = [
    {
      region: 'Mt. Everest Region',
      image: '/one.jpg',
      items: ['Mt Everest Expedition', 'Lhotse Expedition', 'Cho Oyu Expedition', 'Ama Dablam Expedition']
    },
    {
      region: 'Mt. Manaslu Region',
      image: '/two.jpg',
      items: ['Mt Manaslu Expedition', 'Himlung Himal Expedition', 'Cheo Himal Expedition']
    },
    {
      region: 'Kanchenjunga Region',
      image: '/three.jpg',
      items: ['Mt Kanchenjunga Expedition', 'Yalung Kang Expedition', 'Kabru Expedition']
    },
    {
      region: 'Dhaulagiri Region',
      image: '/four.jpg',
      items: ['Mt Dhaulagiri Expedition', 'Tukuche Peak Expedition', 'Churen Himal Expedition']
    }
  ]

  const peakClimbingData = [
    {
      region: 'Popular Peaks',
      image: '/climb.webp',
      items: ['Island Peak', 'Mera Peak', 'Lobuche East', 'Pisang Peak']
    },
    {
      region: 'Technical Peaks',
      image: '/trek.png',
      items: ['Ama Dablam Base Camp', 'Baruntse', 'Himlung Himal', 'Putha Hiunchuli']
    },
    {
      region: 'Beginner Peaks',
      image: '/mountain.jpg',
      items: ['Tent Peak', 'Poon Hill', 'Gokyo Ri', 'Kala Patthar']
    },
    {
      region: 'Advanced Peaks',
      image: '/Hero.jpg',
      items: ['Cholatse', 'Pokalde', 'Kyajo Ri', 'Imja Tse']
    }
  ]

  return (
    <>
      {/* Fixed Navbar */}
      <nav className="fixed top-0 left-0 w-full bg-white/95 backdrop-blur-md border-b border-gray-200 z-[9999]" ref={dropdownRef}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <img src="/logo/main.svg" alt="Logo" className="h-10" />
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:block">
              <ul className="flex gap-8 text-lg font-semibold items-center">
                <li>
                  <a href="/" className="text-zinc-700 hover:text-orange-500 transition-colors cursor-pointer">
                    Home
                  </a>
                </li>
                <li className="relative">
                  <button
                    onClick={() => toggleDropdown('expeditions')}
                    className="flex items-center gap-1 text-zinc-700 hover:text-orange-500 transition-colors"
                    aria-expanded={activeDropdown === 'expeditions'}
                    aria-haspopup="true"
                  >
                    Expeditions
                    <ChevronDown className={`w-4 h-4 transition-transform ${activeDropdown === 'expeditions' ? 'rotate-180' : ''}`} />
                  </button>
                </li>
                <li className="relative">
                  <button
                    onClick={() => toggleDropdown('peak-climbing')}
                    className="flex items-center gap-1 text-zinc-700 hover:text-orange-500 transition-colors"
                    aria-expanded={activeDropdown === 'peak-climbing'}
                    aria-haspopup="true"
                  >
                    Peak Climbing
                    <ChevronDown className={`w-4 h-4 transition-transform ${activeDropdown === 'peak-climbing' ? 'rotate-180' : ''}`} />
                  </button>
                </li>
                <li>
                  <a href="/about-us" className="text-zinc-700 hover:text-orange-500 transition-colors cursor-pointer">
                    About
                  </a>
                </li>
                <li>
                  <a href="/contact-us" className="text-zinc-700 hover:text-orange-500 transition-colors cursor-pointer">
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-zinc-700 hover:text-orange-500 transition-colors"
                aria-expanded={isMobileMenuOpen}
                aria-label="Toggle mobile menu"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Dropdown Menus */}
        {activeDropdown && (
          <div
            className="absolute top-full left-0 w-full h-[95vh] bg-white shadow-lg border-t border-gray-100 animate-fade-in"
            role="menu"
            aria-label={activeDropdown === 'expeditions' ? 'Expeditions Menu' : 'Peak Climbing Menu'}
          >
            {activeDropdown === 'expeditions' && (
              <div className="max-w-7xl sticky top-0 mx-auto px-4 py-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-1">
                  {expeditionData.map((region, index) => (
                    <div key={index} className="group animate-fade-in-delayed" style={{ animationDelay: `${index * 100}ms` }}>
                      <div className="relative h-[80dvh] rounded-lg overflow-hidden mb-4">
                        <Image
                          fill
                          src={region.image}
                          alt={region.region}
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 flex justify-center items-center bg-black/20 text-white">
                          <h3 className=" text-4xl text-center  mx-auto  px-4 font-bold">{region.region}</h3>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeDropdown === 'peak-climbing' && (
              <div className="max-w-7xl mx-auto px-4 py-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-1">

                  {expeditionData.map((region, index) => (
                    <div key={index} className="group animate-fade-in-delayed" style={{ animationDelay: `${index * 100}ms` }}>
                      <div className="relative h-[80dvh] rounded-lg overflow-hidden mb-4">
                        <Image
                          fill
                          src={region.image}
                          alt={region.region}
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 flex justify-center items-center bg-black/20 text-white">
                          <h3 className=" text-4xl text-center  mx-auto  px-4 font-bold">{region.region}</h3>
                        </div>
                      </div>
                    </div>
                  ))}

                </div>
              </div>
            )}
          </div>
        )}
      </nav >

    </>
  )
}
