"use client";

import Image from "next/image";
import React from "react";

interface TitleDescProps {
  title: string;
  desc: string;
  img?: string | null
}

const TitleDesc: React.FC<TitleDescProps> = ({ title, desc, img }) => {
  return (
    <div className="w-full px-6 text-center bg-[#0548da] mt-[55px] overflow-x-hidden relative py-8 sm:py-20">
      {img && (
        <Image fill alt="Banner" src={img} className="object-cover opacity-30" />
      )}
      <div className="text-white relative z-[40] py-16 max-w-2xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">{title}</h1>
        <p className="text-base md:text-lg mb-4 mx-auto">{desc}</p>
      </div>


      <div className="absolute bottom-0 right-0 w-full">
        <svg xmlns="http://www.w3.org/2000/svg" className="scale-x-105 fill-transparent stroke-blue-500" viewBox="0 0 1440 320"><path fillOpacity="1" d="M0,0L14.1,21.3C28.2,43,56,85,85,96C112.9,107,141,85,169,74.7C197.6,64,226,64,254,69.3C282.4,75,311,85,339,101.3C367.1,117,395,139,424,133.3C451.8,128,480,96,508,80C536.5,64,565,64,593,85.3C621.2,107,649,149,678,181.3C705.9,213,734,235,762,234.7C790.6,235,819,213,847,186.7C875.3,160,904,128,932,106.7C960,85,988,75,1016,85.3C1044.7,96,1073,128,1101,128C1129.4,128,1158,96,1186,101.3C1214.1,107,1242,149,1271,160C1298.8,171,1327,149,1355,165.3C1383.5,181,1412,235,1426,261.3L1440,288L1440,320L1425.9,320C1411.8,320,1384,320,1355,320C1327.1,320,1299,320,1271,320C1242.4,320,1214,320,1186,320C1157.6,320,1129,320,1101,320C1072.9,320,1045,320,1016,320C988.2,320,960,320,932,320C903.5,320,875,320,847,320C818.8,320,791,320,762,320C734.1,320,706,320,678,320C649.4,320,621,320,593,320C564.7,320,536,320,508,320C480,320,452,320,424,320C395.3,320,367,320,339,320C310.6,320,282,320,254,320C225.9,320,198,320,169,320C141.2,320,113,320,85,320C56.5,320,28,320,14,320L0,320Z"></path></svg>      </div>


    </div>
  );
};

export default TitleDesc;
