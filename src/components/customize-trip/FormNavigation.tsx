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
        <div className="mt-8 bg-[#01283F]/5 rounded-sm p-6 border border-gray-200">
            <div className="flex justify-between items-center">
                <div>
                    {!isFirstStep ? (
                        <button
                            type="button"
                            onClick={onPrevious}
                            className="group flex bg-transparent items-center px-6 py-3 text-[#01283F] border font-medium transition-all  rounded-sm hover:bg-[#01283F] hover:shadow-md hover:text-white hover:border-gray-200"
                        >
                            <div className="flex items-center text-[#01283F] justify-center w-8 h-8 rounded-full bg-gray-100 group-hover:bg-gray-300 transition-colors duration-300 mr-3">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                </svg>
                            </div>
                            Previous
                        </button>
                    ) : (
                        <div></div>
                    )}
                </div>

                <div className="flex items-center space-x-6">
                    {/* Progress Indicator */}
                    <div className="flex items-center space-x-3">
                        <div className="text-sm font-medium text-gray-600">
                            Step {currentStep} of {totalSteps}
                        </div>
                        <div className="flex space-x-1">
                            {Array.from({ length: totalSteps }, (_, index) => (
                                <div
                                    key={index}
                                    className={`w-2 h-2 rounded-full transition-all duration-300 ${index < currentStep
                                        ? 'bg-green-500 scale-110'
                                        : index === currentStep - 1
                                            ? 'bg-orange-500 scale-125 animate-pulse'
                                            : 'bg-gray-300'
                                        }`}
                                />
                            ))}
                        </div>
                        <div className="text-xs text-gray-500">
                            {Math.round((currentStep / totalSteps) * 100)}% Complete
                        </div>
                    </div>

                    {/* Next/Submit Button */}
                    {isLastStep ? (
                        <button
                            type="button"
                            onClick={onSubmit}
                            disabled={isSubmitting}
                            className="group relative flex items-center px-8 py-4 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold rounded-sm transition-all duration-300 transform hover:scale-[1.02] hover:shadow-sm disabled:hover:scale-100 disabled:cursor-not-allowed min-w-[160px] justify-center"
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
                                    <div className="flex items-center justify-center w-6 h-6 rounded-full bg-white/20 mr-3 group-hover:bg-white/30 transition-colors duration-300">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                        </svg>
                                    </div>
                                    {submitLabel}
                                </>
                            )}

                            {/* Success shine effect */}
                            <div className="absolute inset-0 rounded-sm bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                        </button>
                    ) : (
                        <button
                            type="button"
                            onClick={onNext}
                            disabled={isNextDisabled}
                            className="group relative flex items-center px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold rounded-sm transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl disabled:hover:scale-100 disabled:cursor-not-allowed min-w-[140px] justify-center"
                        >
                            <span className="flex items-center">
                                {nextLabel}
                                <div className="flex items-center justify-center w-6 h-6 rounded-full bg-white/20 ml-3 group-hover:bg-white/30 transition-colors duration-300">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </div>
                            </span>

                            {/* Hover shine effect */}
                            <div className="absolute inset-0 rounded-sm bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                        </button>
                    )}
                </div>
            </div>

            {/* Helper Text */}
            <div className="mt-4 text-center">
                <p className="text-xs text-gray-500">
                    {isLastStep
                        ? "Review your information and submit your customization request"
                        : isNextDisabled
                            ? "Please complete all required fields to continue"
                            : "Click next to continue or use the step indicators above to navigate"
                    }
                </p>
            </div>
        </div>
    );
}
