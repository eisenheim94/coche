"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { MapPin, Calendar, Clock, ChevronDown, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const locations = [
  "Airport Terminal 1",
  "Airport Terminal 2",
  "City Center Branch",
  "Downtown Office",
  "Hotel & Resort Pickup",
  "Train Station",
];

const times = [
  "06:00 am",
  "07:00 am",
  "08:00 am",
  "09:00 am",
  "10:00 am",
  "11:00 am",
  "12:00 pm",
  "01:00 pm",
  "02:00 pm",
  "03:00 pm",
  "04:00 pm",
  "05:00 pm",
  "06:00 pm",
  "07:00 pm",
  "08:00 pm",
  "09:00 pm",
];

type FieldKey = "pickup" | "dropoff" | "date" | "time" | null;

function getDefaultDate() {
  const d = new Date();
  d.setDate(d.getDate() + 2);
  return d.toISOString().split("T")[0];
}

function formatDate(dateStr: string) {
  if (!dateStr) return "";
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function BookingBar() {
  const router = useRouter();
  const [activeField, setActiveField] = useState<FieldKey>(null);
  const [pickup, setPickup] = useState("");
  const [dropoff, setDropoff] = useState("");
  const [date, setDate] = useState(getDefaultDate());
  const [time, setTime] = useState("10:00 am");

  const chevron = (field: FieldKey) =>
    `w-3.5 h-3.5 text-white/30 transition-transform ${
      activeField === field ? "rotate-180" : ""
    }`;

  return (
    <div>
      <div className="glass-strong rounded-2xl p-2.5 overflow-visible">
        <div className="flex flex-col md:flex-row items-stretch gap-2 overflow-visible">
          <div className="flex-1 flex flex-col md:flex-row md:items-stretch gap-1.5 md:gap-0 overflow-visible">
            <Popover
              modal={false}
              open={activeField === "pickup"}
              onOpenChange={(open) => setActiveField(open ? "pickup" : null)}
            >
              <PopoverTrigger asChild>
                <button
                  type="button"
                  className={`w-full px-5 py-3.5 rounded-xl text-left transition-colors ${
                    activeField === "pickup" ? "bg-white/10" : "hover:bg-white/5"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-white/40" />
                    <span className="text-[13px] font-medium text-white tracking-wide">
                      Pick Up Address
                    </span>
                  </div>
                  <div className="flex items-center justify-between mt-0.5">
                    <span
                      className={`text-sm ${pickup ? "text-white/80" : "text-white/40"}`}
                    >
                      {pickup || "From : hotel, airport etc"}
                    </span>
                    <ChevronDown className={chevron("pickup")} />
                  </div>
                </button>
              </PopoverTrigger>
              <PopoverContent
                className="glass-dropdown-solid w-[min(var(--radix-popover-trigger-width),calc(100vw-16px))] md:w-80 overflow-hidden p-0"
                side="bottom"
              >
                <div className="p-3 border-b border-white/[0.08] shrink-0">
                  <input
                    type="text"
                    placeholder="Search locations..."
                    autoFocus
                    className="w-full bg-white/[0.06] border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-white/30 outline-none focus:border-white/20 transition-colors"
                    onChange={(e) => void e}
                  />
                </div>
                <div className="max-h-[340px] overflow-y-auto overflow-x-hidden">
                  {locations.map((loc) => (
                    <button
                      key={loc}
                      type="button"
                      onClick={() => {
                        setPickup(loc);
                        setActiveField("dropoff");
                      }}
                      className={`w-full text-left px-4 py-3 text-sm hover:bg-white/[0.08] focus:outline-none focus-visible:bg-white/[0.08] focus-visible:ring-0 transition-colors flex items-center gap-3 ${
                        pickup === loc
                          ? "text-white bg-white/[0.06]"
                          : "text-white/60"
                      }`}
                    >
                      <MapPin className="w-4 h-4 text-white/30 shrink-0" />
                      {loc}
                    </button>
                  ))}
                </div>
              </PopoverContent>
            </Popover>

            <div className="hidden md:flex items-center px-1">
              <div className="w-px h-8 bg-white/[0.08]" />
            </div>

            <Popover
              modal={false}
              open={activeField === "dropoff"}
              onOpenChange={(open) => setActiveField(open ? "dropoff" : null)}
            >
              <PopoverTrigger asChild>
                <button
                  type="button"
                  className={`w-full px-5 py-3.5 rounded-xl text-left transition-colors ${
                    activeField === "dropoff"
                      ? "bg-white/10"
                      : "hover:bg-white/5"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-white/40" />
                    <span className="text-[13px] font-medium text-white tracking-wide">
                      Drop Off Address
                    </span>
                  </div>
                  <div className="flex items-center justify-between mt-0.5">
                    <span
                      className={`text-sm ${dropoff ? "text-white/80" : "text-white/40"}`}
                    >
                      {dropoff || "City Center Branch"}
                    </span>
                    <ChevronDown className={chevron("dropoff")} />
                  </div>
                </button>
              </PopoverTrigger>
              <PopoverContent
                className="glass-dropdown-solid w-[min(var(--radix-popover-trigger-width),calc(100vw-16px))] md:w-80 overflow-hidden p-0"
                side="bottom"
              >
                <div className="p-3 border-b border-white/[0.08] shrink-0">
                  <input
                    type="text"
                    placeholder="Search locations..."
                    autoFocus
                    className="w-full bg-white/[0.06] border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-white/30 outline-none focus:border-white/20 transition-colors"
                  />
                </div>
                <div className="max-h-[340px] overflow-y-auto overflow-x-hidden">
                  {locations.map((loc) => (
                    <button
                      key={loc}
                      type="button"
                      onClick={() => {
                        setDropoff(loc);
                        setActiveField("date");
                      }}
                      className={`w-full text-left px-4 py-3 text-sm hover:bg-white/[0.08] focus:outline-none focus-visible:bg-white/[0.08] focus-visible:ring-0 transition-colors flex items-center gap-3 ${
                        dropoff === loc
                          ? "text-white bg-white/[0.06]"
                          : "text-white/60"
                      }`}
                    >
                      <MapPin className="w-4 h-4 text-white/30 shrink-0" />
                      {loc}
                    </button>
                  ))}
                </div>
              </PopoverContent>
            </Popover>

            <div className="hidden md:flex items-center px-1">
              <div className="w-px h-8 bg-white/[0.08]" />
            </div>

            <Popover
              modal={false}
              open={activeField === "date"}
              onOpenChange={(open) => setActiveField(open ? "date" : null)}
            >
              <PopoverTrigger asChild>
                <button
                  type="button"
                  className={`w-full px-5 py-3.5 rounded-xl text-left transition-colors ${
                    activeField === "date" ? "bg-white/10" : "hover:bg-white/5"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5 text-white/40" />
                    <span className="text-[13px] font-medium text-white tracking-wide">
                      Pick Up Date
                    </span>
                  </div>
                  <div className="flex items-center justify-between mt-0.5">
                    <span className="text-sm text-white/80">
                      {formatDate(date)}
                    </span>
                    <ChevronDown className={chevron("date")} />
                  </div>
                </button>
              </PopoverTrigger>
              <PopoverContent
                className="glass-dropdown-solid w-[min(var(--radix-popover-trigger-width),calc(100vw-16px))] md:w-80 p-4"
                side="bottom"
              >
                <label className="block text-[13px] text-white/50 mb-2">
                  Select pick-up date
                </label>
                <input
                  type="date"
                  value={date}
                  min={new Date().toISOString().split("T")[0]}
                  onChange={(e) => {
                    setDate(e.target.value);
                    setActiveField("time");
                  }}
                  className="w-full bg-white/[0.06] border border-white/10 rounded-lg px-4 py-3 text-sm text-white outline-none focus:border-white/20 transition-colors [color-scheme:dark]"
                />
                {date && (
                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-sm text-white/60">
                      {formatDate(date)}
                    </span>
                    <button
                      type="button"
                      onClick={() => setDate("")}
                      className="text-white/30 hover:text-white/60 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </PopoverContent>
            </Popover>

            <div className="hidden md:flex items-center px-1">
              <div className="w-px h-8 bg-white/[0.08]" />
            </div>

            <Popover
              modal={false}
              open={activeField === "time"}
              onOpenChange={(open) => setActiveField(open ? "time" : null)}
            >
              <PopoverTrigger asChild>
                <button
                  type="button"
                  className={`w-full px-5 py-3.5 rounded-xl text-left transition-colors ${
                    activeField === "time" ? "bg-white/10" : "hover:bg-white/5"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-white/40" />
                    <span className="text-[13px] font-medium text-white tracking-wide">
                      Pick Up Time
                    </span>
                  </div>
                  <div className="flex items-center justify-between mt-0.5">
                    <span className="text-sm text-white/80">{time}</span>
                    <ChevronDown className={chevron("time")} />
                  </div>
                </button>
              </PopoverTrigger>
              <PopoverContent
                className="glass-dropdown-solid w-[min(var(--radix-popover-trigger-width),calc(100vw-16px))] md:w-80 overflow-hidden p-0"
                side="bottom"
              >
                <div className="p-3 border-b border-white/[0.08] shrink-0">
                  <span className="text-[13px] text-white/50">
                    Select pick-up time
                  </span>
                </div>
                <div className="max-h-[340px] overflow-y-auto overflow-x-hidden">
                  {times.map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => {
                        setTime(t);
                        setActiveField(null);
                      }}
                      className={`w-full text-left px-4 py-2.5 text-sm hover:bg-white/[0.08] focus:outline-none focus-visible:bg-white/[0.08] focus-visible:ring-0 transition-colors flex items-center gap-3 ${
                        time === t
                          ? "text-white bg-white/[0.06]"
                          : "text-white/60"
                      }`}
                    >
                      <Clock className="w-3.5 h-3.5 text-white/30 shrink-0" />
                      {t}
                    </button>
                  ))}
                </div>
              </PopoverContent>
            </Popover>
          </div>

          {/* Rent Now */}
          <Button
            size="lg"
            className="h-auto min-h-[56px] rounded-xl px-10 text-[15px] font-semibold"
            onClick={() => {
              setActiveField(null);
              router.push("/fleet");
            }}
          >
            Rent Now
          </Button>
        </div>
      </div>
    </div>
  );
}
