"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function VSLVideo() {
  const [playing, setPlaying] = useState(false);

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-background"><div className="max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="relative rounded-2xl overflow-hidden shadow-glow-lg bg-card border border-border"
        style={{ aspectRatio: "16/9" }}
      >
        {!playing ? (
          <button
            onClick={() => setPlaying(true)}
            className="absolute inset-0 w-full h-full cursor-pointer group"
            aria-label="Play video"
          >
            {/* Thumbnail placeholder */}
            <div className="absolute inset-0 bg-gradient-to-br from-card via-background to-card" />

            {/* Blue glow behind play button */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-primary/20 rounded-full blur-xl" />

            {/* Play button */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full bg-primary flex items-center justify-center shadow-glow group-hover:scale-110 transition-transform duration-200">
              <svg
                className="w-8 h-8 text-white ml-1"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>

            {/* Label */}
            <span className="absolute bottom-6 left-1/2 -translate-x-1/2 text-text-muted text-sm font-medium">
              Watch how Zeeraa scales eCommerce brands
            </span>
          </button>
        ) : (
          <iframe
            src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&rel=0"
            title="Zeeraa eCommerce Video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 w-full h-full"
          />
        )}
      </motion.div>
    </div></section>
  );
}
