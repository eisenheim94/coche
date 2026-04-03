import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  Cog,
  Fuel,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CarCard } from "@/components/car-card";
import { GalleryCarousel } from "@/components/gallery-carousel";
import { cars } from "@/data/cars";

export function generateStaticParams() {
  return cars.map((car) => ({ id: String(car.id) }));
}

export default function CarDetailPage({ params }: { params: { id: string } }) {
  const car = cars.find((c) => c.id === Number(params.id));
  if (!car) notFound();

  const similar = cars
    .filter((c) => c.id !== car.id && c.category === car.category)
    .slice(0, 3);

  const specs = [
    { icon: Fuel, label: "Consumption", value: car.specs.consumption },
    { icon: Cog, label: "Transmission", value: car.specs.transmission },
    { icon: Users, label: "Seats", value: String(car.specs.seats) },
    { icon: Fuel, label: "Fuel", value: car.specs.fuel },
  ];

  return (
    <>
      {/* Hero image */}
      <section className="relative h-[60vh] min-h-[450px] overflow-hidden">
        <Image
          src={car.image}
          alt={car.name}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-black/20" />

        {/* Breadcrumb */}
        <div className="absolute top-24 left-0 right-0 z-10">
          <div className="max-w-[1440px] mx-auto px-8">
            <div className="flex items-center gap-2 text-sm text-white/50">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <ChevronRight className="w-3 h-3" />
              <Link href="/fleet" className="hover:text-white transition-colors">Fleet</Link>
              <ChevronRight className="w-3 h-3" />
              <span className="text-white">{car.name}</span>
            </div>
          </div>
        </div>

        {/* Category + name overlay */}
        <div className="absolute bottom-10 left-0 right-0 z-10">
          <div className="max-w-[1440px] mx-auto px-8">
            <span className="glass text-[11px] font-medium tracking-wider uppercase text-white/80 px-3 py-1.5 rounded-full inline-block mb-4">
              {car.category}
            </span>
            <h1 className="font-display italic font-light text-5xl sm:text-6xl tracking-tight">
              {car.name}
            </h1>
            <p className="text-white/40 mt-2">{car.year} Model</p>
          </div>
        </div>
      </section>

      {/* Details */}
      <section className="py-16">
        <div className="max-w-[1440px] mx-auto px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            {/* Left: Description + Specs */}
            <div className="lg:col-span-3">
              <p className="text-white/50 text-[15px] leading-relaxed mb-10 max-w-2xl">
                {car.description}
              </p>

              {/* Specs row */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12">
                {specs.map((spec) => (
                  <div
                    key={spec.label}
                    className="glass rounded-2xl p-5 text-center"
                  >
                    <spec.icon className="w-5 h-5 text-white/40 mx-auto mb-2" />
                    <div className="font-semibold text-sm">{spec.value}</div>
                    <div className="text-[11px] text-white/30 mt-0.5">
                      {spec.label}
                    </div>
                  </div>
                ))}
              </div>

              {/* Features */}
              <h3 className="text-[13px] uppercase tracking-[0.2em] text-white/40 mb-5">
                Included
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  "Free cancellation up to 24h",
                  "Comprehensive insurance",
                  "Unlimited mileage",
                  "24/7 roadside assistance",
                  "Doorstep delivery",
                  "Full tank of fuel",
                ].map((f) => (
                  <div key={f} className="flex items-center gap-3 text-sm text-white/50">
                    <CheckCircle2 className="w-4 h-4 text-white/30 shrink-0" />
                    {f}
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Booking card */}
            <div className="lg:col-span-2">
              <div className="lg:sticky lg:top-28">
                <Card className="p-8 bg-white/[0.03] border-white/[0.08] rounded-2xl">
                  <div className="flex items-end justify-between mb-8">
                    <div>
                      <p className="text-[13px] text-white/40 mb-1">Daily Rate</p>
                      <div className="text-4xl font-light">
                        ${car.price}
                        <span className="text-lg text-white/30 ml-1">/day</span>
                      </div>
                    </div>
                  </div>

                  <Link href={`/booking?id=${car.id}`}>
                    <Button size="lg" className="w-full text-[15px]">
                      Book This Vehicle
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </Link>

                  <Separator className="my-6 bg-white/[0.06]" />

                  <div className="space-y-3">
                    {[
                      "Free cancellation up to 24h before",
                      "Comprehensive insurance included",
                      "Unlimited mileage",
                      "24/7 roadside assistance",
                    ].map((feature) => (
                      <div
                        key={feature}
                        className="flex items-center gap-2.5 text-[13px] text-white/40"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-white/25 shrink-0" />
                        {feature}
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            </div>
          </div>

          {/* Photo Gallery Carousel */}
          {car.galleryImages.length > 0 && (
            <div className="mt-24">
              <p className="text-[13px] uppercase tracking-[0.2em] text-white/40 mb-3">
                Gallery
              </p>
              <h2 className="font-display italic font-light text-3xl tracking-tight mb-8">
                Photo Collection
              </h2>
              <GalleryCarousel images={car.galleryImages} alt={car.name} />
            </div>
          )}

          {/* Similar */}
          {similar.length > 0 && (
            <div className="mt-24">
              <p className="text-[13px] uppercase tracking-[0.2em] text-white/40 mb-3">
                You May Also Like
              </p>
              <h2 className="font-display italic font-light text-3xl tracking-tight mb-8">
                Similar Vehicles
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {similar.map((c) => (
                  <CarCard key={c.id} car={c} />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
