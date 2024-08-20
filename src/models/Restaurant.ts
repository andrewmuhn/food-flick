import { RestaurantInfo } from "./RestaurantInfo";
import { Vote } from "./Vote";

export class Restaurant {
    restaurant_id: number;
    winner: boolean;
    yelpMetaData: RestaurantInfo;
    dinner_party_id: number;
    votes: Vote[];

    constructor() {
        this.restaurant_id = 0;
        this.winner = false;
        this.yelpMetaData = {
            yelp_id: '',
            name: '',
            rating: 0,
            address: '',
            url: '',
            latitude: 0,
            longitude: 0,
            price: '',
            image_url: '',
            categories: [],
            review_count: 0,
            distance: 0,
            business_hours: [],
            stars_url: '',
            transactions: []
        };
        this.dinner_party_id = 0;
        this.votes = []
    }
}
