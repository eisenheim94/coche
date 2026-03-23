import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Heart, Shield, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative h-[55vh] min-h-[400px] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1920&q=80"
            alt="Luxury car showroom"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-black/30" />
        </div>
        <div className="relative z-10 max-w-[1440px] mx-auto px-8 pb-12 w-full">
          <p className="text-[13px] uppercase tracking-[0.2em] text-white/40 mb-3">
            Our Story
          </p>
          <h1 className="font-display italic font-light text-5xl sm:text-6xl lg:text-7xl tracking-tight max-w-2xl">
            Redefining Luxury Mobility
          </h1>
        </div>
      </section>

      {/* Story */}
      <section className="py-28">
        <div className="max-w-[1440px] mx-auto px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1000&q=80"
                alt="Luxury car"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <div className="absolute bottom-8 left-8">
                <div className="font-display italic text-6xl font-light text-white/80">
                  2018
                </div>
                <div className="text-sm text-white/40 mt-1">
                  Founded in Los Angeles
                </div>
              </div>
            </div>

            <div>
              <h2 className="font-display italic font-light text-4xl tracking-tight mb-8">
                Where It All Began
              </h2>
              <p className="text-white/40 leading-relaxed mb-5 text-[15px]">
                PrimeDrive was founded with a simple belief: renting a car
                should feel as extraordinary as owning one. We started with
                five premium vehicles and a commitment to white-glove service.
              </p>
              <p className="text-white/40 leading-relaxed text-[15px]">
                Today, our fleet spans over 50 handpicked luxury vehicles
                across multiple cities. Every car is meticulously maintained
                and inspected to ensure an impeccable experience.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20">
        <div className="max-w-[1440px] mx-auto px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {[
              { value: "50+", label: "Premium Vehicles" },
              { value: "12k+", label: "Happy Clients" },
              { value: "4", label: "City Locations" },
              { value: "4.9", label: "Star Rating" },
            ].map((stat) => (
              <div key={stat.label} className="glass rounded-2xl p-8 text-center">
                <div className="font-display italic text-4xl font-light">{stat.value}</div>
                <div className="text-sm text-white/30 mt-2">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-28">
        <div className="max-w-[1440px] mx-auto px-8">
          <div className="text-center mb-16">
            <p className="text-[13px] uppercase tracking-[0.2em] text-white/40 mb-3">Our Values</p>
            <h2 className="font-display italic font-light text-4xl sm:text-5xl tracking-tight">
              What Drives Us
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { icon: Star, title: "Excellence", desc: "Every detail matters. From the polish on our vehicles to the precision of our service." },
              { icon: Shield, title: "Trust", desc: "Transparency in pricing, integrity in service, and accountability at every step." },
              { icon: Heart, title: "Passion", desc: "We're car enthusiasts at heart. That passion shines through in everything we do." },
            ].map((v) => (
              <Card key={v.title} className="p-8 bg-white/[0.02] border-white/[0.06] rounded-2xl hover:-translate-y-1 transition-all duration-300">
                <div className="w-14 h-14 rounded-2xl glass flex items-center justify-center mb-6">
                  <v.icon className="w-6 h-6 text-white/50" strokeWidth={1.5} />
                </div>
                <h3 className="font-medium text-lg mb-3">{v.title}</h3>
                <p className="text-sm text-white/40 leading-relaxed">{v.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20">
        <div className="max-w-3xl mx-auto px-8">
          <div className="text-center mb-14">
            <p className="text-[13px] uppercase tracking-[0.2em] text-white/40 mb-3">Leadership</p>
            <h2 className="font-display italic font-light text-4xl tracking-tight">Meet the Team</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {[
              { initials: "AR", name: "Alexander Reed", role: "Founder & CEO" },
              { initials: "SC", name: "Sofia Chen", role: "Head of Operations" },
              { initials: "MJ", name: "Marcus Johnson", role: "Fleet Director" },
            ].map((p) => (
              <div key={p.name} className="glass rounded-2xl p-8 text-center hover:-translate-y-1 transition-all duration-300">
                <div className="w-20 h-20 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-4 text-2xl font-light text-white/60">
                  {p.initials}
                </div>
                <h3 className="font-medium text-sm">{p.name}</h3>
                <p className="text-xs text-white/30 mt-1">{p.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=1920&q=80"
            alt="Car collection"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/65" />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto px-8 text-center">
          <h2 className="font-display italic font-light text-4xl sm:text-5xl tracking-tight mb-6">
            Join the PrimeDrive Experience
          </h2>
          <p className="text-white/40 text-lg mb-10 max-w-md mx-auto">
            Browse our fleet and book your next extraordinary ride.
          </p>
          <Link href="/fleet">
            <Button size="lg">
              Explore Our Fleet <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </section>
    </>
  );
}
