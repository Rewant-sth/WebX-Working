import { Skeleton } from "@/components/ui/skeleton";

export default function TeamMemberSkeleton() {
    return (
        <div className="mb-20 space-y-6 w-full lg:space-y-16 xl:space-y-20">
            {/* Hero Image Skeleton */}
            <div className="h-[60dvh] relative w-full">
                <Skeleton className="w-full h-full rounded-sm" />
            </div>

            <div className="grid px-4 max-w-7xl mx-auto gap-4 lg:gap-10 text-center">
                {/* About Section Skeleton */}
                <div className="space-y-4">
                    {/* Title - "About [Name]" */}
                    <Skeleton className="h-6 lg:h-8 w-64 lg:w-80 mx-auto mb-4" />

                    {/* Description paragraphs - matching prose layout */}
                    <div className="space-y-4 max-w-4xl mx-auto">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-4/5 mx-auto" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-3/4 mx-auto" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-2/3 mx-auto" />
                    </div>
                </div>

                {/* Social Media Section Skeleton */}
                <div className="max-w-7xl mx-auto text-center px-4 space-y-4">
                    {/* Follow text - "Follow [Name] on" */}
                    <Skeleton className="h-5 lg:h-6 w-48 lg:w-56 mx-auto" />

                    {/* Social buttons - matching the responsive grid */}
                    <div className="flex gap-4 justify-center items-center flex-wrap">
                        {/* Twitter */}
                        <Skeleton className="h-9 lg:h-10 w-20 lg:w-24 rounded-sm" />
                        {/* Facebook */}
                        <Skeleton className="h-9 lg:h-10 w-24 lg:w-28 rounded-sm" />
                        {/* LinkedIn */}
                        <Skeleton className="h-9 lg:h-10 w-22 lg:w-26 rounded-sm" />
                        {/* WhatsApp */}
                        <Skeleton className="h-9 lg:h-10 w-24 lg:w-28 rounded-sm" />
                    </div>
                </div>

                {/* Gallery Section Skeleton */}
                <div className="rounded-sm space-y-4 h-fit">
                    {/* Gallery title - "Gallery of [Name]" */}
                    <Skeleton className="h-6 lg:h-8 w-72 lg:w-96 mx-auto mb-4" />

                    {/* Gallery grid - matching responsive design */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {Array.from({ length: 6 }).map((_, index) => (
                            <div key={index} className="w-full relative aspect-square">
                                <Skeleton className="w-full h-full rounded-sm" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}