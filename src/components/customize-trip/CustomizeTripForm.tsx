'use client';

import { useState, useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import api from '@/service/api';
import { ITravelPackageResponse } from '@/types/IPackages';
import PersonalInfoSection from './PersonalInfoSection';
import TripDetailsSection from './TripDetailsSection';
import AdditionalInfoSection from './AdditionalInfoSection';
import StepIndicator from './StepIndicator';
import FormNavigation from './FormNavigation';
import { CustomizeTripFormData } from './types';
import { useFormValidation } from './useFormValidation';
import PackagesSelect from './PackagesSelect';

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
    adults: 1,
    totalAmount: 1,
    fixedDateId: '',
    arrivalDate: '',
    departureDate: '',
    numberOfTravelers: 1,
    package: '',
    message: '',
    specialRequirements: '',
    termsAccepted: false
};

const FORM_STEPS = [
    { id: 1, title: 'Personal Information', description: 'Tell us about yourself' },
    { id: 2, title: 'Trip Details', description: 'When and how many travelers' },
    { id: 3, title: 'Package Selection', description: 'Choose your adventure' },
    { id: 4, title: 'Additional Info', description: 'Special requirements and preferences' }
];

export default function CustomizeTripForm() {
    const [formData, setFormData] = useState<CustomizeTripFormData>(initialFormData);
    const [currentStep, setCurrentStep] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Form validation
    const { validationErrors, isStepValid, validateAllSteps } = useFormValidation(formData, currentStep);

    // Fetch packages for selection
    const { data: packagesData, isLoading: packagesLoading } = useQuery<ITravelPackageResponse>({
        queryKey: ['all-packages'],
        queryFn: async () => {
            const response = await api.get('/package');
            return response.data;
        },
        staleTime: 5 * 60 * 1000,
    });

    const handleInputChange = useCallback((field: string, value: any, index?: number) => {
        if (field.startsWith('personalInfo.') && index !== undefined) {
            const personalField = field.replace('personalInfo.', '');
            setFormData(prev => ({
                ...prev,
                personalInfo: prev.personalInfo.map((person, i) =>
                    i === index ? { ...person, [personalField]: value } : person
                )
            }));
        } else {
            setFormData(prev => ({ ...prev, [field]: value }));
        }
    }, []);

    const handleStepClick = useCallback((step: number) => {
        // Only allow navigation to completed steps or current step
        if (step <= currentStep) {
            setCurrentStep(step);
        }
    }, [currentStep]);

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
    }, [validateAllSteps]);

    const handleSubmit = useCallback(async () => {
        if (!validateForm()) return;

        setIsSubmitting(true);

        try {
            const response = await api.post('/custom-booking', formData);

            if (response.data.status === 'success') {
                toast.success('Your customize trip request has been submitted successfully!');
                // Reset form
                setFormData(initialFormData);
                setCurrentStep(1);
            } else {
                throw new Error(response.data.message || 'Failed to submit request');
            }
        } catch (error: any) {
            console.error('Error submitting customize trip:', error);
            toast.error(error.response?.data?.message || 'Failed to submit customize trip request');
        } finally {
            setIsSubmitting(false);
        }
    }, [formData, validateForm]);

    const renderCurrentStep = () => {
        switch (currentStep) {
            case 1:
                return (
                    <PersonalInfoSection
                        personalInfo={formData.personalInfo[0]}
                        onChange={(field, value) => handleInputChange(`personalInfo.${field}`, value, 0)}
                        errors={validationErrors}
                    />
                );
            case 2:
                return (
                    <TripDetailsSection
                        formData={formData}
                        onChange={handleInputChange}
                    />
                );
            case 3:
                return (
                    <PackagesSelect
                        packages={packagesData?.data || []}
                        selectedPackage={formData.package}
                        isLoading={packagesLoading}
                        onChange={(packageId) => handleInputChange('package', packageId)}
                    />
                );
            case 4:
                return (
                    <AdditionalInfoSection
                        message={formData.message}
                        specialRequirements={formData.specialRequirements}
                        termsAccepted={formData.termsAccepted}
                        onChange={handleInputChange}
                    />
                );
            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen relative z-50 bg-gradient-to-br from-blue-50 via-white to-orange-50 py-12 px-4">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">

                    <h1 className="text-4xl  uppercase font-bold text-gray-900 mb-2 leading-tight">
                        Customize Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-600">Dream Trip</span>
                    </h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                        Create your perfect adventure in the Himalayas. Tell us about your preferences,
                        and we'll craft an unforgettable journey just for you.
                    </p>
                </div>

                {/* Form */}
                <div className="rounded-sm  overflow-hidden border border-gray-100 backdrop-blur-sm bg-white/95">
                    <div className="p-8 lg:p-12">
                        {/* Step Indicator */}
                        <StepIndicator
                            currentStep={currentStep}
                            totalSteps={FORM_STEPS.length}
                            steps={FORM_STEPS}
                            onStepClick={handleStepClick}
                        />

                        {/* Form Content */}
                        <div className="min-h-[600px]  rounded-sm p-8 border border-gray-100 shadow-inner">
                            <div className="bg-white rounded-sm p-6  border border-gray-100 min-h-[500px]">
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
