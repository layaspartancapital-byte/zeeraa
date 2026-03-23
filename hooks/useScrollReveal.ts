"use client";

import { useEffect, useRef } from "react";
import { useAnimation, useInView } from "framer-motion";

export function useScrollReveal(threshold = 0.2) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: threshold });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView]);

  return { ref, controls, isInView };
}
