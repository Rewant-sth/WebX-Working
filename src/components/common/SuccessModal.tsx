"use client";

import React from "react";
import { Icon } from "@iconify/react";

interface SuccessModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    message?: string;
}

const SuccessModal: React.FC<SuccessModalProps> = ({
    isOpen,
    onClose,
    title = "Success!",
    message = "Your request has been submitted successfully.",
}) => {
    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
            onClick={onClose}
        >
            <div
                className="relative bg-white rounded-lg shadow-2xl max-w-md w-full mx-4 p-8 animate-fadeIn"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Success Icon */}
                <div className="flex justify-center mb-6">
                    <div className="bg-green-100 rounded-full p-4">
                        <Icon
                            icon="mdi:check-circle"
                            className="text-green-600"
                            width="64"
                            height="64"
                        />
                    </div>
                </div>

                {/* Title */}
                <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">
                    {title}
                </h2>

                {/* Message */}
                <p className="text-gray-600 text-center mb-8 leading-relaxed">
                    {message}
                </p>

                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="w-full bg-[#F05E25] text-white px-6 py-3 rounded-md font-semibold hover:bg-[#01283F] transition-colors duration-200 flex items-center justify-center gap-2"
                >
                    <Icon icon="mdi:check" width="20" height="20" />
                    Close
                </button>

                {/* Close Icon Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                >
                    <Icon icon="mdi:close" width="24" height="24" />
                </button>
            </div>
        </div>
    );
};

export default SuccessModal;
