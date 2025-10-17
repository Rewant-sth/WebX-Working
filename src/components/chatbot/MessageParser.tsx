import React from 'react';

interface IMessageParser {
    children: React.ReactNode;
    actions: any;
}

const MessageParser = ({ children, actions }: IMessageParser) => {
    const parse = (message: string) => {
        const lowerCaseMessage = message.toLowerCase();

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

    return (
        <div>
            {React.Children.map(children, (child) => {
                return React.cloneElement(child as React.ReactElement<any>, {
                    parse: parse,
                    actions,
                });
            })}
        </div>
    );
};

export default MessageParser;
