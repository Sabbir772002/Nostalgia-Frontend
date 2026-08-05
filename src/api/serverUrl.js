const BASE_URL = process.env.REACT_APP_BASE_URL || "http://127.0.0.1:8001/";
const WS_BASE_URL = process.env.REACT_APP_WS_BASE_URL || "ws://127.0.0.1:8001/";

const ServerUrl = {
  BASE_URL: BASE_URL.endsWith('/') ? BASE_URL : BASE_URL + '/',
  WS_BASE_URL: WS_BASE_URL.endsWith('/') ? WS_BASE_URL : WS_BASE_URL + '/',
};

export const getImageUrl = (path) => {
  if (!path || typeof path !== 'string' || path === 'undefined' || path.includes('undefined')) {
    return ServerUrl.BASE_URL + "media/image/download_lsX6bjA6.jpeg";
  }
  if (path.startsWith("http://") || path.startsWith("https://") || path.startsWith("data:")) {
    return path;
  }
  const cleanBase = ServerUrl.BASE_URL.replace(/\/$/, "");
  const cleanPath = path.startsWith("/") ? path : "/" + path;
  return cleanBase + cleanPath;
};

export default ServerUrl;
