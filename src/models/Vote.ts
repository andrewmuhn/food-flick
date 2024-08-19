export class Vote {
    vote_id: number;
    vote: boolean;
    restaurant_id: number;
    
    constructor() {
        this.vote_id = 0;
        this.vote = false;
        this.restaurant_id = 0;
    }

}
