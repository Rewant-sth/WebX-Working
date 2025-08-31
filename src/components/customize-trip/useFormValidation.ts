import { useMemo } from 'react';
import { CustomizeTripFormData } from './types';

export interface ValidationErrors {
    [key: string]: string;
}

export function useFormValidation(formData: CustomizeTripFormData, currentStep: number) {
    const validateStep1 = (): ValidationErrors => {
        const errors: ValidationErrors = {};

        if (!formData.package) {
            errors.package = 'Please select a package';
        }

        return errors;
    };

    const validateStep2 = (): ValidationErrors => {
        const errors: ValidationErrors = {};

        if (!formData.groupSize) {
            errors.groupSize = 'Please select a group size';
        }

        if (!formData.numberOfTravelers || formData.numberOfTravelers < 1) {
            errors.numberOfTravelers = 'Please specify number of travelers';
        }

        return errors;
    };

    const validateStep3 = (): ValidationErrors => {
        const errors: ValidationErrors = {};

        if (!formData.budget) {
            errors.budget = 'Please select a budget range';
        }

        if (formData.budget === 'custom' && (!formData.customBudget || formData.customBudget <= 0)) {
            errors.customBudget = 'Please enter a valid budget amount';
        }

        return errors;
    };

    const validateStep4 = (): ValidationErrors => {
        const errors: ValidationErrors = {};
        const person = formData.personalInfo[0];

        if (!person.fullName.trim()) {
            errors.fullName = 'Full name is required';
        }

        if (!person.email.trim()) {
            errors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(person.email)) {
            errors.email = 'Please enter a valid email address';
        }

        if (!person.country) {
            errors.country = 'Please select your country';
        }

        if (!person.phoneNumber.trim()) {
            errors.phoneNumber = 'Phone number is required';
        }

        return errors;
    };

    const validateStep5 = (): ValidationErrors => {
        const errors: ValidationErrors = {};

        if (!formData.arrivalDate) {
            errors.arrivalDate = 'Arrival date is required';
        }

        if (!formData.departureDate) {
            errors.departureDate = 'Departure date is required';
        }

        if (formData.arrivalDate && formData.departureDate) {
            if (new Date(formData.departureDate) <= new Date(formData.arrivalDate)) {
                errors.departureDate = 'Departure date must be after arrival date';
            }
        }

        return errors;
    };

    const validateStep6 = (): ValidationErrors => {
        const errors: ValidationErrors = {};

        if (!formData.termsAccepted) {
            errors.termsAccepted = 'You must accept the terms and conditions';
        }

        return errors;
    };

    const validationErrors = useMemo(() => {
        switch (currentStep) {
            case 1:
                return validateStep1(); // Package Selection
            case 2:
                return validateStep2(); // Group Size
            case 3:
                return validateStep3(); // Budget
            case 4:
                return validateStep4(); // Personal Information
            case 5:
                return validateStep5(); // Trip Details
            case 6:
                return validateStep6(); // Additional Info
            default:
                return {};
        }
    }, [formData, currentStep]);

    const isStepValid = useMemo(() => {
        return Object.keys(validationErrors).length === 0;
    }, [validationErrors]);

    const validateAllSteps = (): ValidationErrors => {
        return {
            ...validateStep1(),
            ...validateStep2(),
            ...validateStep3(),
            ...validateStep4(),
            ...validateStep5(),
            ...validateStep6()
        };
    };

    return {
        validationErrors,
        isStepValid,
        validateAllSteps
    };
}
