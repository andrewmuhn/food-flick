import axios from "axios";

const apiKey = import.meta.env.VITE_GEOAPIFY_API_KEY;
const baseURL = "https://api.geoapify.com/v1";

const geoapifyApiInstance = axios.create({
  baseURL,
});

geoapifyApiInstance.interceptors.request.use((config) => {
  config.params = {
    ...config.params,
    apiKey,
  };
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default geoapifyApiInstance;
