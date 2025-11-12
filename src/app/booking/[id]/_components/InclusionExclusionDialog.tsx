"use client";

import { X } from "lucide-react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useEffect, useRef } from "react";

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
        className="bg-white rounded-2xl w-full  max-w-4xl max-h-[85vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
       

        {/* Content - Scrollable */}
        <div 
          ref={contentRef}
          className="overflow-y-auto relative  flex-1 p-12 overscroll-contain"
          style={{ 
            WebkitOverflowScrolling: 'touch',
            scrollBehavior: 'smooth'
          }}
        >
          <div className="absolute top-4 right-4">
            <button onClick={onClose}><Icon icon={"icon-park-outline:close"}/></button>
          </div>
          <div className="space-y-6">
            {/* Inclusions Section */}
            {inclusions.length > 0 && (
              <div className="  overflow-hidden">
                <div className="">
                  <div className="flex items-center gap-2 text-xl lg:text-2xl">
                    <h3 className=" font-semibold text-zinc-800">What is Included ?</h3>
                  </div>
                </div>
                <div className=" py-3 bg-white">
                  <ul className="space-y-3">
                    {inclusions.map((item, index) => (
                      <li key={index} className="flex items-start gap-3  text-lg text-zinc-700">
                        <Icon  icon={"material-symbols:check-circle"} className="size-5 text-green-500 mt-1 shrink-0" />
                        <span dangerouslySetInnerHTML={{ __html: item.replace("●","") }} />
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* Exclusions Section */}
            {exclusions.length > 0 && (
              <div className=" overflow-hidden">
                <div className="  border-red-200">
                  <div className="flex items-center gap-2 text-xl lg:text-2xl">
                    <h3 className=" font-semibold text-zinc-800">What  Not Included</h3>
                  </div>
                </div>
                <div className="mt-4 ">
                  <ul className="space-y-4">
                    {exclusions.map((item, index) => (
                      <li key={index} className="flex items-start gap-3  text-zinc-700">
                        <Icon icon={"material-symbols:cancel"} className="size-5 text-red-500 mt-1 shrink-0" />
                        <span dangerouslySetInnerHTML={{ __html: item.replace("●","") }} />
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {inclusions.length === 0 && exclusions.length === 0 && (
              <div className="text-center py-12 text-zinc-500">
                <Icon icon={'mdi:information-outline'} className="size-12 mx-auto mb-3 opacity-50" />
                <p className="text-sm">No inclusion or exclusion information available for this package.</p>
              </div>
            )}
          </div>
        </div>

        
      </div>
    </div>
  );
}
