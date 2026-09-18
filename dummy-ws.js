const isBrowser = typeof window !== "undefined";

export const WebSocket = isBrowser ? window.WebSocket : null;

export default WebSocket;
