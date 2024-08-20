import { Vote } from "../models/Vote";
import dinnerPartyApiInstance from "../utils/DinnerPartyApiInstance";

export const postNewVote = async (vote: Vote, restaurantId: number) => {
    try {
        const response = await dinnerPartyApiInstance.post<Vote>(`/dinner-party/restaurant/${restaurantId}/vote`, vote);
        return response.data;
    } catch (error) {
        console.error('Failed to post new vote:', error);
        throw error;
    }
}