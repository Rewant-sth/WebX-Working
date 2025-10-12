# Booking Modal Testing Guide

## Quick Test Steps

### 1. Test Modal Opening from RightBar
1. Navigate to any package itinerary page (e.g., `/itinerary/[slug]`)
2. Look at the right sidebar
3. Click the **"Book Now"** button (orange button)
4. ✅ Modal should open with booking form
5. Click the X button to close
6. ✅ Modal should close smoothly

### 2. Test Modal Opening from Dates Section
1. Scroll down to "Dates & Prices" section
2. Select a date from the calendar
3. Click **"Book This Trip"** button
4. ✅ Modal should open with the selected date pre-filled
5. Close the modal

### 3. Test Date Selection in Modal
1. Open the booking modal
2. Navigate through months using Previous/Next buttons
3. Click on an available date (green border)
4. ✅ Date should be selected and highlighted in pink
5. ✅ Trip duration should be displayed correctly
6. ✅ Trip end date should show in the booking summary

### 4. Test Form Validation - Step 1
1. Open booking modal
2. Try clicking "Continue to Traveler Information" without selecting a date
3. ✅ Should show error toast: "Please select an arrival date"
4. Select a date
5. ✅ Should proceed to Step 2

### 5. Test Form Validation - Step 2
1. In Step 2, try clicking "Continue" without filling any fields
2. ✅ Should show validation errors for all required fields
3. Fill in all traveler information:
   - Full Name
   - Email (valid format)
   - Country
   - Phone Number (digits only)
   - Gender
   - Date of Birth
   - Passport Number
   - Passport Expiry Date
4. ✅ Errors should clear as you fill fields
5. Click "Continue to Add-ons" or "Continue to Payment"
6. ✅ Should proceed to next step

### 6. Test Add-ons (Step 3) - If Available
1. If package has add-ons, test selecting them
2. Toggle add-on checkboxes
3. Adjust quantities with +/- buttons
4. ✅ Price should update in booking summary
5. Click "Continue to Payment"

### 7. Test Payment Options (Step 4)
1. View payment options:
   - Pay Full Amount Now
   - Pay 30% Now & Rest on Arrival
2. Toggle between options
3. ✅ Summary should update accordingly
4. Try clicking "Complete Booking" without accepting terms
5. ✅ Should show error: "You must accept the terms and conditions"
6. Accept terms and conditions
7. Click "Complete Booking"
8. ✅ Should submit booking (check console for API call)

### 8. Test Booking Summary Sidebar
Throughout all steps, verify the booking summary shows:
- ✅ Package name
- ✅ Selected date range
- ✅ Number of participants
- ✅ Price per person
- ✅ Base price calculation
- ✅ Discount (if group booking)
- ✅ Add-ons price (if selected)
- ✅ Total amount

### 9. Test Navigation Between Steps
1. Complete Step 1 and go to Step 2
2. Click "Back" button
3. ✅ Should return to Step 1 with data preserved
4. Navigate forward again
5. ✅ Data should still be there
6. Test navigation through all steps

### 10. Test Responsive Design
Test on different screen sizes:
- Desktop (1920px+)
- Laptop (1366px)
- Tablet (768px)
- Mobile (375px)

✅ Check:
- Modal fits screen properly
- Calendar displays correctly (2 months on desktop, stacked on mobile)
- Form fields are accessible
- Buttons are clickable
- Text is readable
- No horizontal scrolling

### 11. Test Calendar Features
1. **Fixed Dates Display**
   - ✅ Only open dates with available seats show green ring
   - ✅ Past dates are grayed out and disabled
   - ✅ Unavailable dates cannot be clicked

2. **Date Highlighting**
   - ✅ Selected date shows pink background
   - ✅ Trip duration dates are highlighted
   - ✅ Hover state works

3. **Month Navigation**
   - ✅ Previous/Next buttons work
   - ✅ Month/Year dropdowns work
   - ✅ Calendar updates correctly

### 12. Test Edge Cases

#### No Available Dates
1. Navigate to a package with no available fixed dates
2. ✅ Should show "No Available Dates" message
3. ✅ Should display support message

#### Past Dates
1. Try clicking on past dates
2. ✅ Should be disabled
3. ✅ Cursor should show "not-allowed"

#### Network Errors
1. Disconnect internet
2. Try submitting booking
3. ✅ Should show error toast
4. ✅ Form should not clear

#### Long Package Names
1. Test with very long package names
2. ✅ Text should wrap properly
3. ✅ Layout should not break

## Expected Behavior Summary

### ✅ Modal Functionality
- Opens smoothly with backdrop blur
- Displays on top of all content (z-index: 9999)
- Can be closed with X button
- Scrollable content
- Prevents background scrolling when open

### ✅ Form Validation
- Real-time validation on field change
- Clear error messages
- Required fields marked with *
- Email format validation
- Phone number digit-only validation
- Terms acceptance required

### ✅ Date Selection
- UTC date handling
- Fixed dates matching
- Past date restriction
- Trip duration calculation
- Date range highlighting

### ✅ Price Calculation
- Correct base price per person
- Group discount application
- Add-on price addition
- Total calculation accuracy
- Payment option reflection

### ✅ User Experience
- Smooth transitions
- Loading states during submission
- Success feedback
- Error handling
- Step navigation
- Data persistence

## Common Issues to Check

❌ **Modal Not Opening**
- Check if `showBookingModal` state is being set
- Verify BookingModal import
- Check console for errors

❌ **Form Not Submitting**
- Check network tab for API calls
- Verify all required fields are filled
- Check terms acceptance
- Look for validation errors

❌ **Dates Not Showing**
- Verify package has fixedDates
- Check date format from API
- Verify UTC conversion
- Check status is 'open' and seats available

❌ **Price Not Calculating**
- Check selectedDate exists
- Verify participants number
- Check pax discount data
- Verify add-ons data structure

## Browser Developer Tools Checks

### Console
- No JavaScript errors
- No React warnings
- API calls successful
- State updates logging (if enabled)

### Network Tab
- Booking API endpoint called
- Request payload correct
- Response status 200/201
- Response data valid

### React DevTools
- Component state updates
- Props passed correctly
- No unnecessary re-renders
- Context values correct

## Final Checklist

- [ ] Modal opens from RightBar "Book Now"
- [ ] Modal opens from "Book This Trip" after date selection
- [ ] Modal closes properly
- [ ] Date selection works
- [ ] Calendar navigation functions
- [ ] Form validation works on all steps
- [ ] Add-ons can be selected (if available)
- [ ] Price calculations are accurate
- [ ] Booking can be submitted
- [ ] Success state shows
- [ ] Responsive on all devices
- [ ] No console errors
- [ ] No visual glitches
- [ ] Accessibility works (keyboard nav)
- [ ] Performance is good (no lag)

## Success Criteria

All items in the final checklist should be checked ✅

If any item fails, refer to the "Common Issues to Check" section and the component code for debugging.
