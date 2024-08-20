import React from "react";
import CarouselCard from "../CarouselCard";
import LoadingState from "../LoadingState";
import { useDinnerPartyContext } from "../Context/DinnerPartyContext";

const VotingPage: React.FC = () => {
  const { restaurants, loading, error } =
    useDinnerPartyContext();

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
