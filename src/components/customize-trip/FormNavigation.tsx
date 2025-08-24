import { ReactNode } from 'react';

interface FormNavigationProps {
    currentStep: number;
    totalSteps: number;
    onNext: () => void;
    onPrevious: () => void;
    onSubmit: () => void;
    isSubmitting: boolean;
    isNextDisabled?: boolean;
    nextLabel?: string;
    submitLabel?: string;
}

export default function FormNavigation({
    currentStep,
    totalSteps,
    onNext,
    onPrevious,
    onSubmit,
    isSubmitting,
    isNextDisabled = false,
    nextLabel = 'Next Step',
    submitLabel = 'Submit Request'
}: FormNavigationProps) {
    const isFirstStep = currentStep === 1;
    const isLastStep = currentStep === totalSteps;

    return (
        <div className="flex justify-between items-center pt-8 border-t border-gray-200">
            <div>
                {!isFirstStep && (
                    <button
                        type="button"
                        onClick={onPrevious}
                        className="flex items-center px-6 py-3 text-gray-600 hover:text-gray-800 font-medium transition-colors duration-200"
                    >
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        Previous
                    </button>
                )}
            </div>

            <div className="flex items-center space-x-4">
                {/* Step Counter */}
                <span className="text-sm text-gray-500">
                    Step {currentStep} of {totalSteps}
                </span>

                {/* Next/Submit Button */}
                {isLastStep ? (
                    <button
                        type="button"
                        onClick={onSubmit}
                        disabled={isSubmitting}
                        className="flex items-center px-8 py-3 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-[1.02] disabled:hover:scale-100 disabled:cursor-not-allowed"
                    >
                        {isSubmitting ? (
                            <>
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Submitting...
                            </>
                        ) : (
                            <>
                                {submitLabel}
                                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                </svg>
                            </>
                        )}
                    </button>
                ) : (
                    <button
                        type="button"
                        onClick={onNext}
                        disabled={isNextDisabled}
                        className="flex items-center px-8 py-3 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-[1.02] disabled:hover:scale-100 disabled:cursor-not-allowed"
                    >
                        {nextLabel}
                        <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                )}
            </div>
        </div>
    );
}
