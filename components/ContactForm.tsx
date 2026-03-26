"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const contactSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().optional(),
  company: z.string().optional(),
  platform: z.string().min(1, "Please select a platform"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

const platformOptions = [
  "Amazon",
  "Shopify",
  "Walmart",
  "eBay",
  "TikTok Shop",
  "Etsy",
  "Multiple Platforms",
  "Other",
];

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Failed to submit");

      setSubmitted(true);
      reset();
    } catch (error) {
      console.error("Contact form error:", error);
    }
  };

  if (submitted) {
    return (
      <div className="bg-white border border-border rounded-2xl shadow-card p-8 text-center">
        <h3 className="font-syne text-2xl font-bold mb-4 text-primary">
          Message Sent!
        </h3>
        <p className="text-text-muted">
          Thank you for reaching out. Our team will get back to you within 24
          hours.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {/* Name */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-[#333333] mb-1.5">
          Name <span className="text-primary">*</span>
        </label>
        <input
          id="name"
          type="text"
          placeholder="Your full name"
          {...register("name")}
          className="w-full bg-white border border-border rounded-lg px-4 py-3 text-text-primary placeholder:text-text-muted focus:border-primary focus:shadow-[0_0_0_3px_rgba(0,102,255,0.1)] focus:outline-none transition-all"
        />
        {errors.name && (
          <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
        )}
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-[#333333] mb-1.5">
          Email <span className="text-primary">*</span>
        </label>
        <input
          id="email"
          type="email"
          placeholder="you@company.com"
          {...register("email")}
          className="w-full bg-white border border-border rounded-lg px-4 py-3 text-text-primary placeholder:text-text-muted focus:border-primary focus:shadow-[0_0_0_3px_rgba(0,102,255,0.1)] focus:outline-none transition-all"
        />
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
        )}
      </div>

      {/* Phone */}
      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-[#333333] mb-1.5">
          Phone
        </label>
        <input
          id="phone"
          type="tel"
          placeholder="(555) 000-0000"
          {...register("phone")}
          className="w-full bg-white border border-border rounded-lg px-4 py-3 text-text-primary placeholder:text-text-muted focus:border-primary focus:shadow-[0_0_0_3px_rgba(0,102,255,0.1)] focus:outline-none transition-all"
        />
      </div>

      {/* Company */}
      <div>
        <label htmlFor="company" className="block text-sm font-medium text-[#333333] mb-1.5">
          Company
        </label>
        <input
          id="company"
          type="text"
          placeholder="Your company name"
          {...register("company")}
          className="w-full bg-white border border-border rounded-lg px-4 py-3 text-text-primary placeholder:text-text-muted focus:border-primary focus:shadow-[0_0_0_3px_rgba(0,102,255,0.1)] focus:outline-none transition-all"
        />
      </div>

      {/* Platform */}
      <div>
        <label htmlFor="platform" className="block text-sm font-medium text-[#333333] mb-1.5">
          Platform <span className="text-primary">*</span>
        </label>
        <select
          id="platform"
          {...register("platform")}
          className="w-full bg-white border border-border rounded-lg px-4 py-3 text-text-primary focus:border-primary focus:shadow-[0_0_0_3px_rgba(0,102,255,0.1)] focus:outline-none transition-all"
        >
          <option value="">Select a platform</option>
          {platformOptions.map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </select>
        {errors.platform && (
          <p className="text-red-500 text-sm mt-1">
            {errors.platform.message}
          </p>
        )}
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-[#333333] mb-1.5">
          Message <span className="text-primary">*</span>
        </label>
        <textarea
          id="message"
          rows={5}
          placeholder="Tell us about your brand and goals..."
          {...register("message")}
          className="w-full bg-white border border-border rounded-lg px-4 py-3 text-text-primary placeholder:text-text-muted focus:border-primary focus:shadow-[0_0_0_3px_rgba(0,102,255,0.1)] focus:outline-none transition-all resize-none"
        />
        {errors.message && (
          <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-primary hover:bg-primary-hover disabled:opacity-50 text-white font-semibold px-8 py-4 rounded-lg transition-colors"
      >
        {isSubmitting ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
}
