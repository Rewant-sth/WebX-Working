import { CustomizeTripFormData } from './types';

interface TripDetailsSectionProps {
    formData: CustomizeTripFormData;
    onChange: (field: keyof CustomizeTripFormData, value: any) => void;
}

export default function TripDetailsSection({ formData, onChange }: TripDetailsSectionProps) {
    // Generate traveler options (1-20 people)
    const travelerOptions = Array.from({ length: 20 }, (_, i) => i + 1);

    // Get today's date for minimum date selection
    const today = new Date().toISOString().split('T')[0];

    return (
        <div className="space-y-6">
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
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
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
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                    />
                </div>

                {/* Number of Travelers */}
                <div>
                    <label htmlFor="numberOfTravelers" className="block text-sm font-medium text-gray-700 mb-2">
                        Number of Travelers <span className="text-red-500">*</span>
                    </label>
                    <select
                        id="numberOfTravelers"
                        required
                        value={formData.numberOfTravelers}
                        onChange={(e) => onChange('numberOfTravelers', parseInt(e.target.value))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                    >
                        <option value="">Select number of travelers</option>
                        {travelerOptions.map((num) => (
                            <option key={num} value={num}>
                                {num} {num === 1 ? 'Person' : 'People'}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Adults (same as number of travelers for now) */}
                <div>
                    <label htmlFor="adults" className="block text-sm font-medium text-gray-700 mb-2">
                        Number of Adults
                    </label>
                    <select
                        id="adults"
                        value={formData.adults}
                        onChange={(e) => onChange('adults', parseInt(e.target.value))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                    >
                        {travelerOptions.map((num) => (
                            <option key={num} value={num}>
                                {num} Adult{num !== 1 ? 's' : ''}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Total Amount */}
                <div>
                    <label htmlFor="totalAmount" className="block text-sm font-medium text-gray-700 mb-2">
                        Estimated Budget (USD)
                    </label>
                    <input
                        type="number"
                        id="totalAmount"
                        min="0"
                        step="100"
                        value={formData.totalAmount}
                        onChange={(e) => onChange('totalAmount', parseInt(e.target.value) || 0)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                        placeholder="Enter your budget in USD"
                    />
                    <p className="text-sm text-gray-500 mt-1">
                        Optional: This helps us recommend suitable packages
                    </p>
                </div>

                {/* Fixed Date ID (hidden field for now, can be used for specific date packages) */}
                <div className="hidden">
                    <input
                        type="text"
                        value={formData.fixedDateId}
                        onChange={(e) => onChange('fixedDateId', e.target.value)}
                    />
                </div>
            </div>

            {/* Trip Duration Display */}
            {formData.arrivalDate && formData.departureDate && (
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
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
