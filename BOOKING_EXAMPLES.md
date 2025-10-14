/**
 * BOOKING SYSTEM - QUICK REFERENCE GUIDE
 * 
 * This file contains practical examples for implementing the booking system
 * across different components in the application.
 */

// ============================================================================
// EXAMPLE 1: Simple "Book Now" Button (Recommended Approach)
// ============================================================================

import { useBooking } from '@/hooks/useBooking';
import { ITravelPackage } from '@/types/IPackages';

export function SimpleBookingExample({ packageData }: { packageData: ITravelPackage }) {
  const { bookPackage } = useBooking();

  return (
    <button onClick={() => bookPackage(packageData)}>
      Book Now
    </button>
  );
}

// ============================================================================
// EXAMPLE 2: Book Now with Specific Date
// ============================================================================

export function BookingWithDateExample({ packageData }: { packageData: ITravelPackage }) {
  const { bookPackage } = useBooking();
  const selectedDateId = packageData.fixedDates?.[0]?._id;

  return (
    <button onClick={() => bookPackage(packageData, selectedDateId)}>
      Book This Date
    </button>
  );
}

// ============================================================================
// EXAMPLE 3: Book Without Navigation (Open Modal on Same Page)
// ============================================================================

export function SamePageBookingExample({ packageData }: { packageData: ITravelPackage }) {
  const { bookPackage } = useBooking();

  const handleBook = () => {
    // Third parameter = false prevents navigation
    bookPackage(packageData, null, false);
  };

  return (
    <button onClick={handleBook}>
      Book on This Page
    </button>
  );
}

// ============================================================================
// EXAMPLE 4: Using Store Directly (Advanced)
// ============================================================================

import { useBookingStore } from '@/store/booking-store';

export function DirectStoreExample({ packageData }: { packageData: ITravelPackage }) {
  const { openBookingModal } = useBookingStore();
  const router = useRouter();

  const handleBook = () => {
    openBookingModal(packageData, packageData.fixedDates?.[0]?._id);
    router.push(`/itinerary/${packageData.slug}`);
  };

  return (
    <button onClick={handleBook}>
      Book Now
    </button>
  );
}

// ============================================================================
// EXAMPLE 5: Itinerary Page Integration
// ============================================================================

export function ItineraryPageExample() {
  const { 
    isBookingModalOpen, 
    package: storePackage, 
    clearBookingData,
    openBookingModal 
  } = useBookingStore();

  // Get package data from API
  const { data: packageData } = useQuery({
    queryKey: ["packageById"],
    queryFn: () => getPackagesById(slug),
  });

  // Open modal when user clicks book button
  const handleOpenBooking = () => {
    if (packageData?.data) {
      openBookingModal(packageData.data, packageData.data.fixedDates?.[0]?._id);
    }
  };

  // Close modal and clear store
  const handleCloseBooking = () => {
    clearBookingData();
  };

  // Auto-open modal if redirected from another page
  useEffect(() => {
    if (storePackage && isBookingModalOpen) {
      // Scroll to booking section
      document.getElementById('date-and-price')?.scrollIntoView({ 
        behavior: 'smooth' 
      });
    }
  }, [storePackage, isBookingModalOpen]);

  return (
    <>
      <button onClick={handleOpenBooking}>Book This Trip</button>
      
      {isBookingModalOpen && (storePackage || packageData?.data) && (
        <BookingModal 
          packageData={(storePackage || packageData?.data) as ITravelPackage}
          onClose={handleCloseBooking}
        />
      )}
    </>
  );
}

// ============================================================================
// EXAMPLE 6: Package Card Component
// ============================================================================

export function PackageCardExample({ pkg }: { pkg: ITravelPackage }) {
  const { bookPackage } = useBooking();
  const router = useRouter();

  return (
    <div className="package-card">
      <h3>{pkg.name}</h3>
      <p>{pkg.overview}</p>
      
      <div className="actions">
        {/* Book Now - Redirects to itinerary and opens modal */}
        <button onClick={() => bookPackage(pkg)}>
          Book Now
        </button>
        
        {/* View Details - Just navigates to itinerary */}
        <button onClick={() => router.push(`/itinerary/${pkg.slug}`)}>
          View Details
        </button>
      </div>
    </div>
  );
}

// ============================================================================
// EXAMPLE 7: Booking Modal Component Integration
// ============================================================================

import { useBookingStore } from '@/store/booking-store';

export function BookingModalExample({ packageData, onClose }: BookingModalProps) {
  const clearBookingData = useBookingStore((state) => state.clearBookingData);

  // Handle booking submission
  const bookingMutation = useMutation({
    mutationFn: submitBooking,
    onSuccess: () => {
      toast.success('Booking successful!');
      clearBookingData(); // ✅ Clear store on success
      onClose();
    },
  });

  // Handle modal close
  const handleClose = () => {
    clearBookingData(); // ✅ Clear store on close
    onClose();
  };

  return (
    <div className="booking-modal">
      {/* Modal content */}
      <button onClick={handleClose}>Close</button>
      <button onClick={() => bookingMutation.mutate(data)}>
        Submit Booking
      </button>
    </div>
  );
}

// ============================================================================
// EXAMPLE 8: Related Trips Component
// ============================================================================

export function RelatedTripsExample({ trips }: { trips: ITravelPackage[] }) {
  const { bookPackage } = useBooking();

  return (
    <div className="related-trips">
      {trips.map((trip) => (
        <div key={trip._id} className="trip-card">
          <h4>{trip.name}</h4>
          <button onClick={() => bookPackage(trip)}>
            Book Now
          </button>
          <Link href={`/itinerary/${trip.slug}`}>
            View Details
          </Link>
        </div>
      ))}
    </div>
  );
}

// ============================================================================
// COMMON PATTERNS
// ============================================================================

/**
 * PATTERN 1: Book from anywhere in the app
 * - Import useBooking hook
 * - Call bookPackage(packageData)
 * - Automatically redirects and opens modal
 */

/**
 * PATTERN 2: Clear booking data
 * - Always call clearBookingData() when:
 *   1. User closes the modal
 *   2. Booking is successful
 *   3. User navigates away from booking flow
 */

/**
 * PATTERN 3: Fallback for package data
 * - Use: storePackage || localPackageData
 * - Ensures modal shows data even if store is cleared
 */

/**
 * PATTERN 4: Auto-scroll on redirect
 * - Detect storePackage && isBookingModalOpen
 * - Scroll to relevant section
 * - Improves user experience
 */

// ============================================================================
// DEBUGGING TIPS
// ============================================================================

/**
 * 1. Check localStorage:
 *    - Key: 'travel-package-storage'
 *    - Should contain package data when modal is open
 * 
 * 2. Use React DevTools:
 *    - Check Zustand store state
 *    - Verify isBookingModalOpen is true
 * 
 * 3. Console log store state:
 *    const storeState = useBookingStore.getState();
 *    console.log(storeState);
 * 
 * 4. Clear stuck state:
 *    localStorage.removeItem('travel-package-storage');
 */
