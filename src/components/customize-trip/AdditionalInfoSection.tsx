import { CustomizeTripFormData } from './types';
import { ITravelPackage } from '@/types/IPackages';

interface AdditionalInfoSectionProps {
    formData: CustomizeTripFormData;
    packages: ITravelPackage[];
    message: string;
    specialRequirements: string;
    termsAccepted: boolean;
    onChange: (field: string, value: string | boolean) => void;
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
                    <label htmlFor="message" className="block  font-medium text-zinc-700 mb-2">
                        Message / Additional Notes
                    </label>
                    <textarea
                        id="message"
                        rows={4}
                        value={message}
                        onChange={(e) => onChange('message', e.target.value)}
                        className="w-full px-4 py-3 border border-zinc-300 rounded-sm focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 resize-vertical"
                        placeholder="Tell us about your travel expectations, interests, or any specific requests..."
                    />
                    <p className=" text-zinc-500 mt-1">
                        This helps us tailor your trip to your preferences
                    </p>
                </div>

                {/* Special Requirements */}
                <div>
                    <label htmlFor="specialRequirements" className="block  font-medium text-zinc-700 mb-2">
                        Special Requirements
                    </label>
                    <textarea
                        id="specialRequirements"
                        rows={3}
                        value={specialRequirements}
                        onChange={(e) => onChange('specialRequirements', e.target.value)}
                        className="w-full px-4 py-3 border border-zinc-300 rounded-sm focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 resize-vertical"
                        placeholder="Dietary requirements, medical conditions, accessibility needs, etc."
                    />
                    <p className=" text-zinc-500 mt-1">
                        Any medical, dietary, or accessibility requirements we should know about
                    </p>
                </div>


                {/* Terms and Conditions */}
                <div className="bg-zinc-50 border border-zinc-200 rounded-sm p-6">
                    <div className="flex items-start space-x-3">
                        <input
                            id="termsAccepted"
                            type="checkbox"
                            required
                            checked={termsAccepted}
                            onChange={(e) => onChange('termsAccepted', e.target.checked)}
                            className="mt-1 rounded border-zinc-300 text-orange-500 focus:ring-orange-500"
                        />
                        <div className="flex-1">
                            <label htmlFor="termsAccepted" className="block  font-medium text-zinc-900 cursor-pointer">
                                I accept the Terms and Conditions <span className="text-red-500">*</span>
                            </label>
                            <p className=" text-zinc-600 mt-1">
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

            </div>
        </div>
    );
}
