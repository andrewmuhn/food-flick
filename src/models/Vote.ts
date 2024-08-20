export class Vote {
    vote_id: number;
    vote: boolean;
    restaurant_id: number;
    created_by: string;
    
    constructor() {
        this.vote_id = 0;
        this.vote = false;
        this.restaurant_id = 0;
        this.created_by = '';
    }

}
