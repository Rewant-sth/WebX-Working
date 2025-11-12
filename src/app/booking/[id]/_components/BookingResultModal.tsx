"use client";

import { CheckCircle2, X, XCircle } from "lucide-react";

interface BookingResultModalProps {
  isOpen: boolean;
  success: boolean;
  message: string;
  onClose: () => void;
}

export default function BookingResultModal({
  isOpen,
  success,
  message,
  onClose
}: BookingResultModalProps) {
  if (!isOpen) return null;

  return (
    <div className="backdrop-blur-lg flex items-center justify-center p-4 fixed inset-0 bg-black/30 z-[9999999] h-full">
      <div className="h-full w-full relative">
        <div className="h-screen sticky top-0 flex justify-center items-center">
          <div className="flex flex-col justify-center bg-white items-center p-8 py-12 relative rounded-lg shadow-lg max-w-2xl w-full">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 hover:bg-gray-100 rounded-full p-1 transition-colors"
            >
              <X className="size-6" />
            </button>

            {success ? (
              <>
                <div className="flex justify-center items-center text-green-600 mb-4">
                  <CheckCircle2 className="size-16" />
                </div>
                <h2 className="text-2xl font-bold mb-4 text-center">Booking Successful!</h2>
                <p className="text-zinc-700 text-center">{message}</p>
              </>
            ) : (
              <>
                <div className="flex justify-center items-center text-red-600 mb-4">
                  <XCircle className="size-16" />
                </div>
                <h2 className="text-2xl font-bold mb-4 text-center">Booking Failed</h2>
                <p className="text-zinc-700 text-center">{message}</p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
