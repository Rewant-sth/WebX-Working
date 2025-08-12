import { NextResponse } from "next/server";

// NOTE: Replace this stub with TripAdvisor API integration or a server-side fetch
// via a proxy service. TripAdvisor's official API access is restricted; you may
// need an affiliate/partner key. Alternatively, manually curate recent reviews
// in a CMS and serve them here.

export async function GET() {
    const mock = [
        {
            id: "t1",
            author: "Lena Müller",
            rating: 5,
            text: "Absolutely stunning scenery. Professional staff and seamless logistics.",
            source: "tripadvisor" as const,
            time: new Date(Date.now() - 86400000 * 1).toISOString(),
            avatarUrl: "/one.jpg",
            url: "https://www.tripadvisor.com",
        },
        {
            id: "t2",
            author: "David K",
            rating: 5,
            text: "Our guide went above and beyond. Highly recommend!",
            source: "tripadvisor" as const,
            time: new Date(Date.now() - 86400000 * 6).toISOString(),
            avatarUrl: "/one.jpg",
            url: "https://www.tripadvisor.com",
        },
        {
            id: "t3",
            author: "Priya R",
            rating: 4,
            text: "Beautiful trek, wish we had one extra acclimatization day but still great.",
            source: "tripadvisor" as const,
            time: new Date(Date.now() - 86400000 * 11).toISOString(),
            avatarUrl: "/one.jpg",
            url: "https://www.tripadvisor.com",
        }
    ];

    return NextResponse.json(mock, { status: 200 });
}
