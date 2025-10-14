import { ITravelPackage } from "@/types/IPackages";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const PackageCard: React.FC<{
    package: ITravelPackage;
    onClose: () => void;
}> = ({ package: pkg, onClose }) => (
    <Link href={`/itinerary/${pkg.slug}`} onClick={onClose}>
        <li className="bg-zinc-100/50 group rounded-2xl hover:bg-zinc-100 cursor-pointer transition-transform duration-75">
            <div className="w-full group  transition-all duration-300 h-[65dvh] relative  overflow-hidden rounded-sm bg-blue-100 flex items-center justify-center">
                <Image
                    src={pkg.coverImage || "/placeholder.webp"}
                    alt={pkg.name}
                    width={400}
                    height={400}
                    className="object-cover h-full w-full rounded-sm hover:scale-[1.05] transition-all duration-75 group-hover:blur-[2px]"
                    quality={80}
                />
                <div className="absolute inset-0 p-2 flex justify-end z-[20] ">
                    <button className=" group-hover:rotate-45 transition-all duration-300 size-8 rounded-full flex justify-center items-center text-white "><ArrowUpRight /></button>
                </div>
                <div className="absolute inset-0 flex justify-center items-center w-full text-center px-4 bg-black/15 group-hover:bg-black/50  transition-all duration-300 ">
                    <div className="text-white p-2 flex-1">
                        <h3 className="text-2xl font-semibold">{pkg.name}</h3>
                    </div>
                </div>
            </div>

        </li>
    </Link>
);
