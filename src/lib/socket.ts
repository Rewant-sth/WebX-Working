import { io, Socket } from 'socket.io-client';

// Initialize socket connection with type safety
const socket: Socket = io(process.env.NEXT_PUBLIC_SOCKET_URL, {
  autoConnect: false, // Don't connect automatically
  withCredentials: true,
  transports: ['websocket'],
});

export default socket;
