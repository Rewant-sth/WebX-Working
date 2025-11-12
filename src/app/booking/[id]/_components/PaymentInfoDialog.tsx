"use client";

import { X } from "lucide-react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useEffect, useRef } from "react";

interface PaymentInfoDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PaymentInfoDialog({ isOpen, onClose }: PaymentInfoDialogProps) {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    // Prevent body scroll when modal is open
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // Enable smooth scrolling on the content
    const contentElement = contentRef.current;
    if (contentElement) {
      // @ts-ignore - webkit prefix for iOS smooth scrolling
      contentElement.style.webkitOverflowScrolling = 'touch';
      
      // Add wheel event listener for better scroll handling
      const handleWheel = (e: WheelEvent) => {
        e.stopPropagation();
      };
      
      contentElement.addEventListener('wheel', handleWheel, { passive: true });
      
      return () => {
        document.body.style.overflow = originalOverflow;
        contentElement.removeEventListener('wheel', handleWheel);
      };
    }

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/30 backdrop-blur-sm z-[9999999] flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-lg w-full max-w-3xl max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header - Fixed */}
        <div className="flex items-center justify-between p-6 border-b border-zinc-200 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-orange-50 rounded-lg">
              <Icon icon={'ph:info-fill'} className="size-6 text-orange-600" />
            </div>
            <h2 className="text-xl font-semibold text-zinc-800">Payment Information</h2>
          </div>
          <button
            onClick={onClose}
            className="hover:bg-zinc-100 rounded-full p-2 transition-colors"
          >
            <X className="size-5 text-zinc-600" />
          </button>
        </div>

        {/* Content - Scrollable if needed */}
        <div 
          ref={contentRef}
          className="overflow-y-auto flex-1 p-6 overscroll-contain"
          style={{ 
            WebkitOverflowScrolling: 'touch',
            scrollBehavior: 'smooth'
          }}
        >
          <div className="border border-zinc-200 rounded-lg p-6 bg-zinc-50">
            <img src="/logo/global.png" alt="global bank logo" className="w-52 mb-6" />
            <div className="space-y-4 grid lg:grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-zinc-600 mb-1">A/C Holder Name</p>
                <p className="font-semibold text-zinc-800 text-base">Real Himalaya Pvt. Ltd</p>
              </div>

              <div>
                <p className="text-sm text-zinc-600 mb-1">A/C Holder Address</p>
                <p className="font-semibold text-zinc-800 text-base">Changunarayan 3, Bhaktapur, Nepal</p>
              </div>

              <div>
                <p className="text-sm text-zinc-600 mb-1">A/C Number</p>
                <p className="font-semibold text-zinc-800 text-base font-mono">00101020005129</p>
              </div>

              <div>
                <p className="text-sm text-zinc-600 mb-1">Bank Name</p>
                <p className="font-semibold text-zinc-800 text-base">Global IME Bank Ltd</p>
              </div>

              <div>
                <p className="text-sm text-zinc-600 mb-1">Bank Address</p>
                <p className="font-semibold text-zinc-800 text-base">Kantipath branch, Kathmandu, Nepal</p>
              </div>

              <div>
                <p className="text-sm text-zinc-600 mb-1">SWIFT Code</p>
                <p className="font-semibold text-zinc-800 text-base font-mono">GLBBNPKA</p>
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-zinc-700">
              <strong className="text-zinc-800">Note:</strong> Please use these bank details for wire transfer or direct bank deposit. After payment, kindly share the transaction receipt with us.
            </p>
          </div>
        </div>

        {/* Footer - Fixed */}
        <div className="p-6 border-t border-zinc-200 bg-zinc-50 flex-shrink-0">
          <button
            onClick={onClose}
            className="w-full py-3 px-4 bg-orange-600 hover:bg-orange-700 text-white rounded-lg font-medium transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
