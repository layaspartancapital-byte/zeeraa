"use client";

import { useState, createContext, useContext } from "react";

interface BookingModalContextType {
  isOpen: boolean;
  open: () => void;
  close: () => void;
}

export const BookingModalContext = createContext<BookingModalContextType>({
  isOpen: false,
  open: () => {},
  close: () => {},
});

export function useBookingModal() {
  return useContext(BookingModalContext);
}

export function useBookingModalState() {
  const [isOpen, setIsOpen] = useState(false);
  return {
    isOpen,
    open: () => setIsOpen(true),
    close: () => setIsOpen(false),
  };
}
