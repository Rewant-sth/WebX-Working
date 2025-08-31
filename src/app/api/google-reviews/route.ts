import { NextResponse } from "next/server";

// NOTE: Replace this stub with a secure server-side fetch to Google Places API.
// You will need: Place ID + API key stored in env (e.g., GOOGLE_PLACES_API_KEY).
// Keep API keys ONLY on the server. Avoid exposing them to the client.
// Example endpoint: https://maps.googleapis.com/maps/api/place/details/json?place_id=...&fields=reviews,rating,user_ratings_total&key=KEY

export async function GET() {
    // Placeholder mocked data for development.
    const mock = [
        {
            id: "g1",
            author: "Alex Johnson",
            rating: 5,
            text: "Fantastic experience! The guides were knowledgeable and the trek was unforgettable.",
            source: "google" as const,
            time: new Date(Date.now() - 86400000 * 2).toISOString(),
            avatarUrl: "/one.jpg",
            url: "https://maps.google.com",
        },
        {
            id: "g2",
            author: "Maria S",
            rating: 5,
            text: "Loved every moment. Well organized and very friendly team.",
            source: "google" as const,
            time: new Date(Date.now() - 86400000 * 5).toISOString(),
            avatarUrl: "/one.jpg",
            url: "https://maps.google.com",
        },
        {
            id: "g3",
            author: "Chris P",
            rating: 4,
            text: "Great trek. Slight delay on one day but overall superb.",
            source: "google" as const,
            time: new Date(Date.now() - 86400000 * 9).toISOString(),
            avatarUrl: "/one.jpg",
            url: "https://maps.google.com",
        }
    ];

    return NextResponse.json(mock, { status: 200 });
}
