"use client";

import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import gsap from "gsap";
import { getCategories } from "@/service/categoryService";
import api from "@/service/api";
import { Category, SubCategory } from "@/types/Type";
import { ITravelPackage } from "@/types/IPackages";
import "./NavBar.css";
import { NavButton } from "./navbutton";
import { DropdownMenu } from "./dropdownmenu";
import { PackageCard } from "./package-card";

interface NavState {
  visible: boolean;
  isTransparent: boolean;
  isHovered: boolean;
  activeDropdown: string | null;
  activeCategory: Category | null;
  activeSubCategory: SubCategory | null;
}

// Skeleton Loaders
const PackageCardSkeleton = () => (
  <div className=" bg-gray-200 animate-pulse flex border border-black/10 rounded-lg w-full  h-[65dvh] overflow-hidden"></div>
);

// Main Navbar Component
const Navbar: React.FC = () => {
  const navRef = useRef<HTMLDivElement>(null);
  const lastScrollY = useRef(0);
  const pathname = usePathname();

  const [navState, setNavState] = useState<NavState>({
    visible: true,
    isTransparent: true,
    isHovered: false,
    activeDropdown: null,
    activeCategory: null,
    activeSubCategory: null,
  });

  // Queries
  const { data: categories = [] } = useQuery<Category[]>({
    queryKey: ["categories"],
    queryFn: async () => {
      const response = await getCategories();
      return response.data;
    },
    staleTime: 1000 * 60 * 5,
  });

  const {
    data: packages = [],
    isLoading,
    isError,
  } = useQuery<ITravelPackage[]>({
    queryKey: ["packages", navState.activeSubCategory?._id],
    queryFn: async () => {
      const response = await api.get(
        `package/subcategory/${navState.activeSubCategory?._id}`
      );
      return response.data.data;
    },
    enabled: !!navState.activeSubCategory,
    staleTime: 1000 * 60 * 5,
  });

  // Computed values
  const isHomePage = pathname === "/";
  const shouldShowTransparent =
    isHomePage &&
    navState.isTransparent &&
    !navState.isHovered &&
    !navState.activeDropdown;

  const displayOrder = [2, 0, 1];
  const filteredCategories = categories
    .filter((cat) => cat.name.toLowerCase() !== "event")
    .slice(0, 4);

  // Effects
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < 100) {
        setNavState((prev) => ({ ...prev, visible: true }));
      } else if (currentScrollY > lastScrollY.current) {
        setNavState((prev) => ({ ...prev, visible: false }));
      } else {
        setNavState((prev) => ({ ...prev, visible: true }));
      }

      setNavState((prev) => ({
        ...prev,
        isTransparent: isHomePage ? currentScrollY <= 100 : false,
      }));

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHomePage]);

  useEffect(() => {
    if (!navRef.current) return;

    gsap.to(navRef.current, {
      y: navState.visible ? 0 : "-100%",
      duration: 0.3,
      ease: navState.visible ? "power2.out" : "power2.in",
    });
  }, [navState.visible]);

  useEffect(() => {
    if (navState.activeCategory) {
      setNavState((prev) => ({
        ...prev,
        activeSubCategory: navState.activeCategory!.subCategories[0],
      }));
    }
  }, [navState.activeCategory]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const navbarElement = document.getElementById("navbar-container");
      if (navbarElement && !navbarElement.contains(event.target as Node)) {
        setNavState((prev) => ({ ...prev, activeDropdown: null }));
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  // Add this useEffect after your existing useEffects
  useEffect(() => {
    // Close dropdown when pathname changes (navigation occurs)
    setNavState((prev) => ({
      ...prev,
      activeDropdown: null,
      activeCategory: null,
      activeSubCategory: null,
    }));
  }, [pathname]);

  // Handlers
  const handleMouseEnter = () => {
    setNavState((prev) => ({ ...prev, isHovered: true }));
  };

  const handleMouseLeave = () => {
    setNavState((prev) => ({ ...prev, isHovered: false }));
  };

  const handleCategoryMouseEnter = (category: Category) => {
    if (category.name.toLowerCase() !== "event") {
      setNavState((prev) => ({
        ...prev,
        activeDropdown: category.slug,
        activeCategory: category,
        activeSubCategory: category.subCategories[0],
      }));
    }
  };

  const handleDropdownClose = () => {
    setNavState((prev) => ({
      ...prev,
      activeDropdown: null,
      activeCategory: null,
      activeSubCategory: null,
    }));
  };

  const handleAboutDropdown = (show: boolean) => {
    setNavState((prev) => ({
      ...prev,
      activeDropdown: show ? "about" : null,
    }));
  };

  const handleSubCategoryChange = (subCategory: SubCategory) => {
    setNavState((prev) => ({ ...prev, activeSubCategory: subCategory }));
  };

  return (
    <nav
      ref={navRef}
      id="navbar-container"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`fixed top-0 h-[4rem] left-0 w-full z-[999] transition-all duration-75 ${shouldShowTransparent
        ? " bg-transparent"
        : "bg-white text-black border-b border-black/10"
        }`}
    >
      <div className="py-4 w-full flex items-center justify-between font-medium text-[1rem] px-4 sm:px-8 md:px-8 lg:px-16 mx-auto">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image src={"/logo/main.svg"} alt="logo" className="w-30 object-contain" width={100} height={100} priority />
        </Link>

        <div className="hidden lg:flex items-center justify-center gap-6">
          <Link href="/">
            <NavButton>Home</NavButton>
          </Link>

          {displayOrder.map((idx) => {
            const category = filteredCategories[idx];
            if (!category) return null;
            return (
              <div key={category._id} className="relative">
                <Link href={`/package-list/${category.slug}`}>
                  <NavButton
                    onMouseEnter={() => handleCategoryMouseEnter(category)}
                    className="flex w-full shrink-0 items-center gap-1"
                  >
                    <span>{category.name}</span>
                  </NavButton>
                </Link>
              </div>
            );
          })}

          {/* About Us */}
          <div className="relative">
            <NavButton onMouseEnter={() => handleAboutDropdown(true)} onMouseLeave={() => handleAboutDropdown(false)}>
              <Link href="/about-us">About Us</Link>
            </NavButton>

            <DropdownMenu isVisible={navState.activeDropdown === "about"} onMouseEnter={() => handleAboutDropdown(true)} onMouseLeave={() => handleAboutDropdown(false)}>
              <div className="py-1 flex flex-col text-sm">
                {[
                  { href: "/ourteam", label: "Our Team" },
                  { href: "/message", label: "Message from CEO" },
                  { href: "/certificate", label: "Certificates" },
                ].map((item) => (
                  <Link key={item.href} href={item.href}>
                    <span className="block px-4 py-2 text-gray-700 hover:bg-gray-200 cursor-pointer transition">
                      {item.label}
                    </span>
                  </Link>
                ))}
              </div>
            </DropdownMenu>
          </div>

          {/* Blogs */}
          <Link href="/blogs">
            <NavButton onMouseEnter={handleDropdownClose}>Blogs</NavButton>
          </Link>

          {/* Contact Us */}
          <Link href="/contact-us">
            <NavButton onMouseEnter={handleDropdownClose}>Contact Us</NavButton>
          </Link>
        </div>
      </div>

      {/* Main Dropdown */}
      {navState.activeDropdown &&
        navState.activeDropdown !== "about" &&
        navState.activeCategory && (
          <div
            className="fixed left-0 top-[4rem] w-full z-[999999] bg-white/95 backdrop-blur-xl border-t border-gray-400/50 shadow-2xl transition-all duration-300"
            onMouseLeave={handleDropdownClose}
            onClick={handleDropdownClose} // Add this to close dropdown on any click inside
            style={{
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
            }}
          >
            <div className="max-w-7xl mx-auto py-5 ">
              <div className="">
                {/* Left Categories Column */}
                <div className=" border-r border-gray-200/60  flex">
                  <div className="sticky top-0">
                    <h3 className="text-3xl uppercase font-bold text-gray-900 mb-4 flex items-center gap-2">
                      Real {navState.activeCategory.name}
                    </h3>
                    <ul className="flex gap-0.5">
                      {navState.activeCategory.subCategories.map(
                        (subCategory) => (
                          <li
                            key={subCategory._id}
                            className={`
                                cursor-pointer transition-all border-b  border-transparent duration-300 p-3 py-2 rounded-sm
                                ${navState.activeSubCategory?._id === subCategory._id
                                ? " bg-gradient-to-br from-orange-600 to-orange-400 text-white   "
                                : ""
                              }`}
                            onMouseEnter={() => handleSubCategoryChange(subCategory)} >
                            <div className="flex items-center capitalize gap-2">

                              {subCategory.name}
                            </div>
                          </li>
                        )
                      )}
                    </ul>
                  </div>
                </div>

                {/* Right Content Column */}
                <div className="w-full relative mt-5 animate-fade-in">
                  <div className="absolute left-0 w-full bottom-0">
                    <img src="/line.png" alt="" className="w-screen opacity-20" />
                  </div>
                  <div className="h-full opacity-0 animate-fade-in">


                    {isLoading ? (
                      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {[...Array(4)].map((_, i) => (
                          <PackageCardSkeleton key={i} />
                        ))}
                      </ul>
                    ) : isError ? (
                      <div className="flex items-center justify-center h-40">
                        <p className="text-gray-500">Failed to load packages</p>
                      </div>
                    ) : packages.length === 0 ? (
                      <div className="flex items-center justify-center h-40">
                        <p className="text-gray-500">No packages available</p>
                      </div>
                    ) : (
                      <ul className="grid grid-cols-1 h-full sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                        {packages.slice(0, 4).map((pkg, index) => (
                          <PackageCard
                            key={pkg?.id || `pkg-${index}`}
                            package={pkg}
                            onClose={handleDropdownClose} // Ensure this prop is passed
                          />
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
    </nav>
  );
};

export default Navbar;