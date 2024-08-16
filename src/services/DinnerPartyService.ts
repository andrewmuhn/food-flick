import { DinnerParty } from "../models/DinnerParty";
import dinnerPartyApiInstance from "../utils/DinnerPartyApiInstance";

export const postNewDinnerParty = async (dinnerParty: DinnerParty) => {
    try {
        const response = await dinnerPartyApiInstance.post<DinnerParty>('/dinner-party', dinnerParty);
        return response.data;
    } catch (error) {
        console.error('Failed to post new dinner party:', error);
        throw error;
    }
}

export const getAllDinnerParties = async (): Promise<DinnerParty[]> => {
    try {
        const response = await dinnerPartyApiInstance.get<DinnerParty[]>('/dinner-party');
        return response.data;
    } catch (error) {
        console.error('Failed to fetch dinner parties:', error);
        throw error
    }
}

export const getDinnerPartyById = async (dinnerPartyId:number): Promise<DinnerParty> => {
    try {
        const response = await dinnerPartyApiInstance.get<DinnerParty>(`/dinner-party/${dinnerPartyId}`);
        return response.data;
    } catch (error) {
        
        console.error('Failed to fetch dinner parties:', error);
        throw error
    }
    
}