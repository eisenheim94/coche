"use client";

import {
  useState,
  useRef,
  useEffect,
  useCallback,
  useLayoutEffect,
  type ReactNode,
} from "react";
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

/* ── Viewport-aware padding ── */
const VIEWPORT_PADDING = 8; // px from viewport edge
const DROPDOWN_GAP = 8; // gap between trigger and dropdown

/* ── FieldWrapper: per-field viewport collision detection ── */
function FieldWrapper({
  children,
  dropdown,
  isOpen,
}: {
  children: ReactNode;
  dropdown: ReactNode;
  isOpen: boolean;
}) {
  const triggerRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [placement, setPlacement] = useState<"below" | "above">("below");
  const [maxH, setMaxH] = useState<number>(280);

  const computePlacement = useCallback(() => {
    if (!triggerRef.current) return;

    const rect = triggerRef.current.getBoundingClientRect();
    const vh = window.innerHeight;

    const spaceBelow = vh - rect.bottom - VIEWPORT_PADDING - DROPDOWN_GAP;
    const spaceAbove = rect.top - VIEWPORT_PADDING - DROPDOWN_GAP;

    // Prefer below, but flip above if not enough room below and more room above
    if (spaceBelow >= 200) {
      setPlacement("below");
      setMaxH(Math.min(340, spaceBelow));
    } else if (spaceAbove > spaceBelow) {
      setPlacement("above");
      setMaxH(Math.min(340, spaceAbove));
    } else {
      setPlacement("below");
      setMaxH(Math.min(340, spaceBelow));
    }
  }, []);

  // Compute on open and on scroll/resize
  useLayoutEffect(() => {
    if (!isOpen) return;
    computePlacement();
  }, [isOpen, computePlacement]);

  useEffect(() => {
    if (!isOpen) return;
    const handler = () => computePlacement();
    window.addEventListener("scroll", handler, { passive: true });
    window.addEventListener("resize", handler, { passive: true });
    return () => {
      window.removeEventListener("scroll", handler);
      window.removeEventListener("resize", handler);
    };
  }, [isOpen, computePlacement]);

  return (
    <div className="relative flex-1" ref={triggerRef}>
      {children}
      {isOpen && (
        <div
          ref={dropdownRef}
          className={`absolute left-0 right-0 md:w-[320px] ${
            placement === "above" ? "bottom-full mb-2" : "top-full mt-2"
          } rounded-xl z-[60] shadow-2xl shadow-black/60 border border-white/10 glass-dropdown-solid overflow-hidden`}
          style={{ maxHeight: maxH }}
        >
          <div className="flex flex-col" style={{ maxHeight: maxH }}>
            {dropdown}
          </div>
        </div>
      )}
    </div>
  );
}

export function BookingBar() {
  const router = useRouter();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [activeField, setActiveField] = useState<FieldKey>(null);
  const [pickup, setPickup] = useState("");
  const [dropoff, setDropoff] = useState("");
  const [date, setDate] = useState(getDefaultDate());
  const [time, setTime] = useState("10:00 am");

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        setActiveField(null);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const toggleField = (field: FieldKey) => {
    setActiveField((prev) => (prev === field ? null : field));
  };

  const chevron = (field: FieldKey) =>
    `w-3.5 h-3.5 text-white/30 transition-transform ${
      activeField === field ? "rotate-180" : ""
    }`;

  return (
    <div ref={wrapperRef}>
      <div className="glass-strong rounded-2xl p-2.5 overflow-visible">
        <div className="flex flex-col md:flex-row items-stretch gap-2 overflow-visible">
          <div className="flex-1 flex flex-col md:flex-row md:items-stretch gap-1.5 md:gap-0 overflow-visible">
            {/* ── Pick Up Address ── */}
            <FieldWrapper
              isOpen={activeField === "pickup"}
              dropdown={
                <>
                  <div className="p-3 border-b border-white/[0.08] shrink-0">
                    <input
                      type="text"
                      placeholder="Search locations..."
                      autoFocus
                      className="w-full bg-white/[0.06] border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-white/30 outline-none focus:border-white/20 transition-colors"
                      onChange={(e) => void e}
                    />
                  </div>
                  <div className="overflow-y-auto overflow-x-hidden flex-1 min-h-0">
                    {locations.map((loc) => (
                      <button
                        key={loc}
                        type="button"
                        onClick={() => {
                          setPickup(loc);
                          setActiveField("dropoff");
                        }}
                        className={`w-full text-left px-4 py-3 text-sm hover:bg-white/[0.08] transition-colors flex items-center gap-3 ${
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
                </>
              }
            >
              <button
                type="button"
                onClick={() => toggleField("pickup")}
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
            </FieldWrapper>

            <div className="hidden md:flex items-center px-1">
              <div className="w-px h-8 bg-white/[0.08]" />
            </div>

            {/* ── Drop Off Address ── */}
            <FieldWrapper
              isOpen={activeField === "dropoff"}
              dropdown={
                <>
                  <div className="p-3 border-b border-white/[0.08] shrink-0">
                    <input
                      type="text"
                      placeholder="Search locations..."
                      autoFocus
                      className="w-full bg-white/[0.06] border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-white/30 outline-none focus:border-white/20 transition-colors"
                    />
                  </div>
                  <div className="overflow-y-auto overflow-x-hidden flex-1 min-h-0">
                    {locations.map((loc) => (
                      <button
                        key={loc}
                        type="button"
                        onClick={() => {
                          setDropoff(loc);
                          setActiveField("date");
                        }}
                        className={`w-full text-left px-4 py-3 text-sm hover:bg-white/[0.08] transition-colors flex items-center gap-3 ${
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
                </>
              }
            >
              <button
                type="button"
                onClick={() => toggleField("dropoff")}
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
            </FieldWrapper>

            <div className="hidden md:flex items-center px-1">
              <div className="w-px h-8 bg-white/[0.08]" />
            </div>

            {/* ── Pick Up Date ── */}
            <FieldWrapper
              isOpen={activeField === "date"}
              dropdown={
                <div className="p-4">
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
                </div>
              }
            >
              <button
                type="button"
                onClick={() => toggleField("date")}
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
            </FieldWrapper>

            <div className="hidden md:flex items-center px-1">
              <div className="w-px h-8 bg-white/[0.08]" />
            </div>

            {/* ── Pick Up Time ── */}
            <FieldWrapper
              isOpen={activeField === "time"}
              dropdown={
                <>
                  <div className="p-3 border-b border-white/[0.08] shrink-0">
                    <span className="text-[13px] text-white/50">
                      Select pick-up time
                    </span>
                  </div>
                  <div className="overflow-y-auto overflow-x-hidden flex-1 min-h-0">
                    {times.map((t) => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => {
                          setTime(t);
                          setActiveField(null);
                        }}
                        className={`w-full text-left px-4 py-2.5 text-sm hover:bg-white/[0.08] transition-colors flex items-center gap-3 ${
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
                </>
              }
            >
              <button
                type="button"
                onClick={() => toggleField("time")}
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
            </FieldWrapper>
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
