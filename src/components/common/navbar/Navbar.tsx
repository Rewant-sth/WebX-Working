"use client";
import { useQuery } from "@tanstack/react-query";
import { Icon } from "@iconify/react/dist/iconify.js";
import React, { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import Link from "next/link";
import api from "@/service/api";
import { ICategoryResponse } from "@/types/ICategory";
import { ITravelPackageResponse } from "@/types/IPackages";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import "./NavBar.css";
import { useMusicPlayerStore } from "@/store/music-player-store";

interface Category {
  _id: string;
  name: string;
  subCategories: SubCategory[];
  slug: string;
}

interface SubCategory {
  _id: string;
  name: string;
  slug: string;
}


interface StaticNavItem {
  name: string;
  href?: string;
  subItems?: StaticNavItem[];
}

const navs: StaticNavItem[] = [
  {
    name: "About Us",
    href: "/about-us",
    subItems: [
      {
        name: "Company",
        href: "/about-us",
      },
      {
        name: "Our Teams",
        href: "/ourteam",
      },
      {
        name: "Useful Info",
        href: "/useful-info",
      },
      {
        name: "Certificates",
        href: "/certificate",
      },
    ],
  },
  {
    name: "Blogs",
    href: "/blogs",
  },
  {
    name: "Contact Us",
    href: "/contact-us",
  },

];

export default function Navbar() {
  const [showNav, setShowNav] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );
  const [selectedSubcategoryId, setSelectedSubcategoryId] = useState<
    string | null
  >(null);
  const [selectedStaticNav, setSelectedStaticNav] =
    useState<StaticNavItem | null>(null);
  const [selectedStaticSubItem, setSelectedStaticSubItem] =
    useState<StaticNavItem | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [expandedSubcategory, setExpandedSubcategory] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const popupNavref = useRef<HTMLDivElement>(null);

  const { isPlaying, play, pause } = useMusicPlayerStore()

  // Fetch categories with React Query
  const { data: categories } = useQuery<ICategoryResponse>({
    queryKey: ["categories"],
    queryFn: async () => {
      const response = await api.get("/category");
      return response.data;
    },
    staleTime: 5 * 60 * 1000,
  });

  // Fetch packages when subcategory is selected
  const { data: packages, isLoading: packagesLoading } =
    useQuery<ITravelPackageResponse>({
      queryKey: ["packages", selectedSubcategoryId],
      queryFn: async () => {
        const response = await api.get(
          `/package/subcategory/${selectedSubcategoryId}`
        );
        return response.data;
      },
      enabled: !!selectedSubcategoryId,
      staleTime: 5 * 60 * 1000,
    });

  const handleShow = () => {
    setShowNav(true);
    if (menuRef.current) {
      const timeline = gsap.timeline();
      timeline.to(menuRef.current, {
        clipPath: "inset(0% 0% 100% 0%)",
      });
      timeline.to(menuRef.current, {
        display: "block",
        duration: 0,
        ease: "none",
        x: 0,
      });
      timeline.to(menuRef.current, {
        clipPath: "inset(0% 0% 0% 0%)",
        duration: 0.9,
      });
    }
  };

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
          setSelectedStaticNav(null);
          setSelectedStaticSubItem(null);
          setExpandedCategory(null);
          setExpandedSubcategory(null);
        },
      });
    }
  };

  useEffect(() => {
    if (
      categories?.data &&
      categories.data.length > 0 &&
      !selectedCategory &&
      !selectedStaticNav
    ) {
      const firstCategory = categories.data[0].subCategories.length > 0
        ? categories.data[0]
        : categories.data.find(cat => cat.subCategories.length > 0);
      if (!firstCategory) return; // No category with subcategories found
      setSelectedCategory(firstCategory);
      if (firstCategory.subCategories.length > 0) {
        setSelectedSubcategoryId(firstCategory.subCategories[0]._id);
      }
    }
  }, [categories, selectedCategory, selectedStaticNav]);

  useEffect(() => {
    // Force reflow to ensure fixed positioning is applied correctly
    const navbar = document.querySelector("nav");
    if (navbar) {
      navbar.style.position = "fixed";
      navbar.style.top = "0";
      navbar.style.left = "0";
      navbar.style.right = "0";
    }
  }, []);

  // Handle scroll detection for navbar background
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 250);
    };

    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024); // lg breakpoint for mobile/medium detection
    };

    // Add event listeners
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);

    // Check initial conditions
    handleScroll();
    handleResize();

    // Cleanup
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <nav
      className={`fixed  top-0 left-0  items-start overflow-x-hidden right-0 w-full p-4 md:px-6 py-1.5 lg:py-3 flex justify-between transition-all duration-300 ${isScrolled ? "backdrop-blur-md " : "bg-transparent"
        } ${showNav ? "min-h-screen overflow-y-auto lg:overflow-hidden " : "items-start"}`}
      style={{
        zIndex: showNav ? 999999999 : 99999,

      }}
    >
      <Link
        href={"/"}
        className="w-28 lg:w-40 transition-transform duration-300 "
      >
        <img
          src={"/logo/main.svg"}
          alt="Real Himalaya Logo"
          className="w-full h-auto transition-opacity duration-300"
        />
      </Link>

      <button className="text-2xl cursor-pointer flex justify-center items-center  rounded-full  xl:text-3xl">
        {
          isPlaying ? <span onClick={() => pause()} className="cursor-pointer border-2 border-orange-500 rounded-full size-7 lg:size-10 flex justify-center items-center ">
            <img src="/icons/play.svg" alt="Real Himalaya" />
          </span>
            : <span onClick={() => play('/Audio/cumb2.mp3')} className="cursor-pointer size-7 shrink-0 lg:size-10 border-2 border-orange-500 rounded-full flex justify-center items-center "><img src="/icons/pause.svg" alt="Real Himalaya" className="  w-full border-none" /></span>
        }
      </button>

      <div className="flex gap-10 items-center">
        <button
          onClick={handleShow}
          className={`w-fit px-4 md:px-6 pr-0.5 md:pr-1 py-0.5 md:py-1 rounded-sm flex gap-4 items-center bg-gradient-to-r from-[#F05E25] to-[#F05E25] hover:from-[#F05E25] hover:to-[#F05E25] shrink-0 text-white transition-all duration-300 hover:shadow-lg  active:scale-95 ${isScrolled ? "shadow-md" : ""
            }`}
        >
          <span className="font-medium text-sm md:text-base">Menu</span>
          <span className="bg-white size-9 flex justify-center items-center text-amber-500 rounded-sm transition-transform duration-300 group-hover:rotate-180">
            <Icon icon={"fa6-solid:bars"} className="md:text-lg" />
          </span>
        </button>
      </div>

      <div
        ref={menuRef}
        className={`absolute hidden top-0 left-0 min-h-[100dvh]  w-[100vw] bg-[#0d1117] ${showNav ? "block" : "hidden"
          }`}
      >
        <div
          ref={popupNavref}
          className="flex border-b border-white/10 backdrop-blur-sm bg-black/10 p-4 md:p-4 py-3 justify-between items-center"
        >
          <Link
            onClick={handleClose}
            href={"/"}
            className="w-28 md:w-40 transition-transform duration-300 "
          >
            <img
              src="/logo/white.svg"
              alt="Real Himalaya Logo"
              className="w-full h-auto"
            />
          </Link>

          <div className="flex gap-10 items-center">
            <button
              onClick={handleClose}
              className="w-fit px-4 md:px-6 pr-0.5 md:pr-1 py-0.5 md:py-1 rounded-sm flex gap-4 items-center bg-gradient-to-r from-amber-500 to-[#F05E25] hover:from-[#F05E25] hover:to-[#F05E25] shrink-0 text-white transition-all duration-300 hover:shadow-lg  active:scale-95"
            >
              <span className="font-medium text-sm md:text-base">Close</span>
              <span className="bg-white text-amber-500 size-9 flex justify-center items-center  rounded-sm  duration-300 ">
                <Icon icon={"bitcoin-icons:cross-filled"} className="text-lg" />
              </span>
            </button>
          </div>
        </div>

        <div className="flex  text-white min-h-[calc(100dvh-4rem)] ">
          <div className="w-full lg:max-w-[16rem] text-xl space-y-4  border-white/20 col-span-2 p-4 md:p-6">
            <h2 className="text-2xl uppercase font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-6">
              Categories
            </h2>
            <div className="grid gap-3">
              {categories?.data?.map((category) => {
                if (category.subCategories.length === 0) return null;
                return (
                  <div key={category._id}>
                    {/* Desktop behavior (lg and up) */}
                    <Link
                      className="hidden lg:block"
                      href={`/package-list/${category.slug}`}
                      onClick={handleClose}
                    >
                      <h2
                        onMouseEnter={() => {
                          setSelectedCategory(category);
                          setSelectedStaticNav(null);
                          if (category.subCategories.length > 0) {
                            setSelectedSubcategoryId(category.subCategories[0]._id);
                          }
                        }}
                        className={`cursor-pointer px-2 transition-all flex justify-between items-center duration-300 hover:text-amber-300 py-2 ${selectedCategory?._id === category._id
                          ? "text-amber-300 bg-amber-500/5 "
                          : ""
                          }`}
                      >
                        {category.name}
                        <Icon
                          icon="fluent:arrow-right-20-filled"
                          className={`ml-2 inline-block transition-all duration-500 ${selectedCategory?._id === category._id
                            ? "translate-x-0 opacity-100"
                            : "-translate-x-3 opacity-0"
                            }`}
                        />
                      </h2>
                    </Link>

                    {/* Mobile/Medium behavior (below lg) */}
                    <div className="lg:hidden">
                      <h2
                        onClick={() => {
                          if (expandedCategory === category._id) {
                            setExpandedCategory(null);
                            setExpandedSubcategory(null);
                          } else {
                            setExpandedCategory(category._id);
                            setExpandedSubcategory(null);
                          }
                        }}
                        className={`cursor-pointer px-2 transition-all flex justify-between items-center duration-300 hover:text-amber-300 py-2 ${expandedCategory === category._id
                          ? "text-amber-300 bg-amber-500/5 "
                          : ""
                          }`}
                      >
                        {category.name}
                        <Icon
                          icon="material-symbols:arrow-drop-down"
                          className={`ml-2 inline-block transition-all duration-300 ${expandedCategory === category._id
                            ? "rotate-180"
                            : "rotate-0"
                            }`}
                        />
                      </h2>

                      {/* Mobile dropdown for subcategories */}
                      <div className={`overflow-hidden transition-all duration-300 ${expandedCategory === category._id ? "max-h-96" : "max-h-0"
                        }`}>
                        <div className="pl-4 py-2 space-y-2">


                          {/* Subcategories */}
                          {category.subCategories.slice(0, 5).map((subCategory) => (
                            <div key={subCategory._id}>
                              <h3
                                onClick={() => {
                                  if (expandedSubcategory === subCategory._id) {
                                    setExpandedSubcategory(null);
                                  } else {
                                    setExpandedSubcategory(subCategory._id);
                                    setSelectedSubcategoryId(subCategory._id);
                                  }
                                }}
                                className={`cursor-pointer text-base md:text-lg transition-all flex justify-between items-center duration-300 hover:text-amber-300 py-1 pr-2 ${expandedSubcategory === subCategory._id
                                  ? "text-amber-300"
                                  : "text-gray-300"
                                  }`}
                              >
                                {subCategory.name}
                                <Icon
                                  icon="material-symbols:arrow-drop-down"
                                  className={`ml-2 inline-block transition-all duration-300 ${expandedSubcategory === subCategory._id
                                    ? "rotate-180"
                                    : "rotate-0"
                                    }`}
                                />
                              </h3>

                              {/* Packages dropdown */}
                              <div className={`overflow-hidden transition-all duration-300 ${expandedSubcategory === subCategory._id ? "max-h-64" : "max-h-0"
                                }`}>
                                {expandedSubcategory === subCategory._id && (
                                  <div className="pl-4 py-2 space-y-1">
                                    {packagesLoading && selectedSubcategoryId === subCategory._id ? (
                                      <div className="text-sm text-gray-400">Loading packages...</div>
                                    ) : packages?.data && selectedSubcategoryId === subCategory._id ? (
                                      <>
                                        {packages.data.slice(0, 5).map((pkg) => (
                                          <Link
                                            key={pkg._id}
                                            href={`/itinerary/${pkg.slug}`}
                                            onClick={handleClose}
                                            className="block text-sm md:text-base text-gray-400 hover:text-amber-300 transition-colors duration-300 py-1"
                                          >
                                            {pkg.name}
                                          </Link>
                                        ))}
                                        {packages.data.length > 5 && (
                                          <Link
                                            href={`/package-list/${category.slug}?subcategory=${subCategory.slug}`}
                                            onClick={handleClose}
                                            className="block text-sm text-amber-400 hover:text-amber-300 transition-colors duration-300 py-1 font-medium"
                                          >
                                            View All ({packages.data.length} packages)
                                          </Link>
                                        )}
                                      </>
                                    ) : selectedSubcategoryId === subCategory._id ? (
                                      <div className="text-sm text-gray-400">No packages available</div>
                                    ) : (
                                      <div className="text-sm text-gray-400">Click to load packages</div>
                                    )}
                                  </div>
                                )}
                              </div>
                            </div>
                          ))}
                          {/* Category link */}
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
              {navs.map((item, idx) => (
                <div key={idx}>
                  {item.subItems ? (
                    <div>
                      {/* Desktop behavior */}
                      <h2
                        className="hidden lg:block"
                        onMouseEnter={() => {
                          setSelectedStaticNav(item);
                          setSelectedCategory(null);
                          setSelectedSubcategoryId(null);
                          if (item.subItems && item.subItems.length > 0) {
                            setSelectedStaticSubItem(item.subItems[0]);
                          }
                        }}
                      >
                        <div className={`cursor-pointer px-2 transition-all flex justify-between items-center duration-300 hover:text-amber-300 py-2 ${selectedStaticNav?.name === item.name
                          ? "text-amber-300 bg-amber-500/5 "
                          : ""
                          }`}>
                          {item.name}
                          <Icon
                            icon="fluent:arrow-right-20-filled"
                            className={`ml-2 inline-block transition-all duration-500 ${selectedStaticNav?.name === item.name
                              ? "translate-x-0 opacity-100"
                              : "-translate-x-3 opacity-0"
                              }`}
                          />
                        </div>
                      </h2>

                      {/* Mobile/Medium behavior */}
                      <div className="lg:hidden">
                        <h2
                          onClick={() => {
                            setSelectedStaticNav(selectedStaticNav?.name === item.name ? null : item);
                          }}
                          className={`cursor-pointer px-2 transition-all flex justify-between items-center duration-300 hover:text-amber-300 py-2 ${selectedStaticNav?.name === item.name
                            ? "text-amber-300 bg-amber-500/5 "
                            : ""
                            }`}
                        >
                          {item.name}
                          <Icon
                            icon="material-symbols:arrow-drop-down"
                            className={`ml-2 inline-block transition-all duration-300 ${selectedStaticNav?.name === item.name
                              ? "rotate-180"
                              : "rotate-0"
                              }`}
                          />
                        </h2>

                        {/* Mobile dropdown */}
                        <div className={`overflow-hidden transition-all duration-300 ${selectedStaticNav?.name === item.name ? "max-h-48" : "max-h-0"
                          }`}>
                          {item.subItems?.map((subItem, subIdx) => (
                            <Link
                              key={subIdx}
                              href={subItem.href!}
                              onClick={handleClose}
                              className="block pl-6 py-2 text-base text-gray-300 hover:text-amber-300 transition-colors duration-300"
                            >
                              {subItem.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <Link
                      href={item.href!}
                      onClick={handleClose}
                      className="cursor-pointer px-2 flex gap-2 justify-between items-center group transition-all duration-300 hover:text-amber-300  py-2  hover:bg-amber-500/5  hover:border-amber-400 "
                    >
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="w-full text-xl p-6  space-y-4  border-white/20 col-span-2 max-w-[22rem] hidden lg:block">
            <h2 className="text-2xl uppercase font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-6">
              SUB Categories
            </h2>
            {selectedCategory?.subCategories.map((subCategory) => (
              <h2
                key={subCategory._id}
                onMouseEnter={() => setSelectedSubcategoryId(subCategory._id)}
                className={`flex gap-2 justify-between items-center cursor-pointer transition-all duration-300 hover:text-amber-300 hover:translate-x-2 p-2 ${selectedSubcategoryId === subCategory._id
                  ? "text-amber-300 bg-amber-500/5"
                  : ""
                  }`}
              >
                {subCategory.name}
                <Icon
                  icon="fluent:arrow-right-20-filled"
                  className={`ml-2 inline-block transition-all duration-500 ${selectedSubcategoryId === subCategory._id
                    ? "translate-x-0 opacity-100"
                    : "-translate-x-3 opacity-0"
                    }`}
                />
              </h2>
            ))}
            {selectedStaticNav?.subItems?.map((subItem, idx) => (
              <Link
                key={idx}
                href={subItem.href!}
                onClick={handleClose}
                title="click to view more"
                onMouseEnter={() => setSelectedStaticSubItem(subItem)}
                className={`flex gap-2 justify-between items-center cursor-pointer transition-all duration-300 hover:text-amber-300 hover:translate-x-2 p-2 ${selectedStaticSubItem?.name === subItem.name
                  ? "text-amber-300 bg-amber-500/5"
                  : ""
                  }`}
              >
                {subItem.name}
                <Icon
                  icon="fluent:arrow-right-20-filled"
                  className={`ml-2 inline-block transition-all duration-500 ${selectedStaticSubItem?.name === subItem.name
                    ? "translate-x-0 opacity-100"
                    : "-translate-x-3 opacity-0"
                    }`}
                />
              </Link>
            ))}
          </div>

          <div className="p-6 w-full hidden lg:flex flex-col h-[calc(100dvh-8rem)] ">
            <h2 className="text-2xl uppercase font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-6">
              {selectedStaticNav ? "Information" : "Packages"}
            </h2>
            {selectedStaticNav ? (
              <div className="flex-1 text-base text-gray-300">
                {selectedStaticNav.name === "About Us" && (
                  <div className="space-y-4">
                    {selectedStaticSubItem?.name === "About Us" && (
                      <>
                        <p>
                          Learn more about Real Himalaya and our commitment to
                          providing exceptional trekking and expedition
                          experiences in Nepal.
                        </p>
                        <Link
                          href="/about-us#mission"
                          onClick={handleClose}
                          className="mt-2 inline-flex items-center gap-2 text-sm px-3 py-1.5 rounded-sm bg-gradient-to-r from-amber-500 to-[#F05E25]  upp text-white transition-all duration-300 hover:shadow-md  active:scale-95"
                        >
                          Learn More{" "}
                          <Icon
                            icon="fluent:arrow-right-20-filled"
                            className="text-sm"
                          />
                        </Link>
                      </>
                    )}
                    {selectedStaticSubItem?.name === "Our Teams" && (
                      <>
                        <p>
                          Meet our experienced team of guides, porters, and
                          support staff who make your adventure possible.
                        </p>
                        <Link
                          href="/ourteam#guides"
                          onClick={handleClose}
                          className="mt-2 inline-flex items-center gap-2 text-sm px-3 py-1.5 rounded-sm bg-gradient-to-r from-amber-500 to-[#F05E25]  text-white transition-all duration-300 hover:shadow-md  active:scale-95"
                        >
                          Meet Guides{" "}
                          <Icon
                            icon="fluent:arrow-right-20-filled"
                            className="text-sm"
                          />
                        </Link>
                      </>
                    )}
                    {selectedStaticSubItem?.name === "Useful Info" && (
                      <>
                        <p>
                          Essential information for your trekking adventure in
                          Nepal.
                        </p>
                        <Link
                          href="/useful-info#seasons"
                          onClick={handleClose}
                          className="mt-2 inline-flex items-center gap-2 text-sm px-3 py-1.5 rounded-sm bg-gradient-to-r from-amber-500 to-[#F05E25]  text-white transition-all duration-300 hover:shadow-md  active:scale-95"
                        >
                          Learn More{" "}
                          <Icon
                            icon="fluent:arrow-right-20-filled"
                            className="text-sm"
                          />
                        </Link>
                      </>
                    )}
                    {selectedStaticSubItem?.name === "Certificates" && (
                      <>
                        <p>
                          Our official certifications and credentials that
                          ensure your safety and trust.
                        </p>
                        <Link
                          href="/certificate#tourism"
                          onClick={handleClose}
                          className="mt-2 inline-flex items-center gap-2 text-sm px-3 py-1.5 rounded-sm bg-gradient-to-r from-amber-500 to-[#F05E25] hover:from-[#F05E25] hover:to-[#F05E25] text-white transition-all duration-300 hover:shadow-md  active:scale-95"
                        >
                          View License{" "}
                          <Icon
                            icon="fluent:arrow-right-20-filled"
                            className="text-sm"
                          />
                        </Link>
                      </>
                    )}
                  </div>
                )}
              </div>
            ) : packagesLoading ? (
              <div className="flex justify-center items-center h-full">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500"></div>
              </div>
            ) : (
              <div className="grid grid-cols-2 grid-rows-2 max-w-3xl max-h-[80dvh] gap-5 flex-1 pr-4  scrollbar-none scrollbar-thumb-amber-500">
                {packages?.data?.slice(0, 4).map((pkg) => (
                  <Link
                    key={pkg._id}
                    href={`/itinerary/${pkg.slug}`}
                    onClick={handleClose}
                    className="w-full h-[220px]   border border-white/20 rounded-sm  transition-all duration-300 hover:border-amber-400/50 ] relative cursor-pointer group"
                  >
                    <div className="w-full h-full group  rounded-sm   group-hover:opacity-70 transition-opacity duration-300 ">
                      <div className="absolute inset-0 group-hover:backdrop-blur-sm z-50 p-4 flex items-end">
                        <h2
                          style={{
                            textShadow: "2px 2px 2px rgba(0, 0, 0, 1)",
                          }}
                          className="text-xl font-bold text-white"
                        >
                          {pkg.name}
                        </h2>
                      </div>
                      <Image
                        fill
                        quality={80}
                        src={pkg.coverImage}
                        alt={pkg.name}
                        className="w-full h-full object-cover "
                      />
                    </div>
                  </Link>
                ))}
              </div>
            )}
            {!selectedStaticNav &&
              packages?.data &&
              packages.data.length > 4 && (
                <div className="w-full max-w-3xl  flex justify-end items-center">
                  <Link
                    onClick={handleClose}
                    href={`/package-list/${selectedCategory?.slug}`}
                    className="flex items-center gap-2 text-white hover:text-amber-400 transition-colors duration-300 uppercase"
                  >
                    View All <ArrowRight />
                  </Link>
                </div>
              )}
          </div>
        </div>
      </div>
    </nav>
  );
}
