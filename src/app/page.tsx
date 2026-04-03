import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Calendar,
  MapPin,
  Phone,
  Search,
  Shield,
  Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CarCard } from "@/components/car-card";
import { BookingBar } from "@/components/booking-bar";
import { HeroSlider } from "@/components/hero-slider";
import { cars } from "@/data/cars";

export default function HomePage() {
  const featured = cars.filter((c) => c.featured).slice(0, 6);

  return (
    <>
      {/* ━━━ HERO — Full viewport cinematic ━━━ */}
      <section className="relative h-screen flex flex-col overflow-x-hidden">
        {/* Background — auto-cycling hero images */}
        <div className="absolute inset-0">
          <HeroSlider />
          {/* Overlays */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/80" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent" />
        </div>

        {/* Explore all cars link — floating right */}
        <div className="absolute right-10 top-1/2 -translate-y-1/2 z-10 hidden lg:flex items-center gap-3">
          <Link
            href="/fleet"
            className="flex items-center gap-3 text-white/70 hover:text-white transition-colors group"
          >
            <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:border-white/50 transition-colors">
              <ArrowRight className="w-5 h-5" />
            </div>
            <span className="text-[15px] tracking-wide">Explore all cars</span>
          </Link>
        </div>

        {/* Bottom content */}
        <div className="relative z-10 mt-auto pb-8 px-6">
          <div className="max-w-[1440px] mx-auto">
            {/* Headline */}
            <h1 className="font-display italic font-light text-5xl sm:text-6xl lg:text-7xl text-white tracking-tight mb-8 max-w-3xl">
              Drive in Style, Travel with Confidence
            </h1>

            {/* Booking bar — interactive glass morphism */}
            <BookingBar />
          </div>
        </div>
      </section>

      {/* ━━━ FEATURED FLEET ━━━ */}
      <section className="py-28">
        <div className="max-w-[1440px] mx-auto px-8">
          <div className="flex items-end justify-between mb-14">
            <div>
              <p className="text-[13px] uppercase tracking-[0.2em] text-white/40 mb-3">
                Our Collection
              </p>
              <h2 className="font-display italic font-light text-4xl sm:text-5xl tracking-tight">
                Featured Vehicles
              </h2>
            </div>
            <Link href="/fleet">
              <Button variant="outline" className="hidden sm:inline-flex">
                View All
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {featured.map((car) => (
              <CarCard key={car.id} car={car} />
            ))}
          </div>

          <div className="text-center mt-10 sm:hidden">
            <Link href="/fleet">
              <Button variant="outline">
                View All Vehicles
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ━━━ CINEMATIC SPLIT — Why Choose Us ━━━ */}
      <section className="relative py-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[80vh]">
          {/* Left image */}
          <div className="relative min-h-[50vh] lg:min-h-full">
            <Image
              src="/images/luxury.jpg"
              alt="Luxury car at sunset"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-background/50 hidden lg:block" />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent lg:hidden" />
          </div>

          {/* Right content */}
          <div className="flex flex-col justify-center px-8 lg:px-20 py-20">
            <p className="text-[13px] uppercase tracking-[0.2em] text-white/40 mb-4">
              The Experience
            </p>
            <h2 className="font-display italic font-light text-4xl sm:text-5xl tracking-tight mb-8">
              Luxury Beyond <br />the Drive
            </h2>
            <p className="text-white/50 leading-relaxed mb-12 max-w-md text-[15px]">
              We don&apos;t just rent cars — we curate moments. Every vehicle is
              meticulously detailed and delivered to your doorstep, so your
              journey begins the moment you decide.
            </p>

            <div className="space-y-8">
              {[
                {
                  icon: Shield,
                  title: "Full Insurance Coverage",
                  desc: "Comprehensive protection included with every rental.",
                },
                {
                  icon: MapPin,
                  title: "Doorstep Delivery",
                  desc: "We bring the car to you — airport, hotel, or home.",
                },
                {
                  icon: Phone,
                  title: "24/7 Concierge",
                  desc: "Round-the-clock personal support for anything you need.",
                },
              ].map((item) => (
                <div key={item.title} className="flex gap-5">
                  <div className="w-12 h-12 rounded-2xl glass flex items-center justify-center shrink-0">
                    <item.icon className="w-5 h-5 text-white/70" />
                  </div>
                  <div>
                    <h4 className="font-medium text-[15px] mb-1">
                      {item.title}
                    </h4>
                    <p className="text-sm text-white/40">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ━━━ HOW IT WORKS ━━━ */}
      <section className="py-28">
        <div className="max-w-[1440px] mx-auto px-8">
          <div className="text-center mb-16">
            <p className="text-[13px] uppercase tracking-[0.2em] text-white/40 mb-3">
              Simple Process
            </p>
            <h2 className="font-display italic font-light text-4xl sm:text-5xl tracking-tight">
              How It Works
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
            {/* Connecting line */}
            <div className="hidden md:block absolute top-14 left-[16.66%] right-[16.66%] h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

            {[
              {
                icon: Search,
                step: "01",
                title: "Choose Your Car",
                desc: "Browse our curated collection and find the perfect vehicle for your journey.",
              },
              {
                icon: Calendar,
                step: "02",
                title: "Pick Your Dates",
                desc: "Select pickup and return dates with flexible scheduling options.",
              },
              {
                icon: CheckCircle2,
                step: "03",
                title: "Hit the Road",
                desc: "We'll deliver the car to your doorstep, detailed and ready to go.",
              },
            ].map((item) => (
              <Card
                key={item.step}
                className="relative z-10 p-8 text-center bg-white/[0.02] border-white/[0.06] hover:bg-white/[0.04] hover:-translate-y-1"
              >
                <div className="w-16 h-16 rounded-2xl glass flex items-center justify-center mx-auto mb-6">
                  <item.icon className="w-7 h-7 text-white/70" />
                </div>
                <div className="text-[11px] font-semibold text-white/30 tracking-[0.25em] mb-3">
                  STEP {item.step}
                </div>
                <h3 className="font-medium text-lg mb-2">{item.title}</h3>
                <p className="text-sm text-white/40 leading-relaxed">
                  {item.desc}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━ TESTIMONIAL ━━━ */}
      <section className="py-20">
        <div className="max-w-3xl mx-auto px-8 text-center">
          <div className="flex justify-center gap-1.5 mb-8">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-white/80 text-white/80" />
            ))}
          </div>
          <blockquote className="font-display italic font-light text-2xl sm:text-3xl text-white/90 leading-relaxed mb-8">
            &ldquo;An absolutely extraordinary experience. The car was
            immaculate, the service impeccable. This is how luxury should
            feel.&rdquo;
          </blockquote>
          <div className="flex items-center justify-center gap-4">
            <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-sm font-medium">
              JR
            </div>
            <div className="text-left">
              <div className="font-medium text-sm">James Richardson</div>
              <div className="text-xs text-white/40">CEO, Meridian Group</div>
            </div>
          </div>
        </div>
      </section>

      {/* ━━━ CTA — Full bleed ━━━ */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/hero-3.jpg"
            alt="Luxury car on road"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto px-8 text-center">
          <h2 className="font-display italic font-light text-4xl sm:text-5xl lg:text-6xl tracking-tight mb-6">
            Ready for the Ride of Your Life?
          </h2>
          <p className="text-white/50 text-lg mb-10 max-w-md mx-auto">
            Join thousands who&apos;ve chosen PrimeDrive for their premium
            rental experience.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/fleet">
              <Button size="lg">
                Browse Fleet
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline" size="lg">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
