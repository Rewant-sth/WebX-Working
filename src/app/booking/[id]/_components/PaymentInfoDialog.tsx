"use client";

import { X } from "lucide-react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useEffect } from "react";

interface PaymentInfoDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PaymentInfoDialog({ isOpen, onClose }: PaymentInfoDialogProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div 
      className="backdrop-blur-sm flex items-center justify-center p-4 fixed inset-0 bg-black/30 z-[9999999] overflow-y-auto"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-2xl shadow-xl max-w-3xl w-full relative my-8"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 hover:bg-gray-100 rounded-full p-1 transition-colors"
        >
          <X className="size-6" />
        </button>

        <div className="p-8">
          <div className="flex items-center gap-3 mb-6">
            <Icon icon={'ph:info-fill'} className="size-7 text-orange-600" />
            <h2 className="text-xl font-semibold text-zinc-800">Payment Information</h2>
          </div>

          <div className="space-y-4 rounded-2xl p-4 bg-zinc-100/70">
            <img src="/logo/global.png" alt="global bank logo" className="w-52" />
            <div className="space-y-3 grid lg:grid-cols-2">
              <div>
                <p className="text-base text-zinc-800 mb-1">A/C Holder Name</p>
                <p className="font-medium text-orange-500 text-lg">Real Himalaya Pvt. Ltd</p>
              </div>

              <div>
                <p className="text-base text-zinc-800 mb-1">A/C Holder Address</p>
                <p className="font-medium text-orange-500 text-lg">Changunarayan 3, Bhaktapur, Nepal</p>
              </div>

              <div>
                <p className="text-base text-zinc-800 mb-1">A/C Number</p>
                <p className="font-medium text-orange-500 text-lg font-mono">00101020005129</p>
              </div>

              <div>
                <p className="text-base text-zinc-800 mb-1">Bank Name</p>
                <p className="font-medium text-orange-500 text-lg">Global IME Bank Ltd</p>
              </div>

              <div>
                <p className="text-base text-zinc-800 mb-1">Bank Address</p>
                <p className="font-medium text-orange-500 text-lg">Kantipath branch, Kathmandu, Nepal</p>
              </div>

              <div>
                <p className="text-base text-zinc-800 mb-1">SWIFT Code</p>
                <p className="font-medium text-orange-500 text-lg font-mono">GLBBNPKA</p>
              </div>
            </div>
          </div>

          <div className="mt-4">
            <p>
              <strong>Note:</strong> Please use these bank details for wire transfer or direct bank deposit. After payment, kindly share the transaction receipt with us.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
