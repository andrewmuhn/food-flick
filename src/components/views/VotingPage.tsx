import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CarouselCard from "../CarouselCard";
import LoadingState from "../LoadingState";
import { useDinnerPartyContext } from "../Context/DinnerPartyContext";
import { useAuthenticator } from "@aws-amplify/ui-react";
import LockVotesButton from "../LockVotesButton";
import UserAfterVote from "../UserAfterVote";
import AdminAfterVote from "../AdminAfterVote";

const VotingPage: React.FC = () => {
  const { restaurants, dinnerParty, loading, error } = useDinnerPartyContext();

  const { user } = useAuthenticator();
  const navigate = useNavigate(); // Added for redirection

  useEffect(() => {
    if (dinnerParty && dinnerParty.finalized) {
      navigate(`/dinnerparty/${dinnerParty.dinner_party_id}/results`);
    }
  }, [dinnerParty, navigate]);

  if (loading || !dinnerParty) {
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
  const isVotingLocked = dinnerParty.finalized;

  return (
    <div className="bg-beige min-h-screen flex flex-col">
      <h1 className="text-4xl font-bold mt-8 mb-4 text-green">
        {dinnerParty.party_name}
      </h1>
      <h4 className="font-medium text-green">
        {dinnerParty.location}
      </h4>
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
          <>
            {isAdmin && !isVotingLocked && dinnerParty ? (
              <AdminAfterVote />
            ) : (
              <UserAfterVote />
            )}
          </>
        )}
      </div>
      <div className="p-4 mb-32">
        {isAdmin && !isVotingLocked && (
          <LockVotesButton dinnerPartyId={dinnerParty.dinner_party_id} />
        )}
      </div>
    </div>
  );
};

export default VotingPage;
