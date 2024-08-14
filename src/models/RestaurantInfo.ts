export interface OpenHours {
  is_overnight: boolean;
  start: number;
  end: number;
  day: number;
}

export interface BusinessHours {
  open: Array<OpenHours>;
  hours_type: string;
  is_open_now: boolean;
}

export interface Coordinates {
  latitude: number;
  longitude: number;
}
export interface RestaurantInfo {
  id: string;
  name: string;
  display_address: Array<string>;
  rating: Int16Array;
  url: string;
  price: string;
  coordinates: Coordinates;
  image_url: string;
  categories: Array<object>;
  distance: number;
  business_hours: BusinessHours;
}
