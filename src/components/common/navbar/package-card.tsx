import { ITravelPackage } from "@/types/IPackages";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

// Package Card Component
export const PackageCard: React.FC<{
    package: ITravelPackage;
    onClose: () => void;
}> = ({ package: pkg, onClose }) => (
    <Link href={`/itinerary/${pkg.slug}`} onClick={onClose}>
        <li className="bg-gray-100/50  rounded-2xl hover:bg-gray-100 cursor-pointer transition-transform duration-75">
            {/* <div className="flex items-center px-2 py-2 gap-4 relative">
                <div className="h-24 w-32 lg:w-36 aspect-square flex-shrink-0 overflow-hidden rounded-sm bg-blue-100 flex items-center justify-center">
                    <Image
                        src={pkg.coverImage || "/placeholder.webp"}
                        alt={pkg.name}
                        width={400}
                        height={400}
                        className="object-cover h-full w-full rounded-sm hover:scale-115 transition-transform duration-75"
                        quality={80}
                    />
                </div>
                <div className="text-black flex-1">
                    <h3 className="text-lg font-semibold">{pkg.name}</h3>
                    <p
                        className="text-md text-gray-500 line-clamp-2"
                        dangerouslySetInnerHTML={{ __html: pkg.overview }}
                    />
                </div>
                <div className="absolute z-99 font-light rounded-full right-2 top-2 px-3 py-1 text-[0.8rem] bg-gradient-to-tl from-[#025FE0] to-sky-400 text-white tracking-wide">
                    {pkg.tag || "Popular"}
                </div>
            </div> */}

            <div className="w-full group hover:scale-105 transition-all duration-300 aspect-square relative  overflow-hidden rounded-sm bg-blue-100 flex items-center justify-center">
                <Image
                    src={pkg.coverImage || "/placeholder.webp"}
                    alt={pkg.name}
                    width={400}
                    height={400}
                    className="object-cover h-full w-full rounded-sm hover:scale-115 transition-transform duration-75"
                    quality={80}
                />
                <div className="absolute inset-0 p-2 flex justify-end z-[20] ">
                    <button className="bg-white group-hover:rotate-45 transition-all duration-300 size-8 rounded-full flex justify-center items-center text-blue-500 "><ArrowUpRight /></button>
                </div>
                <div className="absolute inset-0 flex items-end bg-black/50 opacity-0 group-hover:opacity-100 transition-all duration-300 ">
                    <div className="text-white p-2 flex-1">
                        <h3 className="text-lg font-semibold">{pkg.name}</h3>
                    </div>
                </div>
            </div>

        </li>
    </Link>
);
