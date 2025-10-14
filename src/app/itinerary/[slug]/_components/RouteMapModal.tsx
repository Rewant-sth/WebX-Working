"use client";
import { Icon } from "@iconify/react/dist/iconify.js";

interface RouteMapModalProps {
    isVisible: boolean;
    onClose: () => void;
    routeMap: string | undefined;
}

const RouteMapModal = ({ isVisible, onClose, routeMap }: RouteMapModalProps) => {
    if (!isVisible) return null;

    return (
        <div className="fixed inset-0 flex justify-center items-center z-[99999] bg-black/70 backdrop-blur-md">
            <button
                onClick={onClose}
                className="absolute top-5 right-5 text-orange-500 text-3xl flex justify-center items-center rounded-full size-14 bg-white hover:bg-zinc-100 transition-colors"
            >
                <Icon icon="gridicons:cross" />
            </button>
            <div className="">
                <img src={routeMap} alt="route map" className="max-w-full max-h-[80vh] object-contain" />
            </div>
        </div>
    );
};

export default RouteMapModal;
