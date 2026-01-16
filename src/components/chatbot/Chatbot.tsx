'use client';

import React, { useState, useMemo, useCallback, useEffect } from 'react';
import Chatbot from 'react-chatbot-kit';
import createConfig from './config';
import MessageParser from './MessageParser';
import ActionProvider from './ActionProvider';
import './chatbot.css';

const ChatbotComponent = () => {
    const [showChatbot, setShowChatbot] = useState(false);

    const toggleChatbot = useCallback(() => {
        setShowChatbot(prev => !prev);
    }, []);

    const config = useMemo(() => createConfig(toggleChatbot), [toggleChatbot]);

    // Add effect to prevent empty message submission
    useEffect(() => {
        if (!showChatbot) return;

        const handleInputChange = () => {
            const inputElement = document.querySelector('.react-chatbot-kit-chat-input') as HTMLInputElement;
            const submitButton = document.querySelector('.react-chatbot-kit-chat-btn-send') as HTMLButtonElement;

            if (inputElement && submitButton) {
                const isEmpty = !inputElement.value.trim() || inputElement.value.trim().length === 0;
                submitButton.disabled = isEmpty;
            }
        };

        const handleFormSubmit = (e: Event) => {
            const inputElement = document.querySelector('.react-chatbot-kit-chat-input') as HTMLInputElement;
            if (inputElement && (!inputElement.value.trim() || inputElement.value.trim().length === 0)) {
                e.preventDefault();
                e.stopPropagation();
                return false;
            }
        };

        // Wait for chatbot to render
        const timeoutId = setTimeout(() => {
            const inputElement = document.querySelector('.react-chatbot-kit-chat-input');
            const formElement = document.querySelector('.react-chatbot-kit-chat-input-form');
            const submitButton = document.querySelector('.react-chatbot-kit-chat-btn-send') as HTMLButtonElement;

            if (inputElement) {
                // Initial check
                handleInputChange();

                // Listen for input changes
                inputElement.addEventListener('input', handleInputChange);
                inputElement.addEventListener('keyup', handleInputChange);
            }

            if (formElement) {
                formElement.addEventListener('submit', handleFormSubmit, true);
            }

            if (submitButton) {
                submitButton.addEventListener('click', (e) => {
                    const input = document.querySelector('.react-chatbot-kit-chat-input') as HTMLInputElement;
                    if (input && (!input.value.trim() || input.value.trim().length === 0)) {
                        e.preventDefault();
                        e.stopPropagation();
                        return false;
                    }
                }, true);
            }
        }, 100);

        return () => {
            clearTimeout(timeoutId);
            const inputElement = document.querySelector('.react-chatbot-kit-chat-input');
            const formElement = document.querySelector('.react-chatbot-kit-chat-input-form');

            if (inputElement) {
                inputElement.removeEventListener('input', handleInputChange);
                inputElement.removeEventListener('keyup', handleInputChange);
            }

            if (formElement) {
                formElement.removeEventListener('submit', handleFormSubmit, true);
            }
        };
    }, [showChatbot]);

    return (
        <div className="fixed bottom-8 right-4 z-50" title='Quick Chat' aria-label='Quick Chat With Us'>
            {/* Chat Toggle Button */}
            {!showChatbot && (
                <button
                    onClick={toggleChatbot}
                    className="bg-[#FF6900] hover:bg-[#FF6900] text-white rounded-full p-4 shadow-lg transition-all duration-300 hover:scale-110"
                    aria-label="Open chat"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                        />
                    </svg>
                </button>
            )}

            {/* Chatbot Container */}
            {showChatbot && (
                <div className="bg-white rounded-xl overflow-hidden shadow- w-[350px] sm:w-[400px] flex flex-col max-h-[600px]">
                    {/* Chatbot - with proper height constraints */}
                    <div className="flex-1 overflow-hidden min-h-0">

                        <Chatbot
                            // @ts-expect-error - react-chatbot-kit types
                            config={config}
                            messageParser={MessageParser}
                            actionProvider={ActionProvider}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default ChatbotComponent;
