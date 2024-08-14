import { RestaurantInfo } from "../models/RestaurantInfo";
import { YelpData } from "../models/YelpData";
import yelpApiInstance from "../utils/YelpApiInstance";
import { mapYelpDataToRestaurantInfo } from "../utils/MapYelpToDatabase";

export const getYelpInfo = async (
  location: string,
  radius: string,
  price: string
): Promise<RestaurantInfo[]> => {
  const params = {
    term: "restaurants",
    location: location,
    // radius: radius,
    // price: price,
    sort_by: "best_match",
    limit: 10,
  };

  try {
    const response = await yelpApiInstance.get<YelpData[]>("", {
      params,
    });
    console.log(response.data);
    console.log("resp.buisness", response.data.businesses);
    const resp = mapYelpDataToRestaurantInfo(response.data.businesses);
    console.log("response", resp);
    return resp;
  } catch (error) {
    console.error("Error fetching data from Yelp API:", error);
    throw error;
  }
};
