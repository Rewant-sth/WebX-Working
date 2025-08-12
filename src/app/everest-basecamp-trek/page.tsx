"use client";
import React, { useEffect, useState } from "react";
import {
  Calendar,
  MapPin,
  Users,
  Mountain,
  Globe,
  Award,
  Camera,
  Shield,
  ChevronRight,
  CloudSnow,
  BookOpen,
  Video,
  Handshake,
  Trophy,
  ClipboardCheck,
} from "lucide-react";
import Image from "next/image";
import narbinmagar from "../../../public/narbinmagar.jpg";
import Link from "next/link";
import { ITravelPackageResponse } from "@/types/IPackages";
import api from "@/service/api";
import { useQuery } from "@tanstack/react-query";

const EverestClimateCampaign = () => {
  const [activeSection, setActiveSection] = useState("introduction");

  async function fetchEvent(): Promise<ITravelPackageResponse> {
    const data = await api.get(`/package/category/event`);
    return data.data;
  }

  const { data, isLoading } = useQuery({
    queryKey: ["fetch-event"],
    queryFn: fetchEvent,
  });

  // Scroll spy functionality
  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        "introduction",
        "mission-vision",
        "event-details",
        "itinerary",
        "video-competition",
        "organizer",
        "budget-safety",
        "environment",
        "contact"
      ];

      const scrollPosition = window.scrollY + 100; // Offset for better detection

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Call once to set initial state

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Smooth scroll to section
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };



  const getLinkStyle = (sectionId: string) =>
    activeSection === sectionId
      ? "text-blue-700 bg-blue-50 py-2 font-bold border-l-4 border-blue-600 pl-3 -ml-3"
      : "text-gray-600 hover:text-blue-600 border-l-4 border-transparent pl-3 -ml-3";

  return (
    <div className="min-h-screen bg-gray-50 ">
      {/* Hero Section with Background Image */}
      <div className="relative w-full left-1/2 right-1/2 -mx-[50vw] text-white overflow-hidden">
        <Image
          src="/basecamp.webp"
          alt="Background"
          fill
          className="object-cover object-center  z-0 brightness-50"
        />

        {/* Content over image */}
        <div className="relative z-10 container mx-auto px-6 py-24 h-[80vh]">
          <div className="max-w-4xl mx-auto text-center">
            <div className="rounded-xl p-2 inline-block mb-40"></div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Initiative for Global Solidarity on{" "}
              <span className=""> Climate Justice</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              Historic participation of 500+ Indian tourists at Mt. Everest Base
              Camp on Indian Independence Day
            </p>
            <div className="flex flex-wrap justify-center gap-4 mt-60">
              <div className="flex gap-2 bg-blue-500/60 px-4 py-2 rounded-sm backdrop-blur-sm">
                <Calendar className="w-5 h-5" />
                <span>August 15, 2025</span>
              </div>
              <div className="flex items-center gap-2 bg-blue-500/60 px-4 py-2 rounded-sm backdrop-blur-sm">
                <MapPin className="w-5 h-5" />
                <span>Everest Base Camp, Nepal</span>
              </div>
              <div className="flex items-center gap-2 bg-blue-500/60 px-4 py-2 rounded-sm backdrop-blur-sm">
                <Users className="w-5 h-5" />
                <span>500+ Participants</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-14 gap-6  mx-auto px-4 sm:px-6 py-16 lg:px-16">
        {/* Left Sidebar - Table of Contents */}
        <div className="lg:col-span-3 sticky top-4 h-fit hidden lg:block">
          <div className="bg-white rounded-sm border border-gray-200 p-4">
            <h3 className="font-bold text-gray-800 mb-3 flex items-center">
              <BookOpen className="w-6 h-6 mr-2" /> Contents
            </h3>
            <ul className="space-y-2 text-base">
              <li>
                <button
                  onClick={() => scrollToSection("introduction")}
                  className={`block py-1.5 transition-all duration-300 w-full text-left ${getLinkStyle(
                    "introduction"
                  )}`}
                >
                  Introduction
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("mission-vision")}
                  className={`block py-1.5 transition-all duration-300 w-full text-left ${getLinkStyle(
                    "mission-vision"
                  )}`}
                >
                  Mission & Vision
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("event-details")}
                  className={`block py-1.5 transition-all duration-300 w-full text-left ${getLinkStyle(
                    "event-details"
                  )}`}
                >
                  Event Details
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("itinerary")}
                  className={`block py-1.5 transition-all duration-300 w-full text-left ${getLinkStyle(
                    "itinerary"
                  )}`}
                >
                  Itinerary
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("video-competition")}
                  className={`block py-1.5 transition-all duration-300 w-full text-left ${getLinkStyle(
                    "video-competition"
                  )}`}
                >
                  Video Competition
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("organizer")}
                  className={`block py-1.5 transition-all duration-300 w-full text-left ${getLinkStyle(
                    "organizer"
                  )}`}
                >
                  Organizer
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("budget-safety")}
                  className={`block py-1.5 transition-all duration-300 w-full text-left ${getLinkStyle(
                    "budget-safety"
                  )}`}
                >
                  Budget & Safety
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("environment")}
                  className={`block py-1.5 transition-all duration-300 w-full text-left ${getLinkStyle(
                    "environment"
                  )}`}
                >
                  Environment
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("contact")}
                  className={`block py-1.5 transition-all duration-300 w-full text-left ${getLinkStyle(
                    "contact"
                  )}`}
                >
                  Contact
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="lg:col-span-8">
          {/* Introduction Section */}
          <section
            id="introduction"
            className="bg-white rounded-xl border border-gray-200 p-6 mb-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <h2 className="text-3xl font-bold text-gray-800">
                A Historic Movement for Climate Justice
              </h2>
            </div>
            <div className="space-y-4 text-gray-600">
              <p className="leading-relaxed">
                The towering majesty of Mt. Everest, standing at 8,848 meters in
                the heart of Nepal, has long symbolized the spirit of endurance,
                unity, and human aspiration. Today, as the world confronts the
                accelerating impacts of climate change, it becomes more than a
                mountain—it becomes a global call to action.
              </p>
              <p className="leading-relaxed">
                This initiative presents an extraordinary movement: uniting over
                500 Indian citizens at Everest Base Camp on August 15, 2025,
                Indian Independence Day. Combining the emotional power of Indian
                Independence Day with the environmental urgency facing our
                planet, this initiative seeks to send a resounding message:
                climate justice demands unity beyond borders, and it demands it
                now.
              </p>
            </div>
          </section>

          {/* Mission, Vision, Objectives */}
          <section id="mission-vision" className="mb-8">
            <div className="grid  gap-6">
              {/* Mission */}
              <div className="bg-blue-50 rounded-xl border border-blue-100 p-6">
                <div className="flex items-center mb-4">
                  <div className="bg-blue-100 p-2 rounded-sm mr-3">
                    <Globe className="w-6 h-6 text-blue-700" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800">
                    Our Mission
                  </h3>
                </div>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start">
                    <ChevronRight className="w-5 h-5 text-blue-600 mt-0.5 mr-2 flex-shrink-0" />
                    Unite 500+ Indian tourists at Everest Base Camp on Indian
                    Independence Day
                  </li>
                  <li className="flex items-start">
                    <ChevronRight className="w-5 h-5 text-blue-600 mt-0.5 mr-2 flex-shrink-0" />
                    Launch a symbolic climate justice campaign led by
                    mountaineer Narbin Magar
                  </li>
                  <li className="flex items-start">
                    <ChevronRight className="w-5 h-5 text-blue-600 mt-0.5 mr-2 flex-shrink-0" />
                    Deliver a signed petition to the UN Secretary-General
                  </li>
                  <li className="flex items-start">
                    <ChevronRight className="w-5 h-5 text-blue-600 mt-0.5 mr-2 flex-shrink-0" />
                    Highlight the Himalayan climate crisis and inspire global
                    action
                  </li>
                </ul>
              </div>

              {/* Vision */}
              <div className="bg-green-50 rounded-xl border border-green-100 p-6">
                <div className="flex items-center mb-4">
                  <div className="bg-green-100 p-2 rounded-sm mr-3">
                    <CloudSnow className="w-6 h-6 text-green-700" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800">
                    Our Vision
                  </h3>
                </div>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start">
                    <ChevronRight className="w-5 h-5 text-green-600 mt-0.5 mr-2 flex-shrink-0" />
                    Ignite a global environmental movement from Everest Base
                    Camp
                  </li>
                  <li className="flex items-start">
                    <ChevronRight className="w-5 h-5 text-green-600 mt-0.5 mr-2 flex-shrink-0" />
                    Build an international community of responsible travelers
                  </li>
                  <li className="flex items-start">
                    <ChevronRight className="w-5 h-5 text-green-600 mt-0.5 mr-2 flex-shrink-0" />
                    Establish an annual global movement for climate action
                  </li>
                  <li className="flex items-start">
                    <ChevronRight className="w-5 h-5 text-green-600 mt-0.5 mr-2 flex-shrink-0" />
                    Strengthen global commitment through UN petitions
                  </li>
                </ul>
              </div>

              {/* Objectives */}
              <div className="bg-purple-50 rounded-xl border border-purple-100 p-6">
                <div className="flex items-center mb-4">
                  <div className="bg-purple-100 p-2 rounded-sm mr-3">
                    <Handshake className="w-6 h-6 text-purple-700" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800">
                    Our Objectives
                  </h3>
                </div>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start">
                    <ChevronRight className="w-5 h-5 text-purple-600 mt-0.5 mr-2 flex-shrink-0" />
                    Unite 500+ Indian tourists at Everest Base Camp
                  </li>
                  <li className="flex items-start">
                    <ChevronRight className="w-5 h-5 text-purple-600 mt-0.5 mr-2 flex-shrink-0" />
                    Launch with ceremonial ribbon-cutting by Ministers
                  </li>
                  <li className="flex items-start">
                    <ChevronRight className="w-5 h-5 text-purple-600 mt-0.5 mr-2 flex-shrink-0" />
                    Showcase India-Nepal cooperation for climate action
                  </li>
                  <li className="flex items-start">
                    <ChevronRight className="w-5 h-5 text-purple-600 mt-0.5 mr-2 flex-shrink-0" />
                    Promote safe, eco-friendly, and affordable trekking
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Event Details */}
          <section
            id="event-details"
            className="bg-white rounded-xl border border-gray-200 p-6 mb-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <h2 className="text-3xl font-bold text-gray-800">
                Event Details
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Timeline */}
              <div>
                <h3 className="text-xl font-bold mb-4 text-gray-800">
                  Timeline & Duration
                </h3>
                <div className="space-y-5">
                  <div className="flex items-start p-6 bg-blue-50 rounded-sm border border-blue-100">
                    <Calendar className="w-6 h-6 text-blue-600 mr-4 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-gray-800">Start Date</p>
                      <p className="text-gray-600">August 7, 2025 from Lukla</p>
                    </div>
                  </div>
                  <div className="flex items-start p-4 bg-green-50 rounded-sm border border-green-100">
                    <Mountain className="w-6 h-6 text-green-600 mr-4 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-gray-800">Main Event</p>
                      <p className="text-gray-600">
                        August 15, 2025 at Everest Base Camp
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start p-4 bg-purple-50 rounded-sm border border-purple-100">
                    <Users className="w-6 h-6 text-purple-600 mr-4 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-gray-800">Duration</p>
                      <p className="text-gray-600">
                        12-13 days including trek and acclimatization
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Target Participants */}
              <div>
                <h3 className="text-xl font-bold mb-4 text-gray-800">
                  Target Participants
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 bg-gray-50 rounded-sm border border-gray-100">
                    <p className="text-gray-700 text-sm">
                      Environmentally conscious Indian tourists
                    </p>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-sm border border-gray-100">
                    <p className="text-gray-700 text-sm">
                      Climate activists and researchers
                    </p>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-sm border border-gray-100">
                    <p className="text-gray-700 text-sm">
                      Travel enthusiasts and adventure seekers
                    </p>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-sm border border-gray-100">
                    <p className="text-gray-700 text-sm">
                      Corporate changemakers
                    </p>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-sm border border-gray-100">
                    <p className="text-gray-700 text-sm">
                      University environment clubs
                    </p>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-sm border border-gray-100">
                    <p className="text-gray-700 text-sm">Digital influencers</p>
                  </div>
                </div>
                <div className="p-3 bg-blue-50 rounded-sm border border-blue-200 mt-4">
                  <p className="text-blue-700 font-medium">
                    Formal invitation to Nepal and India's Tourism Ministers
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Itinerary */}
          <section
            id="itinerary"
            className="bg-white rounded-xl border border-gray-200 p-6 mb-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <h2 className="text-3xl font-bold text-gray-800">
                12-Day Itinerary Overview
              </h2>
            </div>
            <div className="space-y-3">
              {[
                {
                  day: 1,
                  route: "Kathmandu to Lukla Flight → Phakding",
                  altitude: "2,610m",
                  duration: "4 hours",
                },
                {
                  day: 2,
                  route: "Phakding → Namche Bazaar",
                  altitude: "3,400m",
                  duration: "5:30-6:30 hours",
                },
                {
                  day: 3,
                  route: "Acclimatization day in Namche Bazaar",
                  altitude: "3,400m",
                  duration: "Rest day",
                },
                {
                  day: 4,
                  route: "Namche Bazaar → Phangboche",
                  altitude: "3,985m",
                  duration: "6-7 hours",
                },
                {
                  day: 5,
                  route: "Pangboche → Dingboche",
                  altitude: "4,360m",
                  duration: "5 hours",
                },
                {
                  day: 6,
                  route: "Acclimatization in Dingboche",
                  altitude: "4,360m",
                  duration: "Rest day",
                },
                {
                  day: 7,
                  route: "Dingboche → Lobuche",
                  altitude: "4,950m",
                  duration: "6 hours",
                },
                {
                  day: 8,
                  route: "Lobuche → Gorakhshep → EBC",
                  altitude: "5,364m",
                  duration: "6 hours total",
                },
                {
                  day: 9,
                  route: "Gorakhshep → Kalapathar → Pheriche",
                  altitude: "4,288m",
                  duration: "7 hours",
                },
                {
                  day: 10,
                  route: "Pheriche → Namche",
                  altitude: "3,400m",
                  duration: "6 hours",
                },
                {
                  day: 11,
                  route: "Namche → Lukla",
                  altitude: "2,800m",
                  duration: "7-8 hours",
                },
                {
                  day: 12,
                  route: "Lukla → Kathmandu Flight",
                  altitude: "1,400m",
                  duration: "40 minutes",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex items-start p-4 rounded-sm border border-gray-200 bg-gray-50"
                >
                  <div className="bg-blue-100 text-blue-800 font-bold w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 mr-4">
                    {item.day}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-800">{item.route}</p>
                    <div className="flex gap-4 mt-1">
                      <span className="text-sm text-gray-600">
                        <strong>Altitude:</strong> {item.altitude}
                      </span>
                      <span className="text-sm text-gray-600">
                        <strong>Duration:</strong> {item.duration}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Video Competition */}
          <section
            id="video-competition"
            className="relative text-white rounded-3xl mb-10 overflow-hidden shadow-2xl border border-blue-100/30"
          >
            {/* Background Image & Overlay */}
            <div className="absolute inset-0">
              <img
                src="https://images.unsplash.com/photo-1519681393784-d120267933ba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                alt="Competition Background"
                className="w-full h-full object-cover object-center"
                style={{ filter: "brightness(0.45)" }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/80 via-blue-800/40 to-transparent" />
            </div>

            <div className="relative px-6 py-12 lg:py-20">
              <div className="max-w-4xl mx-auto text-center">
                <div className="flex justify-center mb-4">
                  <div className="rounded-full bg-white/10 backdrop-blur-md p-4 shadow-lg border border-yellow-400/30 animate-pulse">
                    <Video className="w-10 h-10 text-yellow-300" />
                  </div>
                </div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-4 tracking-tight text-white drop-shadow-lg">
                  Video Documentary Competition
                </h2>
                <p className="text-lg sm:text-xl mb-8 font-medium text-blue-100 drop-shadow">
                  Create a{" "}
                  <span className="text-yellow-300 font-bold">3-5 minute</span>{" "}
                  video on&nbsp;
                  <span className="bg-gradient-to-r from-yellow-300 via-green-300 to-blue-300 bg-clip-text text-transparent font-extrabold">
                    "Global Solidarity Against Climate Change"
                  </span>
                </p>

                {/* Prize Card */}
                <div className="border border-yellow-400/30 backdrop-blur-md bg-white/10 p-6 rounded-2xl mb-10 flex flex-col items-center shadow-lg">
                  <div className="bg-yellow-400/90 text-blue-900 font-bold py-2 px-6 rounded-sm inline-flex items-center mb-4 shadow-md uppercase tracking-wider">
                    <Trophy className="w-5 h-5 mr-2" />
                    Grand Prize
                  </div>
                  <p className="text-lg mb-2 text-white font-semibold">
                    Fully sponsored expedition to climb&nbsp;
                    <span className="text-yellow-200 font-bold">
                      Mt. Ama Dablam
                    </span>{" "}
                    (6,812m)
                  </p>
                  <p className="text-2xl font-black text-yellow-300 drop-shadow">
                    Valued at USD 6,000
                  </p>
                </div>

                {/* Guidelines & Selection - Responsive Card Grid */}
                <div className="grid md:grid-cols-2 gap-8 text-left">
                  {/* Submission Guidelines */}
                  <div className="bg-white/10 border border-blue-100/10 backdrop-blur-md p-6 rounded-xl shadow-md hover:scale-105 transition-transform duration-300">
                    <h4 className="font-extrabold mb-3 text-yellow-100 text-lg flex items-center gap-2">
                      <span className="inline-block w-2 h-2 bg-yellow-300 rounded-full"></span>
                      Submission Guidelines
                    </h4>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <ChevronRight className="w-5 h-5 text-yellow-300 mt-1 mr-2 flex-shrink-0" />
                        3-5 minute video duration
                      </li>
                      <li className="flex items-start">
                        <ChevronRight className="w-5 h-5 text-yellow-300 mt-1 mr-2 flex-shrink-0" />
                        Include Everest Base Camp footage
                      </li>
                      <li className="flex items-start">
                        <ChevronRight className="w-5 h-5 text-yellow-300 mt-1 mr-2 flex-shrink-0" />
                        Climate observations and solidarity message
                      </li>
                      <li className="flex items-start">
                        <ChevronRight className="w-5 h-5 text-yellow-300 mt-1 mr-2 flex-shrink-0" />
                        Submit within 30 days post-trek
                      </li>
                    </ul>
                  </div>
                  {/* Selection Process */}
                  <div className="bg-white/10 border border-blue-100/10 backdrop-blur-md p-6 rounded-xl shadow-md hover:scale-105 transition-transform duration-300">
                    <h4 className="font-extrabold mb-3 text-yellow-100 text-lg flex items-center gap-2">
                      <span className="inline-block w-2 h-2 bg-yellow-300 rounded-full"></span>
                      Selection Process
                    </h4>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <ChevronRight className="w-5 h-5 text-yellow-300 mt-1 mr-2 flex-shrink-0" />
                        Based on social media engagement
                      </li>
                      <li className="flex items-start">
                        <ChevronRight className="w-5 h-5 text-yellow-300 mt-1 mr-2 flex-shrink-0" />
                        Shared on Facebook &amp; Instagram
                      </li>
                      <li className="flex items-start">
                        <ChevronRight className="w-5 h-5 text-yellow-300 mt-1 mr-2 flex-shrink-0" />
                        Focus on inspiring content
                      </li>
                      <li className="flex items-start">
                        <ChevronRight className="w-5 h-5 text-yellow-300 mt-1 mr-2 flex-shrink-0" />
                        Judged by Narbin Magar&apos;s team
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Organizer Profile */}
          <section
            id="organizer"
            className="bg-white rounded-2xl border border-gray-100 p-8 mb-8 shadow-sm"
          >
            {/* Header */}
            <div className="flex items-center gap-3 mb-8">
              <Mountain className="w-7 h-7 text-blue-600" />
              <h2 className="text-3xl font-bold text-gray-900">
                Expedition Leader
              </h2>
            </div>

            <div className="flex flex-col lg:flex-row gap-8">
              {/* Profile Image */}
              <div className="flex-shrink-0 w-2/6">
                <div className="relative overflow-hidden rounded-2xl w-64 h-64 border-2 border-gray-100">
                  <Image
                    src={narbinmagar}
                    placeholder="blur"
                    fill
                    alt="Narbin Magar"
                    className="object-cover"
                  />
                </div>
                <div className="mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    Narbin Magar
                  </h3>
                  <p className="text-lg text-blue-600 font-medium mb-4">
                    Renowned Mountaineer & Expedition Leader
                  </p>
                </div>
              </div>

              {/* Content */}
              <div className="flex-1">


                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Key Achievements */}
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <Award className="w-5 h-5 text-blue-600" />
                      <h4 className="text-lg font-semibold text-gray-900">
                        Key Achievements
                      </h4>
                    </div>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <ChevronRight className="w-5 h-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
                        <span className="text-gray-700">
                          Summited <strong>Mt. Everest twice</strong> (8,848m)
                        </span>
                      </li>
                      <li className="flex items-start">
                        <ChevronRight className="w-5 h-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
                        <span className="text-gray-700">
                          Carried <strong>FIFA World Cup Trophy</strong> to
                          Everest summit
                        </span>
                      </li>
                      <li className="flex items-start">
                        <ChevronRight className="w-5 h-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
                        <span className="text-gray-700">
                          <strong>13+ years</strong> of guiding experience
                        </span>
                      </li>
                      <li className="flex items-start">
                        <ChevronRight className="w-5 h-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
                        <span className="text-gray-700">
                          <strong>Licensed</strong> mountain and trekking guide
                        </span>
                      </li>
                    </ul>
                  </div>

                  {/* Notable Summits */}
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <Mountain className="w-5 h-5 text-blue-600" />
                      <h4 className="text-lg font-semibold text-gray-900">
                        Notable Summits
                      </h4>
                    </div>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <ChevronRight className="w-5 h-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
                        <span className="text-gray-700">
                          <strong>Mt. Everest</strong> (8,848m) - 2 times
                        </span>
                      </li>
                      <li className="flex items-start">
                        <ChevronRight className="w-5 h-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
                        <span className="text-gray-700">
                          <strong>Mt. Aconcagua</strong> (6,962m) - South
                          America
                        </span>
                      </li>
                      <li className="flex items-start">
                        <ChevronRight className="w-5 h-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
                        <span className="text-gray-700">
                          <strong>Mt. Kilimanjaro</strong> (5,895m) - Africa
                        </span>
                      </li>
                      <li className="flex items-start">
                        <ChevronRight className="w-5 h-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
                        <span className="text-gray-700">
                          <strong>Ama Dablam</strong> (6,812m) - 1 time
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Budget & Safety */}
          <section id="budget-safety" className="mb-8">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Budget Card */}
              <div className="group bg-gradient-to-br from-white to-blue-50/30 rounded-2xl border border-blue-100 p-8 shadow-sm hover:shadow-md transition-all duration-300">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-blue-100 rounded-xl group-hover:bg-blue-200 transition-colors">
                      <svg
                        className="w-6 h-6 text-blue-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                        />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">
                      Budget Overview
                    </h3>
                  </div>
                  <div className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                    All Inclusive
                  </div>
                </div>

                <div className="text-center mb-8 p-6 bg-white/60 rounded-xl border border-blue-100/50">
                  <div className="text-4xl font-black text-blue-600 mb-1">
                    ₹45,000
                  </div>
                  <div className="text-gray-600 font-medium">Per person</div>
                  <div className="text-sm text-blue-600 font-medium mt-2">
                    *Estimated cost
                  </div>
                </div>

                <div>
                  <h4 className="font-bold mb-4 text-gray-900 text-lg">
                    What's Included:
                  </h4>
                  <div className="space-y-3">
                    <div className="flex items-start group/item">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2.5 mr-4 flex-shrink-0 group-hover/item:bg-blue-600"></div>
                      <span className="text-gray-700 font-medium">
                        Professional trekking guide
                      </span>
                    </div>
                    <div className="flex items-start group/item">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2.5 mr-4 flex-shrink-0 group-hover/item:bg-blue-600"></div>
                      <span className="text-gray-700 font-medium">
                        Meals and accommodation
                      </span>
                    </div>
                    <div className="flex items-start group/item">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2.5 mr-4 flex-shrink-0 group-hover/item:bg-blue-600"></div>
                      <span className="text-gray-700 font-medium">
                        Comprehensive travel insurance
                      </span>
                    </div>
                    <div className="flex items-start group/item">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2.5 mr-4 flex-shrink-0 group-hover/item:bg-blue-600"></div>
                      <span className="text-gray-700 font-medium">
                        Kathmandu-Lukla round-trip flights
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Safety Card */}
              <div className="group bg-gradient-to-br from-white to-green-50/30 rounded-2xl border border-green-100 p-8 shadow-sm hover:shadow-md transition-all duration-300">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-green-100 rounded-xl group-hover:bg-green-200 transition-colors">
                      <svg
                        className="w-6 h-6 text-green-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.031 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                        />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">
                      Safety Measures
                    </h3>
                  </div>
                  <div className="bg-green-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                    Priority #1
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start p-3 bg-white/60 rounded-sm border border-green-100/50 group/safety hover:bg-green-50/50 transition-colors">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2.5 mr-4 flex-shrink-0"></div>
                    <span className="text-gray-700 font-medium">
                      Health and travel insurance for all participants
                    </span>
                  </div>
                  <div className="flex items-start p-3 bg-white/60 rounded-sm border border-green-100/50 group/safety hover:bg-green-50/50 transition-colors">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2.5 mr-4 flex-shrink-0"></div>
                    <span className="text-gray-700 font-medium">
                      Emergency helicopter evacuation support
                    </span>
                  </div>
                  <div className="flex items-start p-3 bg-white/60 rounded-sm border border-green-100/50 group/safety hover:bg-green-50/50 transition-colors">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2.5 mr-4 flex-shrink-0"></div>
                    <span className="text-gray-700 font-medium">
                      Trained guides and medical staff
                    </span>
                  </div>
                  <div className="flex items-start p-3 bg-white/60 rounded-sm border border-green-100/50 group/safety hover:bg-green-50/50 transition-colors">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2.5 mr-4 flex-shrink-0"></div>
                    <span className="text-gray-700 font-medium">
                      Altitude sickness protocols
                    </span>
                  </div>
                  <div className="flex items-start p-3 bg-white/60 rounded-sm border border-green-100/50 group/safety hover:bg-green-50/50 transition-colors">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2.5 mr-4 flex-shrink-0"></div>
                    <span className="text-gray-700 font-medium">
                      24/7 rescue and communication team
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Environmental Responsibility */}
          <section
            id="environment"
            className="bg-green-50 rounded-xl border border-green-100 p-6 mb-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <h2 className="text-3xl font-bold text-gray-800">
                Environmental Responsibility
              </h2>
            </div>
            <p className="text-lg text-gray-600 mb-8 text-center max-w-3xl mx-auto">
              This campaign sets a model for eco-tourism and sustainable
              high-altitude expeditions
            </p>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-white p-4 rounded-xl border border-green-200">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center  mb-4">
                  <span className="text-green-600 font-bold text-xl">1</span>
                </div>
                <h3 className="font-bold text-gray-800 mb-2 ">
                  No Littering Pledge
                </h3>
                <p className="text-gray-600 ">
                  Everyone joins waste control promise
                </p>
              </div>
              <div className="bg-white p-4 rounded-xl border border-green-200">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center  mb-4">
                  <span className="text-green-600 font-bold text-xl">2</span>
                </div>
                <h3 className="font-bold text-gray-800 mb-2 text-center">
                  Biodegradable Materials
                </h3>
                <p className="text-gray-600 text-center">
                  Only eco-friendly materials used for flags and essentials
                </p>
              </div>
              <div className="bg-white p-4 rounded-xl border border-green-200">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center  mb-4">
                  <span className="text-green-600 font-bold text-xl">3</span>
                </div>
                <h3 className="font-bold text-gray-800 mb-2 text-center">
                  Carbon Offsetting
                </h3>
                <p className="text-gray-600 text-center">
                  Energy-efficient logistics and carbon offset programs
                </p>
              </div>
            </div>
          </section>

          {/* Contact Section */}
          <section
            id="contact"
            className="bg-white rounded-xl border border-gray-200 p-6"
          >
            <div className="flex items-center gap-3 mb-6">
              <h2 className="text-3xl font-bold text-gray-800">
                Join the Movement
              </h2>
            </div>
            <p className="text-xl text-gray-600 mb-8 text-center">
              Be part of this historic campaign for climate justice at the
              world's highest peak
            </p>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
                <h3 className="text-xl font-bold mb-4">
                  High 5 Adventures Pvt. Ltd.
                </h3>
                <div className="space-y-3 text-gray-600">
                  <p>Email: high5adv@gmail.com</p>
                  <p>Phone: +977-9851180155</p>
                  <p>Phone: +977-9851279322</p>
                </div>
              </div>

              <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
                <h3 className="text-xl font-bold mb-4">Follow Our Journey</h3>
                <div className="space-y-3 text-gray-600">
                  <p>Facebook: @highfiveadventures</p>
                  <p>Instagram: @high5adv</p>
                  <p>Narbin Magar: @mountaineer_narbin</p>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 p-6 rounded-xl border border-blue-200">
              <h3 className="text-xl font-bold mb-3 text-center">
                Expected Outcomes
              </h3>
              <p className="text-gray-600 text-center">
                On August 15, over 500 Indian trekkers will gather at Mt.
                Everest Base Camp, each holding a placard and signing a
                petition. The signed petition will be submitted to the UN
                Secretary-General, amplifying the voices of ordinary citizens
                and creating a peaceful, symbolic legacy of unity, urgency, and
                hope for future generations.
              </p>
            </div>
          </section>
        </div>

        {/* Right Sidebar - Booking Summary */}
        <div className="lg:col-span-3 sticky top-4 h-fit block">
          <div className="bg-white rounded-sm border border-gray-200 p-4">
            <h3 className="font-bold text-gray-800 mb-4">Event Summary</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-gray-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1.5em"
                  height="1.5em"
                  viewBox="0 0 48 48"
                >
                  <g fill="currentColor">
                    <path
                      fillRule="evenodd"
                      d="M12 21a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2v-2a2 2 0 0 0-2-2zm0 2v2h2v-2zm6 0a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2zm2 0h2v2h-2zm8-2a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2v-2a2 2 0 0 0-2-2zm0 2v2h2v-2zm-18 8a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2zm4 0v2h-2v-2zm6-2a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2v-2a2 2 0 0 0-2-2zm2 2h-2v2h2z"
                      clipRule="evenodd"
                    ></path>
                    <path d="M36 32.5a1 1 0 1 0-2 0v2.914l1.293 1.293a1 1 0 0 0 1.414-1.414L36 34.586z"></path>
                    <path
                      fillRule="evenodd"
                      d="M12 7a1 1 0 1 1 2 0v5a1 1 0 1 0 2 0V9h10V7a1 1 0 1 1 2 0v5a1 1 0 1 0 2 0V9h3a3 3 0 0 1 3 3v16.07A7.001 7.001 0 0 1 35 42a6.99 6.99 0 0 1-5.745-3H9a3 3 0 0 1-3-3V12a3 3 0 0 1 3-3h3zm16 28a7 7 0 0 1 6-6.93V18H8v18a1 1 0 0 0 1 1h19.29a7 7 0 0 1-.29-2m12 0a5 5 0 1 1-10 0a5 5 0 0 1 10 0"
                      clipRule="evenodd"
                    ></path>
                  </g>
                </svg>{" "}
                <span>Aug 15-27, 2025</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1.5em"
                  height="1.5em"
                  viewBox="0 0 16 16"
                >
                  <path
                    fill="currentColor"
                    fillRule="evenodd"
                    d="M11.617 8.677a4.5 4.5 0 1 0-7.235 0L8 13.5zm1.203.897a6 6 0 1 0-9.64 0L6.875 14.5H4.75a.75.75 0 0 0 0 1.5h6.5a.75.75 0 0 0 0-1.5H9.125zM8 8a2 2 0 1 0 0-4a2 2 0 0 0 0 4"
                    clipRule="evenodd"
                  ></path>
                </svg>{" "}
                <span>Everest Base Camp</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="2.13em"
                  height="1.7em"
                  viewBox="0 0 640 512"
                >
                  <path
                    fill="currentColor"
                    d="M41 7C31.6-2.3 16.4-2.3 7 7s-9.3 24.6 0 34l72 72c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9zm558 0l-72 72c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l72-72c9.4-9.4 9.4-24.6 0-33.9S608.3-2.4 599 7M7 505c9.4 9.4 24.6 9.4 33.9 0l72-72c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0L7 471c-9.4 9.4-9.4 24.6 0 33.9zm592 0c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-72-72c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9zM320 256a64 64 0 1 0 0-128a64 64 0 1 0 0 128m-107.9 80c-2.7 7.5-4.1 15.6-4.1 24c0 13.3 10.7 24 24 24h176c13.3 0 24-10.7 24-24c0-8.4-1.4-16.5-4.1-24c-.5-1.4-1-2.7-1.6-4c-9.4-22.3-29.8-38.9-54.3-43c-3.9-.7-7.9-1-12-1h-80c-4.1 0-8.1.3-12 1c-.8.1-1.7.3-2.5.5c-24.9 5.1-45.1 23-53.4 46.5m-36.3-112a48 48 0 1 0 0-96a48 48 0 1 0 0 96m-26.5 32c-29.4 0-53.3 23.9-53.3 53.3c0 14.7 11.9 26.7 26.7 26.7h56.1c8-34.1 32.8-61.7 65.2-73.6c-7.5-4.1-16.2-6.4-25.3-6.4h-69.3zm368 80c14.7 0 26.7-11.9 26.7-26.7c0-29.5-23.9-53.3-53.3-53.3h-69.3c-9.2 0-17.8 2.3-25.3 6.4c32.4 11.9 57.2 39.5 65.2 73.6h56.1zM464 224a48 48 0 1 0 0-96a48 48 0 1 0 0 96"
                  ></path>
                </svg>{" "}
                <span>500 Participants</span>
              </div>

              <div className="pt-4 border-t mt-4 border-gray-200">
                <ul className="space-y-2 text-gray-600 mb-4">
                  <li className="flex items-start">
                    <ChevronRight className="w-5 h-5 text-blue-600 mt-0.5 mr-2 flex-shrink-0" />
                    Professional guides
                  </li>
                  <li className="flex items-start">
                    <ChevronRight className="w-5 h-5 text-blue-600 mt-0.5 mr-2 flex-shrink-0" />
                    All meals during trek
                  </li>
                  <li className="flex items-start">
                    <ChevronRight className="w-5 h-5 text-blue-600 mt-0.5 mr-2 flex-shrink-0" />
                    Travel insurance
                  </li>
                  <li className="flex items-start">
                    <ChevronRight className="w-5 h-5 text-blue-600 mt-0.5 mr-2 flex-shrink-0" />
                    Domestic flights
                  </li>
                  <li className="flex items-start">
                    <ChevronRight className="w-5 h-5 text-blue-600 mt-0.5 mr-2 flex-shrink-0" />
                    Accommodation
                  </li>
                </ul>
                <p className="text-lg font-bold space-x-2 mb-3">
                  <span>Starting at </span>
                  <span className="text-2xl text-blue-700">/ ₹45,000</span>
                </p>

                <Link href={`/booking/${data?.data[0]?.id}`}>
                  <button className="w-full bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white py-3 rounded-sm font-semibold transition duration-300 shadow-md">
                    Book Now
                  </button>
                </Link>

              </div>

              <div className="bg-blue-50 p-3 rounded-sm mt-4 border border-blue-200">
                <h4 className="font-bold text-blue-800 mb-1">Special Offer</h4>
                <p className="text-sm text-blue-600">
                  Early bird discount: 10% off until Aug 06, 2025
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>


    </div>
  );
};

export default EverestClimateCampaign;
