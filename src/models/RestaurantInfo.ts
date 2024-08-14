export interface OpenHours {
  is_overnight: boolean;
  start: number;
  end: number;
  day: number;
}

export interface RestaurantInfo {
  yelp_id: string;
  name: string;
  rating: number;
  address: string;
  url: string;
  latitude: number;
  longitude: number;
  image_url: string;
  categories: Array<object>;
  distance: number;
  business_hours: Array<OpenHours>;
  stars_url: string;
}
