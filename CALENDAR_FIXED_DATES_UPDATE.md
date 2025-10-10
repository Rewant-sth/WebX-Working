# Calendar Fixed Dates Selection Update

## Summary
Updated the calendar component to only allow users to select dates that are defined in the `fixedDates` array. The selected fixed date ID is now properly stored and passed to the booking page.

## Changes Made

### 1. Booking Store (`src/store/booking-store.ts`)
- Added `selectedFixedDateId` state to store the selected fixed date ID
- Added `setSelectedFixedDateId` action to update the selected date ID
- Added `getSelectedFixedDateId` utility function for direct access
- Updated `removePackage` to also clear the selected date ID

### 2. DatesAndPrices Component (`src/components/intineryBars/DatesAndPrices.tsx`)

#### Calendar Component Updates:
- Added `fixedDates` prop to `CalendarProps` interface
- Created `isFixedDateStart()` helper function to check if a date is a valid fixed departure date
- Updated date rendering logic to:
  - Only allow clicking on dates that match fixed departure dates
  - Disable dates that are not fixed departure dates
  - Add a green ring indicator to valid fixed dates
- Updated hover logic to only work on valid fixed dates

#### Main Component Updates:
- Imported `setSelectedFixedDateId` from booking store
- Updated `handleDateSelect` to find and store the matching fixed date ID when a date is selected
- Passed `fixedDates` prop to both Calendar components
- Added legend to explain available vs non-available dates
- Updated description text to explain that only certain dates are selectable

### 3. Booking Page (`src/app/booking/[id]/page.tsx`)
- Imported `getSelectedFixedDateId` from booking store
- Retrieved stored fixed date ID using `storedFixedDateId`
- Updated the `useEffect` that handles package data to:
  - Check if a fixed date ID was stored from the calendar selection
  - Use that stored date if available, otherwise fallback to first date
  - Pre-select the correct fixed date in the booking form
- Fixed duplicate className warning

## User Experience Flow

1. **Calendar Selection**: 
   - Users see calendars with dates marked by a green ring (available fixed dates)
   - Only these marked dates are clickable
   - Other dates are disabled and grayed out
   - Hovering over available dates shows the trip duration

2. **Date Selection**:
   - When user clicks an available date, it's highlighted in orange
   - The trip duration is displayed across the calendar
   - The fixed date ID is stored in the booking store
   - User clicks "Book This Trip" button

3. **Booking Page**:
   - Booking page loads with the pre-selected fixed date
   - Arrival and departure dates are automatically filled
   - Price is set according to the selected fixed date
   - All form fields are ready for the user to complete their booking

## Visual Indicators

- **Green Ring**: Available fixed departure dates (clickable)
- **Orange Fill**: Selected start date
- **Orange Light Fill**: Trip duration days
- **Grayed Out**: Past dates or non-fixed dates (not clickable)
- **Gray Line**: Past dates crossed out

## Technical Notes

- Fixed dates are identified by matching the start date (day, month, year)
- The `id` field from `IFixedDate` is used (not `_id`)
- State is persisted in localStorage via Zustand's persist middleware
- The booking form validates that the selected date has available seats
