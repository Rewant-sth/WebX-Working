"use client";
import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { X, ChevronDown, AlignJustify } from "lucide-react";
import { getCategories } from "@/service/categoryService";
import { Category } from "@/types/Type";
import Image from "next/image";

const MobileNavbar = () => {
  const [isClient, setIsClient] = useState(false);
  const [navOpen, setNavOpen] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [expandedCategories, setExpandedCategories] = useState<{
    [key: string]: boolean;
  }>({});
  const [lastScrollY, setLastScrollY] = useState(0);
  const [showNav, setShowNav] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const toggleNav = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setNavOpen((prev) => !prev);
  };

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [categoryId]: !prev[categoryId],
    }));
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getCategories();
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    setIsClient(true);

    const controlNavbar = () => {
      if (typeof window !== "undefined") {
        if (window.scrollY > 100) {
          setScrolled(true);
        } else {
          setScrolled(false);
        }

        if (window.scrollY > lastScrollY && window.scrollY > 100) {
          setShowNav(false);
        } else {
          setShowNav(true);
        }
        setLastScrollY(window.scrollY);
      }
    };

    window.addEventListener("scroll", controlNavbar, { passive: true });
    return () => {
      window.removeEventListener("scroll", controlNavbar);
    };
  }, [lastScrollY]);

  if (!isClient) {
    return null;
  }

  // Check if category is 'Event' (case-insensitive)
  const isEventCategory = (name: string) => {
    return name.toLowerCase() === "event";
  };

  // Custom display order for the first 3 non-event categories
  const displayOrder = [2, 0, 1];
  const filteredCategories = categories
    .filter((cat) => !isEventCategory(cat.name))
    .slice(0, 3);

  // Handler to close nav on link click (and allow navigation)
  const handleNavLinkClick = (e?: React.MouseEvent) => {
    setNavOpen(false);
    if (e) {
      e.stopPropagation();
    }
  };

  return (
    <>
      {/* Mobile Menu Toggle Button */}
      <div
        className={`lg:hidden z-[9999] flex flex-row items-center justify-between w-full fixed top-0 right-0 h-14 px-3 transition-all duration-300 ease-in-out 
          ${!showNav ? "-translate-y-full" : "translate-y-0"} 
          ${scrolled
            ? "bg-white shadow-md"
            : "bg-white/95 backdrop-blur-lg shadow"
          }`}
      >
        <span>
          <Image
            src="/logo/Logo.png"
            alt="logo"
            className="w-[100px] h-auto object-contain"
            width={100}
            height={40}
            priority
          />
        </span>
        <button
          onClick={toggleNav}
          className="p-2 rounded-sm hover:bg-blue-50 transition-colors focus:outline-none"
          aria-label="Toggle menu"
        >
          {navOpen ? (
            <X className="w-6 h-6 text-blue-600" />
          ) : (
            <AlignJustify className="w-6 h-6 text-blue-600" />
          )}
        </button>
      </div>

      {/* Slide-In Mobile Menu */}
      <div
        className={`fixed top-0 right-0 bottom-0 w-full h-full bg-white/95 backdrop-blur-2xl shadow-lg z-[999] overflow-y-auto transform transition-all duration-300 ease-in-out ${navOpen ? "translate-y-0" : "-translate-y-full"
          }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Menu Content */}
        <div className="px-5 py-20">
          <div className="flex flex-col space-y-6 overflow-auto">
            {/* Home & Event */}
            <Link
              href="/"
              onClick={handleNavLinkClick}
              className="text-left text-lg font-medium rounded-sm px-3 py-2 hover:bg-blue-50 transition-all w-full tracking-wide text-zinc-800"
            >
              Home
            </Link>
            {categories.some((cat) => isEventCategory(cat.name)) && (
              <Link
                href={"/event"}
                onClick={handleNavLinkClick}
                className="text-left text-base font-semibold rounded-sm px-3 py-2 bg-gradient-to-r from-blue-500 to-blue-400 text-white shadow hover:opacity-90 capitalize w-full transition-all tracking-wide"
              >
                Event
              </Link>
            )}

            {/* Category List in custom order */}
            {displayOrder.map((idx) => {
              const category = filteredCategories[idx];
              if (!category) return null;
              return (
                <div
                  key={category._id}
                  className="border-b border-black/10 pb-2"
                >
                  <button
                    onClick={() => toggleCategory(category._id)}
                    className="flex items-center justify-between w-full py-2 px-1 rounded-sm hover:bg-blue-50 transition-colors"
                  >
                    <span
                      className={`text-base font-semibold capitalize text-zinc-700`}
                    >
                      {category.name}
                    </span>
                    <ChevronDown
                      className={`transition-transform duration-150 text-blue-600 ${expandedCategories[category._id] ? "rotate-180" : ""
                        }`}
                      size={22}
                    />
                  </button>
                  <div
                    className={`mt-1 space-y-1 overflow-hidden transition-all duration-300 ${expandedCategories[category._id]
                      ? "max-h-96 opacity-100"
                      : "max-h-0 opacity-0"
                      }`}
                  >
                    {category.subCategories?.map((subcategory) => (
                      <Link
                        key={subcategory._id}
                        href={`/package-list/${category.slug}`}
                        onClick={handleNavLinkClick}
                        className="text-left pl-6 py-2 rounded-sm font-normal flex gap-2 items-center text-sm w-full hover:bg-blue-100 hover:text-blue-700 transition-all text-zinc-600"
                      >
                        {subcategory.name}
                      </Link>
                    ))}
                  </div>
                </div>
              );
            })}

            {/* Static Links */}
            {[
              { label: "About Us", href: "/about-us" },
              { label: "Blogs", href: "/blogs" },
              { label: "Contact Us", href: "/contact-us" },
            ].map((item, i) => (
              <Link
                href={item.href}
                key={i}
                onClick={handleNavLinkClick}
                className="text-left text-base font-medium rounded-sm px-3 py-2 hover:bg-blue-50 transition-all w-full tracking-wide text-zinc-800"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

// Export with dynamic import and no SSR
export default dynamic(() => Promise.resolve(MobileNavbar), {
  ssr: false,
});
