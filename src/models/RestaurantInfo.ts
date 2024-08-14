export interface OpenHours {
  is_overnight: boolean;
  start: number;
  end: number;
  day: number;
}

export interface Categories {
  title: string;
}

export interface RestaurantInfo {
  yelp_id: string;
  name: string;
  rating: number;
  address: string;
  url: string;
  latitude: number;
  longitude: number;
  price?: string;
  image_url: string;
  categories: Categories[];
  review_count: number;
  distance: number;
  business_hours?: Array<OpenHours>;
  stars_url: string;
  transactions: Array<string>;
}
