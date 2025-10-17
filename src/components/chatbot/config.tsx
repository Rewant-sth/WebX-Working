import { createChatBotMessage } from 'react-chatbot-kit';

const createConfig = (onClose?: () => void) => ({
    initialMessages: [
        createChatBotMessage(
            `Hello! Welcome to Real Himalaya. How can I assist you today?`,
            {}
        ),
    ],
    botName: 'Real Himalaya Assistant',
    customStyles: {
        botMessageBox: {
            backgroundColor: '#FF6900',
        },
        chatButton: {
            backgroundColor: '#FF6900',
        },

    },
    // You can add custom components here
    customComponents: {
        header: () => <div className='flex justify-between items-center' style={{ backgroundColor: '#FF6900', padding: "10px 15px", color: "white", fontWeight: "600", borderBottom: "2px solid white" }}>
            <span>Real Himalaya Chatbot</span>
            <button
                onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    onClose?.();
                }}
                style={{
                    cursor: 'pointer',
                    background: 'none',
                    border: 'none',
                    padding: 0,
                    display: 'flex',
                    alignItems: 'center',
                    color: 'white'
                }}
                className="hover:opacity-80 transition-opacity"
                aria-label="Close chatbot"
            >
                <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24"><path fill="currentColor" d="m6.4 18.308l-.708-.708l5.6-5.6l-5.6-5.6l.708-.708l5.6 5.6l5.6-5.6l.708.708l-5.6 5.6l5.6 5.6l-.708.708l-5.6-5.6z"></path></svg>
            </button>
        </div>
    },
    // widgets: [
    //   {
    //     widgetName: 'tripOptions',
    //     widgetFunc: (props: any) => <TripOptionsWidget {...props} />,
    //   },
    // ],
});

export default createConfig;
