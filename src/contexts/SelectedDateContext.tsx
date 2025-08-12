
"use client";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { IFixedDate } from "@/types/IPackages";

type SelectedTripContextType = {
  selectedDate: IFixedDate[] | null;
  setSelectedTrip: (date: IFixedDate[]) => void;
};

const SelectedTripContext = createContext<SelectedTripContextType | undefined>(
  undefined
);

export const SelectedTripProvider = ({ children }: { children: ReactNode }) => {
  const [selectedDate, setSelectedDate] = useState<IFixedDate[] | null>(null);

  // Load selectedDate from sessionStorage on mount (client-side)
  useEffect(() => {
    const storedDate = sessionStorage.getItem("selectedDate");
    if (storedDate !== null) {
      try {
        setSelectedDate(JSON.parse(storedDate));
      } catch (err) {
        console.error("Failed to parse saved trip date", err);
      }
    }
  }, []);

  // Save selectedDate to sessionStorage whenever it changes
  useEffect(() => {
    if (selectedDate) {
      sessionStorage.setItem("selectedDate", JSON.stringify(selectedDate));
    }
  }, [selectedDate]);

  const setSelectedTrip = (date: IFixedDate[]) => {
    setSelectedDate(date);
  };

  return (
    <SelectedTripContext.Provider value={{ selectedDate, setSelectedTrip }}>
      {children}
    </SelectedTripContext.Provider>
  );
};

export const useSelectedTrip = () => {
  const context = useContext(SelectedTripContext);
  if (!context) {
    throw new Error("useSelectedTrip must be used within SelectedTripProvider");
  }
  return context;
};
