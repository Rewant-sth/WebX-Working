'use client'

import { ITravelPackage } from '@/types/IPackages'
import { useMutation } from '@tanstack/react-query'
import { ChevronRight, Minus, Plus, X } from 'lucide-react'
import Image from 'next/image'
import React, { useState, useMemo, useEffect } from 'react'
import toast from 'react-hot-toast'
import CalendarComponent from '@/components/intineryBars/Calendar'
import Select from 'react-select'
import { useBookingStore } from '@/store/booking-store'
import { Icon } from '@iconify/react/dist/iconify.js'

type TravelerInfo = {
    fullName: string
    email: string
    country: string
    phoneCountryCode: string
    phoneNumber: string
    gender: string
    dateOfBirth: string
    passportNumber: string
    passportExpiryDate: string
}

type SelectedAddon = {
    id: string
    quantity: number
}

type ValidationErrors = {
    [key: string]: string
}

type StepValidation = {
    isValid: boolean
    errors: ValidationErrors
}

// Country data with codes
const countries = [
    { code: 'US', name: 'United States', dialCode: '+1' },
    { code: 'GB', name: 'United Kingdom', dialCode: '+44' },
    { code: 'CA', name: 'Canada', dialCode: '+1' },
    { code: 'AU', name: 'Australia', dialCode: '+61' },
    { code: 'DE', name: 'Germany', dialCode: '+49' },
    { code: 'FR', name: 'France', dialCode: '+33' },
    { code: 'IT', name: 'Italy', dialCode: '+39' },
    { code: 'ES', name: 'Spain', dialCode: '+34' },
    { code: 'JP', name: 'Japan', dialCode: '+81' },
    { code: 'KR', name: 'South Korea', dialCode: '+82' },
    { code: 'CN', name: 'China', dialCode: '+86' },
    { code: 'IN', name: 'India', dialCode: '+91' },
    { code: 'BR', name: 'Brazil', dialCode: '+55' },
    { code: 'MX', name: 'Mexico', dialCode: '+52' },
    { code: 'NP', name: 'Nepal', dialCode: '+977' },
    { code: 'SG', name: 'Singapore', dialCode: '+65' },
    { code: 'MY', name: 'Malaysia', dialCode: '+60' },
    { code: 'TH', name: 'Thailand', dialCode: '+66' },
    { code: 'ID', name: 'Indonesia', dialCode: '+62' },
    { code: 'AE', name: 'United Arab Emirates', dialCode: '+971' }
]

export default function BookingModal({ packageData, onClose }: { packageData: ITravelPackage, onClose: () => void }) {
    const clearBookingData = useBookingStore((state) => state.clearBookingData);
    const storeArrivalDate = useBookingStore((state) => state.arrivalDate);
    const storeDepartureDate = useBookingStore((state) => state.departureDate);
    const storeSelectedFixedDateId = useBookingStore((state) => state.selectedFixedDateId);

    const [currentStep, setCurrentStep] = useState(1)
    const [selectedDate, setSelectedDate] = useState<{
        _id: string;
        startDate: string;
        endDate: string;
        pricePerPerson: number;
        availableSeats?: number;
        status?: string;
        calculatedDepartureDate?: string;
    } | null>(null) // Changed to null initially
    const [calendarSelectedDate, setCalendarSelectedDate] = useState<Date | null>(null) // Will be set from store in useEffect
    const [currentDisplayMonth, setCurrentDisplayMonth] = useState<Date>(storeArrivalDate ? new Date(storeArrivalDate) : new Date())
    const [participants, setParticipants] = useState(1)
    const [paymentOption, setPaymentOption] = useState('full')
    const [validationErrors, setValidationErrors] = useState<ValidationErrors>({})
    const [hoveredDate, setHoveredDate] = useState<Date | null>(null)
    // State to track pax selections - each pax can have independent participant count
    const [paxSelections, setPaxSelections] = useState<{ [paxId: string]: number }>({})

    // Options for month and year selects
    const monthOptions = [
        { value: 0, label: 'January' },
        { value: 1, label: 'February' },
        { value: 2, label: 'March' },
        { value: 3, label: 'April' },
        { value: 4, label: 'May' },
        { value: 5, label: 'June' },
        { value: 6, label: 'July' },
        { value: 7, label: 'August' },
        { value: 8, label: 'September' },
        { value: 9, label: 'October' },
        { value: 10, label: 'November' },
        { value: 11, label: 'December' }
    ];

    const yearOptions = Array.from({ length: 10 }, (_, i) => {
        const year = new Date().getFullYear() + i;
        return { value: year, label: year.toString() };
    });

    // Custom styles for react-select
    const selectStyles = {
        control: (base: Record<string, unknown>) => ({
            ...base,
            minHeight: '42px',
            borderColor: '#d1d5db',
            '&:hover': {
                borderColor: '#F05E25'
            },
            boxShadow: 'none',
            '&:focus-within': {
                borderColor: '#F05E25',
                boxShadow: '0 0 0 2px rgba(233, 30, 99, 0.2)'
            }
        }),
        option: (base: Record<string, unknown>, state: { isSelected: boolean; isFocused: boolean }) => ({
            ...base,
            backgroundColor: state.isSelected ? '#F05E25' : state.isFocused ? '#fce4ec' : 'white',
            color: state.isSelected ? 'white' : '#1f2937',
            '&:active': {
                backgroundColor: '#F05E25'
            }
        })
    };



    // Scroll to top of the page when modal opens
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);

    // Cleanup timeout on unmount
    useEffect(() => {
        return () => {
            if (autoCloseTimeoutRef.current) {
                clearTimeout(autoCloseTimeoutRef.current);
            }
        };
    }, []);

    // Scroll to top of the page when step changes
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [currentStep]);

    useEffect(() => {
        const inputs = document.querySelectorAll("input, textarea");
        inputs.forEach(input => {
            input.addEventListener("input", (e) => {
                if (!e.isTrusted) {
                    const target = e.target as HTMLInputElement | HTMLTextAreaElement;
                    target.value = "";
                }
            });
        });
    });

    const [travelerInfo, setTravelerInfo] = useState<TravelerInfo>({
        fullName: '',
        email: '',
        country: '',
        phoneCountryCode: '+1',
        phoneNumber: '',
        gender: '',
        dateOfBirth: '',
        passportNumber: '',
        passportExpiryDate: ''
    })

    const [selectedAddons, setSelectedAddons] = useState<SelectedAddon[]>([])
    const [message, setMessage] = useState('')
    const [specialRequirements] = useState('')
    const [termsAccepted, setTermsAccepted] = useState(false)
    const [showResultModal, setShowResultModal] = useState(false);
    const [bookingResult, setBookingResult] = useState<{ success: boolean; message: string }>({ success: false, message: '' });

    // Store timeout ID for cleanup
    const autoCloseTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);



    // Initialize from store or find first available date
    useEffect(() => {
        console.log('🔄 BookingModal initialization', {
            storeArrivalDate,
            storeDepartureDate,
            storeSelectedFixedDateId,
            hasFixedDates: packageData?.fixedDates?.length
        });

        // If we have arrival date from store, use it
        if (storeArrivalDate && storeSelectedFixedDateId) {
            // Ensure date is properly created without timezone shift
            // Store arrival date is already a Date object (from Zustand store)
            let dateToSelect: Date;

            if (storeArrivalDate instanceof Date) {
                // If it's already a Date object, use it directly
                dateToSelect = new Date(
                    storeArrivalDate.getFullYear(),
                    storeArrivalDate.getMonth(),
                    storeArrivalDate.getDate()
                );
            } else {
                // If it's a string, parse it carefully to avoid timezone shift
                const dateStr = String(storeArrivalDate);
                if (dateStr.includes('T') || dateStr.includes('Z')) {
                    // ISO string - extract date parts from UTC
                    const tempDate = new Date(dateStr);
                    dateToSelect = new Date(
                        tempDate.getUTCFullYear(),
                        tempDate.getUTCMonth(),
                        tempDate.getUTCDate()
                    );
                } else {
                    // Simple date string - parse normally
                    const tempDate = new Date(dateStr);
                    dateToSelect = new Date(
                        tempDate.getFullYear(),
                        tempDate.getMonth(),
                        tempDate.getDate()
                    );
                }
            }

            setCalendarSelectedDate(dateToSelect);
            setCurrentDisplayMonth(dateToSelect);

            console.log('✅ Using store dates', {
                storeArrivalDate,
                arrivalDate: dateToSelect,
                arrivalDateStr: dateToSelect.toDateString(),
                fixedDateId: storeSelectedFixedDateId
            });

            // Find and set the corresponding fixed date
            const matchingFixedDate = packageData?.fixedDates?.find((fd: { _id: string }) => fd._id === storeSelectedFixedDateId);
            if (matchingFixedDate) {
                setSelectedDate(matchingFixedDate);
                console.log('✅ Found matching fixed date', matchingFixedDate);
            } else {
                console.warn('⚠️ No matching fixed date found for ID:', storeSelectedFixedDateId);
            }
        } else if (packageData?.fixedDates?.length > 0) {
            // Find the first available (open and has seats) date
            const today = new Date();
            const normalizedToday = new Date(
                today.getFullYear(),
                today.getMonth(),
                today.getDate()
            );

            const firstAvailableDate = packageData.fixedDates.find((date: { status?: string; startDate: string; availableSeats?: number }) => {
                const isOpen = date.status?.toLowerCase() === 'open';
                const startDateObj = new Date(date.startDate);
                const startDate = new Date(
                    startDateObj.getFullYear(),
                    startDateObj.getMonth(),
                    startDateObj.getDate()
                );
                const isFutureOrToday = startDate >= normalizedToday;
                const hasSeats = (date.availableSeats || 0) > 0;

                return isOpen && isFutureOrToday && hasSeats;
            });

            if (firstAvailableDate) {
                const dateObj = new Date(firstAvailableDate.startDate);
                const localDate = new Date(
                    dateObj.getFullYear(),
                    dateObj.getMonth(),
                    dateObj.getDate()
                );
                setCurrentDisplayMonth(localDate);
                // Auto-select the first available date
                setCalendarSelectedDate(localDate);
                console.log('📅 Auto-selected first available date', localDate);
            }
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [packageData.fixedDates, storeArrivalDate, storeSelectedFixedDateId]);

    // Validation functions
    const validateStep1 = (): StepValidation => {
        const errors: ValidationErrors = {};

        if (!calendarSelectedDate) {
            errors.date = 'Please select an arrival date';
            toast.error('Please select an arrival date');
        }

        const totalPax = Object.values(paxSelections).reduce((sum, count) => sum + count, 0);

        if (totalPax < 1) {
            errors.participants = 'Please select at least 1 participant';
            toast.error('Please select at least 1 participant');
        }

        return {
            isValid: Object.keys(errors).length === 0,
            errors
        };
    };

    const validateStep2 = (): StepValidation => {
        const errors: ValidationErrors = {};

        // Use single travelerInfo object for validation
        if (!travelerInfo.fullName.trim()) {
            errors[`traveler_fullName`] = `Full name is required`;
        }
        if (!travelerInfo.email.trim()) {
            errors[`traveler_email`] = `Email is required`;
        } else if (!/\S+@\S+\.\S+/.test(travelerInfo.email)) {
            errors[`traveler_email`] = `Please enter a valid email`;
        }
        if (!travelerInfo.country.trim()) {
            errors[`traveler_country`] = `Country is required`;
        }
        if (!travelerInfo.phoneNumber.trim()) {
            errors[`traveler_phone`] = `Phone number is required`;
        } else if (!/^\d+$/.test(travelerInfo.phoneNumber)) {
            errors[`traveler_phone`] = `Phone number must contain only digits`;
        }
        if (!travelerInfo.gender) {
            errors[`traveler_gender`] = `Gender is required`;
        }
        if (!travelerInfo.dateOfBirth) {
            errors[`traveler_dob`] = `Date of birth is required`;
        }
        if (!travelerInfo.passportNumber.trim()) {
            errors[`traveler_passport`] = `Passport number is required`;
        }
        if (!travelerInfo.passportExpiryDate) {
            errors[`traveler_passportExpiry`] = `Passport expiry date is required`;
        }

        return {
            isValid: Object.keys(errors).length === 0,
            errors
        };
    };

    const validateStep4 = (): StepValidation => {
        const errors: ValidationErrors = {};

        if (!termsAccepted) {
            errors.terms = 'You must accept the terms and conditions';
            toast.error('You must accept the terms and conditions');
        }

        return {
            isValid: Object.keys(errors).length === 0,
            errors
        };
    };

    const validateCurrentStep = (): boolean => {
        let validation: StepValidation;

        switch (currentStep) {
            case 1:
                validation = validateStep1();
                break;
            case 2:
                validation = validateStep2();
                break;
            case 4:
                validation = validateStep4();
                break;
            default:
                return true; // Step 3 (addons) is optional
        }

        setValidationErrors(validation.errors);
        return validation.isValid;
    };

    const handleNextStep = () => {
        if (validateCurrentStep()) {
            if (currentStep === 2 && !packageData?.addons?.length) {
                setCurrentStep(4);
            } else {
                setCurrentStep(currentStep + 1);
            }
            setValidationErrors({});
        }
    };

    const handlePreviousStep = () => {
        if (currentStep === 4 && !packageData?.addons?.length) {
            setCurrentStep(2);
        } else if (currentStep === 3) {
            setCurrentStep(2);
        } else {
            setCurrentStep(currentStep - 1);
        }
        setValidationErrors({});
    };
    const highlightedDates = useMemo(() => {
        if (!calendarSelectedDate || !selectedDate) return [];

        // Calculate trip duration from the fixed date
        const startDateObj = new Date(selectedDate.startDate);
        const endDateObj = new Date(selectedDate.endDate);
        const startDate = new Date(startDateObj.getFullYear(), startDateObj.getMonth(), startDateObj.getDate());
        const endDate = new Date(endDateObj.getFullYear(), endDateObj.getMonth(), endDateObj.getDate());
        const tripDurationDays = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)) + 1;

        // Highlight from the selected arrival date for the trip duration
        const dates: Date[] = [];

        // Use local date components to avoid timezone shift
        const arrivalDate = new Date(
            calendarSelectedDate.getFullYear(),
            calendarSelectedDate.getMonth(),
            calendarSelectedDate.getDate()
        );

        // Add all dates for the trip duration starting from arrival date
        const currentDate = new Date(arrivalDate);
        for (let i = 0; i < tripDurationDays; i++) {
            dates.push(new Date(currentDate));
            currentDate.setDate(currentDate.getDate() + 1);
        }

        return dates;
    }, [calendarSelectedDate, selectedDate]);

    // Calculate trip duration from arrival to departure
    const tripDuration = useMemo(() => {
        if (!selectedDate) return 0;
        const startDateObj = new Date(selectedDate.startDate);
        const endDateObj = new Date(selectedDate.endDate);
        const startDate = new Date(startDateObj.getFullYear(), startDateObj.getMonth(), startDateObj.getDate());
        const endDate = new Date(endDateObj.getFullYear(), endDateObj.getMonth(), endDateObj.getDate());
        return Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)) + 1;
    }, [selectedDate]);


    // Update selectedDate when calendarSelectedDate changes
    useEffect(() => {
        if (calendarSelectedDate) {
            // Normalize selected date for comparison (use local timezone)
            const normalizeDate = (date: Date) => {
                return new Date(
                    date.getFullYear(),
                    date.getMonth(),
                    date.getDate()
                );
            };

            const normalizedSelected = normalizeDate(calendarSelectedDate);

            // Find fixed date where the selected date falls within the range
            const fixedDate = packageData.fixedDates.find((date: { startDate: string; endDate: string; status?: string; availableSeats?: number }) => {
                const startDateObj = new Date(date.startDate);
                const endDateObj = new Date(date.endDate);

                const fixedStart = new Date(
                    startDateObj.getFullYear(),
                    startDateObj.getMonth(),
                    startDateObj.getDate()
                );
                const fixedEnd = new Date(
                    endDateObj.getFullYear(),
                    endDateObj.getMonth(),
                    endDateObj.getDate()
                );

                // Check if selected date is within the range AND the fixed date is available
                const isInRange = normalizedSelected >= fixedStart && normalizedSelected <= fixedEnd;
                const isAvailable = date.status?.toLowerCase() === 'open' && (date.availableSeats || 0) > 0;

                return isInRange && isAvailable;
            });

            if (fixedDate) {
                // Calculate trip duration from fixed date
                const startDateObj = new Date(fixedDate.startDate);
                const endDateObj = new Date(fixedDate.endDate);
                const startDate = new Date(startDateObj.getFullYear(), startDateObj.getMonth(), startDateObj.getDate());
                const endDate = new Date(endDateObj.getFullYear(), endDateObj.getMonth(), endDateObj.getDate());
                const tripDurationDays = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)) + 1;

                // Calculate departure date based on selected arrival date and trip duration
                const arrivalDate = new Date(
                    calendarSelectedDate.getFullYear(),
                    calendarSelectedDate.getMonth(),
                    calendarSelectedDate.getDate()
                );
                const calculatedDepartureDate = new Date(arrivalDate);
                calculatedDepartureDate.setDate(calculatedDepartureDate.getDate() + tripDurationDays - 1);

                // Store the fixed date with calculated departure date
                setSelectedDate({
                    ...fixedDate,
                    calculatedDepartureDate: calculatedDepartureDate.toISOString()
                });

                console.log('📅 Date calculation', {
                    selectedArrivalDate: arrivalDate.toDateString(),
                    tripDuration: tripDurationDays,
                    calculatedDepartureDate: calculatedDepartureDate.toDateString(),
                    originalFixedDateRange: `${startDate.toDateString()} - ${endDate.toDateString()}`
                });
            } else {
                // Only allow selection of dates within available fixed date ranges
                setSelectedDate(null);
            }
        } else {
            setSelectedDate(null);
        }
    }, [calendarSelectedDate, packageData.fixedDates]);

    const getDisplayMonths = () => {
        const firstMonth = currentDisplayMonth.getMonth();
        const firstYear = currentDisplayMonth.getFullYear();

        const secondMonth = firstMonth === 11 ? 0 : firstMonth + 1;
        const secondYear = firstMonth === 11 ? firstYear + 1 : firstYear;

        return { firstMonth, firstYear, secondMonth, secondYear };
    };

    const { firstMonth, firstYear, secondMonth, secondYear } = getDisplayMonths();

    const calculateBasePrice = () => {
        if (!selectedDate) {
            return {
                basePrice: 0,
                discountedPrice: 0,
                discountAmount: 0,
                discountPercent: 0,
                paxBreakdown: []
            };
        }

        // Calculate total participants across all pax selections
        const totalParticipants = Object.values(paxSelections).reduce((sum, count) => sum + count, 0);

        if (totalParticipants === 0) {
            return {
                basePrice: 0,
                discountedPrice: 0,
                discountAmount: 0,
                discountPercent: 0,
                paxBreakdown: []
            };
        }

        let totalPrice = 0;
        const paxBreakdown: Array<{ paxId: string; min: number; max: number; count: number; pricePerPerson: number; total: number; label: string }> = [];

        // Calculate price for each pax selection
        Object.entries(paxSelections).forEach(([paxId, count]) => {
            if (count > 0) {
                const paxData = packageData?.pax?.find((p: { _id: string; min: number; max: number; discount: number }) => p._id === paxId);
                if (paxData) {
                    // Check if the selected count falls within the pax range
                    const isWithinPaxRange = count >= paxData.min && count <= paxData.max;

                    // If within range, use pax price; otherwise use fixed date price
                    const pricePerPerson = isWithinPaxRange
                        ? paxData.discount
                        : selectedDate.pricePerPerson;

                    const subtotal = pricePerPerson * count;
                    totalPrice += subtotal;

                    paxBreakdown.push({
                        paxId,
                        min: paxData.min,
                        max: paxData.max,
                        count,
                        pricePerPerson,
                        total: subtotal,
                        label: isWithinPaxRange ? 'Pax Price' : 'Fixed Price'
                    });
                }
            }
        });

        return {
            basePrice: totalPrice,
            discountedPrice: totalPrice,
            discountAmount: 0,
            discountPercent: 0,
            paxBreakdown
        };
    }

    const calculateAddonsPrice = () => {
        return selectedAddons.reduce((total, addon) => {
            const addonData = packageData.addons.find(a => a._id === addon.id)
            if (!addonData) return total
            return total + (addonData.price * addon.quantity)
        }, 0)
    }

    const basePriceDetails = calculateBasePrice()
    const addonsPrice = calculateAddonsPrice()
    const totalAmount = basePriceDetails.discountedPrice + addonsPrice
    const totalParticipants = Object.values(paxSelections).reduce((sum, count) => sum + count, 0)

    const handleTravelerInfoChange = (field: keyof TravelerInfo, value: string) => {
        setTravelerInfo(prev => ({
            ...prev,
            [field]: value
        }));

        // Validate the field in real-time and clear error if valid
        const newErrors = { ...validationErrors };
        let isValid = false;
        let errorKey = '';

        switch (field) {
            case 'fullName':
                isValid = value.trim().length > 0;
                errorKey = 'traveler_fullName';
                break;
            case 'email':
                isValid = value.trim().length > 0 && /\S+@\S+\.\S+/.test(value);
                errorKey = 'traveler_email';
                break;
            case 'country':
                isValid = value.trim().length > 0;
                errorKey = 'traveler_country';
                break;
            case 'phoneNumber':
                isValid = value.trim().length > 0 && /^\d+$/.test(value);
                errorKey = 'traveler_phone';
                break;
            case 'gender':
                isValid = value.length > 0;
                errorKey = 'traveler_gender';
                break;
            case 'dateOfBirth':
                isValid = value.length > 0;
                errorKey = 'traveler_dob';
                break;
            case 'passportNumber':
                isValid = value.trim().length > 0;
                errorKey = 'traveler_passport';
                break;
            case 'passportExpiryDate':
                isValid = value.length > 0;
                errorKey = 'traveler_passportExpiry';
                break;
            default:
                isValid = true;
        }

        // Clear error if field is now valid
        if (isValid && errorKey && newErrors[errorKey]) {
            delete newErrors[errorKey];
            setValidationErrors(newErrors);
        }
    }

    const handleAddonToggle = (addonId: string) => {
        setSelectedAddons(prev => {
            const existing = prev.find(item => item.id === addonId)
            if (existing) {
                return prev.filter(item => item.id !== addonId)
            } else {
                return [...prev, { id: addonId, quantity: 1 }]
            }
        })
    }

    const handleAddonQuantityChange = (addonId: string, newQuantity: number) => {
        if (newQuantity < 1) return;
        setSelectedAddons(prev =>
            prev.map(item =>
                item.id === addonId
                    ? { ...item, quantity: newQuantity }
                    : item
            )
        );
    }


    const bookingMutation = useMutation({
        mutationFn: async (bookingData: {
            personalInfo: TravelerInfo
            adults: number
            totalAmount: number
            fixedDateId: string
            arrivalDate: string
            departureDate: string
            numberOfTravelers: number
            package: string
            message: string
            specialRequirements: string
            termsAccepted: boolean
            addons: string[]
        }) => {
            const res = await fetch('https://rhapi.webxnepal.com/api/v1/booking', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(bookingData),
            });
            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.message || 'Booking failed');
            }
            return res.json();
        },
        onSuccess: () => {
            setBookingResult({ success: true, message: 'Booking successful! Please check your email for confirmation.' });
            setShowResultModal(true);
            clearBookingData(); // Clear store on success

            // Clear any existing timeout
            if (autoCloseTimeoutRef.current) {
                clearTimeout(autoCloseTimeoutRef.current);
            }

            // Auto-close after 3 seconds
            autoCloseTimeoutRef.current = setTimeout(() => {
                setShowResultModal(false);
                onClose();
            }, 3000);
            toast.success('Booking successful! Please check your email for confirmation.', {
                position: 'bottom-right',
                duration: 4000,
                style: {
                    backgroundColor: 'green',
                    color: 'white'
                }
            });
        },
        onError: (error: Error) => {
            setBookingResult({ success: false, message: error?.message || 'Booking failed. Please try again.' });
            setShowResultModal(true);

            // Clear any existing timeout
            if (autoCloseTimeoutRef.current) {
                clearTimeout(autoCloseTimeoutRef.current);
            }

            // Auto-close after 3 seconds
            autoCloseTimeoutRef.current = setTimeout(() => {
                setShowResultModal(false);
            }, 3000);

            toast.error(error.message || 'Booking failed. Please try again.', {
                position: 'bottom-right',
                duration: 4000,
                style: {
                    backgroundColor: 'red',
                    color: 'white'
                }
            });
        }
    });

    const handleSubmit = async () => {
        if (!validateStep4().isValid || !selectedDate || !calendarSelectedDate) return;

        // Calculate departure date based on trip duration
        const startDateObj = new Date(selectedDate.startDate);
        const endDateObj = new Date(selectedDate.endDate);
        const startDate = new Date(startDateObj.getFullYear(), startDateObj.getMonth(), startDateObj.getDate());
        const endDate = new Date(endDateObj.getFullYear(), endDateObj.getMonth(), endDateObj.getDate());
        const tripDurationDays = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)) + 1;

        const arrivalDate = new Date(
            calendarSelectedDate.getFullYear(),
            calendarSelectedDate.getMonth(),
            calendarSelectedDate.getDate()
        );
        const calculatedDepartureDate = new Date(arrivalDate);
        calculatedDepartureDate.setDate(calculatedDepartureDate.getDate() + tripDurationDays - 1);

        const bookingData = {
            personalInfo: travelerInfo,
            adults: totalParticipants,
            totalPeople: totalParticipants,
            totalAmount,
            fixedDateId: selectedDate._id,
            arrivalDate: arrivalDate.toISOString().split('T')[0], // Use selected arrival date
            departureDate: calculatedDepartureDate.toISOString().split('T')[0], // Use calculated departure date
            numberOfTravelers: totalParticipants,
            package: packageData._id,
            message,
            specialRequirements,
            termsAccepted,
            addons: selectedAddons.map(addon => addon.id),
            paxSelections // Include pax selections in booking data
        }
        bookingMutation.mutate(bookingData);
    }

    const handlePrevMonth = () => {
        const currentFirstDate = new Date(firstYear, firstMonth, 1);
        const prevMonth = new Date(currentFirstDate);
        prevMonth.setMonth(prevMonth.getMonth() - 1);
        setCurrentDisplayMonth(prevMonth);
    };

    const handleNextMonth = () => {
        const currentFirstDate = new Date(firstYear, firstMonth, 1);
        const nextMonth = new Date(currentFirstDate);
        nextMonth.setMonth(nextMonth.getMonth() + 1);
        setCurrentDisplayMonth(nextMonth);
    };


    const renderStepContent = () => {
        switch (currentStep) {
            case 1:
                return (
                    <div className="space-y-6">
                        <div className="bg-white rounded-md ">
                            <h2 className='text-xl font-medium '>Select Arrival Date</h2>
                            {selectedDate && calendarSelectedDate ? (
                                <p className="text-zinc-600 mb-4">
                                    Trip Duration: {tripDuration} days
                                    <span className="ml-2 text-sm">
                                        (Arrival: {new Date(calendarSelectedDate).toLocaleDateString()} - Departure: {new Date(selectedDate.endDate).toLocaleDateString()})
                                    </span>
                                </p>
                            ) : (
                                <p className="text-zinc-600 mb-4">Select a date to see trip duration</p>
                            )}

                            {validationErrors.date && (
                                <div className="mb-4 p-3 bg-orange-50 border border-orange-200 rounded-md">
                                    <p className="text-orange-600 text-sm">{validationErrors.date}</p>
                                </div>
                            )}

                            <div className="flex flex-wrap  gap-4 mb-4">
                                <button className="text-orange-400 hover:text-orange-600" onClick={handlePrevMonth}>
                                    <Icon icon="mynaui:chevron-left-solid" width="24" height="24" />
                                </button>
                                <div className="flex items-center gap-2 w-fit sm:w-auto">
                                    <div className="w-fit sm:w-42">
                                        <Select
                                            value={monthOptions.find(option => option.value === currentDisplayMonth.getMonth())}
                                            onChange={(option) => {
                                                if (option) {
                                                    const newDate = new Date(currentDisplayMonth);
                                                    newDate.setMonth(option.value);
                                                    setCurrentDisplayMonth(newDate);
                                                }
                                            }}
                                            options={monthOptions}
                                            styles={selectStyles}
                                            isSearchable={false}
                                        />
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 w-fit sm:w-auto">
                                    <div className="w-fit sm:w-32">
                                        <Select
                                            value={yearOptions.find(option => option.value === currentDisplayMonth.getFullYear())}
                                            onChange={(option) => {
                                                if (option) {
                                                    const newDate = new Date(currentDisplayMonth);
                                                    newDate.setFullYear(option.value);
                                                    setCurrentDisplayMonth(newDate);
                                                }
                                            }}

                                            options={yearOptions}
                                            styles={selectStyles}
                                            isSearchable={false}
                                        />
                                    </div>
                                </div>

                                <button className="text-orange-400 hover:text-orange-600" onClick={handleNextMonth}>
                                    <Icon icon="mynaui:chevron-right-solid" width="24" height="24" />
                                </button>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
                                <CalendarComponent
                                    month={firstMonth}
                                    year={firstYear}
                                    selectedDate={calendarSelectedDate}
                                    onDateSelect={setCalendarSelectedDate}
                                    highlightedDates={highlightedDates}
                                    tripDuration={tripDuration}
                                    hoveredDate={hoveredDate}
                                    onDateHover={setHoveredDate}
                                    fixedDates={packageData.fixedDates || []}
                                />
                                <div className="hidden sm:block">
                                    <CalendarComponent
                                        month={secondMonth}
                                        year={secondYear}
                                        selectedDate={calendarSelectedDate}
                                        onDateSelect={setCalendarSelectedDate}
                                        highlightedDates={highlightedDates}
                                        tripDuration={tripDuration}
                                        hoveredDate={hoveredDate}
                                        onDateHover={setHoveredDate}
                                        fixedDates={packageData.fixedDates || []}
                                    />
                                </div>
                            </div>


                            {validationErrors.participants && (
                                <div className="mb-4 p-3 bg-orange-50 border border-orange-200 rounded-md">
                                    <p className="text-orange-600 text-sm">{validationErrors.participants}</p>
                                </div>
                            )}

                            {packageData.pax && packageData.pax.length >= 1 ? (
                                <div className="mt-3">
                                    <h2 className='text-xl font-medium'>Select Package</h2>
                                    <div className="mt-4 divide-y divide-zinc-200">
                                        {packageData.pax
                                            .sort((a: { sortOrder: number }, b: { sortOrder: number }) => a.sortOrder - b.sortOrder)
                                            .map((pax: { _id: string; min: number; max: number; discount: number }) => {
                                                const paxCount = paxSelections[pax._id] || 0;
                                                return (
                                                    <div key={pax._id} className='flex gap-4 border border-zinc-100 p-3 rounded-sm md:gap-10 pb-4 items-center mb-3'>
                                                        <div className="flex items-center">
                                                            <button
                                                                className="w-10 rounded-full h-10 flex items-center justify-center border border-zinc-200 hover:bg-zinc-50"
                                                                onClick={() => {
                                                                    setPaxSelections(prev => ({
                                                                        ...prev,
                                                                        [pax._id]: Math.max(0, paxCount - 1)
                                                                    }));
                                                                }}
                                                            >
                                                                <Minus className="size-4" />
                                                            </button>
                                                            <input
                                                                type="text"
                                                                value={paxCount}
                                                                readOnly
                                                                className='w-12 h-10 text-center border-none outline-none ring-0'
                                                            />
                                                            <button
                                                                className="w-10 h-10 flex items-center justify-center border border-zinc-200 rounded-full hover:bg-zinc-50"
                                                                onClick={() => {
                                                                    setPaxSelections(prev => ({
                                                                        ...prev,
                                                                        [pax._id]: paxCount + 1
                                                                    }));
                                                                }}
                                                            >
                                                                <Plus className="size-4" />
                                                            </button>
                                                        </div>
                                                        <div className="flex justify-between items-center w-full">
                                                            <div>
                                                                <h2 className='text-lg font-semibold'>{pax.min} - {pax.max} Pax</h2>
                                                                <p className="text-zinc-600">Best for {pax.max < 2 ? 'solo travelers' : 'group travelers'}</p>
                                                            </div>
                                                            <div className="text-right">
                                                                <h2 className='text-lg font-semibold'>US$ {pax.discount}</h2>
                                                                <p className="text-sm text-zinc-600">per person</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                    </div>

                                </div>
                            ) : (
                                <div className="bg-white rounded-md border border-zinc-200 p-4">
                                    <h2 className='text-xl font-medium'>Select Number of Travelers</h2>
                                    <div className="flex items-center gap-4 py-4">
                                        <button
                                            className="w-10 rounded-full h-10 flex items-center justify-center border border-zinc-200 hover:bg-zinc-50"
                                            onClick={() => setParticipants(Math.max(1, participants - 1))}
                                        >
                                            <Minus className="size-4" />
                                        </button>
                                        <input
                                            type="text"
                                            value={participants}
                                            readOnly
                                            className='w-12 h-10 text-center'
                                        />
                                        <button
                                            className="w-10 h-10 flex items-center justify-center border border-zinc-200 rounded-full hover:bg-zinc-50"
                                            onClick={() => setParticipants(participants + 1)}
                                        >
                                            <Plus className="size-4" />
                                        </button>
                                    </div>
                                    <div className="flex justify-between w-full">
                                        <div>
                                            <h2 className='text-lg font-semibold'>1 Pax</h2>
                                            <p className="text-zinc-600">Best for solo travelers</p>
                                        </div>
                                        <div className="text-right">
                                            <h2 className='text-lg font-semibold'>US$ 0</h2>
                                            <p className="text-sm text-zinc-600">No discount</p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            <button
                                onClick={handleNextStep}
                                className='bg-[#F05E25] px-6 py-3 rounded-md text-white w-full hover:bg-orange-600 transition-colors mt-6'
                            >
                                Continue to Traveler Information
                            </button>
                        </div>
                    </div>
                )

            // ... rest of the step content remains the same (cases 2, 3, 4)
            case 2:
                return (
                    <div className="space-y-6">
                        <div className="bg-white ">
                            <h2 className='text-xl font-medium'>Traveler Information</h2>
                            <p className="text-zinc-600">Enter details of Traveller's representative</p>

                            <div className="mt-6  border-zinc-200 first:mt-0 first:pt-0 first:border-t-0">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className='relative'>
                                        <label className="block text-sm font-medium text-zinc-700 mb-1">Full Name *</label>
                                        <input
                                            type="text"
                                            required
                                            name='fullName'
                                            autoComplete='name'
                                            value={travelerInfo.fullName}
                                            onChange={(e) => handleTravelerInfoChange('fullName', e.target.value)}
                                            className={`w-full p-2 border rounded-md ${validationErrors[`traveler_fullName`] ? 'border-[#F05E25]' : 'border-zinc-200'}`}
                                            placeholder="John Doe"
                                        />
                                        {validationErrors[`traveler_fullName`] && (
                                            <p className="text-[#F05E25] text-xs mt-1">{validationErrors[`traveler_fullName`]}</p>
                                        )}
                                    </div>
                                    <div className='relative'>
                                        <label className="block text-sm font-medium text-zinc-700 mb-1">Email *</label>
                                        <input
                                            type="email"
                                            required
                                            name='email'
                                            autoComplete='email'
                                            value={travelerInfo.email}
                                            onChange={(e) => handleTravelerInfoChange('email', e.target.value)}
                                            className={`w-full p-2 border rounded-md ${validationErrors[`traveler_email`] ? 'border-[#F05E25]' : 'border-zinc-200'}`}
                                            placeholder="john@example.com"
                                        />
                                        {validationErrors[`traveler_email`] && (
                                            <p className="text-[#F05E25] text-xs mt-1">{validationErrors[`traveler_email`]}</p>
                                        )}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-zinc-700 mb-1">Country *</label>
                                        <input
                                            type="text"
                                            required
                                            name='country'
                                            autoComplete='country'
                                            value={travelerInfo.country}
                                            onChange={(e) => handleTravelerInfoChange('country', e.target.value)}
                                            className={`w-full p-2 border rounded-md ${validationErrors[`traveler_country`] ? 'border-[#F05E25]' : 'border-zinc-200'}`}
                                            placeholder="Nepal"
                                        />
                                        {validationErrors[`traveler_country`] && (
                                            <p className="text-[#F05E25] text-xs mt-1">{validationErrors[`traveler_country`]}</p>
                                        )}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-zinc-700 mb-1">Phone Number *</label>
                                        <div className="flex gap-2">
                                            <select
                                                value={travelerInfo.phoneCountryCode}
                                                onChange={(e) => handleTravelerInfoChange('phoneCountryCode', e.target.value)}
                                                className={`w-1/3 p-2 border rounded-md ${validationErrors[`traveler_phone`] ? 'border-[#F05E25]' : 'border-zinc-200'}`}
                                            >
                                                {countries.map(country => (
                                                    <option key={country.code} value={country.dialCode}>
                                                        {country.dialCode} ({country.code})
                                                    </option>
                                                ))}
                                            </select>
                                            <input
                                                type="tel"
                                                required
                                                value={travelerInfo.phoneNumber}
                                                onChange={(e) => handleTravelerInfoChange('phoneNumber', e.target.value)}
                                                name='phoneNumber'
                                                autoComplete='tel'
                                                className={`w-2/3 p-2 border rounded-md ${validationErrors[`traveler_phone`] ? 'border-[#F05E25]' : 'border-zinc-200'}`}
                                                placeholder="1234567890"
                                            />
                                        </div>
                                        {validationErrors[`traveler_phone`] && (
                                            <p className="text-[#F05E25] text-xs mt-1">{validationErrors[`traveler_phone`]}</p>
                                        )}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-zinc-700 mb-1">Gender *</label>
                                        <select
                                            required
                                            value={travelerInfo.gender}
                                            onChange={(e) => handleTravelerInfoChange('gender', e.target.value)}
                                            className={`w-full p-2 border rounded-md ${validationErrors[`traveler_gender`] ? 'border-[#F05E25]' : 'border-zinc-200'}`}
                                        >
                                            <option value="">Select Gender</option>
                                            <option value="male">Male</option>
                                            <option value="female">Female</option>
                                            <option value="other">Other</option>
                                        </select>
                                        {validationErrors[`traveler_gender`] && (
                                            <p className="text-[#F05E25] text-xs mt-1">{validationErrors[`traveler_gender`]}</p>
                                        )}
                                    </div>
                                    <div className='relative booking '>
                                        <label className="block text-sm font-medium text-zinc-700 mb-1">Date of Birth *</label>
                                        <div className="relative">
                                            <input
                                                type="date"
                                                required
                                                value={travelerInfo.dateOfBirth}
                                                onChange={(e) => handleTravelerInfoChange('dateOfBirth', e.target.value)}
                                                className={`w-full  p-2 pl-10 border rounded-md ${validationErrors[`traveler_dob`] ? 'border-[#F05E25]' : 'border-zinc-200'}`}
                                            />
                                        </div>
                                        {validationErrors[`traveler_dob`] && (
                                            <p className="text-[#F05E25] text-xs mt-1">{validationErrors[`traveler_dob`]}</p>
                                        )}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-zinc-700 mb-1">Passport Number *</label>
                                        <input
                                            type="text"
                                            required
                                            name='passportNumber'
                                            autoComplete='passportNumber'
                                            value={travelerInfo.passportNumber}
                                            onChange={(e) => handleTravelerInfoChange('passportNumber', e.target.value)}
                                            className={`w-full p-2 border rounded-md ${validationErrors[`traveler_passport`] ? 'border-[#F05E25]' : 'border-zinc-200'}`}
                                            placeholder="A12345678"
                                        />
                                        {validationErrors[`traveler_passport`] && (
                                            <p className="text-[#F05E25] text-xs mt-1">{validationErrors[`traveler_passport`]}</p>
                                        )}
                                    </div>
                                    <div className='relative booking'>
                                        <label className="block text-sm font-medium text-zinc-700 mb-1">Passport Expiry Date *</label>
                                        <div className="relative">
                                            <input
                                                type="date"
                                                required
                                                name='passportExpiryDate'
                                                value={travelerInfo.passportExpiryDate}
                                                onChange={(e) => handleTravelerInfoChange('passportExpiryDate', e.target.value)}
                                                className={`w-full p-2 pl-10 border rounded-md ${validationErrors[`traveler_passportExpiry`] ? 'border-[#F05E25]' : 'border-zinc-200'}`}
                                            />
                                        </div>
                                        {validationErrors[`traveler_passportExpiry`] && (
                                            <p className="text-[#F05E25] text-xs mt-1">{validationErrors[`traveler_passportExpiry`]}</p>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="mt-6">
                                <label className="block text-sm font-medium text-zinc-700 mb-1">Additional Message</label>
                                <textarea
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    className="w-full p-2 border border-zinc-200 rounded-md"
                                    rows={3}
                                    name="message"
                                    autoCapitalize='sentences'
                                    placeholder="Any additional information or requests..."
                                />
                            </div>

                            <div className="flex gap-4 mt-6">
                                <button
                                    onClick={handlePreviousStep}
                                    className='border px-6 py-2 rounded-md text-zinc-800 flex-1 transition-colors'
                                >
                                    Back
                                </button>
                                <button
                                    onClick={handleNextStep}
                                    className='bg-[#F05E25] px-6 py-3 rounded-md text-white flex-1 hover:bg-orange-600 transition-colors'
                                >
                                    {packageData?.addons?.length ? 'Continue to Add-ons' : 'Continue to Payment'}
                                </button>
                            </div>
                        </div>
                    </div>
                )

            case 3:
                return (
                    <div className="space-y-6">
                        <div className="bg-white rounded-md border border-zinc-200 p-4">
                            <h2 className='text-xl font-medium'>Add-ons & Extras</h2>
                            <p className="text-zinc-600">Enhance your experience with these add-ons</p>

                            <div className="mt-4 space-y-4">
                                {packageData.addons.map((addon) => {
                                    const isSelected = selectedAddons.some(item => item.id === addon._id)
                                    const selectedAddon = selectedAddons.find(item => item.id === addon._id)

                                    return (
                                        <div key={addon._id} className="border border-zinc-200 rounded-md p-4 hover:bg-zinc-50 transition-all">
                                            <div className="flex justify-between items-start">
                                                <div className="flex items-start gap-4 flex-1">
                                                    <input
                                                        type="checkbox"
                                                        checked={isSelected}
                                                        onChange={() => handleAddonToggle(addon._id)}
                                                        className="w-4 h-4 lg:size-5 mt-1"
                                                    />
                                                    <div className="flex-1">
                                                        <h3 className="font-semibold capitalize">{addon.name}</h3>
                                                        <div dangerouslySetInnerHTML={{ __html: addon.description }} className="text-sm text-zinc-600 mt-1"></div>
                                                        <p className="text-[#F05E25] font-medium mt-2">US$ {addon.price} per person</p>
                                                    </div>
                                                </div>
                                            </div>

                                            {
                                                isSelected && (
                                                    <div className="mt-4 flex items-center gap-4">
                                                        <span className="text-sm font-medium">Quantity:</span>
                                                        <div className="flex items-center">
                                                            <button
                                                                className="w-8 h-8 flex items-center justify-center border border-zinc-200 rounded-l-lg hover:bg-zinc-50"
                                                                onClick={() => handleAddonQuantityChange(addon._id, (selectedAddon?.quantity || 1) - 1)}
                                                            >
                                                                <Minus className="size-4" />
                                                            </button>
                                                            <input
                                                                type="text"
                                                                value={selectedAddon?.quantity || 1}
                                                                readOnly
                                                                className="w-12 h-8 text-center border-y border-zinc-200"
                                                            />
                                                            <button
                                                                className="w-8 h-8 flex items-center justify-center border border-zinc-200 rounded-r-lg hover:bg-zinc-50"
                                                                onClick={() => handleAddonQuantityChange(addon._id, (selectedAddon?.quantity || 1) + 1)}
                                                            >
                                                                <Plus className="size-4" />
                                                            </button>
                                                        </div>
                                                        <span className="text-sm text-zinc-600 ml-auto">
                                                            Total: US$ {((selectedAddon?.quantity || 1) * addon.price).toFixed(2)}
                                                        </span>
                                                    </div>
                                                )
                                            }
                                        </div>
                                    )
                                })}
                            </div>

                            <div className="flex gap-4 mt-6">
                                <button
                                    onClick={handlePreviousStep}
                                    className='border px-6 py-2 rounded-md text-zinc-800 flex-1 transition-colors'
                                >
                                    Back
                                </button>
                                <button
                                    onClick={handleNextStep}
                                    className='bg-[#F05E25] px-6 py-3 rounded-md text-white flex-1 hover:bg-orange-600 transition-colors'
                                >
                                    Continue to Payment
                                </button>
                            </div>
                        </div>
                    </div >
                )

            case 4:
                return (
                    <div className="space-y-6">
                        <div className="bg-white rounded-md border border-zinc-200 p-4">
                            <h2 className='text-xl font-medium'>Payment Option</h2>
                            <div className="mt-4 space-y-3">
                                <label className="flex items-center p-3 border border-zinc-200 rounded-md cursor-pointer hover:bg-zinc-50">
                                    <input
                                        type="radio"
                                        name="payment"
                                        value="full"
                                        checked={paymentOption === 'full'}
                                        onChange={(e) => setPaymentOption(e.target.value)}
                                        className="mr-3"
                                    />
                                    <div>
                                        <p className="font-medium">Pay Full Amount Now</p>
                                        <p className="text-sm text-zinc-600">Secure your booking with full payment</p>
                                    </div>
                                </label>

                                <label className="flex items-center p-3 border border-zinc-200 rounded-md cursor-pointer hover:bg-zinc-50">
                                    <input
                                        type="radio"
                                        name="payment"
                                        value="partial"
                                        checked={paymentOption === 'partial'}
                                        onChange={(e) => setPaymentOption(e.target.value)}
                                        className="mr-3"
                                    />
                                    <div>
                                        <p className="font-medium">Pay 30% Now & Rest on Arrival</p>
                                        <p className="text-sm text-zinc-600">US$ {(totalAmount * 0.3).toFixed(2)} now, balance on arrival</p>
                                    </div>
                                </label>
                            </div>

                            <div className="mt-6 p-4 bg-zinc-50 rounded-md">
                                <label className="flex items-center">
                                    <input
                                        type="checkbox"
                                        checked={termsAccepted}
                                        onChange={(e) => setTermsAccepted(e.target.checked)}
                                        className="mr-3"
                                        required
                                    />
                                    <span className="text-sm">
                                        I agree to the terms and conditions and privacy policy *
                                    </span>
                                </label>
                                {validationErrors.terms && (
                                    <p className="text-[#F05E25] text-sm mt-2">{validationErrors.terms}</p>
                                )}
                            </div>

                            <div className="flex gap-4 mt-6">
                                <button
                                    onClick={handlePreviousStep}
                                    className='border px-6 py-2 rounded-md text-zinc-800 flex-1 transition-colors'
                                >
                                    Back
                                </button>
                                <button
                                    onClick={handleSubmit}
                                    disabled={!termsAccepted || bookingMutation.isPending}
                                    className='bg-[#F05E25] px-6 py-3 rounded-md text-white flex-1 hover:bg-orange-600 transition-colors  disabled:cursor-not-allowed'
                                >
                                    {bookingMutation.isPending ? 'Processing...' : 'Complete Booking'}
                                </button>
                            </div>
                        </div>
                    </div>
                )

            default:
                return null
        }
    }

    // Update the datesAvailable check:
    const datesAvailable = packageData?.fixedDates?.some((date: { status?: string; startDate: string; availableSeats?: number }) => {
        const isOpen = date.status?.toLowerCase() === 'open';
        const startDateObj = new Date(date.startDate);
        const today = new Date();

        const startDate = new Date(
            startDateObj.getFullYear(),
            startDateObj.getMonth(),
            startDateObj.getDate()
        );
        const normalizedToday = new Date(
            today.getFullYear(),
            today.getMonth(),
            today.getDate()
        );

        const isFutureOrToday = startDate >= normalizedToday;
        const hasSeats = (date.availableSeats || 0) > 0;

        return isOpen && isFutureOrToday && hasSeats;
    });
    if (!datesAvailable) {
        return (
            <div className=" rounded-md visible relative flex justify-center items-center  max-w-5xl overflow-hidden h-screen w-full mx-auto">

                <div className="max-w-3xl w-full overflow-hidden relative  mx-auto pointer-events-auto flex justify-center items-center h-[60dvh] text-center bg-white rounded-md ">
                    <button onClick={onClose} className="absolute cursor-pointer size-5 md:size-8 lg:size-12 rounded-full text-black/50 hover:text-black   transition-colors duration-200 flex justify-center items-center  z-[999] top-4 right-4">
                        <X className="size-4 md:size-5 lg:size-6" />
                    </button>
                    <div className="p-6 relative">
                        <div className="flex justify-center items-center text-[#F05E25] mb-4">
                            <svg xmlns="http://www.w3.org/2000/svg" width={48} height={48} className='size-20 lg:size-36' viewBox="0 0 48 48"><g fill="currentColor"><path d="M31.425 38.177A15.9 15.9 0 0 1 24 40c-8.837 0-16-7.163-16-16S15.163 8 24 8s16 7.163 16 16q0 .25-.008.5h2.001Q42 24.25 42 24c0-9.941-8.059-18-18-18S6 14.059 6 24s8.059 18 18 18a17.9 17.9 0 0 0 8.379-2.065z"></path><path d="M13.743 23.35c-.12.738.381 1.445 1.064 1.883c.714.457 1.732.707 2.93.53a3.8 3.8 0 0 0 2.654-1.665c.504-.764.711-1.693.48-2.382a.5.5 0 0 0-.818-.203c-1.796 1.704-3.824 2.123-5.642 1.448a.5.5 0 0 0-.668.39m20.076-.001c.119.738-.382 1.445-1.065 1.883c-.714.457-1.731.707-2.93.53a3.8 3.8 0 0 1-2.653-1.665c-.504-.764-.712-1.693-.48-2.382a.5.5 0 0 1 .818-.203c1.796 1.704 3.824 2.123 5.642 1.448a.5.5 0 0 1 .668.39"></path><path fillRule="evenodd" d="M36 36a4 4 0 0 0 4-4c0-3.5-4-7-4-7s-4 3.5-4 7a4 4 0 0 0 4 4m0-2a2 2 0 0 0 2-2c0-1.066-.654-2.37-1.59-3.6q-.207-.27-.41-.512q-.203.241-.41.512C34.655 29.63 34 30.934 34 32a2 2 0 0 0 2 2" clipRule="evenodd"></path><path d="M20.8 33.6c1.6-2.133 4.8-2.133 6.4 0a1 1 0 0 0 1.6-1.2c-2.4-3.2-7.2-3.2-9.6 0a1 1 0 0 0 1.6 1.2"></path></g></svg>
                        </div>
                        <h2 className="text-2xl font-bold mb-4">No Seats Available</h2>
                        <p className="text-zinc-700 text-lg">The seats for this package are currently fully booked. Please check back later or contact our support team for assistance.</p>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="sm:py-10 h-full !overflow-auto">
            <div className="bg-white  rounded-md visible shadow-xl max-w-5xl  w-full mx-auto">
                <div className="max-w-5xl mx-auto pointer-events-auto bg-white rounded-md ">
                    <div className="w-full relative h-64 bg-zinc-200">
                        <button onClick={onClose} className="absolute cursor-pointer size-8 lg:size-12 rounded-full text-white/60  hover:text-white transition-colors duration-200 flex justify-center items-center border z-[999] top-4 right-4">
                            <X className="size-6" />
                        </button>
                        <Image
                            fill
                            src={packageData.coverImage}
                            alt="cover image"
                            className='object-cover object-bottom'
                        />
                        <div className="absolute inset-0 bg-black/40 flex justify-center flex-col text-white items-center z-40">
                            <h2 className='text-xl px-4 lg:text-2xl font-bold text-center'>{packageData.name}</h2>
                            <div className="flex items-center mt-2 flex-wrap justify-center">
                                <button className="text-sm hover:underline">{packageData.categoryId.name}</button>
                                <ChevronRight className='size-4' />
                                <button className="text-sm hover:underline">{packageData.subCategoryId.name}</button>
                                <ChevronRight className='size-4' />
                                <button className="text-sm hover:underline">{packageData.name}</button>
                            </div>
                        </div>
                    </div>

                    <div className=" grid grid-cols-1 lg:grid-cols-3 gap-2">
                        <div className="col-span-2 p-4 md:p-6">
                            {renderStepContent()}
                        </div>

                        <div className="bg-zinc-100/70 p-4 ">
                            <div className=" lg:h-fit sticky top-4 ">
                                <div className=" rounded-md p-4 sticky top-4">
                                    <h2 className='text-2xl font-bold mb-6'>Booking Summary</h2>

                                    <div className="space-y-3">
                                        <div className="flex justify-between">
                                            <span className="text-zinc-900 font-semibold">Package:</span>
                                            <span className="font-medium text-right text-[#F05E25]">{packageData.name}</span>
                                        </div>

                                        {selectedDate && calendarSelectedDate && (
                                            <div className="flex justify-between">
                                                <span className="text-zinc-900 font-semibold">Duration:</span>
                                                <span className="font-medium text-[#F05E25]">
                                                    {tripDuration} days
                                                </span>
                                            </div>
                                        )}

                                        {!selectedDate && (
                                            <div className="flex justify-between">
                                                <span className="text-zinc-900 font-semibold">Duration:</span>
                                                <span className="font-medium text-[#F05E25]">Select date</span>
                                            </div>
                                        )}

                                        <div className="flex justify-between">
                                            <span className="text-zinc-900 font-semibold">Travel Dates:</span>
                                            <span className="font-medium text-right text-sm text-[#F05E25]">
                                                {selectedDate && calendarSelectedDate ? (
                                                    <>
                                                        {new Date(calendarSelectedDate).toLocaleString('en-US', { month: 'short', day: 'numeric' })} - {new Date(selectedDate.endDate).toLocaleString('en-US', { month: 'short', day: 'numeric' })}
                                                    </>
                                                ) : 'Not selected'}
                                            </span>
                                        </div>

                                        {selectedDate && (
                                            <div className="flex justify-between">
                                                <span className="text-zinc-900 font-semibold">Seats Available:</span>
                                                <span className="font-medium text-[#F05E25]">{selectedDate.availableSeats || 0}</span>
                                            </div>
                                        )}

                                        <div className="flex justify-between">
                                            <span className="text-zinc-900 font-semibold">Participants:</span>
                                            <span className="font-medium text-[#F05E25]">{totalParticipants} {totalParticipants === 1 ? 'person' : 'people'}</span>
                                        </div>

                                        <hr className="my-3 text-zinc-200" />

                                        {selectedDate && (
                                            <>
                                                {basePriceDetails.paxBreakdown && basePriceDetails.paxBreakdown.length > 0 ? (
                                                    <>
                                                        <div className="text-zinc-900 font-semibold mb-2">Package Pricing:</div>
                                                        {basePriceDetails.paxBreakdown.map((breakdown) => (
                                                            <div key={breakdown.paxId} className="flex justify-between text-sm mb-2">
                                                                <div className="flex flex-col">
                                                                    <span className="text-zinc-700">
                                                                        {breakdown.min}-{breakdown.max} Pax × {breakdown.count}
                                                                    </span>
                                                                    <span className='text-zinc-500 text-xs'>
                                                                        (US$ {breakdown.pricePerPerson} per person - {breakdown.label})
                                                                    </span>
                                                                </div>
                                                                <span className="font-medium text-[#F05E25]">
                                                                    US$ {breakdown.total.toFixed(2)}
                                                                </span>
                                                            </div>
                                                        ))}                                                        <div className="flex justify-between font-semibold mt-2 pt-2 border-t border-zinc-200">
                                                            <span className="text-zinc-900">Subtotal:</span>
                                                            <span className="text-[#F05E25]">US$ {basePriceDetails.basePrice.toFixed(2)}</span>
                                                        </div>
                                                    </>
                                                ) : (
                                                    <div className="text-center py-2 text-zinc-500 text-sm">
                                                        Please select participants
                                                    </div>
                                                )}

                                                {selectedAddons.length > 0 && (
                                                    <>
                                                        <hr className="my-3 text-zinc-200" />
                                                        <div className="text-zinc-800 font-medium">Add-ons:</div>
                                                        {selectedAddons.map((selectedAddon) => {
                                                            const addon = packageData.addons.find(a => a._id === selectedAddon.id)
                                                            if (!addon) return null
                                                            const addonTotal = addon.price * selectedAddon.quantity
                                                            return (
                                                                <div key={addon._id} className="flex justify-between text-sm w-full">
                                                                    <span>{addon.name} ×{selectedAddon.quantity}</span>
                                                                    <span className='text-[#FF6A00] font-semibold'>+ US$ {addonTotal.toFixed(2)}</span>
                                                                </div>
                                                            )
                                                        })}
                                                    </>
                                                )}

                                                <hr className="my-3 text-zinc-200" />

                                                <div className="flex justify-between text-lg font-semibold">
                                                    <span>Total Amount:</span>
                                                    <span>US$ {totalAmount.toFixed(2)}</span>
                                                </div>

                                                {paymentOption === 'partial' && currentStep === 4 && (
                                                    <>
                                                        <div className="flex justify-between text-sm">
                                                            <span className="text-zinc-600">Deposit (30%):</span>
                                                            <span className="font-medium">US$ {(totalAmount * 0.3).toFixed(2)}</span>
                                                        </div>
                                                        <div className="flex justify-between text-sm">
                                                            <span className="text-zinc-600">Balance on Arrival:</span>
                                                            <span className="font-medium">US$ {(totalAmount * 0.7).toFixed(2)}</span>
                                                        </div>
                                                    </>
                                                )}
                                            </>
                                        )}

                                        {!selectedDate && (
                                            <div className="text-center py-4 text-zinc-500">
                                                Please select a date to see pricing
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {showResultModal && (
                <div className="backdrop-blur-lg flex items-center justify-center p-4 fixed inset-0 bg-black/30 z-[9999999] h-full">
                    <div className="h-full w-full relative">
                        <div className="h-screen sticky top-0 flex justify-center items-center">
                            <div className="flex flex-col justify-center bg-white items-center p-8 py-12 relative rounded-lg shadow-lg max-w-2xl w-full">
                                <button
                                    onClick={() => {
                                        // Clear the auto-close timeout
                                        if (autoCloseTimeoutRef.current) {
                                            clearTimeout(autoCloseTimeoutRef.current);
                                            autoCloseTimeoutRef.current = null;
                                        }
                                        setShowResultModal(false);
                                        if (bookingResult.success) {
                                            onClose();
                                        }
                                    }}
                                    className="absolute top-4 right-4 hover:bg-gray-100 rounded-full p-1 transition-colors"
                                >
                                    <X className="size-6" />
                                </button>

                                {bookingResult.success ? (
                                    <>
                                        <svg xmlns="http://www.w3.org/2000/svg" width={12} height={12} viewBox="0 0 12 12" className="size-10 lg:size-16 text-green-500 mb-6">
                                            <path fill="currentColor" d="m6.933.332l.113.101l.89.89l1.26.001a1.48 1.48 0 0 1 1.453 1.198l.02.138l.007.143l-.002 1.259l.893.892a1.48 1.48 0 0 1 .19 1.86l-.089.12l-.101.112l-.893.891l.001 1.258c0 .659-.432 1.224-1.056 1.415l-.136.035l-.142.023l-.144.007h-1.26l-.891.892a1.48 1.48 0 0 1-1.86.19l-.12-.089l-.112-.101l-.892-.893l-1.258.001A1.48 1.48 0 0 1 1.35 9.48l-.02-.139l-.006-.142V7.936l-.89-.89a1.48 1.48 0 0 1-.19-1.86l.088-.12l.101-.112l.89-.891l.001-1.26c0-.72.516-1.32 1.198-1.452l.139-.02l.142-.007h1.26l.891-.89a1.48 1.48 0 0 1 1.98-.102zm1.212 3.657l-.085.071L5.5 6.62L4.44 5.56a.63.63 0 0 0-.88 0a.63.63 0 0 0-.071.795l.071.085l1.5 1.5a.625.625 0 0 0 .804.065l.076-.065l3-3a.61.61 0 0 0 0-.88a.63.63 0 0 0-.795-.071"></path>
                                        </svg>
                                        <h1 className="text-2xl font-bold mb-2">Booking Successful!</h1>
                                        <p className="text-center text-gray-600">{bookingResult.message}</p>
                                    </>
                                ) : (
                                    <>
                                        <svg xmlns="http://www.w3.org/2000/svg" width={12} height={12} viewBox="0 0 12 12" className="size-10 lg:size-16 text-red-500 mb-6">
                                            <path fill="currentColor" d="M6 1a5 5 0 1 0 0 10A5 5 0 0 0 6 1M4.854 3.646a.5.5 0 1 1 .707.708L6.207 5l.646.646a.5.5 0 0 1-.707.708L6 5.707l-.646.647a.5.5 0 1 1-.708-.708L5.293 5l-.647-.646a.5.5 0 0 1 0-.708M6 6.5a.75.75 0 0 1 .75.75v1.5a.75.75 0 0 1-1.5 0v-1.5A.75.75 0 0 1 6 6.5"></path>
                                        </svg>
                                        <h1 className="text-2xl font-bold mb-2 text-red-600">Booking Failed</h1>
                                        <p className="text-center text-gray-600">{bookingResult.message}</p>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}