"use client";

import { usePathname } from "next/navigation";
import Navbar from "./common/navbar/Navbar";
import Footer from "../components/common/footer/new-footer";
import MobileNavbar from "./common/navbar/mobileNavbar";

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
    </>
  );
}
