import React from 'react';

interface Actions {
    handleGreeting: () => void;
    handleTripInquiry: () => void;
    handleBookingInquiry: () => void;
    handleContactInquiry: () => void;
    handleDefault: () => void;
}

interface IMessageParser {
    children: React.ReactNode;
    actions: Actions;
}

const MessageParser = ({ children, actions }: IMessageParser) => {
    const parse = (message: string) => {
        // Prevent processing empty or whitespace-only messages
        if (!message || typeof message !== 'string' || !message.trim() || message.trim().length === 0) {
            console.warn('Empty message blocked by MessageParser');
            return;
        }

        const trimmedMessage = message.trim();
        const lowerCaseMessage = trimmedMessage.toLowerCase();

        // Handle greetings
        if (
            lowerCaseMessage.includes('hello') ||
            lowerCaseMessage.includes('hi') ||
            lowerCaseMessage.includes('hey')
        ) {
            actions.handleGreeting();
            return;
        }

        // Handle trip inquiries
        if (
            lowerCaseMessage.includes('trip') ||
            lowerCaseMessage.includes('trek') ||
            lowerCaseMessage.includes('expedition') ||
            lowerCaseMessage.includes('package')
        ) {
            actions.handleTripInquiry();
            return;
        }

        // Handle booking inquiries
        if (
            lowerCaseMessage.includes('book') ||
            lowerCaseMessage.includes('reservation') ||
            lowerCaseMessage.includes('price') ||
            lowerCaseMessage.includes('cost')
        ) {
            actions.handleBookingInquiry();
            return;
        }

        // Handle contact inquiries
        if (
            lowerCaseMessage.includes('contact') ||
            lowerCaseMessage.includes('phone') ||
            lowerCaseMessage.includes('email')
        ) {
            actions.handleContactInquiry();
            return;
        }

        // Default response
        actions.handleDefault();
    };

    if (children == null) {
        return null;
    }

    return (
        <div>
            {React.Children.map(children, (child) => {
                return React.cloneElement(child as React.ReactElement<{
                    parse: (message: string) => void;
                    actions: Actions;
                }>, {
                    parse: parse,
                    actions,
                });
            })}
        </div>
    );
};

export default MessageParser;
