"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { User } from "lucide-react";
import { cn } from "@/lib/utils";

const links = [
  { name: "Home", href: "/" },
  { name: "Fleet", href: "/fleet" },
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

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "";
      };
    }

    document.body.style.overflow = "";
  }, [mobileOpen]);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 lg:px-8 pt-4">
      <div className="max-w-[1440px] mx-auto relative">
        <nav
          className={cn(
            "relative z-20 rounded-2xl border border-white/[0.08] bg-black/[0.22] px-6 transition-[background-color,border-color,box-shadow] duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]",
            scrolled
              ? "bg-black/60 shadow-[0_24px_80px_rgba(0,0,0,0.28)] backdrop-blur-nav"
              : "shadow-[0_10px_30px_rgba(0,0,0,0.16)] backdrop-blur-nav"
          )}
        >
          <div className="pr-0 pl-0 lg:pr-3 lg:pl-6 flex items-center justify-between h-16">
          {/* Left nav links */}
          <div className="hidden md:flex items-center gap-4 lg:gap-10">
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
            className="absolute left-1/2 -translate-x-1/2"
          >
            <span className="text-xl font-display font-semibold tracking-[0.15em] text-white">
              PrimeDrive
            </span>
          </Link>

          {/* Right actions */}
          <div className="hidden md:flex items-center">
            <Link
              href="/fleet"
              className="text-white/60 hover:text-white transition-colors"
            >
              <User className="w-5 h-5" />
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden -mr-1 ml-auto relative flex h-10 w-10 items-center justify-center text-white/80 transition-[transform,color] duration-150 ease-out hover:text-white active:scale-[0.97]"
            onClick={() => setMobileOpen((open) => !open)}
            aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-navigation"
          >
            <span className="relative h-4 w-5">
              <span
                className={cn(
                  "absolute left-0 top-0 h-px w-5 origin-center bg-current transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]",
                  mobileOpen ? "translate-y-[7px] rotate-45" : "translate-y-[3px]"
                )}
              />
              <span
                className={cn(
                  "absolute left-0 top-1/2 h-px w-5 -translate-y-1/2 bg-current transition-opacity duration-200 ease-out",
                  mobileOpen ? "opacity-0" : "opacity-100"
                )}
              />
              <span
                className={cn(
                  "absolute left-0 bottom-0 h-px w-5 origin-center bg-current transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]",
                  mobileOpen ? "-translate-y-[7px] -rotate-45" : "-translate-y-[3px]"
                )}
              />
            </span>
          </button>
          </div>
        </nav>
        <div
          id="mobile-navigation"
          className={cn(
            "md:hidden absolute left-0 right-0 top-[calc(100%+0.75rem)] z-10 px-2",
            mobileOpen
              ? "pointer-events-auto"
              : "pointer-events-none"
          )}
          aria-hidden={!mobileOpen}
        >
          <div
            className={cn(
              "overflow-hidden rounded-2xl border px-5 py-5 backdrop-blur-nav transition-[background-color,border-color,box-shadow,transform,opacity] duration-300 ease-out",
              scrolled
                ? "border-white/[0.08] bg-black/60 shadow-[0_24px_80px_rgba(0,0,0,0.28)]"
                : "border-white/[0.08] bg-black/[0.22] shadow-[0_10px_30px_rgba(0,0,0,0.16)]",
              mobileOpen
                ? "translate-y-0 opacity-100"
                : "-translate-y-3 opacity-0"
            )}
          >
            <div className="flex flex-col gap-2">
              {links.map((link, index) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "flex items-center rounded-xl px-4 py-4 text-[1.1rem] font-light tracking-[0.04em] text-white/72 transition-[transform,opacity,background-color,color] duration-300 ease-out active:scale-[0.985]",
                    mobileOpen
                      ? "translate-y-0 opacity-100"
                      : "-translate-y-2 opacity-0",
                    pathname === link.href
                      ? "bg-white/[0.08] text-white"
                      : "hover:bg-white/[0.05] hover:text-white"
                  )}
                  style={{
                    transitionDelay: mobileOpen ? `${90 + index * 45}ms` : "0ms",
                  }}
                >
                  <span>{link.name}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
