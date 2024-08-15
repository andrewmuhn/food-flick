import React, { useEffect, useState } from "react";
import { getYelpInfo } from "../../services/YelpService";
import CarouselCard from "../CarouselCard";
import { RestaurantInfo } from "../../models/Restaurant";

const VotingPage: React.FC = () => {
  const [restaurants, setRestaurants] = useState<RestaurantInfo[]>([]);

  // useEffect(() => {
  //   const fetchRestaurants = async () => {
  //     try {
  //       const restaurantResults = await getYelpInfo();
  //       console.log("Api data: ", restaurantResults);
  //       setRestaurants(restaurantResults);
  //     } catch (error) {
  //       console.error("Failed to fetch list of restaurants", error);
  //     }
  //   };
  //   fetchRestaurants();
  // }, []);

  useEffect(() => {
    console.log("Restaurants state: ", restaurants);
  }, [restaurants]);

  return (
    <div>
      {restaurants.length > 0 ? (
        restaurants.map((restaurant, index) => (
          <CarouselCard
            key={restaurant.yelp_id}
            restaurant={restaurant}
            cardIndex={index}
            resturantArrayLength={restaurants.length}
          />
        ))
      ) : (
        <p>No restaurants available</p>
      )}
    </div>
  );
};

export default VotingPage;
