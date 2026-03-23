"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { MapPin, Calendar, Clock, ChevronDown, X } from "lucide-react";
import { Button } from "@/components/ui/button";

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

const dropdownStyle = {
  WebkitBackdropFilter: "blur(40px) saturate(1.4)",
  backdropFilter: "blur(40px) saturate(1.4)",
  background: "rgba(255, 255, 255, 0.06)",
} as const;

export function BookingBar() {
  const router = useRouter();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [activeField, setActiveField] = useState<FieldKey>(null);
  const [openAbove, setOpenAbove] = useState(false);
  const [pickup, setPickup] = useState("");
  const [dropoff, setDropoff] = useState("");
  const [date, setDate] = useState(getDefaultDate());
  const [time, setTime] = useState("10:00 am");

  // Check if dropdown should open above or below
  const checkViewport = useCallback(() => {
    if (!wrapperRef.current) return;
    const rect = wrapperRef.current.getBoundingClientRect();
    const spaceBelow = window.innerHeight - rect.bottom;
    setOpenAbove(spaceBelow < 320);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setActiveField(null);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  // Re-check viewport on scroll/resize when a field is active
  useEffect(() => {
    if (!activeField) return;
    checkViewport();
    window.addEventListener("scroll", checkViewport, { passive: true });
    window.addEventListener("resize", checkViewport, { passive: true });
    return () => {
      window.removeEventListener("scroll", checkViewport);
      window.removeEventListener("resize", checkViewport);
    };
  }, [activeField, checkViewport]);

  const toggleField = (field: FieldKey) => {
    setActiveField((prev) => (prev === field ? null : field));
  };

  const dropdownPosition = openAbove ? "bottom-full mb-2" : "top-full mt-2";

  return (
    /* Outer wrapper: plain relative div — no backdrop-filter here */
    <div ref={wrapperRef} className="relative">
      {/* The glass bar itself */}
      <div className="glass-strong rounded-2xl p-2.5">
        <div className="flex flex-col md:flex-row items-stretch gap-2">
          <div className="flex-1 flex flex-col md:flex-row md:items-stretch gap-1.5 md:gap-0">
            {/* Pick Up Address */}
            <button
              type="button"
              onClick={() => toggleField("pickup")}
              className={`flex-1 px-5 py-3.5 rounded-xl text-left transition-colors ${
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
                <span className={`text-sm ${pickup ? "text-white/80" : "text-white/40"}`}>
                  {pickup || "From : hotel, airport etc"}
                </span>
                <ChevronDown
                  className={`w-3.5 h-3.5 text-white/30 transition-transform ${
                    activeField === "pickup" ? (openAbove ? "" : "rotate-180") : ""
                  }`}
                />
              </div>
            </button>

            <div className="hidden md:flex items-center px-1">
              <div className="w-px h-8 bg-white/[0.08]" />
            </div>

            {/* Drop Off Address */}
            <button
              type="button"
              onClick={() => toggleField("dropoff")}
              className={`flex-1 px-5 py-3.5 rounded-xl text-left transition-colors ${
                activeField === "dropoff" ? "bg-white/10" : "hover:bg-white/5"
              }`}
            >
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-white/40" />
                <span className="text-[13px] font-medium text-white tracking-wide">
                  Drop Off Address
                </span>
              </div>
              <div className="flex items-center justify-between mt-0.5">
                <span className={`text-sm ${dropoff ? "text-white/80" : "text-white/40"}`}>
                  {dropoff || "City Center Branch"}
                </span>
                <ChevronDown
                  className={`w-3.5 h-3.5 text-white/30 transition-transform ${
                    activeField === "dropoff" ? (openAbove ? "" : "rotate-180") : ""
                  }`}
                />
              </div>
            </button>

            <div className="hidden md:flex items-center px-1">
              <div className="w-px h-8 bg-white/[0.08]" />
            </div>

            {/* Pick Up Date */}
            <button
              type="button"
              onClick={() => toggleField("date")}
              className={`flex-1 px-5 py-3.5 rounded-xl text-left transition-colors ${
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
                <span className="text-sm text-white/80">{formatDate(date)}</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 text-white/30 transition-transform ${
                    activeField === "date" ? (openAbove ? "" : "rotate-180") : ""
                  }`}
                />
              </div>
            </button>

            <div className="hidden md:flex items-center px-1">
              <div className="w-px h-8 bg-white/[0.08]" />
            </div>

            {/* Pick Up Time */}
            <button
              type="button"
              onClick={() => toggleField("time")}
              className={`flex-1 px-5 py-3.5 rounded-xl text-left transition-colors ${
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
                <ChevronDown
                  className={`w-3.5 h-3.5 text-white/30 transition-transform ${
                    activeField === "time" ? (openAbove ? "" : "rotate-180") : ""
                  }`}
                />
              </div>
            </button>
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

      {/* ━━━ Dropdowns — rendered OUTSIDE the glass-strong container ━━━ */}

      {activeField === "pickup" && (
        <div
          className={`absolute left-2 right-2 md:left-2 md:right-auto md:w-[340px] ${dropdownPosition} rounded-xl z-50 shadow-2xl shadow-black/50 border border-white/10`}
          style={dropdownStyle}
        >
          <div className="p-3 border-b border-white/[0.06]">
            <input
              type="text"
              placeholder="Search locations..."
              autoFocus
              className="w-full bg-white/[0.04] border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-white/30 outline-none focus:border-white/20 transition-colors"
              onChange={(e) => void e}
            />
          </div>
          <div className="max-h-[220px] overflow-y-auto overflow-x-hidden rounded-b-xl">
            {locations.map((loc) => (
              <button
                key={loc}
                type="button"
                onClick={() => {
                  setPickup(loc);
                  setActiveField("dropoff");
                }}
                className={`w-full text-left px-4 py-3 text-sm hover:bg-white/[0.06] transition-colors flex items-center gap-3 ${
                  pickup === loc ? "text-white bg-white/[0.04]" : "text-white/60"
                }`}
              >
                <MapPin className="w-4 h-4 text-white/30 shrink-0" />
                {loc}
              </button>
            ))}
          </div>
        </div>
      )}

      {activeField === "dropoff" && (
        <div
          className={`absolute left-2 right-2 md:left-[25%] md:right-auto md:w-[340px] ${dropdownPosition} rounded-xl z-50 shadow-2xl shadow-black/50 border border-white/10`}
          style={dropdownStyle}
        >
          <div className="p-3 border-b border-white/[0.06]">
            <input
              type="text"
              placeholder="Search locations..."
              autoFocus
              className="w-full bg-white/[0.04] border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-white/30 outline-none focus:border-white/20 transition-colors"
            />
          </div>
          <div className="max-h-[220px] overflow-y-auto overflow-x-hidden rounded-b-xl">
            {locations.map((loc) => (
              <button
                key={loc}
                type="button"
                onClick={() => {
                  setDropoff(loc);
                  setActiveField("date");
                }}
                className={`w-full text-left px-4 py-3 text-sm hover:bg-white/[0.06] transition-colors flex items-center gap-3 ${
                  dropoff === loc ? "text-white bg-white/[0.04]" : "text-white/60"
                }`}
              >
                <MapPin className="w-4 h-4 text-white/30 shrink-0" />
                {loc}
              </button>
            ))}
          </div>
        </div>
      )}

      {activeField === "date" && (
        <div
          className={`absolute left-2 right-2 md:left-[50%] md:right-auto md:w-[300px] ${dropdownPosition} rounded-xl z-50 shadow-2xl shadow-black/50 border border-white/10 p-4`}
          style={dropdownStyle}
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
            className="w-full bg-white/[0.04] border border-white/10 rounded-lg px-4 py-3 text-sm text-white outline-none focus:border-white/20 transition-colors [color-scheme:dark]"
          />
          {date && (
            <div className="mt-3 flex items-center justify-between">
              <span className="text-sm text-white/60">{formatDate(date)}</span>
              <button
                type="button"
                onClick={() => setDate("")}
                className="text-white/30 hover:text-white/60 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      )}

      {activeField === "time" && (
        <div
          className={`absolute left-2 right-2 md:left-auto md:right-[140px] md:w-[200px] ${dropdownPosition} rounded-xl z-50 shadow-2xl shadow-black/50 border border-white/10`}
          style={dropdownStyle}
        >
          <div className="p-3 border-b border-white/[0.06]">
            <span className="text-[13px] text-white/50">Select pick-up time</span>
          </div>
          <div className="max-h-[240px] overflow-y-auto overflow-x-hidden rounded-b-xl">
            {times.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => {
                  setTime(t);
                  setActiveField(null);
                }}
                className={`w-full text-left px-4 py-2.5 text-sm hover:bg-white/[0.06] transition-colors flex items-center gap-3 ${
                  time === t ? "text-white bg-white/[0.04]" : "text-white/60"
                }`}
              >
                <Clock className="w-3.5 h-3.5 text-white/30 shrink-0" />
                {t}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
