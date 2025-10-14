# Booking System - Quick Start Guide

## 🚀 For Developers: Add Booking in 3 Steps

### Step 1: Import the Hook
```typescript
import { useBooking } from '@/hooks/useBooking';
```

### Step 2: Use in Your Component
```typescript
const { bookPackage } = useBooking();
```

### Step 3: Call on Button Click
```typescript
<button onClick={() => bookPackage(packageData)}>
  Book Now
</button>
```

**That's it!** The system will:
- ✅ Save package data to store
- ✅ Redirect to itinerary page
- ✅ Open booking modal automatically
- ✅ Clear data when done

---

## 📋 Common Use Cases

### Use Case 1: Simple Book Button
```typescript
import { useBooking } from '@/hooks/useBooking';

function PackageCard({ pkg }) {
  const { bookPackage } = useBooking();
  
  return (
    <button onClick={() => bookPackage(pkg)}>
      Book Now
    </button>
  );
}
```

### Use Case 2: Book with Specific Date
```typescript
import { useBooking } from '@/hooks/useBooking';

function DateSelector({ pkg, selectedDateId }) {
  const { bookPackage } = useBooking();
  
  return (
    <button onClick={() => bookPackage(pkg, selectedDateId)}>
      Book This Date
    </button>
  );
}
```

### Use Case 3: Book on Same Page (No Redirect)
```typescript
import { useBooking } from '@/hooks/useBooking';

function QuickBook({ pkg }) {
  const { bookPackage } = useBooking();
  
  return (
    <button onClick={() => bookPackage(pkg, null, false)}>
      Quick Book
    </button>
  );
}
```

### Use Case 4: Check if Bookable
```typescript
import { useBooking } from '@/hooks/useBooking';
import { isBookingDisabled } from '@/lib/bookingUtils';

function SmartBookButton({ pkg }) {
  const { bookPackage } = useBooking();
  const disabled = isBookingDisabled(pkg);
  
  return (
    <button 
      onClick={() => bookPackage(pkg)}
      disabled={disabled}
    >
      {disabled ? 'Not Available' : 'Book Now'}
    </button>
  );
}
```

---

## 🎯 Key Points

### ✅ DO:
- Use `useBooking()` hook for all booking actions
- Let the system handle navigation and modal state
- Trust that data will be cleared automatically

### ❌ DON'T:
- Manually manage modal open/close state
- Use local state for package data across pages
- Forget to import from `@/hooks/useBooking`

---

## 🔍 Debugging

### Check Store State
```typescript
import { useBookingStore } from '@/store/booking-store';

// In your component
const storeState = useBookingStore.getState();
console.log('Store:', storeState);
```

### Check LocalStorage
```javascript
// In browser console
console.log(localStorage.getItem('travel-package-storage'));
```

### Clear Store Manually
```javascript
// In browser console
localStorage.removeItem('travel-package-storage');
```

---

## 📚 More Information

- **Complete Documentation**: See `BOOKING_SYSTEM.md`
- **Code Examples**: See `BOOKING_EXAMPLES.md`
- **Implementation Details**: See `BOOKING_IMPLEMENTATION_SUMMARY.md`

---

**Happy Coding! 🎉**
