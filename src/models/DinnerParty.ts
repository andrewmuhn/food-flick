import { Restaurant } from "./Restaurant";
import { VotingStrategy } from "./VotingStrategy"

export class DinnerParty {
    dinner_party_id: number;
    party_name: string;
    finalized: boolean;
    location: string;
    party_date: string;
    voting_strategy: VotingStrategy;
    restaurants: Restaurant[]

    constructor() {
        this.dinner_party_id = 0;
        this.party_name = '';
        this.finalized = false;
        this.location = '';
        this.party_date = new Date().toISOString();
        this.voting_strategy = VotingStrategy.DEFAULT;
        this.restaurants = [];
    };

    // constructor(dinner_party_id: number, party_name: string, finalized: boolean, location: string, party_date: Date, voting_strategy: VotingStrategy) {
    //     this.dinner_party_id = dinner_party_id;
    //     this.party_name = party_name;
    //     this.finalized = finalized;
    //     this.location = location;
    //     this.party_date = party_date;
    //     this.voting_strategy = voting_strategy;
    // }
}