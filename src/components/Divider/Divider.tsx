"use client"
import { ArrowRight, Mountain } from "lucide-react";
import React from "react";

export interface DividerProps {
  heading?: string;
  highlight?: string;
  description?: string;
  imageUrl: string;
  buttonText?: string;
  onButtonClick?: () => void;
  remainingCount?: number;
  showButton?: boolean;
}

const Divider: React.FC<DividerProps> = ({
  heading = "Discover More Epic",
  highlight = "Mountain Adventures",
  description = "From the towering peaks of the Himalayas to hidden valley trails, our carefully curated expeditions offer you the chance to experience Nepal's most breathtaking landscapes. Each journey is crafted with safety, comfort, and unforgettable memories in mind.",
  imageUrl,
  buttonText = "Explore More Adventures",
  onButtonClick,
  remainingCount,
  showButton = true,
}) => {
  return (
    <div className="relative bg-blue-400 w-full ">
      <div className="relative w-full min-h-[50vh] sm:min-h-[55vh] md:min-h-[60vh] lg:h-[66vh] flex flex-col lg:flex-row bg-transparent overflow-hidden">

        {/* TEXT SIDE */}
        <div className="relative lg:absolute lg:w-[70%] xl:w-/12 w-full h-full flex flex-col justify-center z-20 py-10 md:py-12 lg:py-12 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 bg-transparent order-2 lg:order-1">
          {/* Mobile/Tablet overlay for better text readability */}
          {/* <div className="absolute inset-0 bg-gradient-to-b from-blue-900/80 via-blue-800/70 to-blue-700/60 lg:hidden" /> */}

          <div className="relative z-10">
            <h3 className="text-2xl sm:text-3xl md:text-3xl lg:text-4xl xl:text-5xl font-bold leading-tight mb-3 sm:mb-4 md:mb-6 text-white drop-shadow-lg">
              <span className="block">{heading}</span>
              <span className="block lg:bg-gradient-to-r lg:from-white lg:via-blue-100 to-white bg-clip-text lg:text-transparent mt-1 sm:mt-2">
                {highlight}
              </span>
            </h3>

            <p className="text-sm sm:text-base md:text-lg lg:text-lg xl:text-xl text-white/90 leading-relaxed mb-6 sm:mb-8 drop-shadow-lg max-w-none lg:max-w-lg xl:max-w-xl">
              {description}
            </p>

            {showButton && (
              <div className="space-y-3">
                <button
                  className="group bg-white text-blue-700 px-6 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl text-base sm:text-lg lg:text-xl font-semibold hover:bg-blue-50 transform hover:scale-105 transition-all duration-300 flex items-center gap-2 sm:gap-3 shadow-xl hover:shadow-2xl w-full sm:w-auto justify-center sm:justify-start"
                  onClick={onButtonClick}
                >
                  <span className="truncate">{buttonText}</span>
                  <ArrowRight
                    size={18}
                    className="group-hover:translate-x-1 transition-transform duration-200 flex-shrink-0"
                  />
                </button>

                <p className="text-white/70 text-xs sm:text-sm">
                  {remainingCount !== undefined
                    ? `${remainingCount} more amazing adventures waiting for you`
                    : "more amazing adventures waiting for you"}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* IMAGE SIDE */}
        <div className="absolute inset-0 lg:relative w-full lg:w-full   h-full order-1 lg:order-2">
          {/* Background image */}
          <div className=" h-full  min-h-[50vh] sm:min-h-[55vh] md:min-h-[60vh] lg:h-[66vh] w-full">
            <img
              src={imageUrl}
              alt={highlight}
              className=" h-full  min-h-[50vh] sm:min-h-[55vh] md:min-h-[60vh] lg:h-[66vh] w-full object-cover object-center lg:object-top absolute inset-0"
              style={{ zIndex: 1 }}
            />
          </div>

          {/* Desktop overlay gradient */}
          <div
            className="absolute  h-full  min-h-[50vh] sm:min-h-[55vh] md:min-h-[60vh] lg:h-[66vh] w-full inset-0 z-10 pointer-events-none hidden lg:block"
            style={{
              background:
                "linear-gradient(90deg,rgba(19,62,135,0.92) 0%,rgba(21,101,192,0.85) 50%,rgba(13,148,255,0.38) 70%,rgba(255,255,255,0.08) 100%)",
            }}
          />

          {/* Mobile/Tablet overlay gradient */}
          <div
            className="absolute inset-0 z-10 pointer-events-none lg:hidden h-full  min-h-[50vh] sm:min-h-[55vh] md:min-h-[60vh] lg:h-[66vh] w-full"
            style={{
              background:
                "linear-gradient(180deg,rgba(19,62,135,0.3) 0%,rgba(21,101,192,0.6) 50%,rgba(13,148,255,0.8) 100%)",
            }}
          />

          {/* Decorative floating elements - responsive */}
          <div className="absolute z-20 -top-2 sm:-top-4 lg:-top-6 -right-2 sm:-right-4 lg:-right-6 w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 bg-cyan-300/30 rounded-full animate-pulse" />
          <div className="absolute z-20 -bottom-2 sm:-bottom-4 lg:-bottom-6 -left-2 sm:-left-4 lg:-left-6 w-4 h-4 sm:w-6 sm:h-6 lg:w-8 lg:h-8 bg-white/20 rounded-full animate-pulse delay-1000" />

          {/* Additional decorative elements for visual interest */}
          <div className="absolute z-20 top-1/3 right-1/4 w-2 h-2 sm:w-3 sm:h-3 bg-white/30 rounded-full animate-pulse delay-500" />
          <div className="absolute z-20 bottom-1/3 left-1/4 w-1 h-1 sm:w-2 sm:h-2 bg-cyan-200/40 rounded-full animate-pulse delay-700" />
        </div>
      </div>
    </div>
  );
};

export default Divider;