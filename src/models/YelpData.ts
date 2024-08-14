export interface OpenHours {
  is_overnight: boolean;
  start: number;
  end: number;
  day: number;
}

export interface BusinessHours {
  open: Array<OpenHours>;
}

export interface Location {
  address1: string;
  display_address: Array<string>;
}

export interface Coordinates {
  latitude: number;
  longitude: number;
}
export interface YelpData {
  id: string;
  name: string;
  rating: number;
  location: Location;
  url: string;
  coordinates: Coordinates;
  image_url: string;
  categories: Array<object>;
  distance: number;
  business_hours: BusinessHours;
}
