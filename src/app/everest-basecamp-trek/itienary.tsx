import { Cpu, Fingerprint, Pencil, Settings2, Sparkles, Zap } from 'lucide-react'

export function Itinerary() {
    const data = [
        { day: 1, route: "Kathmandu to Lukla Flight → Phakding", altitude: "2,610m", duration: "4 hours" },
        { day: 2, route: "Phakding → Namche Bazaar", altitude: "3,400m", duration: "5:30-6:30 hours" },
        { day: 3, route: "Acclimatization day in Namche Bazaar", altitude: "3,400m", duration: "Rest day" },
        { day: 4, route: "Namche Bazaar → Phangboche", altitude: "3,985m", duration: "6-7 hours" },
        { day: 5, route: "Pangboche → Dingboche", altitude: "4,360m", duration: "5 hours" },
        { day: 6, route: "Acclimatization in Dingboche", altitude: "4,360m", duration: "Rest day" },
        { day: 7, route: "Dingboche → Lobuche", altitude: "4,950m", duration: "6 hours" },
        { day: 8, route: "Lobuche → Gorakhshep → EBC", altitude: "5,364m", duration: "6 hours total" },
        { day: 9, route: "Gorakhshep → Kalapathar → Pheriche", altitude: "4,288m", duration: "7 hours" },
        { day: 10, route: "Pheriche → Namche", altitude: "3,400m", duration: "6 hours" },
        { day: 11, route: "Namche → Lukla", altitude: "2,800m", duration: "7-8 hours" },
        { day: 12, route: "Lukla → Kathmandu Flight", altitude: "1,400m", duration: "40 minutes" }
    ]
    return (
        <section className="py-12 md:py-20">
            <div className="mx-auto max-w-5xl space-y-8 px-6 md:space-y-16">
                <div className="relative z-10 mx-auto max-w-xl space-y-6 text-center md:space-y-12">
                    <h2 className="text-balance text-4xl font-medium lg:text-5xl">The foundation for creative teams management</h2>
                    <p>Lyra is evolving to be more than just the models. It supports an entire to the APIs and platforms helping developers and businesses innovate.</p>
                </div>

                <div className="relative mx-auto grid max-w-2xl lg:max-w-4xl divide-x divide-y border *:p-12 sm:grid-cols-2 lg:grid-cols-3">
                    {
                        data?.map((dat, idx) => (
                            <div key={idx} className="space-y-3">
                                <div className="flex items-center gap-2">
                                    <span>{dat.day}</span>
                                    <h3 className="text-sm font-medium"></h3>
                                </div>
                                <p className="text-sm">{dat.route}</p>
                            </div>
                        ))
                    }

                </div>
            </div>
        </section>
    )
}