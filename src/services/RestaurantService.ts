import { Restaurant } from "../models/Restaurant";
import dinnerPartyApiInstance from "../utils/DinnerPartyApiInstance";

export const postNewRestaurant = async (restaurant: Restaurant, dinnerPartyId: number) => {
    try {
        const response = await dinnerPartyApiInstance.post<Restaurant>(`/dinner-party/${dinnerPartyId}/restaurant`, restaurant);
        return response.data;
    } catch (error) {
        console.error('Failed to post new restaurant:', error);
        throw error;
    }
}