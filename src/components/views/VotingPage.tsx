import React, { useEffect, useState } from "react";
import { useAuthenticator } from "@aws-amplify/ui-react";
import CarouselCard from "../CarouselCard";
import { Restaurant } from "../../models/Restaurant";
import { getDinnerPartyById } from "../../services/DinnerPartyService";
import LoadingState from "../LoadingState";
import LockVotesButton from "../LockVotesButton";

const VotingPage: React.FC = () => {
  const [dinnerParty, setDinnerParty] = useState<any>(null);
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuthenticator();

  useEffect(() => {
    const pathParameter = Number(window.location.pathname.split("/")[2]);

    const fetchDinnerParty = async (dinnerPartyId: number) => {
      try {
        const dinnerParty = await getDinnerPartyById(dinnerPartyId);
        setDinnerParty(dinnerParty);
        setRestaurants(dinnerParty.restaurants);
        setLoading(false);
      } catch {
        setError("Failed to fetch dinner party info");
        setLoading(false);
      }
    };

    fetchDinnerParty(pathParameter);
  }, []);

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

  const isAdmin = user.username === dinnerParty.createdBy;
  const isVotingLocked = dinnerParty.voting_locked;

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
