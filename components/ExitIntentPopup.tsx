"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useExitIntent } from "@/hooks/useExitIntent";

export default function ExitIntentPopup() {
  const { showPopup, dismiss } = useExitIntent();
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || submitting) return;

    setSubmitting(true);
    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: "exit-intent" }),
      });
      setSubmitted(true);
    } catch {
      // Silently handle error
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {showPopup && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[60] flex items-center justify-center p-4"
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={dismiss}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="relative z-10 w-full max-w-md rounded-2xl border border-border bg-card p-8 shadow-glow-lg"
          >
            {/* Close button */}
            <button
              onClick={dismiss}
              className="absolute top-4 right-4 text-text-muted hover:text-white transition-colors"
              aria-label="Close popup"
            >
              <X className="w-5 h-5" />
            </button>

            {!submitted ? (
              <>
                {/* Blue glow accent */}
                <div className="absolute -top-px left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />

                <h3 className="font-syne text-2xl font-bold text-white text-center">
                  Before You Go
                </h3>
                <p className="mt-1 font-syne text-lg font-bold text-primary text-center">
                  Get a Free eCommerce Audit
                </p>
                <p className="mt-3 text-text-muted text-sm text-center">
                  Enter your email and our team will send you a personalized
                  audit of your eCommerce presence — completely free.
                </p>

                <form onSubmit={handleSubmit} className="mt-6 space-y-3">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full px-4 py-3 rounded-lg bg-background border border-border text-white placeholder:text-text-muted text-sm focus:outline-none focus:border-primary transition-colors"
                  />
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full px-4 py-3 bg-primary hover:bg-primary-hover text-white font-semibold rounded-lg transition-colors duration-200 disabled:opacity-50"
                  >
                    {submitting ? "Submitting..." : "Claim Free Audit"}
                  </button>
                </form>

                <p className="mt-4 text-text-muted text-xs text-center">
                  No spam. Unsubscribe at any time.
                </p>
              </>
            ) : (
              <div className="text-center py-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-6 h-6 text-primary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <h3 className="font-syne text-xl font-bold text-white">
                  You&apos;re In!
                </h3>
                <p className="mt-2 text-text-muted text-sm">
                  We&apos;ll send your free audit within 24 hours.
                </p>
                <button
                  onClick={dismiss}
                  className="mt-6 px-6 py-2 text-primary text-sm font-medium hover:underline"
                >
                  Close
                </button>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
