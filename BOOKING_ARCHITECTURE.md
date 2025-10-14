# Booking System - Visual Architecture

## 📐 System Architecture Diagram

```
┌──────────────────────────────────────────────────────────────────┐
│                        USER INTERFACE                             │
├──────────────────────────────────────────────────────────────────┤
│                                                                   │
│  ┌────────────────┐  ┌────────────────┐  ┌────────────────┐    │
│  │  Package List  │  │ Related Trips  │  │  Home Page     │    │
│  │     Page       │  │   Component    │  │   (Future)     │    │
│  └───────┬────────┘  └───────┬────────┘  └───────┬────────┘    │
│          │                   │                    │              │
│          │  "Book Now"       │  "Book Now"        │              │
│          └───────────────────┴────────────────────┘              │
│                              │                                    │
└──────────────────────────────┼────────────────────────────────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │   useBooking Hook    │
                    │  bookPackage(pkg)    │
                    └──────────┬───────────┘
                               │
                               ▼
         ┌─────────────────────────────────────────┐
         │      ZUSTAND STORE (Persistent)         │
         ├─────────────────────────────────────────┤
         │  - package: ITravelPackage              │
         │  - selectedFixedDateId: string          │
         │  - isBookingModalOpen: boolean          │
         │  - redirectToItinerary: boolean         │
         ├─────────────────────────────────────────┤
         │  Actions:                               │
         │  - openBookingModal(pkg, dateId)        │
         │  - clearBookingData()                   │
         │  - setPackage(pkg)                      │
         │  - setSelectedFixedDateId(id)           │
         └──────────┬──────────────────────────────┘
                    │
                    ├─────────────────┐
                    │                 │
                    ▼                 ▼
         ┌──────────────────┐  ┌─────────────┐
         │   LocalStorage   │  │  Navigation │
         │  (Persistence)   │  │   Router    │
         └──────────────────┘  └──────┬──────┘
                                      │
                                      ▼
                          ┌──────────────────────┐
                          │  Itinerary Page      │
                          │  /itinerary/[slug]   │
                          └──────────┬───────────┘
                                     │
                  ┌──────────────────┴──────────────────┐
                  │                                     │
                  ▼                                     ▼
         ┌────────────────┐                   ┌────────────────┐
         │ Detect Store   │                   │ Show Package   │
         │ State on Mount │                   │    Details     │
         └────────┬───────┘                   └────────────────┘
                  │
                  │ if (storePackage && isOpen)
                  │
                  ▼
         ┌────────────────────┐
         │  Booking Modal     │
         │  (Auto-opened)     │
         ├────────────────────┤
         │  Pre-filled with:  │
         │  - Package data    │
         │  - Selected date   │
         └────────┬───────────┘
                  │
                  │ On Submit or Close
                  │
                  ▼
         ┌────────────────────┐
         │ clearBookingData() │
         │  - package = null  │
         │  - dateId = null   │
         │  - modal = false   │
         └────────────────────┘
```

## 🔄 Data Flow Sequence

```
STEP 1: User Action
┌─────────────────┐
│ User clicks     │
│ "Book Now"      │
│ on ANY page     │
└────────┬────────┘
         │
         ▼

STEP 2: Hook Invocation
┌─────────────────────────┐
│ useBooking hook called  │
│ bookPackage(pkg, dateId)│
└────────┬────────────────┘
         │
         ▼

STEP 3: Store Update
┌──────────────────────────────┐
│ Zustand Store Updated:       │
│ - package ← pkg              │
│ - selectedFixedDateId ← id   │
│ - isBookingModalOpen ← true  │
└────────┬─────────────────────┘
         │
         ├─────────────────┐
         │                 │
         ▼                 ▼
┌────────────────┐  ┌──────────────────┐
│ Save to        │  │ Trigger          │
│ LocalStorage   │  │ Navigation       │
└────────────────┘  └──────┬───────────┘
                           │
                           ▼

STEP 4: Navigation
┌─────────────────────────────┐
│ Router navigates to:        │
│ /itinerary/[package-slug]   │
└────────┬────────────────────┘
         │
         ▼

STEP 5: Page Load & Detection
┌────────────────────────────────┐
│ Itinerary page mounts          │
│ useEffect detects:             │
│ - storePackage exists          │
│ - isBookingModalOpen === true  │
└────────┬───────────────────────┘
         │
         ▼

STEP 6: Modal Display
┌─────────────────────────────┐
│ Booking Modal renders with: │
│ - Package data from store   │
│ - Selected date from store  │
│ - All fields pre-populated  │
└────────┬────────────────────┘
         │
         ▼

STEP 7: User Action (Complete/Close)
┌──────────────────────┐
│ User either:         │
│ A) Completes booking │
│ B) Closes modal      │
└────────┬─────────────┘
         │
         ▼

STEP 8: Cleanup
┌──────────────────────────┐
│ clearBookingData() called│
│ - All store fields reset │
│ - LocalStorage cleared   │
│ - Modal closed           │
└──────────────────────────┘
```

## 🗂️ File Structure

```
real-himalaya/
│
├── src/
│   ├── store/
│   │   └── booking-store.ts          ⭐ Core state management
│   │
│   ├── hooks/
│   │   └── useBooking.ts              ⭐ Easy-to-use hook
│   │
│   ├── lib/
│   │   └── bookingUtils.ts            🔧 Helper functions
│   │
│   ├── components/
│   │   ├── booking-modal.tsx          📝 Booking form
│   │   └── tripGlance/
│   │       └── RelatedTrips.tsx       🔗 Uses booking
│   │
│   └── app/
│       ├── itinerary/[slug]/
│       │   └── page.tsx               🏠 Main booking page
│       │
│       └── package-list/[slug]/
│           └── page.tsx               📋 Package listings
│
└── Documentation/
    ├── BOOKING_SYSTEM.md              📖 Complete docs
    ├── BOOKING_QUICK_START.md         🚀 Quick guide
    ├── BOOKING_EXAMPLES.md            💡 Code examples
    ├── BOOKING_IMPLEMENTATION_SUMMARY.md  📊 Summary
    └── BOOKING_ARCHITECTURE.md        📐 This file
```

## 🎨 Component Interaction Map

```
                    ┌─────────────────────┐
                    │   Any Component     │
                    │   with Package Data │
                    └──────────┬──────────┘
                               │
                               │ import { useBooking }
                               │
                               ▼
              ┌────────────────────────────────┐
              │       useBooking Hook          │
              ├────────────────────────────────┤
              │ • bookPackage(pkg, id, nav)    │
              │ • closeBooking()               │
              │ • isBookingModalOpen           │
              └────────┬───────────────────────┘
                       │
                       │ calls
                       │
                       ▼
         ┌─────────────────────────────────────┐
         │      Zustand Booking Store          │
         ├─────────────────────────────────────┤
         │ State:                              │
         │  - package                          │
         │  - selectedFixedDateId              │
         │  - isBookingModalOpen               │
         │  - redirectToItinerary              │
         ├─────────────────────────────────────┤
         │ Actions:                            │
         │  - openBookingModal()               │
         │  - clearBookingData()               │
         │  - setPackage()                     │
         │  - setSelectedFixedDateId()         │
         │  - setIsBookingModalOpen()          │
         └────────┬────────────────────────────┘
                  │
                  │ persists to
                  │
                  ▼
         ┌────────────────────┐
         │   LocalStorage     │
         │  "travel-package-  │
         │   storage"         │
         └────────────────────┘
```

## 🔐 State Management Pattern

```
┌─────────────────────────────────────────────────────────┐
│                  BOOKING STATE LIFECYCLE                 │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  INITIAL STATE (Empty)                                   │
│  ┌──────────────────────────────┐                       │
│  │ package: null                │                       │
│  │ selectedFixedDateId: null    │                       │
│  │ isBookingModalOpen: false    │                       │
│  │ redirectToItinerary: false   │                       │
│  └──────────────────────────────┘                       │
│              │                                           │
│              │ openBookingModal(pkg, dateId)            │
│              ▼                                           │
│  ACTIVE STATE (Booking in Progress)                      │
│  ┌──────────────────────────────┐                       │
│  │ package: {...packageData}    │                       │
│  │ selectedFixedDateId: "123"   │                       │
│  │ isBookingModalOpen: true     │                       │
│  │ redirectToItinerary: false   │                       │
│  └──────────────────────────────┘                       │
│              │                                           │
│              │ clearBookingData()                        │
│              ▼                                           │
│  FINAL STATE (Cleared)                                   │
│  ┌──────────────────────────────┐                       │
│  │ package: null                │                       │
│  │ selectedFixedDateId: null    │                       │
│  │ isBookingModalOpen: false    │                       │
│  │ redirectToItinerary: false   │                       │
│  └──────────────────────────────┘                       │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

## 🎯 Integration Points

```
╔══════════════════════════════════════════════════════════╗
║                  BOOKING INTEGRATION                      ║
╠══════════════════════════════════════════════════════════╣
║                                                           ║
║  External Pages/Components                                ║
║  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐   ║
║  │ Package List │  │Related Trips │  │ Search Page  │   ║
║  │    Page      │  │  Component   │  │   (Future)   │   ║
║  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘   ║
║         │                 │                  │            ║
║         └─────────────────┴──────────────────┘            ║
║                           │                               ║
║                           ▼                               ║
║              ┌────────────────────────┐                   ║
║              │   useBooking Hook      │                   ║
║              │   (Integration Layer)  │                   ║
║              └────────────┬───────────┘                   ║
║                           │                               ║
║                           ▼                               ║
║              ┌────────────────────────┐                   ║
║              │  Zustand Store (Core)  │                   ║
║              └────────────┬───────────┘                   ║
║                           │                               ║
║                           ▼                               ║
║              ┌────────────────────────┐                   ║
║              │   Itinerary Page       │                   ║
║              │   (Booking Renderer)   │                   ║
║              └────────────┬───────────┘                   ║
║                           │                               ║
║                           ▼                               ║
║              ┌────────────────────────┐                   ║
║              │   Booking Modal        │                   ║
║              │   (Form & Submission)  │                   ║
║              └────────────────────────┘                   ║
║                                                           ║
╚══════════════════════════════════════════════════════════╝
```

---

**Visual Guide Version**: 1.0  
**Last Updated**: 2025-10-14
