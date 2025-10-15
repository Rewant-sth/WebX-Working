# Timezone Date Shift Fix

## Problem
When selecting a date in the calendar (e.g., day 4), the booking modal would display the previous day (day 3). This is a classic timezone issue where dates are being shifted backward by one day.

## Root Cause

### The Issue
JavaScript Date objects can represent dates in two ways:
1. **Local timezone** - e.g., "Nov 4, 2025 00:00:00" in your timezone
2. **UTC timezone** - e.g., "Nov 4, 2025 00:00:00 UTC"

When converting between these representations, timezone offsets cause dates to shift:

```javascript
// If you're in a timezone behind UTC (e.g., UTC-5)
const date = new Date("2025-11-04T00:00:00.000Z"); // UTC midnight
console.log(date.toDateString()); // "Nov 3, 2025" - WRONG! Off by 1 day
```

### Where It Happened

1. **In DatesAndPrices.tsx:**
   ```typescript
   // BEFORE - caused timezone shift
   const arrivalDate = new Date(date); 
   const departureDate = new Date(matchingFixedDate.endDate);
   ```
   - `new Date(date)` copying an existing Date can cause shifts
   - `new Date(matchingFixedDate.endDate)` parsing UTC string shifts to local time

2. **In booking-store.ts:**
   ```typescript
   // BEFORE - caused timezone shift when reading from localStorage
   parsed.state.arrivalDate = new Date(parsed.state.arrivalDate);
   ```
   - Dates stored as ISO strings in localStorage
   - `new Date(isoString)` interprets as UTC, displays as local

3. **In booking-modal.tsx:**
   ```typescript
   // BEFORE - caused timezone shift
   const dateToSelect = new Date(storeArrivalDate);
   ```
   - Creating date from stored value caused shift

## Solution

### Principle
**Always create dates using year, month, and day components in local timezone:**

```typescript
// ✅ CORRECT - No timezone shift
new Date(year, month, day)

// ❌ WRONG - Can cause timezone shift
new Date(dateString)
new Date(existingDate)
```

### Changes Made

#### 1. Fixed DatesAndPrices.tsx
```typescript
// BEFORE
const arrivalDate = new Date(date);
const departureDate = new Date(matchingFixedDate.endDate);

// AFTER - Extract components, create in local timezone
const arrivalDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());

const endDateObj = new Date(matchingFixedDate.endDate);
const departureDate = new Date(
    endDateObj.getFullYear(), 
    endDateObj.getMonth(), 
    endDateObj.getDate()
);
```

#### 2. Fixed booking-store.ts
```typescript
// BEFORE
if (parsed.state.arrivalDate && typeof parsed.state.arrivalDate === 'string') {
    parsed.state.arrivalDate = new Date(parsed.state.arrivalDate);
}

// AFTER - Parse then recreate in local timezone
if (parsed.state.arrivalDate && typeof parsed.state.arrivalDate === 'string') {
    const dateStr = parsed.state.arrivalDate;
    const date = new Date(dateStr);
    // Create using local timezone components to avoid UTC conversion
    parsed.state.arrivalDate = new Date(
        date.getFullYear(), 
        date.getMonth(), 
        date.getDate()
    );
}
```

#### 3. Fixed booking-modal.tsx
```typescript
// BEFORE
const dateToSelect = new Date(storeArrivalDate);

// AFTER - Recreate in local timezone
const arrivalDateObj = new Date(storeArrivalDate);
const dateToSelect = new Date(
    arrivalDateObj.getFullYear(), 
    arrivalDateObj.getMonth(), 
    arrivalDateObj.getDate()
);
```

## How It Works Now

### Date Flow (Correct)

1. **User selects Nov 4 in calendar:**
   ```typescript
   date = new Date(2025, 10, 4) // Nov 4, 2025 local time
   ```

2. **Store in booking store:**
   ```typescript
   arrivalDate = new Date(2025, 10, 4) // Still Nov 4
   // Saved to localStorage as: "2025-11-04T05:00:00.000Z" (if UTC-5)
   ```

3. **Read from localStorage:**
   ```typescript
   // Retrieve: "2025-11-04T05:00:00.000Z"
   const temp = new Date("2025-11-04T05:00:00.000Z") // Parses as UTC
   // Extract components: year=2025, month=10, day=4
   arrivalDate = new Date(2025, 10, 4) // Recreate as Nov 4 local
   ```

4. **Display in modal:**
   ```typescript
   arrivalDate.toDateString() // "Nov 4, 2025" ✅ CORRECT!
   ```

## Testing

### How to Verify the Fix

1. **Open browser console**
2. **Select a date in DatesAndPrices** (e.g., Nov 15)
3. **Check console logs:**
   ```
   📅 DatesAndPrices: Date selected Fri Nov 15 2025
   ✅ DatesAndPrices: Found matching fixed date
   💾 DatesAndPrices: Stored in booking store
       arrivalDateStr: "Fri Nov 15 2025"
   ```
4. **Click "Book This Trip"**
5. **Check modal console logs:**
   ```
   🔄 BookingModal initialization
   ✅ Using store dates
       arrivalDateStr: "Fri Nov 15 2025"  ← Should match!
   ```
6. **Verify calendar shows Nov 15** (not Nov 14)

### Edge Cases to Test

- **Select date at month boundary** (e.g., Nov 30 → Dec 1)
- **Select date at year boundary** (e.g., Dec 31 → Jan 1)
- **Close and reopen modal** - date should persist
- **Refresh page with modal open** - date should restore correctly

## Key Takeaways

### ✅ DO
- Use `new Date(year, month, day)` for date-only values
- Extract components before storing/recreating dates
- Test in different timezones (change browser timezone)

### ❌ DON'T
- Use `new Date(dateString)` for date-only values
- Use `new Date(existingDate)` without extracting components
- Assume dates will work correctly across timezones

## Files Modified

1. **src/components/intineryBars/DatesAndPrices.tsx**
   - Fixed arrival date creation
   - Fixed departure date creation from endDate
   - Added date string logging for verification

2. **src/store/booking-store.ts**
   - Fixed date deserialization from localStorage
   - Recreates dates using local timezone components
   - Same fix for both arrivalDate and departureDate

3. **src/components/booking-modal.tsx**
   - Fixed date initialization from store
   - Recreates date using local timezone components
   - Added date string logging for verification

## Additional Notes

### Why This Happens
- ISO date strings (from API/localStorage) are in UTC
- JavaScript's `new Date(string)` parses as UTC
- But displays in local timezone
- For users west of UTC (Americas), this shifts date backward
- For users east of UTC (Asia/Australia), this might shift forward

### Prevention
- Always think: "Is this a date-only value or a date-time value?"
- Date-only → use `new Date(year, month, day)`
- Date-time → use ISO strings, but be aware of timezone

### Related Issues
If you see similar problems elsewhere:
- Dates shifting by 1 day
- Dates changing on page reload
- Dates different in API vs UI
→ Apply the same fix: extract components, recreate in local timezone
