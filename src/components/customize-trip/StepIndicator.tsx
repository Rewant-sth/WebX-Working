import { useState } from 'react';

export interface StepIndicatorProps {
    currentStep: number;
    totalSteps: number;
    steps: Array<{
        id: number;
        title: string;
        description: string;
    }>;
    onStepClick?: (step: number) => void;
}

const stepIcons = {
    1: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
    ),
    2: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
    ),
    3: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
    ),
    4: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
    )
};

export default function StepIndicator({ currentStep, totalSteps, steps, onStepClick }: StepIndicatorProps) {
    const [hoveredStep, setHoveredStep] = useState<number | null>(null);

    const getStepStatus = (stepId: number) => {
        if (stepId < currentStep) return 'completed';
        if (stepId === currentStep) return 'current';
        return 'pending';
    };

    const canClickStep = (stepId: number) => {
        // Allow clicking on completed steps and current step
        return stepId <= currentStep;
    };

    return (
        <div className="w-full mb-10">


            {/* Current Step Header */}
            <div className="text-center bg-gradient-to-r from-orange-50 to-orange-100 rounded-sm p-6 border border-orange-200 ">
                <div className="flex items-center justify-center mb-3">
                    <h2 className="text-2xl uppercase font-bold text-zinc-900">
                        {steps[currentStep - 1]?.title}
                    </h2>
                </div>
                <p className="text-zinc-700 text-lg">
                    {steps[currentStep - 1]?.description}
                </p>

                {/* Progress Text */}
                <div className="mt-4 flex items-center justify-center space-x-2 text-sm text-zinc-600">
                    <span>Step {currentStep} of {totalSteps}</span>
                    <span>•</span>
                    <span>{Math.round((currentStep / totalSteps) * 100)}% Complete</span>
                </div>
            </div>
        </div>
    );
}
