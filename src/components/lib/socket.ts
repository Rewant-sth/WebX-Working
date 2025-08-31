// import { io, Socket } from "socket.io-client";

// const socket: Socket = io(process.env.NEXT_PUBLIC_SOCKET_URL, {
//   autoConnect: false,
//   withCredentials: true,
//   transports: ["websocket"],
// });

// export default socket;

import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;

export const initializeSocket = (userId: string): Socket => {
  if (socket && socket.connected) {
    return socket;
  }

  socket = io(process.env.NEXT_PUBLIC_SOCKET_URL!, {
    autoConnect: true,
    withCredentials: true,
    transports: ["websocket"],
    auth: {
      userId: userId
    }
  });

  return socket;
};

export const getSocket = (): Socket | null => {
  return socket;
};

export default socket;