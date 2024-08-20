import { Restaurant } from "./Restaurant";
import { VotingStrategy } from "./VotingStrategy"

export class DinnerParty {
    dinner_party_id: number;
    party_name: string;
    finalized: boolean;
    location: string;
    party_date: string;
    voting_strategy: VotingStrategy;
    restaurants: Restaurant[];
    created_by: string;

    constructor() {
        this.dinner_party_id = 0;
        this.party_name = '';
        this.finalized = false;
        this.location = '';
        this.party_date = new Date().toISOString();
        this.voting_strategy = VotingStrategy.DEFAULT;
        this.restaurants = [];
        this.created_by = '';
    };

}