"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, X, Globe, User } from "lucide-react";
import { cn } from "@/lib/utils";

const links = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <nav
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          scrolled
            ? "bg-black/60 border-b border-white/[0.06] backdrop-blur-nav"
            : "bg-transparent"
        )}
      >
        <div className="max-w-[1440px] mx-auto px-8 flex items-center justify-between h-20">
          {/* Left nav links */}
          <div className="hidden md:flex items-center gap-10">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-[15px] font-light tracking-wide transition-colors",
                  pathname === link.href
                    ? "text-white"
                    : "text-white/60 hover:text-white"
                )}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Center logo */}
          <Link
            href="/"
            className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center gap-0.5"
          >
            {/* Car silhouette icon */}
            <svg
              width="48"
              height="20"
              viewBox="0 0 48 20"
              fill="none"
              className="text-white"
            >
              <path
                d="M4 14 C4 14, 8 6, 16 4 C20 3, 28 3, 32 4 C40 6, 44 14, 44 14"
                stroke="currentColor"
                strokeWidth="1.5"
                fill="none"
                strokeLinecap="round"
              />
              <path
                d="M2 14 L46 14"
                stroke="currentColor"
                strokeWidth="1"
                opacity="0.4"
              />
            </svg>
            <span className="text-xl font-display font-semibold tracking-[0.15em] text-white">
              PrimeDrive
            </span>
          </Link>

          {/* Right actions */}
          <div className="hidden md:flex items-center gap-5">
            <button className="flex items-center gap-1.5 text-white/60 hover:text-white transition-colors text-sm">
              <Globe className="w-4 h-4" />
              <span>Eng</span>
            </button>
            <Link
              href="/fleet"
              className="text-white/60 hover:text-white transition-colors"
            >
              <User className="w-5 h-5" />
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden text-white/80"
            onClick={() => setMobileOpen(true)}
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-nav flex flex-col items-center justify-center gap-8 animate-fade-in">
          <button
            onClick={() => setMobileOpen(false)}
            className="absolute top-6 right-6 text-white/60 hover:text-white"
          >
            <X className="w-7 h-7" />
          </button>
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="text-3xl font-display font-light text-white/90 hover:text-white tracking-wide"
            >
              {link.name}
            </Link>
          ))}
          <Link
            href="/fleet"
            onClick={() => setMobileOpen(false)}
            className="text-3xl font-display font-light text-white/90 hover:text-white tracking-wide"
          >
            Fleet
          </Link>
        </div>
      )}
    </>
  );
}
