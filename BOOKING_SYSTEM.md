# Booking System Documentation

## Overview

The booking system uses **Zustand** for persistent state management, allowing users to book packages from any page in the application. The system automatically redirects to the itinerary page and opens the booking modal with pre-filled package data.

## Architecture

### Store (`src/store/booking-store.ts`)

The booking store is a persistent Zustand store that maintains:

- `package`: The selected package data
- `selectedFixedDateId`: The selected date ID for the package
- `isBookingModalOpen`: Boolean flag for modal visibility
- `redirectToItinerary`: Flag to indicate if redirection is needed

#### Key Actions:

```typescript
// Set individual values
setPackage(pkg: ITravelPackage)
setSelectedFixedDateId(dateId: string | null)
setIsBookingModalOpen(isOpen: boolean)

// Combined action to open booking modal
openBookingModal(pkg: ITravelPackage, dateId?: string | null)

// Clear all booking data
clearBookingData()
```

### Custom Hook (`src/hooks/useBooking.ts`)

A convenient hook that wraps the store functionality:

```typescript
const { bookPackage, closeBooking, isBookingModalOpen } = useBooking();

// Book a package and navigate to itinerary
bookPackage(packageData, dateId, navigateToItinerary);

// Close booking modal and clear data
closeBooking();
```

## Usage Examples

### 1. From Package List Page

```typescript
import { useBooking } from '@/hooks/useBooking';

const PackageCard = ({ card }) => {
  const { bookPackage } = useBooking();

  return (
    <button onClick={() => bookPackage(card, card.fixedDates?.[0]?._id)}>
      Book Now
    </button>
  );
};
```

### 2. From Related Trips Component

```typescript
const RelatedTrips = () => {
  const { bookPackage } = useBooking();

  const handleBookNow = (trip: ITravelPackage) => {
    bookPackage(trip, trip.fixedDates?.[0]?._id);
  };

  return (
    <button onClick={() => handleBookNow(trip)}>Book Now</button>
  );
};
```

### 3. On Itinerary Page

```typescript
const ItineraryPage = () => {
  const { isBookingModalOpen, closeBooking, openBookingModal } = useBookingStore();
  const storePackage = useBookingStore((state) => state.package);

  // Open modal for current page package
  const handleOpenBooking = () => {
    if (packageData?.data) {
      openBookingModal(packageData.data, packageData.data.fixedDates?.[0]?._id);
    }
  };

  // Close modal and clear store
  const handleCloseBooking = () => {
    closeBooking();
  };

  return (
    <>
      <button onClick={handleOpenBooking}>Book This Trip</button>
      
      {isBookingModalOpen && (
        <BookingModal 
          packageData={storePackage || packageData?.data} 
          onClose={handleCloseBooking}
        />
      )}
    </>
  );
};
```

## Booking Modal Integration

The `BookingModal` component automatically clears the store on:
- Modal close (user clicks close button)
- Successful booking submission

```typescript
export default function BookingModal({ packageData, onClose }) {
  const clearBookingData = useBookingStore((state) => state.clearBookingData);

  const bookingMutation = useMutation({
    onSuccess: () => {
      toast.success('Booking successful!');
      clearBookingData(); // Clear store on success
      onClose();
    },
  });

  // Handle close
  const handleClose = () => {
    clearBookingData(); // Clear store on close
    onClose();
  };

  return (
    <div>
      {/* Modal content */}
      <button onClick={handleClose}>Close</button>
    </div>
  );
}
```

## Flow Diagram

```
┌─────────────────────┐
│  Any Page           │
│  (Package List,     │
│   Related Trips,    │
│   Home, etc.)       │
└──────────┬──────────┘
           │
           │ User clicks "Book Now"
           │
           ▼
┌─────────────────────┐
│  useBooking Hook    │
│  or Store Actions   │
└──────────┬──────────┘
           │
           │ 1. Store package data
           │ 2. Set modal open = true
           │ 3. Navigate to itinerary
           │
           ▼
┌─────────────────────┐
│  Itinerary Page     │
│  /itinerary/[slug]  │
└──────────┬──────────┘
           │
           │ Detects store state
           │ Opens booking modal
           │
           ▼
┌─────────────────────┐
│  Booking Modal      │
│  (Pre-filled data)  │
└──────────┬──────────┘
           │
           │ On close or success
           │
           ▼
┌─────────────────────┐
│  clearBookingData() │
│  Reset store        │
└─────────────────────┘
```

## Persistence

The store uses **localStorage** for persistence via Zustand's `persist` middleware:

- **Storage Key**: `travel-package-storage`
- **Persisted Data**: All store state (package, selectedFixedDateId, isBookingModalOpen)
- **Benefits**: 
  - Survives page refreshes
  - Maintains state across navigation
  - Automatically syncs across tabs

## Best Practices

1. **Always use `clearBookingData()`** when closing the modal or after successful booking
2. **Use the `useBooking` hook** for consistency across the app
3. **Provide a fallback** when rendering the modal: `storePackage || localPackageData`
4. **Handle navigation carefully** - the hook navigates by default, but you can disable it
5. **Check for package data** before opening the modal to avoid errors

## Troubleshooting

### Modal doesn't open after navigation
- Ensure `isBookingModalOpen` is checked on the itinerary page
- Verify store state with React DevTools

### Data not persisting
- Check localStorage for `travel-package-storage` key
- Ensure localStorage is not blocked (private browsing mode)

### Modal shows old data
- Ensure `clearBookingData()` is called on close
- Check if multiple sources are setting package data

## Migration from Old System

If you have existing booking functionality:

1. **Replace local state** with store state:
   ```typescript
   // Old
   const [bookingPackage, setBookingPackage] = useState(null);
   
   // New
   const storePackage = useBookingStore((state) => state.package);
   ```

2. **Replace modal open/close** with store actions:
   ```typescript
   // Old
   setShowBookingModal(true);
   
   // New
   openBookingModal(packageData, dateId);
   ```

3. **Use the custom hook** for new components:
   ```typescript
   const { bookPackage, closeBooking } = useBooking();
   ```

## Future Enhancements

- [ ] Add booking history to store
- [ ] Implement multi-step booking progress saving
- [ ] Add analytics tracking for booking funnel
- [ ] Support for multiple package bookings (cart system)
