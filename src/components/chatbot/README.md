# React Chatbot Kit Implementation

## 📚 Overview

This chatbot implementation uses `react-chatbot-kit` to provide an interactive assistant for Real Himalaya website visitors.

## 🗂️ File Structure

```
src/components/chatbot/
├── Chatbot.tsx          # Main chatbot component with toggle functionality
├── config.tsx           # Chatbot configuration (initial messages, styling)
├── MessageParser.tsx    # Parses user messages and triggers actions
├── ActionProvider.tsx   # Defines bot responses and actions
└── README.md           # This file
```

## 🚀 Usage

### Add to your layout or page:

```tsx
import ChatbotComponent from '@/components/chatbot/Chatbot';

export default function Layout() {
  return (
    <>
      {/* Your other components */}
      <ChatbotComponent />
    </>
  );
}
```

## 🎨 Customization

### 1. **Styling (config.tsx)**
- Modify `customStyles` to match your brand colors
- Add custom header component
- Change bot name and avatar

### 2. **Message Handling (MessageParser.tsx)**
- Add new keywords to detect
- Create custom parsing logic
- Handle specific user intents

### 3. **Bot Actions (ActionProvider.tsx)**
- Add new response functions
- Integrate with your API
- Create custom widgets

### 4. **Custom Widgets**

Create interactive components:

```tsx
// In config.tsx
widgets: [
  {
    widgetName: 'tripOptions',
    widgetFunc: (props) => <TripOptionsWidget {...props} />,
  },
]

// Create TripOptionsWidget.tsx
const TripOptionsWidget = ({ actionProvider }) => {
  return (
    <div>
      <button onClick={() => actionProvider.handleTrekking()}>
        🏔️ Trekking
      </button>
      <button onClick={() => actionProvider.handleExpedition()}>
        ⛰️ Expedition
      </button>
    </div>
  );
};
```

## 🔧 Advanced Features

### API Integration Example

```tsx
// In ActionProvider.tsx
const handlePackageSearch = async (tripType: string) => {
  const response = await fetch(`/api/packages?type=${tripType}`);
  const data = await response.json();
  
  const message = createChatBotMessage(
    `Found ${data.length} ${tripType} packages!`,
    {
      widget: 'packageList',
      payload: data,
    }
  );
  addMessageToState(message);
};
```

### State Management

```tsx
// Store custom data in chatbot state
const handleUserData = (userData: any) => {
  setState((prevState: any) => ({
    ...prevState,
    messages: [...prevState.messages, message],
    userData: userData, // Custom state
  }));
};
```

## 📖 Documentation

- [react-chatbot-kit docs](https://fredrikoseberg.github.io/react-chatbot-kit-docs/)
- [GitHub Repository](https://github.com/FredrikOseberg/react-chatbot-kit)

## 🎯 Current Features

- ✅ Greeting responses
- ✅ Trip/Trek inquiries
- ✅ Booking information
- ✅ Contact details
- ✅ Toggle open/close functionality
- ✅ Responsive design
- ✅ Tailwind CSS styling

## 🔜 Future Enhancements

- [ ] Integrate with booking API
- [ ] Add package search functionality
- [ ] Create custom widgets for trip options
- [ ] Add multi-language support
- [ ] Implement chat history persistence
- [ ] Add typing indicators
- [ ] Connect to live chat support

## 💡 Tips

1. **Keep responses concise** - Users prefer quick, scannable information
2. **Use emojis** - Makes the chat more friendly and engaging
3. **Provide options** - Guide users with clear next steps
4. **Test thoroughly** - Try various user inputs to improve parsing
5. **Monitor usage** - Track common queries to improve responses
