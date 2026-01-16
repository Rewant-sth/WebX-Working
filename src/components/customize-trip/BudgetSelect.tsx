import Image from 'next/image';
import { useState } from 'react';

interface BudgetSelectProps {
    selectedBudget: string;
    customBudget: number;
    numberOfTravelers: number;
    onChange: (field: string, value: string | number) => void;
}

const budgetRanges = [
    {
        id: 'budget',
        name: 'Budget',
        description: 'Essential experience',
        icon: '/icons/budget.png',
        range: '$500 - $1,000',
        perPerson: 'per person',
        features: ['Basic accommodation', 'Standard meals', 'Group transport', 'Essential activities']
    },
    {
        id: 'standard',
        name: 'Standard',
        description: 'Comfortable journey',
        icon: '/icons/standard.png',
        range: '$1,000 - $2,500',
        perPerson: 'per person',
        features: ['Quality accommodation', 'Good meals', 'Private transport', 'Popular activities', 'Tour guide']
    },
    {
        id: 'luxury',
        name: 'Luxury',
        description: 'Premium experience',
        icon: '/icons/luxury.png',
        range: '$2,500 - $5,000+',
        perPerson: 'per person',
        features: ['Luxury accommodation', 'Gourmet meals', 'Private transport', 'Exclusive activities', 'Personal guide', 'VIP services']
    },
    {
        id: 'custom',
        name: 'Custom',
        description: 'Set your own budget',
        icon: '/icons/custom.png',
        range: 'Your choice',
        perPerson: 'per person',
        features: ['Tailored to budget', 'Flexible options', 'Best value planning']
    }
];

export default function BudgetSelect({
    selectedBudget,
    customBudget,
    numberOfTravelers,
    onChange
}: BudgetSelectProps) {
    const [customBudgetInput, setCustomBudgetInput] = useState(customBudget.toString());

    const handleBudgetChange = (budgetId: string) => {
        onChange('budget', budgetId);
        if (budgetId !== 'custom') {
            onChange('customBudget', 0);
        }
    };

    const handleCustomBudgetChange = (value: string) => {
        setCustomBudgetInput(value);
        const numValue = parseFloat(value) || 0;
        onChange('customBudget', numValue);
    };

    const getTotalBudget = () => {
        if (selectedBudget === 'custom' && customBudget > 0) {
            return customBudget * numberOfTravelers;
        }
        return null;
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="border-b pb-4 border-zinc-200">
                <h2 className="text-2xl font-semibold">Select Your Budget</h2>
                <p className="mt-2 max-w-2xl text-zinc-600">
                    Choose a budget range that works for you. We'll customize your trip experience accordingly.
                    {numberOfTravelers > 1 && (
                        <span className="block mt-1 text-blue-600 font-medium">
                            Planning for {numberOfTravelers} travelers
                        </span>
                    )}
                </p>
            </div>

            {/* Budget Options */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {budgetRanges.map((budget) => (
                    <div
                        key={budget.id}
                        className={`relative border-2 rounded-lg p-6 cursor-pointer transition-all duration-300 hover:shadow-lg ${selectedBudget === budget.id
                            ? 'border-orange-500 bg-orange-50 ring-2 ring-orange-500 ring-opacity-20'
                            : 'border-zinc-200 hover:border-orange-300'
                            }`}
                        onClick={() => handleBudgetChange(budget.id)}
                    >
                        {/* Selection Indicator */}
                        {selectedBudget === budget.id && (
                            <div className="absolute top-3 right-3 bg-orange-500 text-white rounded-full p-1">
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                            </div>
                        )}

                        {/* Header */}
                        <div className="flex items-start mb-4">
                            <div className="size-10 mr-3">
                                <Image src={budget.icon} alt={budget.name} width={40} height={40} />
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold text-zinc-900">{budget.name}</h3>
                                <p className="text-zinc-600">{budget.description}</p>
                                <div className="mt-2">
                                    <span className="text-lg font-bold text-zinc-800">{budget.range}/</span>
                                    <span className="text-sm text-zinc-500 ml-1">{budget.perPerson}</span>
                                </div>
                            </div>
                        </div>

                    </div>
                ))}
            </div>

            {/* Custom Budget Input */}
            {selectedBudget === 'custom' && (
                <div className="bg-zinc-50 rounded-lg p-6">
                    <h4 className="text-lg font-medium mb-4">Set Your Custom Budget</h4>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-zinc-700 mb-2">Budget per person (USD)</label>
                            <div className="flex items-center">
                                <span className="text-zinc-500 mr-2">$</span>
                                <input
                                    type="number"
                                    min="100"
                                    step="50"
                                    placeholder="Enter amount"
                                    value={customBudgetInput}
                                    onChange={(e) => handleCustomBudgetChange(e.target.value)}
                                    className="flex-1 border border-zinc-300 rounded px-3 py-2 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                />
                            </div>
                        </div>

                        {getTotalBudget() && (
                            <div className="bg-white rounded p-4 border-l-4 border-orange-500">
                                <h5 className="font-medium text-zinc-900">Total Budget Estimate</h5>
                                <p className="text-2xl font-bold text-orange-600">
                                    ${getTotalBudget()?.toLocaleString()}
                                </p>
                                <p className="text-sm text-zinc-600">
                                    For {numberOfTravelers} {numberOfTravelers === 1 ? 'traveler' : 'travelers'}
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
