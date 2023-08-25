export const NODE_ENV = process.env.NODE_ENV;

// set them at production-only
export const API_URL =
  NODE_ENV === "production"
    ? process.env.REACT_APP_API_URL
    : "http://localhost:3001";
export const SOCKET_IO_BASE = process.env.REACT_APP_SOCKET_IO_BASE;
export const SOCKET_IO_PATH = process.env.REACT_APP_SOCKET_IO_PATH;

// optional
export const SHOW_LOGS = process.env.REACT_APP_SHOW_LOGS === "true";
