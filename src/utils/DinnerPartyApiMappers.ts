import { DinnerParty } from "../models/DinnerParty"
import { Restaurant } from "../models/Restaurant";
import { RestaurantInfo } from "../models/RestaurantInfo";
import { Vote } from "../models/Vote";
import { VotingStrategy } from "../models/VotingStrategy";

export const createDinnerParty = (name: string, date: string, time: string, strategy: string): DinnerParty => {
    const dinnerParty = new DinnerParty();
    dinnerParty.party_name = name;
    dinnerParty.party_date = new Date(`${date}T${time}:00.000Z`).toISOString();
    dinnerParty.voting_strategy = VotingStrategy[strategy.toUpperCase() as keyof typeof VotingStrategy];
    
    return dinnerParty;
}

export const createRestaurantForDinnerParty = (yelpMetaData: RestaurantInfo, dinner_party_id: number) : Restaurant => {
    const restaurant = new Restaurant();
    restaurant.dinner_party_id = dinner_party_id;
    restaurant.yelpMetaData = yelpMetaData;
    
    return restaurant;
}

export const createVoteForRestaurant = (restaurantId: number, vote: boolean): Vote => {
    const newVote = new Vote();
    newVote.vote = vote;
    newVote.restaurant_id = restaurantId;

    return newVote;
}