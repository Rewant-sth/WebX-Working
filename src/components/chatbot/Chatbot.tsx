'use client';

import React, { useState, useMemo, useCallback } from 'react';
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

    return (
        <div className="fixed bottom-4 left-4 z-50">
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
                <div className="bg-white rounded-lg shadow-2xl w-[350px] sm:w-[400px] flex flex-col max-h-[600px]">
                    {/* Header */}
                    {/* <div className="bg-[#FF6900] text-white p-4 flex justify-between items-center flex-shrink-0">
                        <h3 className="font-semibold">Real Himalaya Assistant</h3>
                        <button
                            onClick={toggleChatbot}
                            className="hover:bg-[#FF6900] rounded-full p-1 transition-colors"
                            aria-label="Close chat"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                    </div> */}

                    {/* Chatbot - with proper height constraints */}
                    <div className="flex-1 overflow-hidden min-h-0">
                        <Chatbot
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
