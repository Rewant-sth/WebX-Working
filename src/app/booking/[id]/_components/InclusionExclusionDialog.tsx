"use client";

import { X } from "lucide-react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useEffect } from "react";

interface InclusionExclusionDialogProps {
  isOpen: boolean;
  onClose: () => void;
  inclusions?: string[];
  exclusions?: string[];
}

export default function InclusionExclusionDialog({
  isOpen,
  onClose,
  inclusions = [],
  exclusions = []
}: InclusionExclusionDialogProps) {
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
        className="bg-white rounded-2xl shadow-xl max-w-3xl w-full relative my-8 max-h-[calc(100vh-4rem)]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="overflow-y-auto max-h-[calc(100vh-4rem)]">
          <button
            onClick={onClose}
            className="sticky top-4 right-4 ml-auto hover:bg-gray-100 rounded-full p-1 transition-colors z-10 float-right"
          >
            <X className="size-6" />
          </button>

          <div className="p-8 clear-both">
            <div className="flex items-center gap-3 mb-6">
              <Icon icon={'mdi:information-outline'} className="size-7 text-orange-600" />
              <h2 className="text-xl font-semibold text-zinc-800">Cost Includes & Excludes</h2>
            </div>

            <div className="space-y-6">
              {/* Inclusions Section */}
              {inclusions.length > 0 && (
                <div className="bg-green-50 rounded-xl p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Icon icon={'mdi:check-circle'} className="size-6 text-green-600" />
                    <h3 className="text-lg font-semibold text-green-800">What's Included</h3>
                  </div>
                  <ul className="space-y-2">
                    {inclusions.map((item, index) => (
                      <li key={index} className="flex items-start gap-2 text-zinc-700">
                        <Icon icon={'mdi:check'} className="size-5 text-green-600 mt-0.5 shrink-0" />
                        <span dangerouslySetInnerHTML={{ __html: item }} />
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Exclusions Section */}
              {exclusions.length > 0 && (
                <div className="bg-red-50 rounded-xl p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Icon icon={'mdi:close-circle'} className="size-6 text-red-600" />
                    <h3 className="text-lg font-semibold text-red-800">What's Not Included</h3>
                  </div>
                  <ul className="space-y-2">
                    {exclusions.map((item, index) => (
                      <li key={index} className="flex items-start gap-2 text-zinc-700">
                        <Icon icon={'mdi:close'} className="size-5 text-red-600 mt-0.5 shrink-0" />
                        <span dangerouslySetInnerHTML={{ __html: item }} />
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {inclusions.length === 0 && exclusions.length === 0 && (
                <div className="text-center py-8 text-zinc-500">
                  <Icon icon={'mdi:information-outline'} className="size-12 mx-auto mb-2 opacity-50" />
                  <p>No inclusion or exclusion information available for this package.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
