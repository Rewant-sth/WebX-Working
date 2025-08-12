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
  const pathname = usePathname();
  const is404 =
    pathname === "/not-found" || pathname === "/404" || pathname === "/test" || pathname.startsWith("/booking");

  return (
    <>
      {/* <div className="hidden lg:block"> {!is404 && <Navbar />}</div>
      <div className="lg:hidden">
        {" "}
        <MobileNavbar />
      </div> */}
      {children}
      {/* {!is404 && <Footer />} */}
    </>
  );
}
