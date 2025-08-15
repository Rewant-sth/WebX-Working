"use client"
import { ArrowRight, ChevronDown, ChevronLeft, ChevronRight, ChevronUp, Dot, Menu, X } from 'lucide-react'
import Image from 'next/image'
import React, { useState, useRef, useEffect } from 'react'
import './NavBar.css'

export default function Navbar() {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [activeSubDropdown, setActiveSubDropdown] = useState<string | null>(null);
  const [selectedRegion, setSelectedRegion] = useState<any>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setActiveDropdown(null)
        setActiveSubDropdown(null)
        setSelectedRegion(null)
      }
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        if (activeSubDropdown) {
          setActiveSubDropdown(null)
          setSelectedRegion(null)
        } else {
          setActiveDropdown(null)
        }
        setIsMobileMenuOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [activeSubDropdown])

  const toggleDropdown = (dropdown: string) => {
    if (activeDropdown === dropdown) {
      setActiveDropdown(null)
    } else {
      setActiveDropdown(dropdown)
      setActiveSubDropdown(null)
      setSelectedRegion(null)
    }
  }

  const handleRegionClick = (region: any, regionType: string) => {
    setSelectedRegion({ ...region, type: regionType })
    setActiveSubDropdown('subcategory')
  }

  const handleBackToMain = () => {
    setActiveSubDropdown(null)
    setSelectedRegion(null)
  }

  const expeditionData = [
    {
      region: 'Mt. Everest Region',
      image: '/one.jpg',
      items: ['Mt Everest Expedition', 'Lhotse Expedition', 'Cho Oyu Expedition', 'Ama Dablam Expedition'],
      subCategory: [
        {
          title: 'Trekking',
          items: ['Everest Base Camp Trek', 'Annapurna Circuit Trek', 'Langtang Valley Trek']
        },
        {
          title: 'Climbing',
          items: ['Island Peak', 'Mera Peak', 'Lobuche East']
        }
      ]
    },
    {
      region: 'Mt. Manaslu Region',
      image: '/two.jpg',
      items: ['Mt Manaslu Expedition', 'Himlung Himal Expedition', 'Cheo Himal Expedition'],
      subCategory: [
        {
          title: 'Trekking',
          items: ['Manaslu Base Camp Trek', 'Tsum Valley Trek', 'Larkya La Trek']
        },
        {
          title: 'Climbing',
          items: ['Mt Manaslu', 'Pungyen Gompa', 'Sringi Himal']
        }
      ]
    },
    {
      region: 'Kanchenjunga Region',
      image: '/three.jpg',
      items: ['Mt Kanchenjunga Expedition', 'Yalung Kang Expedition', 'Kabru Expedition'],
      subCategory: [
        {
          title: 'Trekking',
          items: ['Kanchenjunga Base Camp Trek', 'Goecha La Trek', 'Singalila Ridge Trek']
        },
        {
          title: 'Climbing',
          items: ['Mt Kanchenjunga', 'Yalung Kang', 'Kabru']
        }
      ]
    },
    {
      region: 'Dhaulagiri Region',
      image: '/four.jpg',
      items: ['Mt Dhaulagiri Expedition', 'Tukuche Peak Expedition', 'Churen Himal Expedition'],
      subCategory: [
        {
          title: 'Trekking',
          items: ['Dhaulagiri Base Camp Trek', 'French Pass Trek', 'Hidden Valley Trek']
        },
        {
          title: 'Climbing',
          items: ['Mt Dhaulagiri', 'Tukuche Peak', 'Churen Himal']
        }
      ]
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
      <nav className="fixed top-0 left-0 w-full bg-white/95 backdrop-blur-md border-b border-gray-200 z-[9999999]" ref={dropdownRef}>
        <div className="max-w-7xl mx-auto ">
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

        {
          activeDropdown !== null || activeSubDropdown !== null && (
            <div className="bg-white h-screen absolute top-0 left-0 w-full z-[50]">
              {/* Dropdown Menus */}
              {activeDropdown && !activeSubDropdown && (
                <div
                  className="absolute top-full left-0 w-full z-[99] h-[95vh] bg-white shadow-lg border-t border-gray-100 animate-fade-in"
                  role="menu"
                  aria-label={activeDropdown === 'expeditions' ? 'Expeditions Menu' : 'Peak Climbing Menu'}
                >
                  {activeDropdown === 'expeditions' && (
                    <div className="max-w-7xl sticky top-0 mx-auto px-4 py-8">
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-1">
                        {expeditionData.map((region, index) => (
                          <div
                            key={index}
                            className="group animate-fade-in-delayed cursor-pointer"
                            style={{ animationDelay: `${index * 100}ms` }}
                            onClick={() => handleRegionClick(region, 'expedition')}
                          >
                            <div className="relative h-[80dvh] rounded-lg overflow-hidden mb-4 hover:shadow-xl transition-shadow duration-300">
                              <Image
                                fill
                                src={region.image}
                                alt={region.region}
                                className="object-cover group-hover:scale-105 transition-transform duration-300"
                              />
                              <div className="absolute inset-0 flex justify-center items-center bg-black/20 group-hover:bg-black/30 text-white transition-colors duration-300">
                                <h3 className="text-4xl text-center mx-auto px-4 font-bold">{region.region}</h3>
                                <ChevronRight className="absolute bottom-4 right-4 w-6 h-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
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
                        {peakClimbingData.map((region, index) => (
                          <div
                            key={index}
                            className="group animate-fade-in-delayed cursor-pointer"
                            style={{ animationDelay: `${index * 100}ms` }}
                            onClick={() => handleRegionClick(region, 'peak-climbing')}
                          >
                            <div className="relative h-[80dvh] rounded-lg overflow-hidden mb-4 hover:shadow-xl transition-shadow duration-300">
                              <Image
                                fill
                                src={region.image}
                                alt={region.region}
                                className="object-cover group-hover:scale-105 transition-transform duration-300"
                              />
                              <div className="absolute inset-0 flex justify-center items-center bg-black/20 group-hover:bg-black/30 text-white transition-colors duration-300">
                                <h3 className="text-4xl text-center mx-auto px-4 font-bold">{region.region}</h3>
                                <ChevronRight className="absolute bottom-4 right-4 w-6 h-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Subcategory Dropdown */}
              {activeSubDropdown === 'subcategory' && selectedRegion && (
                <div
                  className="absolute top-full left-0 w-full h-[95vh] bg-white shadow-lg border-t border-gray-100 animate-fade-in"
                  role="menu"
                  aria-label={`${selectedRegion.region} Subcategories`}
                >
                  <div className="max-w-7xl mx-auto px-4 py-8">
                    {/* Back Button */}
                    <button
                      onClick={handleBackToMain}
                      className="flex items-center gap-2 text-orange-500 hover:text-orange-600 transition-colors mb-6 font-semibold"
                    >
                      <ChevronLeft className="w-5 h-5" />
                      Back to {activeDropdown === 'expeditions' ? 'Expeditions' : 'Peak Climbing'}
                    </button>

                    {/* Region Header */}
                    <div className="mb-8">
                      <h2 className="text-3xl font-bold text-gray-800 mb-2">{selectedRegion.region}</h2>
                      <p className="text-gray-600">Choose from our available {selectedRegion.type === 'expedition' ? 'expedition' : 'peak climbing'} packages</p>
                    </div>

                    {/* Subcategories Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                      {/* Main Items */}
                      <div className="space-y-4">
                        <h3 className="text-xl font-semibold text-gray-800 mb-4">Available {selectedRegion.type === 'expedition' ? 'Expeditions' : 'Peaks'}</h3>
                        <div className="space-y-2">
                          {selectedRegion.items.map((item: string, index: number) => (
                            <a
                              key={index}
                              href="#"
                              className="flex items-center gap-2 text-gray-700 hover:text-orange-500 transition-colors py-2 px-3 rounded hover:bg-orange-50"
                            >
                              <Dot className="w-4 h-4" />
                              {item}
                            </a>
                          ))}
                        </div>
                      </div>

                      {/* Subcategories (if available) */}
                      {selectedRegion.subCategory && selectedRegion.subCategory.map((subCat: any, index: number) => (
                        <div key={index} className="space-y-4">
                          <h3 className="text-xl font-semibold text-gray-800 mb-4">{subCat.title}</h3>
                          <div className="space-y-2">
                            {subCat.items.map((item: string, itemIndex: number) => (
                              <a
                                key={itemIndex}
                                href="#"
                                className="flex items-center gap-2 text-gray-700 hover:text-orange-500 transition-colors py-2 px-3 rounded hover:bg-orange-50"
                              >
                                <Dot className="w-4 h-4" />
                                {item}
                              </a>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )
        }
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 top-16 bg-white z-[9998] lg:hidden">
          <div className="px-4 py-6">
            <ul className="space-y-4">
              <li>
                <a href="/" className="block text-lg text-zinc-700 hover:text-orange-500 transition-colors py-2">
                  Home
                </a>
              </li>
              <li>
                <button
                  onClick={() => {
                    toggleDropdown('expeditions')
                    setIsMobileMenuOpen(false)
                  }}
                  className="flex items-center justify-between w-full text-lg text-zinc-700 hover:text-orange-500 transition-colors py-2"
                >
                  Expeditions
                  <ChevronRight className="w-4 h-4" />
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    toggleDropdown('peak-climbing')
                    setIsMobileMenuOpen(false)
                  }}
                  className="flex items-center justify-between w-full text-lg text-zinc-700 hover:text-orange-500 transition-colors py-2"
                >
                  Peak Climbing
                  <ChevronRight className="w-4 h-4" />
                </button>
              </li>
              <li>
                <a href="/about-us" className="block text-lg text-zinc-700 hover:text-orange-500 transition-colors py-2">
                  About
                </a>
              </li>
              <li>
                <a href="/contact-us" className="block text-lg text-zinc-700 hover:text-orange-500 transition-colors py-2">
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>
      )}
    </>
  )
}
