"use client";

import { useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Check,
  CheckCircle2,
  ChevronLeft,
  Navigation,
  Shield,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { cars } from "@/data/cars";
import { cn } from "@/lib/utils";

const addons = [
  { id: "gps", name: "GPS Navigation", desc: "Premium navigation system", price: 15, icon: Navigation },
  { id: "child", name: "Child Seat", desc: "Safety-certified seat", price: 20, icon: User },
  { id: "insurance", name: "Premium Insurance", desc: "Zero-deductible coverage", price: 25, icon: Shield },
];

export default function BookingPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-white/30 text-sm">Loading...</div>
        </div>
      }
    >
      <BookingContent />
    </Suspense>
  );
}

function BookingContent() {
  const searchParams = useSearchParams();
  const carId = Number(searchParams.get("id")) || 1;
  const car = cars.find((c) => c.id === carId) || cars[0];

  const [step, setStep] = useState(1);
  const [pickup, setPickup] = useState("");
  const [dropoff, setDropoff] = useState("");
  const [selectedAddons, setSelectedAddons] = useState<Record<string, boolean>>({});
  const [confirmed, setConfirmed] = useState(false);

  const days = useMemo(() => {
    if (!pickup || !dropoff) return 0;
    return Math.max(1, Math.ceil((new Date(dropoff).getTime() - new Date(pickup).getTime()) / 86400000));
  }, [pickup, dropoff]);

  const addonTotal = useMemo(() => {
    return addons.reduce((sum, a) => sum + (selectedAddons[a.id] ? a.price * Math.max(days, 1) : 0), 0);
  }, [selectedAddons, days]);

  const total = days * car.price + addonTotal;
  const today = new Date().toISOString().split("T")[0];

  if (confirmed) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6">
        <div className="max-w-md text-center">
          <div className="w-20 h-20 rounded-full glass flex items-center justify-center mx-auto mb-8">
            <CheckCircle2 className="w-10 h-10 text-white/70" />
          </div>
          <h1 className="font-display italic font-light text-4xl mb-3">
            Booking Confirmed
          </h1>
          <p className="text-white/40 mb-2">
            Confirmation{" "}
            <span className="font-mono text-white/60">
              #PD-{Math.floor(1000 + Math.random() * 9000)}
            </span>
          </p>
          <p className="text-sm text-white/30 mb-10">
            A confirmation email has been sent with all details.
          </p>
          <div className="flex gap-3 justify-center">
            <Link href="/">
              <Button variant="outline">Back to Home</Button>
            </Link>
            <Link href="/fleet">
              <Button>Book Another</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-28 pb-24">
      <div className="max-w-5xl mx-auto px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-[13px] uppercase tracking-[0.2em] text-white/40 mb-3">
            Complete Your Booking
          </p>
          <h1 className="font-display italic font-light text-4xl tracking-tight mb-2">
            {car.name}
          </h1>
          <p className="text-white/30 text-sm">${car.price}/day</p>
        </div>

        {/* Steps */}
        <div className="flex items-center justify-center gap-0 mb-14 max-w-sm mx-auto">
          {[1, 2, 3].map((s, i) => (
            <div key={s} className="flex items-center">
              <div
                className={cn(
                  "w-9 h-9 rounded-full flex items-center justify-center text-sm font-medium border transition-all",
                  s < step
                    ? "border-white/30 bg-white/10 text-white/70"
                    : s === step
                    ? "border-white bg-white text-black"
                    : "border-white/10 text-white/20"
                )}
              >
                {s < step ? <Check className="w-4 h-4" /> : s}
              </div>
              {i < 2 && (
                <div className={cn("w-20 h-px mx-2", s < step ? "bg-white/20" : "bg-white/[0.06]")} />
              )}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2">
            {step === 1 && (
              <Card className="p-8 bg-white/[0.02] border-white/[0.06] rounded-2xl">
                <h2 className="font-display text-xl font-light mb-8">Rental Details</h2>
                <div className="space-y-6">
                  <div>
                    <label className="text-[13px] text-white/40 block mb-2">Pickup Location</label>
                    <select className="flex h-12 w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 text-sm text-white/70 focus:outline-none focus:border-white/30">
                      <option>Downtown — 123 Main St</option>
                      <option>Airport — LAX Terminal 1</option>
                      <option>Beverly Hills — Rodeo Dr</option>
                    </select>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-[13px] text-white/40 block mb-2">Pickup Date</label>
                      <Input type="date" min={today} value={pickup} onChange={(e) => setPickup(e.target.value)} className="bg-white/[0.03] border-white/10 rounded-xl" />
                    </div>
                    <div>
                      <label className="text-[13px] text-white/40 block mb-2">Return Date</label>
                      <Input type="date" min={pickup || today} value={dropoff} onChange={(e) => setDropoff(e.target.value)} className="bg-white/[0.03] border-white/10 rounded-xl" />
                    </div>
                  </div>
                </div>
                <Button size="lg" className="w-full mt-10" onClick={() => setStep(2)}>
                  Continue <ArrowRight className="w-4 h-4" />
                </Button>
              </Card>
            )}

            {step === 2 && (
              <Card className="p-8 bg-white/[0.02] border-white/[0.06] rounded-2xl">
                <h2 className="font-display text-xl font-light mb-8">Enhance Your Experience</h2>
                <div className="space-y-3">
                  {addons.map((addon) => (
                    <div
                      key={addon.id}
                      onClick={() => setSelectedAddons((p) => ({ ...p, [addon.id]: !p[addon.id] }))}
                      className={cn(
                        "flex items-center justify-between p-5 rounded-xl border cursor-pointer transition-all",
                        selectedAddons[addon.id]
                          ? "border-white/20 bg-white/[0.04]"
                          : "border-white/[0.06] hover:border-white/10"
                      )}
                    >
                      <div className="flex items-center gap-4">
                        <div className={cn(
                          "w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all",
                          selectedAddons[addon.id] ? "border-white bg-white" : "border-white/20"
                        )}>
                          {selectedAddons[addon.id] && <Check className="w-3 h-3 text-black" strokeWidth={3} />}
                        </div>
                        <div>
                          <div className="text-sm font-medium">{addon.name}</div>
                          <div className="text-xs text-white/30">{addon.desc}</div>
                        </div>
                      </div>
                      <span className="text-sm text-white/50">+${addon.price}/day</span>
                    </div>
                  ))}
                </div>
                <div className="flex gap-3 mt-10">
                  <Button variant="outline" className="flex-1" onClick={() => setStep(1)}>
                    <ChevronLeft className="w-4 h-4" /> Back
                  </Button>
                  <Button className="flex-[2]" onClick={() => setStep(3)}>
                    Continue <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </Card>
            )}

            {step === 3 && (
              <Card className="p-8 bg-white/[0.02] border-white/[0.06] rounded-2xl">
                <h2 className="font-display text-xl font-light mb-8">Your Information</h2>
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-[13px] text-white/40 block mb-2">First Name</label>
                      <Input placeholder="John" className="bg-white/[0.03] border-white/10 rounded-xl" />
                    </div>
                    <div>
                      <label className="text-[13px] text-white/40 block mb-2">Last Name</label>
                      <Input placeholder="Doe" className="bg-white/[0.03] border-white/10 rounded-xl" />
                    </div>
                  </div>
                  <div>
                    <label className="text-[13px] text-white/40 block mb-2">Email</label>
                    <Input type="email" placeholder="john@example.com" className="bg-white/[0.03] border-white/10 rounded-xl" />
                  </div>
                  <div>
                    <label className="text-[13px] text-white/40 block mb-2">Phone</label>
                    <Input type="tel" placeholder="+1 (555) 000-0000" className="bg-white/[0.03] border-white/10 rounded-xl" />
                  </div>
                </div>
                <div className="flex gap-3 mt-10">
                  <Button variant="outline" className="flex-1" onClick={() => setStep(2)}>
                    <ChevronLeft className="w-4 h-4" /> Back
                  </Button>
                  <Button className="flex-[2]" onClick={() => setConfirmed(true)}>
                    Confirm Booking <CheckCircle2 className="w-4 h-4" />
                  </Button>
                </div>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div>
            <Card className="p-6 bg-white/[0.02] border-white/[0.06] rounded-2xl lg:sticky lg:top-28">
              <p className="text-[13px] uppercase tracking-[0.15em] text-white/30 mb-5">Summary</p>
              <div className="flex items-center gap-3 mb-5">
                <div className="relative w-16 h-12 rounded-lg overflow-hidden shrink-0">
                  <Image src={car.image} alt={car.name} fill className="object-cover" />
                </div>
                <div>
                  <div className="font-medium text-sm">{car.name}</div>
                  <div className="text-xs text-white/30">${car.price}/day</div>
                </div>
              </div>

              <Separator className="bg-white/[0.06] mb-5" />

              <div className="space-y-2.5 text-sm">
                {days > 0 ? (
                  <div className="flex justify-between text-white/40">
                    <span>{days} day{days > 1 ? "s" : ""}</span>
                    <span>${(days * car.price).toLocaleString()}</span>
                  </div>
                ) : (
                  <div className="flex justify-between text-white/30">
                    <span>Select dates</span><span>—</span>
                  </div>
                )}
                {addons.filter((a) => selectedAddons[a.id]).map((a) => (
                  <div key={a.id} className="flex justify-between text-white/40">
                    <span>{a.name}</span>
                    <span>+${(a.price * Math.max(days, 1)).toLocaleString()}</span>
                  </div>
                ))}
              </div>

              <Separator className="bg-white/[0.06] my-5" />

              <div className="flex justify-between font-medium">
                <span>Total</span>
                <span>{total > 0 ? `$${total.toLocaleString()}` : "—"}</span>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
