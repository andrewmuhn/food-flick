import { DinnerParty } from "../models/DinnerParty"
import { VotingStrategy } from "../models/VotingStrategy";

export const createDinnerParty = (name: string, date: string, time: string, strategy: string): DinnerParty => {
    const dinnerParty = new DinnerParty();
    dinnerParty.party_name = name;
    console.log(date);
    console.log(time);
    dinnerParty.party_date = new Date(`${date}T${time}:00.000Z`).toISOString();
    dinnerParty.voting_strategy = VotingStrategy[strategy.toUpperCase() as keyof typeof VotingStrategy];
    
    return dinnerParty;
}
