import Link from "next/link";
import { Car } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const footerLinks = {
  Fleet: [
    { name: "Sports Cars", href: "/fleet" },
    { name: "Electric", href: "/fleet" },
    { name: "SUVs", href: "/fleet" },
    { name: "Sedans", href: "/fleet" },
  ],
  Company: [
    { name: "About Us", href: "/about" },
    { name: "Contact", href: "/contact" },
    { name: "Careers", href: "#" },
  ],
  Legal: [
    { name: "Terms", href: "#" },
    { name: "Privacy", href: "#" },
    { name: "Cookies", href: "#" },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-white/[0.06]">
      <div className="max-w-[1440px] mx-auto px-8 pt-16 pb-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5 mb-5">
              <svg width="32" height="14" viewBox="0 0 48 20" fill="none" className="text-white/60">
                <path d="M4 14 C4 14, 8 6, 16 4 C20 3, 28 3, 32 4 C40 6, 44 14, 44 14" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" />
              </svg>
              <span className="font-display text-lg tracking-wider text-white/70">
                PrimeDrive
              </span>
            </div>
            <p className="text-sm text-white/25 leading-relaxed">
              Drive in style, travel with confidence.
            </p>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-[13px] font-medium tracking-wider uppercase text-white/30 mb-4">
                {title}
              </h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/25 hover:text-white/60 transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Separator className="my-10 bg-white/[0.04]" />

        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-white/20">
            &copy; {new Date().getFullYear()} PrimeDrive. All rights reserved.
          </p>
          <div className="flex gap-6">
            {["Twitter", "Instagram", "LinkedIn"].map((s) => (
              <a key={s} href="#" className="text-xs text-white/20 hover:text-white/50 transition-colors">
                {s}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
