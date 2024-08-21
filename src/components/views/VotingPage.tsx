import React from "react";
import CarouselCard from "../CarouselCard";
import LoadingState from "../LoadingState";
import { useDinnerPartyContext } from "../Context/DinnerPartyContext";
import { useAuthenticator } from "@aws-amplify/ui-react";
import LockVotesButton from "../LockVotesButton";

const VotingPage: React.FC = () => {
  const { restaurants, dinnerParty, loading, error } = useDinnerPartyContext();

  const { user } = useAuthenticator();

  if (loading) {
    return (
      <div className="bg-beige min-h-screen flex items-center justify-center">
        <LoadingState loadingMessage={"Prepping your restaurants..."} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-beige min-h-screen flex items-center justify-center">
        {error}
      </div>
    );
  }

  if (!dinnerParty) return null;

  console.log(dinnerParty);
  const isAdmin = user.username === dinnerParty.createdBy;
  const isVotingLocked = dinnerParty.finalized;

  return (
    <div className="bg-beige min-h-screen flex flex-col">
      <div className="flex-1 p-4">
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
      <div className="p-4 mb-40">
        {isAdmin && !isVotingLocked && (
          <LockVotesButton dinnerPartyId={dinnerParty.dinner_party_id} />
        )}
      </div>
    </div>
  );
};

export default VotingPage;
