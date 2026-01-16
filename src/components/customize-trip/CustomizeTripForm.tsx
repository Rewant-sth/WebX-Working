'use client';

import { useState, useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import api from '@/service/api';
import { ITravelPackageResponse } from '@/types/IPackages';
import PersonalInfoSection from './PersonalInfoSection';
import TripDetailsSection from './TripDetailsSection';
import AdditionalInfoSection from './AdditionalInfoSection';
import FormNavigation from './FormNavigation';
import { CustomizeTripFormData } from './types';
import { useFormValidation } from './useFormValidation';
import PackagesSelect from './PackagesSelect';
import GroupSizeSelect from './GroupSizeSelect';
import BudgetSelect from './BudgetSelect';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const initialFormData: CustomizeTripFormData = {
    personalInfo: [{
        fullName: '',
        email: '',
        country: '',
        phoneNumber: '',
        gender: 'male',
        dateOfBirth: '',
        passportNumber: '',
        passportExpiryDate: ''
    }],
    totalPeople: 1,
    totalAmount: 1,
    fixedDateId: '',
    arrivalDate: '',
    departureDate: '',
    numberOfTravelers: 1,
    package: '',
    groupSize: '',
    budget: '',
    customBudget: 0,
    message: '',
    specialRequirements: '',
    termsAccepted: false
};

const FORM_STEPS = [
    { id: 1, title: 'Package Selection', description: 'Choose your adventure' },
    { id: 2, title: 'Group Size', description: 'Solo, duo, or group?' },
    { id: 3, title: 'Budget', description: 'Set your budget range' },
    { id: 4, title: 'Trip Details & Personal Info', description: 'Travel dates, personal info & requirements' }
];

export default function CustomizeTripForm() {
    const [formData, setFormData] = useState<CustomizeTripFormData>(initialFormData);
    const [currentStep, setCurrentStep] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter()

    // Form validation
    const { validationErrors, isStepValid } = useFormValidation(formData, currentStep);

    // Fetch packages for selection
    const { data: packagesData, isLoading: packagesLoading } = useQuery<ITravelPackageResponse>({
        queryKey: ['all-packages'],
        queryFn: async () => {
            const response = await api.get('/package');
            return response.data;
        },
        staleTime: 5 * 60 * 1000,
    });

    const handleInputChange = useCallback((field: string, value: string | number | boolean, index?: number) => {
        if (field.startsWith('personalInfo.') && index !== undefined) {
            const personalField = field.replace('personalInfo.', '');
            setFormData(prev => ({
                ...prev,
                personalInfo: prev.personalInfo.map((person, i) =>
                    i === index ? { ...person, [personalField]: value } : person
                )
            }));
        } else {
            // Ensure numeric fields remain as numbers
            let processedValue: string | number | boolean = value;
            if (field === 'totalPeople' || field === 'numberOfTravelers' || field === 'totalAmount' || field === 'customBudget') {
                processedValue = typeof value === 'string' ? Number(value) || 0 : value;
            }
            setFormData(prev => ({ ...prev, [field]: processedValue }));
        }
    }, []);



    const handleNextStep = useCallback(() => {
        if (isStepValid && currentStep < FORM_STEPS.length) {
            setCurrentStep(currentStep + 1);
        }
    }, [currentStep, isStepValid]);

    const handlePreviousStep = useCallback(() => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    }, [currentStep]);

    const validateForm = useCallback((): boolean => {
        const { personalInfo, arrivalDate, departureDate, numberOfTravelers, package: packageId, termsAccepted } = formData;

        // Check required personal info fields
        const person = personalInfo[0];
        if (!person.fullName || !person.email || !person.country || !person.phoneNumber) {
            toast.error('Please fill in all required personal information fields');
            return false;
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(person.email)) {
            toast.error('Please enter a valid email address');
            return false;
        }

        // Check trip details
        if (!arrivalDate || !departureDate || !numberOfTravelers || !packageId) {
            toast.error('Please fill in all trip details');
            return false;
        }

        // Check if departure is after arrival
        if (new Date(departureDate) <= new Date(arrivalDate)) {
            toast.error('Departure date must be after arrival date');
            return false;
        }

        // Check terms acceptance
        if (!termsAccepted) {
            toast.error('Please accept the terms and conditions');
            return false;
        }

        return true;
    }, [formData]);

    const handleSubmit = useCallback(async () => {
        if (!validateForm()) return;

        setIsSubmitting(true);

        try {
            // Ensure totalPeople is sent as a number
            const submitData = {
                ...formData,
                totalPeople: Number(formData.totalPeople),
                numberOfTravelers: Number(formData.numberOfTravelers),
                totalAmount: Number(formData.totalAmount),
                customBudget: Number(formData.customBudget)
            };

            const response = await api.post('/custom-booking', submitData);

            if (response.data.status === 'success') {
                toast.success('Your customize trip request has been submitted successfully!');
                // Reset form
                setFormData(initialFormData);
                setCurrentStep(1);
                router.push('booking/success')
            } else {
                throw new Error(response.data.message || 'Failed to submit request');
            }
        } catch (error: unknown) {
            console.error('Error submitting customize trip:', error);
            const errorMessage = error instanceof Error && 'response' in error 
                ? (error as { response?: { data?: { message?: string } } }).response?.data?.message 
                : 'Failed to submit customize trip request';
            toast.error(errorMessage || 'Failed to submit customize trip request');
        } finally {
            setIsSubmitting(false);
        }
    }, [formData, validateForm, router]);

    const renderCurrentStep = () => {
        switch (currentStep) {
            case 1:
                return (
                    <PackagesSelect
                        packages={packagesData?.data || []}
                        selectedPackage={formData.package}
                        isLoading={packagesLoading}
                        onChange={(packageId) => handleInputChange('package', packageId)}
                    />
                );
            case 2:
                return (
                    <GroupSizeSelect
                        selectedGroupSize={formData.groupSize}
                        numberOfTravelers={formData.totalPeople}
                        onChange={handleInputChange}
                    />
                );
            case 3:
                return (
                    <BudgetSelect
                        selectedBudget={formData.budget}
                        customBudget={formData.customBudget}
                        numberOfTravelers={formData.numberOfTravelers}
                        onChange={handleInputChange}
                    />
                );
            case 4:
                return (
                    <div className="space-y-8">
                        <PersonalInfoSection
                            personalInfo={formData.personalInfo[0]}
                            onChange={(field, value) => handleInputChange(`personalInfo.${field}`, value, 0)}
                            errors={validationErrors}
                        />
                        <div className="border-t pt-8 border-zinc-200">
                            <TripDetailsSection
                                formData={formData}
                                packages={packagesData?.data || []}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="border-t pt-8 border-zinc-200">
                            <AdditionalInfoSection
                                message={formData.message}
                                specialRequirements={formData.specialRequirements}
                                termsAccepted={formData.termsAccepted}
                                formData={formData}
                                packages={packagesData?.data || []}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className=" relative z-50 scroll-smooth bg-gradient-to-br from-blue-50 via-white to-orange-50 ">
            <div className=" ">
                {/* Header */}
                <div
                    className=" mb-12 relative h-[70dvh] ">
                    <div className="absolute inset-0 z-40 w-full h-full">
                        <div className="h-full w-full relative ">
                            <Image fill src={"/EXPEDITION/kailash.jpg"} alt='customize trip image' className='object-cover' />
                        </div>
                    </div>
                    <div
                        style={{
                            textShadow: '2px 2px 15px rgba(0, 0, 0, 0.3)'
                        }}
                        className="relative z-50 bg-black/25 w-full h-full flex justify-center items-center flex-col">
                        <h1

                            className="text-4xl  uppercase font-bold text-zinc-100 mb-2 leading-tight">
                            Customize Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-600">Dream Trip</span>
                        </h1>
                        <p className="text-xl text-zinc-100 text-center max-w-3xl  leading-relaxed">
                            Create your perfect adventure in the Himalayas. Tell us about your preferences,
                            and we'll craft an unforgettable journey just for you.
                        </p>
                    </div>
                </div>

                {/* Form */}
                <div id='customize-trip-form' className="rounded-sm max-w-7xl mx-auto  px-6  overflow-hidden ">
                    <div className="">


                        {/* Form Content */}
                        <div className="  rounded-sm p-6">
                            <div className="bg- rounded-sm">
                                {renderCurrentStep()}
                            </div>
                        </div>

                        {/* Navigation */}
                        <FormNavigation
                            currentStep={currentStep}
                            totalSteps={FORM_STEPS.length}
                            onNext={handleNextStep}
                            onPrevious={handlePreviousStep}
                            onSubmit={handleSubmit}
                            isSubmitting={isSubmitting}
                            isNextDisabled={!isStepValid}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
