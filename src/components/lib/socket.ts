// import { io, Socket } from "socket.io-client";

// const socket: Socket = io(process.env.NEXT_PUBLIC_SOCKET_URL, {
//   autoConnect: false,
//   withCredentials: true,
//   transports: ["websocket"],
// });

// export default socket;

"use client";

import { io, Socket } from "socket.io-client";

// Generate or retrieve a unique user ID
const getUserId = () => {
  let userId = localStorage.getItem('userId');
  if (!userId) {
    userId = Math.random().toString(36).substring(2) + Date.now().toString(36);
    localStorage.setItem('userId', userId);
  }
  return userId;
};

const socket: Socket = io(process.env.NEXT_PUBLIC_SOCKET_URL, {
  autoConnect: false,
  withCredentials: true,
  transports: ["websocket"],
  auth: {
    userId: getUserId() // Send user ID during connection
  }
});

export default socket;