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
