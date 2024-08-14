import { RestaurantInfo } from "../models/RestaurantInfo";
import yelpApiInstance from "../utils/YelpApiInstance";

export const getYelpInfo = async (): Promise<RestaurantInfo> => {
  const params = {
    term: "restaurants",
    location: "San Francisco",
    sort_by: "best_match",
    limit: 10,
  };

  try {
    const response = await yelpApiInstance.get<RestaurantInfo[]>("", {
      params,
    });
    return response.data.businesses;
  } catch (error) {
    console.error("Error fetching data from Yelp API:", error);
    throw error;
  }
};
