"use client";

import { useState } from "react";
import Image from "next/image";
import { CheckCircle2, Clock, Mail, MapPin, Phone, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <>
      {/* Hero */}
      <section className="relative h-[45vh] min-h-[360px] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1619767886558-efdc259cde1a?w=1920&q=80"
            alt="Contact"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-black/30" />
        </div>
        <div className="relative z-10 max-w-[1440px] mx-auto px-8 pb-10 w-full">
          <p className="text-[13px] uppercase tracking-[0.2em] text-white/40 mb-3">
            Get in Touch
          </p>
          <h1 className="font-display italic font-light text-5xl sm:text-6xl tracking-tight">
            Contact Us
          </h1>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 pb-28">
        <div className="max-w-[1440px] mx-auto px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
            {/* Info cards */}
            <div className="lg:col-span-2 space-y-4">
              {[
                { icon: MapPin, title: "Main Office", lines: ["123 Luxury Lane, Suite 500", "Los Angeles, CA 90001"] },
                { icon: Phone, title: "Phone", lines: ["+1 (310) 555-0199", "Available 24/7"] },
                { icon: Mail, title: "Email", lines: ["hello@primedrive.com", "We respond within 2 hours"] },
                { icon: Clock, title: "Hours", lines: ["Mon–Fri: 8 AM – 8 PM", "Sat–Sun: 9 AM – 6 PM"] },
              ].map((info) => (
                <div key={info.title} className="glass rounded-2xl p-5">
                  <div className="flex gap-4">
                    <div className="w-11 h-11 rounded-xl bg-white/5 flex items-center justify-center shrink-0">
                      <info.icon className="w-5 h-5 text-white/40" />
                    </div>
                    <div>
                      <h3 className="font-medium text-sm mb-1">{info.title}</h3>
                      {info.lines.map((line) => (
                        <p key={line} className="text-sm text-white/40 leading-relaxed">{line}</p>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Contact form */}
            <div className="lg:col-span-3">
              <Card className="p-8 bg-white/[0.02] border-white/[0.06] rounded-2xl">
                {!submitted ? (
                  <>
                    <h2 className="font-display text-xl font-light mb-2">Send a Message</h2>
                    <p className="text-sm text-white/30 mb-8">We&apos;ll get back to you shortly.</p>
                    <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="space-y-6">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-[13px] text-white/40 block mb-2">First Name</label>
                          <Input placeholder="John" required className="bg-white/[0.03] border-white/10 rounded-xl" />
                        </div>
                        <div>
                          <label className="text-[13px] text-white/40 block mb-2">Last Name</label>
                          <Input placeholder="Doe" required className="bg-white/[0.03] border-white/10 rounded-xl" />
                        </div>
                      </div>
                      <div>
                        <label className="text-[13px] text-white/40 block mb-2">Email</label>
                        <Input type="email" placeholder="john@example.com" required className="bg-white/[0.03] border-white/10 rounded-xl" />
                      </div>
                      <div>
                        <label className="text-[13px] text-white/40 block mb-2">Subject</label>
                        <select className="flex h-12 w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 text-sm text-white/70 focus:outline-none focus:border-white/30">
                          <option>General Inquiry</option>
                          <option>Booking Question</option>
                          <option>Fleet Information</option>
                          <option>Corporate Rentals</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-[13px] text-white/40 block mb-2">Message</label>
                        <textarea rows={5} placeholder="How can we help?" required className="flex w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white/70 focus:outline-none focus:border-white/30 resize-y" />
                      </div>
                      <Button type="submit" size="lg" className="w-full">
                        Send Message <Send className="w-4 h-4" />
                      </Button>
                    </form>
                  </>
                ) : (
                  <div className="text-center py-14">
                    <div className="w-16 h-16 rounded-full glass flex items-center justify-center mx-auto mb-6">
                      <CheckCircle2 className="w-8 h-8 text-white/60" />
                    </div>
                    <h3 className="font-display text-2xl font-light mb-2">Message Sent</h3>
                    <p className="text-sm text-white/30">We&apos;ll get back to you within 2 hours.</p>
                  </div>
                )}
              </Card>
            </div>
          </div>

          {/* Locations */}
          <div className="mt-20">
            <p className="text-[13px] uppercase tracking-[0.2em] text-white/40 mb-3">Locations</p>
            <h2 className="font-display italic font-light text-3xl tracking-tight mb-8">Find Us</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { city: "LOS ANGELES", name: "Downtown", address: "123 Luxury Lane\nSuite 500" },
                { city: "LOS ANGELES", name: "LAX Airport", address: "Terminal 1\nArrivals Level" },
                { city: "BEVERLY HILLS", name: "Rodeo Drive", address: "456 Rodeo Drive" },
                { city: "SANTA MONICA", name: "Pacific Coast", address: "789 Ocean Ave" },
              ].map((loc) => (
                <div key={loc.name} className="glass rounded-2xl p-5 hover:-translate-y-1 transition-all duration-300">
                  <div className="text-[11px] font-medium tracking-wider text-white/30 mb-1">{loc.city}</div>
                  <h3 className="font-medium text-sm mb-2">{loc.name}</h3>
                  <p className="text-xs text-white/30 whitespace-pre-line leading-relaxed">{loc.address}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
