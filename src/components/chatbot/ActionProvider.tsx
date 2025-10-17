import React from 'react';

interface IActionProvider {
    createChatBotMessage: any;
    setState: any;
    children: React.ReactNode;
}

const ActionProvider = ({
    createChatBotMessage,
    setState,
    children,
}: IActionProvider) => {
    const addMessageToState = (message: any) => {
        setState((prevState: any) => ({
            ...prevState,
            messages: [...prevState.messages, message],
        }));
    };

    const handleGreeting = () => {
        const message = createChatBotMessage(
            'Hello! I\'m here to help you plan your Himalayan adventure. Would you like to know about our treks, expeditions, or booking process?'
        );
        addMessageToState(message);
    };

    const handleTripInquiry = () => {
        const message = createChatBotMessage(
            'We offer amazing trips in the Himalayan region! You can explore:\n\n' +
            '1. Peak Climbing\n' +
            '2. Trekkings\n' +
            '3. Private Tours'+
            '3. Expeditions\n' +
            '5. Other Personalized Trips \n\n'+
            'Visit our package list page to see all available options, or tell me what kind of adventure you\'re looking for!'
        );
        addMessageToState(message);
    };

    const handleBookingInquiry = () => {
        const message = createChatBotMessage(
            'To book a trip with us:\n\n' +
            '1. Browse our packages\n' +
            '2. Select your preferred trip\n' +
            '3. Choose your dates\n' +
            '4. Fill out the booking form\n\n' +
            'You can also customize your trip according to your preferences. Would you like help finding a specific package?'
        );
        addMessageToState(message);
    };

    const handleContactInquiry = () => {
        const message = createChatBotMessage(
            'You can reach us through:\n\n' +
            '\n Email:\ninfo@realhimalaya.com\n' +
            '\n Phone:\nAvailable on our contact page\n' +
            '\n Website:\nVisit our contact page for more details\n\n' +
            'Feel free to reach out anytime!'
        );
        addMessageToState(message);
    };

    const handleDefault = () => {
        const message = createChatBotMessage(
            'I\'m not sure I understand. I can help you with:\n\n' +
            '• Trip and trek information\n' +
            '• Booking inquiries\n' +
            '• Contact details\n' +
            '• General questions about Real Himalaya\n\n' +
            'What would you like to know more about?'
        );
        addMessageToState(message);
    };

    return (
        <div>
            {React.Children.map(children, (child) => {
                return React.cloneElement(child as React.ReactElement<any>, {
                    actions: {
                        handleGreeting,
                        handleTripInquiry,
                        handleBookingInquiry,
                        handleContactInquiry,
                        handleDefault,
                    },
                });
            })}
        </div>
    );
};

export default ActionProvider;
