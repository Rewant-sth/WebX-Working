"use client";
import React from 'react';

interface AudioConfirmationProps {
    onConfirm: (allowAudio: boolean) => void;
}

export default function AudioConfirmation({ onConfirm }: AudioConfirmationProps) {
    return (
        <div className="fixed inset-0 z-[9999999]   bg-white flex items-center justify-center">
            <div className=" p-8 max-w-4xl mx-4 text-center">
                <div className="mb-6">
                    <h2 className="text-2xl uppercase font-bold  mb-2">Audio Experience</h2>
                    <p className="">
                        This website includes ambient audio to enhance your experience.
                        Would you like to enable audio?
                    </p>
                </div>

                <div className="flex flex-wrap gap-10 justify-center">



                    <button
                        onClick={() => onConfirm(true)}
                        className="hover:text-orange-500 border-b w-12  px-4 py-2  flex gap-2 items-center pb-1   font-medium  transition-colors duration-200"
                    >
                        YES
                    </button>
                    <button
                        onClick={() => onConfirm(false)}
                        className="hover:text-orange-500 border-b w-12 text-center justify-center flex gap-2 items-center pb-1  py-1 font-medium  transition-colors duration-200"
                    >
                        NO
                    </button>
                </div>
            </div>
        </div>
    );
}
