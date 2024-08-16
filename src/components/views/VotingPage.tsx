import React, { useEffect, useState } from "react";
import { getYelpInfo } from "../../services/YelpService";
import CarouselCard from "../CarouselCard";
import { Restaurant } from "../../models/Restaurant";
import { getDinnerPartyById } from "../../services/DinnerPartyService";

const VotingPage: React.FC = () => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
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
    const pathParemeter = Number (window.location.pathname.split('/')[2]);
    fetchDinnerParty(pathParemeter)
    
    
  }, []);

  const fetchDinnerParty = async (dinnerPartyId: number) => {
        // Now you can use the 'path' variable to access the path parameter
        const dinnerParty = await getDinnerPartyById(dinnerPartyId);
        console.log(dinnerParty.restaurants);
        setRestaurants(dinnerParty.restaurants)
  }

  return (
    <div>
      {restaurants.length > 0 ? (
        restaurants.map((restaurant, index) => (
          <CarouselCard
            key={restaurant.restaurant_id}
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
