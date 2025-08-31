import { CustomizeTripFormData } from './types';
import FormSummary from './FormSummary';
import { ITravelPackage } from '@/types/IPackages';

interface TripDetailsSectionProps {
    formData: CustomizeTripFormData;
    packages: ITravelPackage[];
    onChange: (field: keyof CustomizeTripFormData, value: any) => void;
}

export default function TripDetailsSection({ formData, packages, onChange }: TripDetailsSectionProps) {
    // Get today's date for minimum date selection
    const today = new Date().toISOString().split('T')[0];

    return (
        <div className="space-y-6">
            {/* Form Summary */}
            <FormSummary formData={formData} packages={packages} />

            {/* Header */}
            <div className="border-b pb-4 border-gray-200">
                <h2 className="text-2xl font-semibold">Trip Details</h2>
                <p className="mt-2 max-w-2xl text-gray-600">
                    When would you like to travel? Please select your preferred dates.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Arrival Date */}
                <div>
                    <label htmlFor="arrivalDate" className="block text-sm font-medium text-gray-700 mb-2">
                        Arrival Date <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="date"
                        id="arrivalDate"
                        required
                        min={today}
                        value={formData.arrivalDate}
                        onChange={(e) => onChange('arrivalDate', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-sm focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                    />
                </div>

                {/* Departure Date */}
                <div>
                    <label htmlFor="departureDate" className="block text-sm font-medium text-gray-700 mb-2">
                        Departure Date <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="date"
                        id="departureDate"
                        required
                        min={formData.arrivalDate || today}
                        value={formData.departureDate}
                        onChange={(e) => onChange('departureDate', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-sm focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                    />
                </div>
            </div>

            {/* Trip Duration Display */}
            {formData.arrivalDate && formData.departureDate && (
                <div className="bg-orange-50 border border-orange-200 rounded-sm p-4">
                    <div className="flex items-center">
                        <div className="flex-shrink-0">
                            <svg className="w-5 h-5 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <div className="ml-3">
                            <p className="text-sm font-medium text-orange-800">
                                Trip Duration: {Math.ceil((new Date(formData.departureDate).getTime() - new Date(formData.arrivalDate).getTime()) / (1000 * 3600 * 24))} days
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
