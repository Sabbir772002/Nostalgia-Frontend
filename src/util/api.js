import ServerUrl from '../api/serverUrl';

const api = {
  url: ServerUrl.BASE_URL.replace(/\/$/, "").replace(/:8001$/, ""),
  BASE_URL: ServerUrl.BASE_URL
};

export default api;