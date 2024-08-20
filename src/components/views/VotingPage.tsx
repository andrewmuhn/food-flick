import React, { useEffect, useState } from "react";
import CarouselCard from "../CarouselCard";
import { Restaurant } from "../../models/Restaurant";
import { getDinnerPartyById } from "../../services/DinnerPartyService";
import LoadingState from "../LoadingState";

const VotingPage: React.FC = () => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const pathParameter = Number(window.location.pathname.split("/")[2]);

    const fetchDinnerParty = async (dinnerPartyId: number) => {
      // Now you can use the 'path' variable to access the path parameter
      try {
        const dinnerParty = await getDinnerPartyById(dinnerPartyId);
        console.log(dinnerParty.restaurants);
        setRestaurants(dinnerParty.restaurants);
        
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch dinner party info");
        setLoading(false);
      }
    };

    fetchDinnerParty(pathParameter);
  }, []);

  if (loading) {
    return (
      <div className="bg-beige min-h-screen">
        <LoadingState loadingMessage={"Prepping your restaurants..."} />
      </div>
    );
  }

  if (error) {
    return <div className="bg-beige min-h-screen">{error}</div>;
  }

  return (
    <div className="bg-beige min-h-screen">
      {restaurants.length > 0 ? (
        restaurants.map((restaurant, index) => (
          <CarouselCard
            key={restaurant.restaurant_id}
            restaurant={restaurant}
            cardIndex={index}
            restaurantArrayLength={restaurants.length}
          />
        ))
      ) : (
        <p>No restaurants available</p>
      )}
    </div>
  );
};

export default VotingPage;
