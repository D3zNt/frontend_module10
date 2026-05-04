"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export const Navbar = () => {
  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const router = useRouter();

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

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/");
  };

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-transform duration-300 ${
        show ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="backdrop-blur-xl bg-white/5 border-b border-white/10 shadow-lg">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
          

          <Link
            href="/store"
            className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 text-transparent bg-clip-text"
          >
            🛒 MyStore
          </Link>


          <div className="hidden md:flex items-center gap-8 text-sm text-slate-300">
            <Link href="/shop" className="hover:text-cyan-400 transition">
              Shop
            </Link>
            <Link href="/cart" className="hover:text-cyan-400 transition">
              Cart
            </Link>
            <Link href="/shop" className="hover:text-cyan-400 transition">
              Profile
            </Link>
          </div>


          <div className="flex items-center gap-4">
            

            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-xl text-sm font-semibold text-slate-900 bg-gradient-to-r from-cyan-400 to-purple-400 hover:from-cyan-300 hover:to-purple-300 transition active:scale-95"
            >
              Logout
            </button>

          </div>
        </div>
      </div>
    </nav>
  );
};