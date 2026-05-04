"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export const Navbar = () => {
  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (Math.abs(currentScrollY - lastScrollY) < 40) return;

      if (currentScrollY > lastScrollY) {
        setShow(false); 
      } else {
        setShow(true); 
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <nav
      className={`fixed top-0 w-full z-50 bg-[#1a0f24] shadow-md transition-transform duration-300 ${
        show ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between p-4">
        <Link href="/" className="hover:text-blue-600">
          <img
            src="/chatime-stacked-white-YLD3ICQX.svg"
            alt="Chatime Logo"
            className="h-10 w-auto"
          />
        </Link>

        <div className="hidden md:flex space-x-4 text-white">
          <Link href="/" className="hover:text-[#CBE896] transition-colors" >login</Link>
          <Link href="/" className="hover:text-[#CBE896] transition-colors">Stores</Link>
          <Link href="#about" className="hover:text-[#CBE896] transition-colors">About Us</Link>
          <Link href="#franchise" className="hover:text-[#CBE896] transition-colors">Franchise</Link>
        </div>

        <div className="hidden md:flex space-x-4">
          <div className="bg-[#2d1b3d] p-3 rounded-full hover:bg-[#CBE896] transition-all cursor-pointer group">
              <span className="sr-only">Instagram</span>
              <Link href="https://www.instagram.com/chatimeusa/">
              <img
                src="/instagram.svg"
                alt="instagram"
                className="w-5 h-5 transition-all group-hover:invert-100"
              />
              </Link>
            </div>

            <div className="bg-[#2d1b3d] p-3 rounded-full hover:bg-[#CBE896] transition-all cursor-pointer group">
              <span className="sr-only">TikTok</span>
              <Link href="https://www.tiktok.com/@chatimeusa">
              <img
                src="/tiktok.svg"
                alt="tiktok"
                className="w-5 h-5 transition-all group-hover:invert-100"
              />
              </Link>
            </div>

            <div className="bg-[#2d1b3d] p-3 rounded-full hover:bg-[#CBE896] transition-all cursor-pointer group">
              <span className="sr-only">LinkedIn</span>
              <Link href="https://www.linkedin.com/company/chatime/">
              <img
                src="/linkedin.svg"
                alt="linkedin"
                className="w-5 h-5 transition-all group-hover:invert-100"
              />
              </Link>
            </div>

            <div className="bg-[#2d1b3d] p-3 rounded-full hover:bg-[#CBE896] transition-all cursor-pointer group">
              <span className="sr-only">Facebook</span>
              <Link href="https://www.facebook.com/ChatimeUSA">
              <img
                src="/facebook.svg"
                alt="facebook"
                className="w-5 h-5 transition-all group-hover:invert-100"
              />
              </Link>
            </div>
        </div>
      </div>
    </nav>
  );
};