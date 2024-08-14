import { RestaurantInfo } from "../models/RestaurantInfo";
import { YelpData } from "../models/YelpData";

let yelpStarsUrl;

function createYelpStarsUrl(rating: number): string {
  let stars = rating;
  if (rating % 1 != 0) {
    stars = roundHalf(rating);
  }

  console.log("stars", stars);

  console.log("half", 0.5 % 1);
  if (stars < 1) {
    yelpStarsUrl = `Review_Ribbon_small_16_half`;
  } else if (stars % 1 === 0) {
    yelpStarsUrl = `Review_Ribbon_small_16_${Math.trunc(stars)}`;
  } else {
    yelpStarsUrl = `Review_Ribbon_small_16_${Math.trunc(stars)}_half`;
  }

  return yelpStarsUrl;
}

function roundHalf(rating: number) {
  return Math.round(rating * 2) / 2;
}

export function mapYelpDataToRestaurantInfo(
  yelpData: YelpData[]
): RestaurantInfo[] {
  const restaurants: RestaurantInfo[] = [];

  yelpData.forEach((element) => {
    restaurants.push({
      yelp_id: element.id,
      name: element.name,
      rating: element.rating,
      address: element.location.display_address.join(", "),
      url: element.url,
      latitude: element.coordinates.latitude,
      longitude: element.coordinates.longitude,
      image_url: element.image_url,
      categories: element.categories,
      distance: element.distance,
      business_hours: element.business_hours.open,
      stars_url: createYelpStarsUrl(element.rating),
    });
  });

  return restaurants;
}
