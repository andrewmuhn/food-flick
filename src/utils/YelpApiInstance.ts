import axios from "axios";

const apiKey = import.meta.env.VITE_YELP_API_KEY;
const apiUrl = "https://api.yelp.com/v3/businesses/search";

const yelpApiInstance = axios.create({
  baseURL: apiUrl,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${apiKey}`,
  },
});

export default yelpApiInstance;
