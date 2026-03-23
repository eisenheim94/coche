"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { CarCard } from "@/components/car-card";
import { cars, categories } from "@/data/cars";
import { cn } from "@/lib/utils";

export default function FleetPage() {
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("featured");
  const [maxPrice, setMaxPrice] = useState(500);

  const filtered = useMemo(() => {
    let result = [...cars];
    if (category !== "All") result = result.filter((c) => c.category === category);
    if (search) result = result.filter((c) => c.name.toLowerCase().includes(search.toLowerCase()));
    result = result.filter((c) => c.price <= maxPrice);

    switch (sort) {
      case "price-low": result.sort((a, b) => a.price - b.price); break;
      case "price-high": result.sort((a, b) => b.price - a.price); break;
      case "name": result.sort((a, b) => a.name.localeCompare(b.name)); break;
      default: result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }
    return result;
  }, [category, search, sort, maxPrice]);

  return (
    <>
      {/* Hero banner */}
      <section className="relative h-[45vh] min-h-[360px] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=1920&q=80"
            alt="Fleet collection"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-black/30" />
        </div>
        <div className="relative z-10 max-w-[1440px] mx-auto px-8 pb-10 w-full">
          <p className="text-[13px] uppercase tracking-[0.2em] text-white/40 mb-3">
            Premium Collection
          </p>
          <h1 className="font-display italic font-light text-5xl sm:text-6xl tracking-tight">
            Our Fleet
          </h1>
        </div>
      </section>

      {/* Filters */}
      <section className="sticky top-20 z-40 bg-background/80 backdrop-blur-nav border-b border-white/[0.06]">
        <div className="max-w-[1440px] mx-auto px-8 py-5">
          <div className="flex items-center justify-between gap-6 flex-wrap">
            <div className="flex gap-2 overflow-x-auto">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={cn(
                    "px-5 py-2 text-sm rounded-full transition-all whitespace-nowrap",
                    category === cat
                      ? "bg-white text-black font-medium"
                      : "text-white/40 hover:text-white hover:bg-white/5"
                  )}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="flex gap-3 items-center">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                <Input
                  placeholder="Search..."
                  className="pl-9 w-48 bg-white/5 border-white/10 rounded-full text-sm"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <select
                className="h-11 rounded-full bg-white/5 border border-white/10 px-4 text-sm text-white/70 focus:outline-none"
                value={sort}
                onChange={(e) => setSort(e.target.value)}
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price ↑</option>
                <option value="price-high">Price ↓</option>
                <option value="name">A → Z</option>
              </select>
            </div>
          </div>

          <div className="flex items-center gap-4 mt-4">
            <span className="text-xs text-white/30">Budget:</span>
            <input
              type="range"
              min={100}
              max={500}
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="flex-1 max-w-xs h-1 rounded-full appearance-none bg-white/10 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-background"
            />
            <span className="text-sm font-medium text-white/60 min-w-[90px]">
              Up to ${maxPrice}/day
            </span>
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="py-10 pb-28">
        <div className="max-w-[1440px] mx-auto px-8">
          <p className="text-sm text-white/30 mb-8">
            {filtered.length} vehicle{filtered.length !== 1 ? "s" : ""} available
          </p>

          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filtered.map((car) => (
                <CarCard key={car.id} car={car} />
              ))}
            </div>
          ) : (
            <div className="text-center py-24">
              <Search className="w-12 h-12 text-white/10 mx-auto mb-4" />
              <h3 className="font-display text-xl font-light mb-2">
                No vehicles found
              </h3>
              <p className="text-sm text-white/30">
                Try adjusting your filters
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
