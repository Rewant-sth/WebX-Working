"use client";
import React from 'react';

interface AudioConfirmationProps {
    onConfirm: (allowAudio: boolean) => void;
}

export default function AudioConfirmation({ onConfirm }: AudioConfirmationProps) {
    return (
        <div className="fixed inset-0 z-[9999999] bg-black bg-opacity-80 flex items-center justify-center">
            <div className="text-white p-8 max-w-2xl mx-4 text-center">
                <div className="mb-6">
                    <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center border rounded-full">
                        <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.617.797L4.47 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.47l3.913-3.797zM15.657 6.343a1 1 0 011.414 0A9.972 9.972 0 0119 12a9.972 9.972 0 01-1.929 5.657 1 1 0 01-1.414-1.414A7.971 7.971 0 0017 12c0-2.043-.777-4.043-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 12a5.983 5.983 0 01-.757 2.829 1 1 0 01-1.415-1.415A3.987 3.987 0 0013.5 12a3.987 3.987 0 00-.672-1.414 1 1 0 010-1.415z" clipRule="evenodd" />
                        </svg>
                    </div>
                    <h2 className="text-2xl font-bold  mb-2">Audio Experience</h2>
                    <p className="">
                        This website includes ambient audio to enhance your experience.
                        Would you like to enable audio?
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 lg:gap-10 justify-center">
                    <button
                        onClick={() => onConfirm(true)}
                        className="border px-4 py-1 text-white font-medium rounded-sm transition-colors duration-200"
                    >
                        Enable Audio
                    </button>
                    <button
                        onClick={() => onConfirm(false)}
                        className="border px-4 py-1 font-medium rounded-sm transition-colors duration-200"
                    >
                        Continue Silently
                    </button>
                </div>
            </div>
        </div>
    );
}
