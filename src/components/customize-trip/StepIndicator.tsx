import { useState } from 'react';

export interface StepIndicatorProps {
    currentStep: number;
    totalSteps: number;
    steps: Array<{
        id: number;
        title: string;
        description: string;
    }>;
}

export default function StepIndicator({ currentStep, totalSteps, steps }: StepIndicatorProps) {
    return (
        <div className="w-full mb-8">
            {/* Progress Bar */}
            <div className="flex items-center justify-between mb-6">
                <div className="flex-1 relative">
                    <div className="absolute top-1/2 transform -translate-y-1/2 w-full h-1 bg-gray-200 rounded-full">
                        <div
                            className="h-full bg-gradient-to-r from-orange-500 to-orange-600 rounded-full transition-all duration-500 ease-out"
                            style={{ width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%` }}
                        />
                    </div>
                    <div className="flex justify-between relative">
                        {steps.map((step) => (
                            <div
                                key={step.id}
                                className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-300 ${step.id < currentStep
                                        ? 'bg-orange-500 border-orange-500 text-white'
                                        : step.id === currentStep
                                            ? 'bg-orange-500 border-orange-500 text-white ring-4 ring-orange-100'
                                            : 'bg-white border-gray-300 text-gray-500'
                                    }`}
                            >
                                {step.id < currentStep ? (
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                ) : (
                                    <span className="text-sm font-semibold">{step.id}</span>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Step Information */}
            <div className="text-center">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                    {steps[currentStep - 1]?.title}
                </h2>
                <p className="text-gray-600">
                    {steps[currentStep - 1]?.description}
                </p>
            </div>
        </div>
    );
}
