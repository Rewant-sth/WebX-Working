import Image from 'next/image';
import { useState } from 'react';

interface GroupSizeSelectProps {
    selectedGroupSize: string;
    numberOfTravelers: number;
    onChange: (field: string, value: string | number | boolean) => void;
}

const groupSizeOptions = [
    {
        id: 'solo',
        name: 'Solo',
        description: 'Traveling alone',
        icon: '/icons/solo.png',
        travelers: 1,
        benefits: ['Personalized experience', 'Flexible schedule', 'Budget-friendly']
    },
    {
        id: 'duo',
        name: 'Duo',
        description: 'Two travelers',
        icon: '/icons/duo.png',
        travelers: 2,
        benefits: ['Share memories', 'Split costs', 'Better safety']
    },
    {
        id: 'group',
        name: 'Group',
        description: '3+ travelers',
        icon: '/icons/group.png',
        travelers: 3,
        benefits: ['Group discounts', 'Social experience', 'More fun']
    }
];

export default function GroupSizeSelect({
    selectedGroupSize,
    numberOfTravelers,
    onChange
}: GroupSizeSelectProps) {
    const [customTravelers, setCustomTravelers] = useState(numberOfTravelers.toString());

    const handleGroupSizeChange = (groupSizeId: string, defaultTravelers: number) => {
        onChange('groupSize', groupSizeId);
        onChange('totalPeople', defaultTravelers);
        if (groupSizeId !== 'group') {
            onChange('numberOfTravelers', defaultTravelers);
            setCustomTravelers(defaultTravelers.toString());
        }
    };

    const handleTravelersChange = (value: string) => {
        setCustomTravelers(value);
        const numValue = parseInt(value) || 1;
        onChange('numberOfTravelers', numValue);
        onChange('totalPeople', numValue);
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="border-b pb-4 border-zinc-200">
                <h2 className="text-2xl font-semibold">Select Group Size</h2>
                <p className="mt-2 max-w-2xl text-zinc-600">
                    Choose the type of travel experience that suits you best. Each option offers unique benefits and pricing.
                </p>
            </div>

            {/* Group Size Options */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {groupSizeOptions.map((option) => (
                    <div
                        key={option.id}
                        className={`relative border-2 rounded-lg p-6 cursor-pointer transition-all duration-300 hover:shadow-lg ${selectedGroupSize === option.id
                            ? 'border-orange-500 bg-orange-50 ring-2 ring-orange-500 ring-opacity-20'
                            : 'border-zinc-200 hover:border-orange-300'
                            }`}
                        onClick={() => handleGroupSizeChange(option.id, option.travelers)}
                    >
                        {/* Selection Indicator */}
                        {selectedGroupSize === option.id && (
                            <div className="absolute top-3 right-3 bg-orange-500 text-white rounded-full p-1">
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                            </div>
                        )}

                        {/* Icon */}
                        <div className="text-center mb-4">
                            <div className="mx-auto mb-2 size-14 relative">
                                <Image src={option.icon} alt={option.name} fill className='object-cover mx-auto' />
                            </div>
                            <h3 className="text-xl font-semibold text-zinc-900">{option.name}</h3>
                            <p className="text-zinc-600">{option.description}</p>
                        </div>

                    </div>
                ))}
            </div>

            {/* Custom Number of Travelers for Group */}
            {selectedGroupSize === 'group' && (
                <div className="bg-zinc-50 rounded-lg p-6">
                    <h4 className="text-lg font-medium mb-4">Number of Travelers</h4>
                    <div className="flex items-center space-x-4">
                        <label className="text-zinc-700">How many people will be traveling?</label>
                        <div className="flex items-center ">
                            <button
                                type="button"
                                onClick={() => {
                                    const newValue = Math.max(3, numberOfTravelers - 1);
                                    handleTravelersChange(newValue.toString());
                                }}
                                className="size-10 rounded-l-sm bg-orange-500 text-white flex items-center justify-center hover:bg-orange-600 transition-colors"
                                disabled={numberOfTravelers <= 3}
                            >
                                -
                            </button>
                            <input
                                type="number"
                                min="3"
                                max="20"
                                value={customTravelers}
                                onChange={(e) => handleTravelersChange(e.target.value)}
                                className="w-16 h-10  text-center border border-zinc-300  px-2 py-1 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                            />
                            <button
                                type="button"
                                onClick={() => {
                                    const newValue = Math.min(20, numberOfTravelers + 1);
                                    handleTravelersChange(newValue.toString());
                                }}
                                className="size-10 rounded-r-sm bg-orange-500 text-white flex items-center justify-center hover:bg-orange-600 transition-colors"
                                disabled={numberOfTravelers >= 20}
                            >
                                +
                            </button>
                        </div>
                    </div>
                    <p className="text-sm text-zinc-500 mt-2">
                        Group pricing applies for 3 or more travelers. Maximum 20 travelers per group.
                    </p>
                </div>
            )}

        </div>
    );
}
