"use client";

import { Icon } from "@iconify/react/dist/iconify.js";
import { Loader2 } from "lucide-react";

interface BookingSummaryProps {
  packageName: string;
  travelerCount: number;
  pricePerPerson: number;
  arrivalDate: string;
  departureDate: string;
  selectedAddons: string[];
  addons: any[];
  totalAmount: number;
  appliedPax: any;
  isLoading: boolean;
  onPaymentInfoClick: () => void;
  onInclusionExclusionClick: () => void;
}

export default function BookingSummary({
  packageName,
  travelerCount,
  pricePerPerson,
  arrivalDate,
  departureDate,
  selectedAddons,
  addons,
  totalAmount,
  appliedPax,
  isLoading,
  onPaymentInfoClick,
  onInclusionExclusionClick
}: BookingSummaryProps) {
  return (
    <div className="lg:w-96">
      <div className="sticky top-6 space-y-3">
        <div className="bg-white lg:p-6 rounded-sm lg:border border-zinc-200">
          <h2 className="text-xl font-bold text-zinc-800 mb-6">Booking Summary</h2>

          <div className="space-y-4 mb-2">
            {/* Package Info */}
            <div className="pb-3 border-b border-zinc-200">
              <div className="flex justify-between items-start">
                <span className="text-zinc-800 font-semibold text-sm">Package:</span>
                <span className="font-bold text-right text-sm text-orange-500 max-w-[200px]">{packageName}</span>
              </div>
            </div>

            {/* Pricing Breakdown */}
            <div className="pb-3 border-b border-zinc-200">
              <h4 className="text-zinc-800 font-semibold mb-3">Pricing Details</h4>

              {appliedPax && (
                <div className="flex justify-between items-start">
                  <span className="text-zinc-800 font-semibold text-sm">
                    {appliedPax.min}-{appliedPax.max} Pax Rate
                  </span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-zinc-600 font-medium text-xs">
                  {travelerCount} Traveler{travelerCount > 1 ? 's' : ''} × ${pricePerPerson.toFixed(0)}
                </span>
                <span className="font-bold leading-0 text-orange-500">
                  ${(pricePerPerson * travelerCount).toFixed(0)}
                </span>
              </div>
            </div>

            {/* Trip Details */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-zinc-800 font-semibold">Total Travelers:</span>
                <span className="font-bold text-orange-500">{travelerCount}</span>
              </div>

              <div className="flex justify-between text-sm">
                <span className="text-zinc-800 font-semibold">Price per Traveler:</span>
                <span className="font-bold text-orange-500">${pricePerPerson.toFixed(0)}</span>
              </div>

              <div className="flex justify-between text-sm">
                <span className="text-zinc-800 font-semibold">Arrival Date:</span>
                <span className="font-bold text-orange-500">
                  {arrivalDate ? new Date(arrivalDate).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric'
                  }) : 'Not selected'}
                </span>
              </div>

              {departureDate && (
                <div className="flex justify-between text-sm">
                  <span className="text-zinc-800 font-semibold">Departure Date:</span>
                  <span className="font-bold text-orange-500">
                    {new Date(departureDate).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </span>
                </div>
              )}
            </div>

            {/* Selected Add-ons */}
            {selectedAddons && selectedAddons.length > 0 && (
              <div className="pt-3 border-t border-zinc-200">
                <h4 className="text-zinc-800 font-semibold mb-3 text-sm flex items-center gap-2">
                  <svg className="w-4 h-4 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 3.5a1.5 1.5 0 013 0V4a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-.5a1.5 1.5 0 000 3h.5a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-.5a1.5 1.5 0 00-3 0v.5a1 1 0 01-1 1H6a1 1 0 01-1-1v-3a1 1 0 00-1-1h-.5a1.5 1.5 0 010-3H4a1 1 0 001-1V6a1 1 0 011-1h3a1 1 0 001-1v-.5z" />
                  </svg>
                  Add-ons ({selectedAddons.length})
                </h4>
                <div className="space-y-2">
                  {addons
                    ?.filter((addon: any) => selectedAddons.includes(addon._id))
                    ?.map((addon: any) => (
                      <div key={addon._id} className="flex justify-between items-center text-sm">
                        <span className="text-zinc-800 font-medium">{addon.name}</span>
                        <span className="font-bold text-orange-500">+${addon.price}</span>
                      </div>
                    ))}
                </div>
              </div>
            )}

            {/* Total */}
            <div className="pt-4 border-t border-zinc-300">
              <div className="flex justify-between items-center">
                <span className="text-lg text-zinc-800 font-semibold">Total Amount:</span>
                <div className="text-2xl font-bold text-orange-500">
                  ${totalAmount.toFixed(2)}
                </div>
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-3 px-4 rounded-sm font-medium transition flex items-center justify-center ${
              isLoading
                ? "bg-zinc-400 cursor-not-allowed"
                : "bg-orange-600 hover:bg-orange-700 text-white"
            }`}
          >
            {isLoading ? (
              <span className="flex items-center">
                <Loader2 className="animate-spin mr-2" size={20} />
                Processing...
              </span>
            ) : (
              "Confirm Booking"
            )}
          </button>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-2">
          <button
            type="button"
            onClick={onInclusionExclusionClick}
            className="flex text-[#f05e25] font-semibold gap-2 items-center hover:text-orange-600 transition-colors"
          >
            <Icon icon={'mdi:information-outline'} className="size-5" />
            Cost Includes & Excludes
          </button>

          <button
            type="button"
            onClick={onPaymentInfoClick}
            className="flex text-[#f05e25] font-semibold gap-2 items-center hover:text-orange-600 transition-colors"
          >
            <Icon icon={'fluent:info-48-regular'} className="size-5" />
            Payment Info
          </button>
        </div>
      </div>
    </div>
  );
}
