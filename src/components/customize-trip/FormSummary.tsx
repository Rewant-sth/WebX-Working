import { CustomizeTripFormData } from './types';
import { ITravelPackage } from '@/types/IPackages';
import Image from 'next/image';

interface FormSummaryProps {
    formData: CustomizeTripFormData;
    packages: ITravelPackage[];
}

const groupSizeOptions = {
    solo: { name: 'Solo', icon: '👤' },
    duo: { name: 'Duo', icon: '👥' },
    group: { name: 'Group', icon: '👨‍👩‍👧‍👦' }
};

const budgetOptions = {
    budget: { name: 'Budget', range: '$500 - $1,000', icon: '💰' },
    standard: { name: 'Standard', range: '$1,000 - $2,500', icon: '⭐' },
    luxury: { name: 'Luxury', range: '$2,500 - $5,000+', icon: '💎' },
    custom: { name: 'Custom', range: 'Custom Budget', icon: '🎯' }
};

export default function FormSummary({ formData, packages }: FormSummaryProps) {
    const selectedPackage = packages.find(pkg => pkg._id === formData.package);
    const selectedGroupSize = groupSizeOptions[formData.groupSize as keyof typeof groupSizeOptions];
    const selectedBudget = budgetOptions[formData.budget as keyof typeof budgetOptions];

    if (!formData.package) {
        return null;
    }

    return (
        <div className="bg-gradient-to-br from-blue-50 to-orange-50 rounded-lg p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <svg className="w-5 h-5 text-blue-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                </svg>
                Your Trip Summary
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Package Selection */}
                {selectedPackage && (
                    <div className="bg-white rounded-lg p-4 shadow-sm">
                        <h4 className="font-medium text-gray-900 mb-2 flex items-center">
                            <span className="text-orange-500 mr-2">📦</span>
                            Selected Package
                        </h4>
                        <div className="flex items-start space-x-3">
                            <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-gray-200">
                                <Image
                                    src={selectedPackage.coverImage || '/placeholder.webp'}
                                    alt={selectedPackage.name}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <div>
                                <p className="font-semibold text-gray-900 text-sm">{selectedPackage.name}</p>
                                <p className="text-xs text-gray-600 mt-1 line-clamp-2">
                                    {selectedPackage.overview}
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Group Size */}
                {formData.groupSize && selectedGroupSize && (
                    <div className="bg-white rounded-lg p-4 shadow-sm">
                        <h4 className="font-medium text-gray-900 mb-2 flex items-center">
                            <span className="text-blue-500 mr-2">{selectedGroupSize.icon}</span>
                            Group Size
                        </h4>
                        <p className="font-semibold text-gray-900">{selectedGroupSize.name}</p>
                        <p className="text-sm text-gray-600">
                            {formData.numberOfTravelers} {formData.numberOfTravelers === 1 ? 'traveler' : 'travelers'}
                        </p>
                    </div>
                )}

                {/* Budget */}
                {formData.budget && selectedBudget && (
                    <div className="bg-white rounded-lg p-4 shadow-sm">
                        <h4 className="font-medium text-gray-900 mb-2 flex items-center">
                            <span className="text-green-500 mr-2">{selectedBudget.icon}</span>
                            Budget
                        </h4>
                        <p className="font-semibold text-gray-900">{selectedBudget.name}</p>
                        <p className="text-sm text-gray-600">
                            {formData.budget === 'custom' && formData.customBudget > 0
                                ? `$${formData.customBudget.toLocaleString()} per person`
                                : selectedBudget.range
                            }
                        </p>
                        {formData.budget === 'custom' && formData.customBudget > 0 && formData.numberOfTravelers > 1 && (
                            <p className="text-xs text-gray-500 mt-1">
                                Total: ${(formData.customBudget * formData.numberOfTravelers).toLocaleString()}
                            </p>
                        )}
                    </div>
                )}
            </div>

            {/* Personal Info Preview */}
            {formData.personalInfo[0]?.fullName && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                    <h4 className="font-medium text-gray-900 mb-2">Contact Information</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div>
                            <span className="text-gray-600">Name:</span>
                            <span className="ml-2 font-medium">{formData.personalInfo[0].fullName}</span>
                        </div>
                        <div>
                            <span className="text-gray-600">Email:</span>
                            <span className="ml-2 font-medium">{formData.personalInfo[0].email}</span>
                        </div>
                        {formData.personalInfo[0].country && (
                            <div>
                                <span className="text-gray-600">Country:</span>
                                <span className="ml-2 font-medium">{formData.personalInfo[0].country}</span>
                            </div>
                        )}
                        {formData.personalInfo[0].phoneNumber && (
                            <div>
                                <span className="text-gray-600">Phone:</span>
                                <span className="ml-2 font-medium">{formData.personalInfo[0].phoneNumber}</span>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Trip Dates */}
            {(formData.arrivalDate || formData.departureDate) && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                    <h4 className="font-medium text-gray-900 mb-2">Trip Dates</h4>
                    <div className="flex flex-wrap gap-4 text-sm">
                        {formData.arrivalDate && (
                            <div>
                                <span className="text-gray-600">Arrival:</span>
                                <span className="ml-2 font-medium">
                                    {new Date(formData.arrivalDate).toLocaleDateString()}
                                </span>
                            </div>
                        )}
                        {formData.departureDate && (
                            <div>
                                <span className="text-gray-600">Departure:</span>
                                <span className="ml-2 font-medium">
                                    {new Date(formData.departureDate).toLocaleDateString()}
                                </span>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
