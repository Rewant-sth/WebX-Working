interface AdditionalInfoSectionProps {
    message: string;
    specialRequirements: string;
    termsAccepted: boolean;
    onChange: (field: string, value: any) => void;
}

export default function AdditionalInfoSection({
    message,
    specialRequirements,
    termsAccepted,
    onChange
}: AdditionalInfoSectionProps) {
    return (
        <div className="space-y-6">
            <div className="space-y-6">
                {/* Message */}
                <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                        Message / Additional Notes
                    </label>
                    <textarea
                        id="message"
                        rows={4}
                        value={message}
                        onChange={(e) => onChange('message', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 resize-vertical"
                        placeholder="Tell us about your travel expectations, interests, or any specific requests..."
                    />
                    <p className="text-sm text-gray-500 mt-1">
                        This helps us tailor your trip to your preferences
                    </p>
                </div>

                {/* Special Requirements */}
                <div>
                    <label htmlFor="specialRequirements" className="block text-sm font-medium text-gray-700 mb-2">
                        Special Requirements
                    </label>
                    <textarea
                        id="specialRequirements"
                        rows={3}
                        value={specialRequirements}
                        onChange={(e) => onChange('specialRequirements', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 resize-vertical"
                        placeholder="Dietary requirements, medical conditions, accessibility needs, etc."
                    />
                    <p className="text-sm text-gray-500 mt-1">
                        Any medical, dietary, or accessibility requirements we should know about
                    </p>
                </div>

                {/* Common Special Requirements Checkboxes */}
                <div>
                    <p className="text-sm font-medium text-gray-700 mb-3">Common Requirements (Check all that apply):</p>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {[
                            'Vegetarian meals',
                            'Vegan meals',
                            'Halal meals',
                            'Gluten-free meals',
                            'Single room accommodation',
                            'Photography focused',
                            'Cultural experiences',
                            'Adventure activities',
                            'Wildlife viewing',
                            'Local community visits',
                            'Meditation/Yoga sessions',
                            'Luxury accommodation'
                        ].map((requirement) => (
                            <label key={requirement} className="flex items-center space-x-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    className="rounded border-gray-300 text-orange-500 focus:ring-orange-500"
                                    onChange={(e) => {
                                        const currentRequirements = specialRequirements.split(', ').filter(req => req);
                                        if (e.target.checked) {
                                            const newRequirements = [...currentRequirements, requirement].join(', ');
                                            onChange('specialRequirements', newRequirements);
                                        } else {
                                            const newRequirements = currentRequirements.filter(req => req !== requirement).join(', ');
                                            onChange('specialRequirements', newRequirements);
                                        }
                                    }}
                                    checked={specialRequirements.includes(requirement)}
                                />
                                <span className="text-sm text-gray-700">{requirement}</span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Terms and Conditions */}
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                    <div className="flex items-start space-x-3">
                        <input
                            id="termsAccepted"
                            type="checkbox"
                            required
                            checked={termsAccepted}
                            onChange={(e) => onChange('termsAccepted', e.target.checked)}
                            className="mt-1 rounded border-gray-300 text-orange-500 focus:ring-orange-500"
                        />
                        <div className="flex-1">
                            <label htmlFor="termsAccepted" className="block text-sm font-medium text-gray-900 cursor-pointer">
                                I accept the Terms and Conditions <span className="text-red-500">*</span>
                            </label>
                            <p className="text-sm text-gray-600 mt-1">
                                By checking this box, I agree to Real Himalaya's{' '}
                                <a href="/terms-and-conditions" target="_blank" className="text-orange-500 hover:text-orange-600 underline">
                                    Terms and Conditions
                                </a>
                                {' '}and{' '}
                                <a href="/privacy-policy" target="_blank" className="text-orange-500 hover:text-orange-600 underline">
                                    Privacy Policy
                                </a>
                                . I understand that this is a customize trip request and pricing will be provided based on my requirements.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Information Notice */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex">
                        <div className="flex-shrink-0">
                            <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <div className="ml-3">
                            <h3 className="text-sm font-medium text-blue-800">
                                What happens next?
                            </h3>
                            <div className="mt-2 text-sm text-blue-700">
                                <ul className="list-disc pl-5 space-y-1">
                                    <li>Our travel experts will review your customize trip request</li>
                                    <li>We'll contact you within 24 hours to discuss your requirements</li>
                                    <li>A detailed itinerary and quote will be provided based on your preferences</li>
                                    <li>Once confirmed, we'll handle all the arrangements for your perfect Himalayan adventure</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
