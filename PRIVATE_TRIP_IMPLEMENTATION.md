# Private Trip Booking Implementation

## Overview
This document describes the implementation of the private trip booking feature with API integration and success modal.

## Files Created/Modified

### 1. **Type Definition** - `src/types/IPrivateTrip.ts`
Created TypeScript interfaces for private trip data:
- `IPrivateTripData` - Request payload structure
- `IPrivateTripResponse` - API response structure

### 2. **API Service** - `src/service/booking.ts`
Added `bookPrivateTrip()` function that:
- Posts data to `/api/v1/private-trip` endpoint
- Returns typed response
- Handles HTTP requests via axios

### 3. **Success Modal Component** - `src/components/common/SuccessModal.tsx`
Reusable success modal with:
- Animated appearance with backdrop blur
- Success icon with green theme
- Customizable title and message
- Close button and backdrop click to dismiss
- Responsive design

### 4. **Private Trip Form** - `src/components/intineryBars/DatesAndPrices.tsx`
Updated `PrivateTripForm` component with:
- Dynamic captcha generation (random numbers)
- Form validation
- API integration
- Loading states during submission
- Error handling with user-friendly messages
- Success modal display on successful submission
- Form reset after successful submission
- Disabled state during submission

## API Integration

### Endpoint
```
POST /api/v1/private-trip
```

### Request Payload
```typescript
{
  date: string;                    // ISO date string
  leadTravellerName: string;       // Full name
  email: string;                   // Email address
  phone: string;                   // Phone number
  numberOfTraveller: number;       // Integer
  country: string;                 // Country name
  howDidYouReachUs: string;        // Discovery method
  message: string;                 // Comments/requirements
  termsAndAgreement: boolean;      // Terms acceptance
  captchaToken: string;            // e.g., "45+67"
  captchaAnswer: number;           // e.g., 112
}
```

### Response
```typescript
{
  success: boolean;
  message: string;
  data?: any;
}
```

## Features Implemented

### 1. Form Validation
- Required field validation
- Email format validation
- Number validation for travelers count
- Terms and conditions checkbox requirement
- Dynamic captcha validation

### 2. User Experience
- Loading spinner during submission
- Disabled form inputs during submission
- Error messages displayed inline
- Success modal with confirmation message
- Form auto-reset after successful submission
- Smooth transitions and animations

### 3. Error Handling
- Network error handling
- API error response handling
- User-friendly error messages
- Captcha validation errors
- Terms agreement validation

### 4. Security
- Dynamic captcha generation (prevents hardcoded answers)
- Terms and conditions agreement required
- Client-side validation before API call

## UI Components

### Form Fields
1. **Choose your own date*** - Date picker
2. **Lead Traveler's Full Name*** - Text input
3. **Email*** - Email input
4. **Phone*** - Tel input
5. **No. of Travellers*** - Number input (min: 1)
6. **Country** - Text input (optional)
7. **How did you find Real Himalaya?*** - Select dropdown with options:
   - Google Search
   - Social Media
   - Friend/Family Referral
   - Travel Agent
   - Previous Customer
   - Other
8. **Place your comments here** - Textarea (optional)
9. **Terms and Conditions*** - Checkbox with link
10. **Captcha*** - Dynamic math question

### Success Modal
- Green check icon
- "Booking Request Submitted!" title
- Confirmation message
- Close button
- Backdrop click to dismiss

## Color Theme
- Primary: `#F05E25` (Orange)
- Secondary: `#01283F` (Dark Blue)
- Success: Green shades
- Error: Red shades

## Usage

The form appears when users select the "Private Trip" tab in the Bookings & Availability section:

1. User fills out the form
2. User solves the captcha
3. User agrees to terms
4. User clicks "Submit Request"
5. Form validates input
6. API request is sent
7. Success modal appears on success
8. Form resets for new submission

## Testing Considerations

When testing, ensure:
- Valid email format is entered
- Captcha answer is correct
- Terms checkbox is checked
- Number of travelers is at least 1
- Backend API endpoint is available
- Network connectivity is stable
- Error scenarios are handled gracefully

## Future Enhancements

Potential improvements:
- Phone number validation with country code
- Country dropdown with searchable list
- Date range selection
- File upload for special requirements
- Email confirmation
- Booking reference number display
- Integration with calendar availability
