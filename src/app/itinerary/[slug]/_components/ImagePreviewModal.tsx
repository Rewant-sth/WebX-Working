"use client";
import { X } from "lucide-react";

interface ImagePreviewModalProps {
    modalOpen: boolean;
    selectedImg: string;
    onClose: () => void;
}

const ImagePreviewModal = ({ modalOpen, selectedImg, onClose }: ImagePreviewModalProps) => {
    if (!modalOpen) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm"
            onClick={onClose}
        >
            <div
                className="relative max-w-3xl w-full max-h-[90vh] rounded-sm overflow-hidden shadow-xl mx-4"
                onClick={(e) => e.stopPropagation()}
            >
                <img
                    src={selectedImg}
                    alt="Preview"
                    className="w-full h-auto object-contain"
                    height={10}
                    width={10}
                />
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 bg-white rounded-full p-2 shadow-md hover:bg-zinc-100 transition"
                >
                    <X className="h-5 w-5 text-zinc-700" />
                </button>
            </div>
        </div>
    );
};

export default ImagePreviewModal;
