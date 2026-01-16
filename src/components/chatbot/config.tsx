import { createChatBotMessage } from 'react-chatbot-kit';


const createConfig = (onClose?: () => void) => ({
    initialMessages: [
        createChatBotMessage(
            `Hello! Welcome to Real Himalaya. How can I assist you today?`,
            {

            }
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
        userMessageBox: {
            backgroundColor: '#1e3a8a',
        }

    },
    // You can add custom components here
    customComponents: {
        header: () => <div className='flex justify-between items-center px-4 py-2 pt-4  text-[#FF6900] w-full font-semibold' >
            <h1 className='flex gap-3 items-center '>
                <div className="size-6">
                    <img src="/logo/logo.svg" alt="" />
                </div>
                Quick Chat</h1>
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
                }}
                className="hover:opacity-80 transition-opacity"
                aria-label="Close chatbot"
            >
                <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24"><path fill="currentColor" d="m6.4 18.308l-.708-.708l5.6-5.6l-5.6-5.6l.708-.708l5.6 5.6l5.6-5.6l.708.708l-5.6 5.6l5.6 5.6l-.708.708l-5.6-5.6z"></path></svg>
            </button>
        </div>,
        botAvatar: () => null,
        userAvatar: () => null,

    },
    // widgets: [
    //   {
    //     widgetName: 'tripOptions',
    //     widgetFunc: (props: any) => <TripOptionsWidget {...props} />,
    //   },
    // ],
});

export default createConfig;
