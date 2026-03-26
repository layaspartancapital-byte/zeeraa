"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { X, ChevronLeft, Check, Loader2 } from "lucide-react";
import { useBookingModal } from "@/hooks/useBookingModal";

const bookingSchema = z.object({
  date: z.string().min(1, "Please select a date"),
  time: z.string().min(1, "Please select a time slot"),
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().min(7, "Please enter a valid phone number"),
  company: z.string().min(1, "Company name is required"),
  platform: z.enum(
    ["Amazon", "Shopify", "Walmart", "eBay", "TikTok Shop", "Etsy", "Other"],
    { message: "Please select a platform" }
  ),
  revenueRange: z.enum(
    ["Under $10K", "$10K-$50K", "$50K-$100K", "$100K-$500K", "$500K+"],
    { message: "Please select a revenue range" }
  ),
});

type BookingFormData = z.infer<typeof bookingSchema>;

const PLATFORMS = [
  "Amazon", "Shopify", "Walmart", "eBay", "TikTok Shop", "Etsy", "Other",
] as const;

const REVENUE_RANGES = [
  "Under $10K", "$10K-$50K", "$50K-$100K", "$100K-$500K", "$500K+",
] as const;

const DAY_LABELS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 20 },
  visible: { opacity: 1, scale: 1, y: 0 },
  exit: { opacity: 0, scale: 0.95, y: 20 },
};

const stepVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 80 : -80,
    opacity: 0,
  }),
  center: { x: 0, opacity: 1 },
  exit: (direction: number) => ({
    x: direction > 0 ? -80 : 80,
    opacity: 0,
  }),
};

function getCalendarDays(year: number, month: number) {
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells: (number | null)[] = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);
  return cells;
}

function formatDateStr(year: number, month: number, day: number) {
  const m = String(month + 1).padStart(2, "0");
  const d = String(day).padStart(2, "0");
  return `${year}-${m}-${d}`;
}

export default function BookingModal() {
  const { isOpen, close } = useBookingModal();
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const today = new Date();
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [availableDates, setAvailableDates] = useState<string[]>([]);
  const [loadingDates, setLoadingDates] = useState(false);
  const [timeSlots, setTimeSlots] = useState<string[]>([]);
  const [loadingSlots, setLoadingSlots] = useState(false);

  const {
    control, register, handleSubmit, setValue, watch, reset,
    formState: { errors },
  } = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      date: "", time: "", name: "", email: "", phone: "", company: "",
      platform: undefined, revenueRange: undefined,
    },
  });

  const selectedDate = watch("date");
  const selectedTime = watch("time");

  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setStep(1); setDirection(1); setSubmitted(false); setSubmitting(false); reset();
      }, 300);
    }
  }, [isOpen, reset]);

  useEffect(() => {
    if (!isOpen) return;
    let cancelled = false;
    setLoadingDates(true);
    fetch("/api/slots?action=dates")
      .then((r) => r.json())
      .then((data) => { if (!cancelled) setAvailableDates(data.dates ?? []); })
      .catch(() => { if (!cancelled) setAvailableDates([]); })
      .finally(() => { if (!cancelled) setLoadingDates(false); });
    return () => { cancelled = true; };
  }, [isOpen, viewYear, viewMonth]);

  useEffect(() => {
    if (!selectedDate) return;
    let cancelled = false;
    setLoadingSlots(true);
    fetch(`/api/slots?action=slots&date=${selectedDate}`)
      .then((r) => r.json())
      .then((data) => { if (!cancelled) setTimeSlots(data.slots ?? []); })
      .catch(() => { if (!cancelled) setTimeSlots([]); })
      .finally(() => { if (!cancelled) setLoadingSlots(false); });
    return () => { cancelled = true; };
  }, [selectedDate]);

  const goForward = useCallback(() => { setDirection(1); setStep((s) => s + 1); }, []);
  const goBack = useCallback(() => { setDirection(-1); setStep((s) => s - 1); }, []);

  const prevMonth = () => {
    if (viewMonth === 0) { setViewMonth(11); setViewYear((y) => y - 1); }
    else { setViewMonth((m) => m - 1); }
  };
  const nextMonth = () => {
    if (viewMonth === 11) { setViewMonth(0); setViewYear((y) => y + 1); }
    else { setViewMonth((m) => m + 1); }
  };

  const onSubmit = async (data: BookingFormData) => {
    setSubmitting(true);
    try {
      await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      setSubmitted(true);
    } catch {
    } finally {
      setSubmitting(false);
    }
  };

  const calendarDays = getCalendarDays(viewYear, viewMonth);
  const monthLabel = new Date(viewYear, viewMonth).toLocaleString("default", {
    month: "long", year: "numeric",
  });

  const inputClass = "w-full px-3 py-2 bg-white border border-border rounded-lg text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary";

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          variants={overlayVariants}
          initial="hidden" animate="visible" exit="exit"
          transition={{ duration: 0.2 }}
        >
          <div className="absolute inset-0 bg-navy/60 backdrop-blur-sm" onClick={close} />

          <motion.div
            className="relative z-10 w-full max-w-lg bg-white border border-border rounded-2xl shadow-xl overflow-hidden"
            variants={cardVariants}
            initial="hidden" animate="visible" exit="exit"
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            <button
              onClick={close}
              className="absolute top-4 right-4 p-1 rounded-full text-text-muted hover:text-text-primary transition-colors z-20"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            {!submitted && (
              <div className="flex justify-center gap-2 pt-6">
                {[1, 2, 3].map((s) => (
                  <div
                    key={s}
                    className={`w-2.5 h-2.5 rounded-full transition-colors ${
                      s === step ? "bg-primary" : s < step ? "bg-primary/50" : "bg-border"
                    }`}
                  />
                ))}
              </div>
            )}

            <div className="relative min-h-[420px]">
              <AnimatePresence mode="wait" custom={direction}>
                {submitted ? (
                  <motion.div
                    key="success" custom={direction} variants={stepVariants}
                    initial="enter" animate="center" exit="exit"
                    transition={{ duration: 0.25 }}
                    className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-8 text-center"
                  >
                    <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center">
                      <Check className="w-8 h-8 text-green-500" />
                    </div>
                    <h2 className="text-2xl font-bold text-text-primary">Booking Confirmed!</h2>
                    <p className="text-text-muted">
                      We&apos;ll send a confirmation to your email shortly. Looking forward to speaking with you!
                    </p>
                    <button onClick={close} className="mt-4 px-6 py-2.5 bg-primary hover:bg-primary-hover text-white rounded-lg font-medium transition-colors">
                      Close
                    </button>
                  </motion.div>
                ) : step === 1 ? (
                  <motion.div
                    key="step1" custom={direction} variants={stepVariants}
                    initial="enter" animate="center" exit="exit"
                    transition={{ duration: 0.25 }}
                    className="p-6 pt-4"
                  >
                    <h2 className="text-xl font-bold text-text-primary mb-1">Select a Date</h2>
                    <p className="text-sm text-text-muted mb-4">Choose an available date for your consultation.</p>

                    <div className="flex items-center justify-between mb-3">
                      <button onClick={prevMonth} className="p-1.5 rounded-lg hover:bg-background-alt transition-colors text-text-muted hover:text-text-primary">
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <span className="text-sm font-semibold text-text-primary">{monthLabel}</span>
                      <button onClick={nextMonth} className="p-1.5 rounded-lg hover:bg-background-alt transition-colors text-text-muted hover:text-text-primary">
                        <ChevronLeft className="w-4 h-4 rotate-180" />
                      </button>
                    </div>

                    <div className="grid grid-cols-7 gap-1 mb-1">
                      {DAY_LABELS.map((d) => (
                        <div key={d} className="text-center text-xs font-medium text-text-muted py-1">{d}</div>
                      ))}
                    </div>

                    {loadingDates ? (
                      <div className="flex items-center justify-center h-48">
                        <Loader2 className="w-6 h-6 animate-spin text-text-muted" />
                      </div>
                    ) : (
                      <div className="grid grid-cols-7 gap-1">
                        {calendarDays.map((day, i) => {
                          if (day === null) return <div key={`empty-${i}`} />;
                          const dateStr = formatDateStr(viewYear, viewMonth, day);
                          const isAvailable = availableDates.includes(dateStr);
                          const isSelected = selectedDate === dateStr;
                          return (
                            <button
                              key={dateStr} disabled={!isAvailable}
                              onClick={() => { setValue("date", dateStr); setValue("time", ""); }}
                              className={`aspect-square flex items-center justify-center rounded-lg text-sm font-medium transition-colors ${
                                isSelected ? "bg-primary text-white"
                                  : isAvailable ? "bg-primary-light text-primary hover:bg-primary/20"
                                  : "text-text-muted/40 cursor-not-allowed"
                              }`}
                            >
                              {day}
                            </button>
                          );
                        })}
                      </div>
                    )}

                    <button
                      disabled={!selectedDate} onClick={goForward}
                      className="mt-5 w-full py-2.5 bg-primary hover:bg-primary-hover disabled:opacity-40 disabled:cursor-not-allowed text-white rounded-lg font-medium transition-colors"
                    >
                      Continue
                    </button>
                  </motion.div>
                ) : step === 2 ? (
                  <motion.div
                    key="step2" custom={direction} variants={stepVariants}
                    initial="enter" animate="center" exit="exit"
                    transition={{ duration: 0.25 }}
                    className="p-6 pt-4"
                  >
                    <button onClick={goBack} className="flex items-center gap-1 text-sm text-text-muted hover:text-text-primary transition-colors mb-3">
                      <ChevronLeft className="w-4 h-4" /> Back
                    </button>
                    <h2 className="text-xl font-bold text-text-primary mb-1">Pick a Time</h2>
                    <p className="text-sm text-text-muted mb-4">
                      Available slots for <span className="text-text-primary font-medium">{selectedDate}</span>
                    </p>

                    {loadingSlots ? (
                      <div className="flex items-center justify-center h-48">
                        <Loader2 className="w-6 h-6 animate-spin text-text-muted" />
                      </div>
                    ) : timeSlots.length === 0 ? (
                      <p className="text-text-muted text-center py-12">No available slots for this date.</p>
                    ) : (
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-h-64 overflow-y-auto pr-1">
                        {timeSlots.map((slot) => (
                          <button
                            key={slot} onClick={() => setValue("time", slot)}
                            className={`px-4 py-3 rounded-xl border text-sm font-medium transition-colors ${
                              selectedTime === slot
                                ? "bg-primary text-white border-primary"
                                : "bg-white border-border text-text-primary hover:border-primary/50"
                            }`}
                          >
                            {slot}
                          </button>
                        ))}
                      </div>
                    )}

                    <button
                      disabled={!selectedTime} onClick={goForward}
                      className="mt-5 w-full py-2.5 bg-primary hover:bg-primary-hover disabled:opacity-40 disabled:cursor-not-allowed text-white rounded-lg font-medium transition-colors"
                    >
                      Continue
                    </button>
                  </motion.div>
                ) : (
                  <motion.div
                    key="step3" custom={direction} variants={stepVariants}
                    initial="enter" animate="center" exit="exit"
                    transition={{ duration: 0.25 }}
                    className="p-6 pt-4"
                  >
                    <button onClick={goBack} className="flex items-center gap-1 text-sm text-text-muted hover:text-text-primary transition-colors mb-3">
                      <ChevronLeft className="w-4 h-4" /> Back
                    </button>
                    <h2 className="text-xl font-bold text-text-primary mb-4">Your Details</h2>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 max-h-[340px] overflow-y-auto pr-1">
                      <div>
                        <input {...register("name")} placeholder="Name" className={inputClass} />
                        {errors.name && <p className="text-xs text-red-400 mt-1">{errors.name.message}</p>}
                      </div>
                      <div>
                        <input {...register("email")} type="email" placeholder="Email" className={inputClass} />
                        {errors.email && <p className="text-xs text-red-400 mt-1">{errors.email.message}</p>}
                      </div>
                      <div>
                        <input {...register("phone")} type="tel" placeholder="Phone" className={inputClass} />
                        {errors.phone && <p className="text-xs text-red-400 mt-1">{errors.phone.message}</p>}
                      </div>
                      <div>
                        <input {...register("company")} placeholder="Company" className={inputClass} />
                        {errors.company && <p className="text-xs text-red-400 mt-1">{errors.company.message}</p>}
                      </div>
                      <div>
                        <Controller control={control} name="platform" render={({ field }) => (
                          <select {...field} value={field.value ?? ""} className={`${inputClass} appearance-none`}>
                            <option value="" disabled>Platform you sell on</option>
                            {PLATFORMS.map((p) => <option key={p} value={p}>{p}</option>)}
                          </select>
                        )} />
                        {errors.platform && <p className="text-xs text-red-400 mt-1">{errors.platform.message}</p>}
                      </div>
                      <div>
                        <Controller control={control} name="revenueRange" render={({ field }) => (
                          <select {...field} value={field.value ?? ""} className={`${inputClass} appearance-none`}>
                            <option value="" disabled>Monthly revenue range</option>
                            {REVENUE_RANGES.map((r) => <option key={r} value={r}>{r}</option>)}
                          </select>
                        )} />
                        {errors.revenueRange && <p className="text-xs text-red-400 mt-1">{errors.revenueRange.message}</p>}
                      </div>
                      <button
                        type="submit" disabled={submitting}
                        className="w-full py-2.5 bg-primary hover:bg-primary-hover disabled:opacity-60 text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                      >
                        {submitting ? (<><Loader2 className="w-4 h-4 animate-spin" />Booking…</>) : "Book Consultation"}
                      </button>
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
