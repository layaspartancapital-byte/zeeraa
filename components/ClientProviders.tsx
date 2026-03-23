"use client";

import { ReactNode } from "react";
import dynamic from "next/dynamic";
import { BookingModalContext, useBookingModalState } from "@/hooks/useBookingModal";

const BookingModal = dynamic(() => import("./BookingModal"), { ssr: false });
const FloatingCTA = dynamic(() => import("./FloatingCTA"), { ssr: false });
const ExitIntentPopup = dynamic(() => import("./ExitIntentPopup"), { ssr: false });

export default function ClientProviders({ children }: { children: ReactNode }) {
  const bookingModal = useBookingModalState();

  return (
    <BookingModalContext.Provider value={bookingModal}>
      {children}
      <BookingModal />
      <FloatingCTA />
      <ExitIntentPopup />
    </BookingModalContext.Provider>
  );
}
