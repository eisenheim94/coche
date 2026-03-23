import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Clock, Fuel, Users } from "lucide-react";
import type { Car } from "@/data/cars";

export function CarCard({ car }: { car: Car }) {
  return (
    <Link href={`/fleet/${car.id}`} className="group block">
      <div className="relative rounded-2xl overflow-hidden bg-white/[0.02] border border-white/[0.06] transition-all duration-500 hover:border-white/[0.12] hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
        {/* Image */}
        <div className="relative aspect-[16/10] overflow-hidden">
          <Image
            src={car.image}
            alt={car.name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

          {/* Category tag */}
          <div className="absolute top-4 left-4">
            <span className="glass text-[11px] font-medium tracking-wider uppercase text-white/80 px-3 py-1.5 rounded-full">
              {car.category}
            </span>
          </div>

          {/* Arrow */}
          <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/0 border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:bg-white/10 transition-all duration-300">
            <ArrowUpRight className="w-4 h-4 text-white" />
          </div>

          {/* Bottom overlay info */}
          <div className="absolute bottom-0 left-0 right-0 p-5">
            <h3 className="font-display text-xl font-light text-white tracking-wide">
              {car.name}
            </h3>
            <div className="flex items-center gap-4 mt-2">
              <span className="flex items-center gap-1.5 text-[12px] text-white/50">
                <Fuel className="w-3 h-3" />
                {car.specs.hp}
              </span>
              <span className="flex items-center gap-1.5 text-[12px] text-white/50">
                <Clock className="w-3 h-3" />
                {car.specs.acceleration}
              </span>
              <span className="flex items-center gap-1.5 text-[12px] text-white/50">
                <Users className="w-3 h-3" />
                {car.specs.seats}
              </span>
            </div>
          </div>
        </div>

        {/* Price footer */}
        <div className="px-5 py-4 flex items-center justify-between">
          <div>
            <span className="text-lg font-semibold text-white">
              ${car.price}
            </span>
            <span className="text-sm text-white/30 ml-1">/day</span>
          </div>
          <span className="text-[13px] text-white/40 group-hover:text-white/70 transition-colors">
            View Details →
          </span>
        </div>
      </div>
    </Link>
  );
}
