"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Clock,
  User,
  Mail,
  Building2,
  MessageSquare,
  Check,
} from "lucide-react";

type Step = "calendar" | "time" | "form" | "confirmed";

const timeSlots = [
  "9:00 AM",
  "9:30 AM",
  "10:00 AM",
  "10:30 AM",
  "11:00 AM",
  "11:30 AM",
  "1:00 PM",
  "1:30 PM",
  "2:00 PM",
  "2:30 PM",
  "3:00 PM",
  "3:30 PM",
  "4:00 PM",
  "4:30 PM",
];

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export default function BookingCalendar() {
  const [step, setStep] = useState<Step>("calendar");
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const calendarDays = useMemo(() => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const days: (Date | null)[] = [];
    for (let i = 0; i < firstDay; i++) days.push(null);
    for (let d = 1; d <= daysInMonth; d++) days.push(new Date(year, month, d));
    return days;
  }, [currentMonth]);

  const prevMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1)
    );
  };

  const nextMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1)
    );
  };

  const selectDate = (date: Date) => {
    setSelectedDate(date);
    setStep("time");
  };

  const selectTime = (time: string) => {
    setSelectedTime(time);
    setStep("form");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;

    setSubmitting(true);
    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          date: selectedDate?.toISOString(),
          time: selectedTime,
          source: "booking-calendar",
        }),
      });
      setStep("confirmed");
    } catch {
      // Silently handle error
    } finally {
      setSubmitting(false);
    }
  };

  const isWeekend = (date: Date) => date.getDay() === 0 || date.getDay() === 6;
  const isPast = (date: Date) => date < today;
  const isSelected = (date: Date) =>
    selectedDate?.toDateString() === date.toDateString();

  const formatSelectedDate = () => {
    if (!selectedDate) return "";
    return `${DAYS[selectedDate.getDay()]}, ${MONTHS[selectedDate.getMonth()]} ${selectedDate.getDate()}, ${selectedDate.getFullYear()}`;
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Step indicators */}
      <div className="flex items-center justify-center gap-2 mb-8">
        {(["calendar", "time", "form"] as const).map((s, i) => (
          <div key={s} className="flex items-center gap-2">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                step === s || (step === "confirmed" && s === "form")
                  ? "bg-primary text-white"
                  : ["calendar", "time", "form"].indexOf(step) > i ||
                      step === "confirmed"
                    ? "bg-primary/20 text-primary"
                    : "bg-card border border-border text-text-muted"
              }`}
            >
              {i + 1}
            </div>
            {i < 2 && (
              <div className="w-12 h-px bg-border" />
            )}
          </div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {/* Step 1: Calendar */}
        {step === "calendar" && (
          <motion.div
            key="calendar"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
            className="rounded-2xl border border-border bg-card/60 backdrop-blur-sm p-6 md:p-8"
          >
            <h3 className="font-syne text-xl font-bold text-white mb-6">
              Select a Date
            </h3>

            {/* Month navigation */}
            <div className="flex items-center justify-between mb-4">
              <button
                onClick={prevMonth}
                className="p-2 rounded-lg hover:bg-background text-text-muted hover:text-white transition-colors"
                aria-label="Previous month"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <span className="font-syne font-semibold text-white">
                {MONTHS[currentMonth.getMonth()]} {currentMonth.getFullYear()}
              </span>
              <button
                onClick={nextMonth}
                className="p-2 rounded-lg hover:bg-background text-text-muted hover:text-white transition-colors"
                aria-label="Next month"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Day headers */}
            <div className="grid grid-cols-7 gap-1 mb-2">
              {DAYS.map((d) => (
                <div
                  key={d}
                  className="text-center text-text-muted text-xs font-medium py-2"
                >
                  {d}
                </div>
              ))}
            </div>

            {/* Calendar grid */}
            <div className="grid grid-cols-7 gap-1">
              {calendarDays.map((date, i) => {
                if (!date) {
                  return <div key={`empty-${i}`} className="p-2" />;
                }

                const disabled = isPast(date) || isWeekend(date);

                return (
                  <button
                    key={date.toISOString()}
                    onClick={() => !disabled && selectDate(date)}
                    disabled={disabled}
                    className={`p-2 rounded-lg text-sm font-medium transition-all ${
                      isSelected(date)
                        ? "bg-primary text-white"
                        : disabled
                          ? "text-text-muted/30 cursor-not-allowed"
                          : "text-white hover:bg-primary/20 hover:text-primary"
                    }`}
                  >
                    {date.getDate()}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* Step 2: Time slots */}
        {step === "time" && (
          <motion.div
            key="time"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
            className="rounded-2xl border border-border bg-card/60 backdrop-blur-sm p-6 md:p-8"
          >
            <button
              onClick={() => setStep("calendar")}
              className="flex items-center gap-1 text-text-muted hover:text-white text-sm mb-4 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              Back
            </button>

            <h3 className="font-syne text-xl font-bold text-white mb-2">
              Select a Time
            </h3>
            <p className="text-text-muted text-sm mb-6 flex items-center gap-2">
              <Clock className="w-4 h-4" />
              {formatSelectedDate()} (EST)
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {timeSlots.map((time) => (
                <button
                  key={time}
                  onClick={() => selectTime(time)}
                  className={`px-4 py-3 rounded-lg border text-sm font-medium transition-all ${
                    selectedTime === time
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border text-white hover:border-primary/40 hover:text-primary"
                  }`}
                >
                  {time}
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Step 3: Contact form */}
        {step === "form" && (
          <motion.div
            key="form"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
            className="rounded-2xl border border-border bg-card/60 backdrop-blur-sm p-6 md:p-8"
          >
            <button
              onClick={() => setStep("time")}
              className="flex items-center gap-1 text-text-muted hover:text-white text-sm mb-4 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              Back
            </button>

            <h3 className="font-syne text-xl font-bold text-white mb-2">
              Your Details
            </h3>
            <p className="text-text-muted text-sm mb-6">
              {formatSelectedDate()} at {selectedTime} (EST)
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Full Name"
                  className="w-full pl-10 pr-4 py-3 rounded-lg bg-background border border-border text-white placeholder:text-text-muted text-sm focus:outline-none focus:border-primary transition-colors"
                />
              </div>

              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="Email Address"
                  className="w-full pl-10 pr-4 py-3 rounded-lg bg-background border border-border text-white placeholder:text-text-muted text-sm focus:outline-none focus:border-primary transition-colors"
                />
              </div>

              <div className="relative">
                <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                <input
                  type="text"
                  value={form.company}
                  onChange={(e) =>
                    setForm({ ...form, company: e.target.value })
                  }
                  placeholder="Company (optional)"
                  className="w-full pl-10 pr-4 py-3 rounded-lg bg-background border border-border text-white placeholder:text-text-muted text-sm focus:outline-none focus:border-primary transition-colors"
                />
              </div>

              <div className="relative">
                <MessageSquare className="absolute left-3 top-3 w-4 h-4 text-text-muted" />
                <textarea
                  value={form.message}
                  onChange={(e) =>
                    setForm({ ...form, message: e.target.value })
                  }
                  placeholder="Tell us about your eCommerce goals (optional)"
                  rows={3}
                  className="w-full pl-10 pr-4 py-3 rounded-lg bg-background border border-border text-white placeholder:text-text-muted text-sm focus:outline-none focus:border-primary transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full px-4 py-3 bg-primary hover:bg-primary-hover text-white font-semibold rounded-lg transition-colors duration-200 disabled:opacity-50 shadow-glow"
              >
                {submitting ? "Booking..." : "Confirm Booking"}
              </button>
            </form>
          </motion.div>
        )}

        {/* Step 4: Confirmation */}
        {step === "confirmed" && (
          <motion.div
            key="confirmed"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="rounded-2xl border border-border bg-card/60 backdrop-blur-sm p-8 md:p-12 text-center"
          >
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
              <Check className="w-8 h-8 text-primary" />
            </div>
            <h3 className="font-syne text-2xl font-bold text-white mb-2">
              You&apos;re Booked!
            </h3>
            <p className="text-text-muted text-sm mb-1">
              {formatSelectedDate()} at {selectedTime} (EST)
            </p>
            <p className="text-text-muted text-sm">
              We&apos;ll send a confirmation email to{" "}
              <span className="text-white">{form.email}</span>
            </p>
            <p className="mt-6 text-text-muted text-xs">
              A Zeeraa strategist will reach out before your call to prepare a
              personalized audit.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
