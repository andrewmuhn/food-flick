<<<<<<< Updated upstream
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
=======
import React, { useEffect, useState } from "react";
>>>>>>> Stashed changes
import CarouselCard from "../CarouselCard";
import LoadingState from "../LoadingState";
import { useDinnerPartyContext } from "../Context/DinnerPartyContext";
import { useAuthenticator } from "@aws-amplify/ui-react";
import LockVotesButton from "../LockVotesButton";
import UserAfterVote from "../UserAfterVote";
import AdminAfterVote from "../AdminAfterVote";

const VotingPage: React.FC = () => {
<<<<<<< Updated upstream
  const { restaurants, dinnerParty, loading, error } = useDinnerPartyContext();
=======
  const { restaurants, dinnerParty, error } = useDinnerPartyContext();

>>>>>>> Stashed changes
  const { user } = useAuthenticator();
  const navigate = useNavigate(); // Added for redirection

  useEffect(() => {
    if (dinnerParty && dinnerParty.finalized) {
      navigate(`/dinnerparty/${dinnerParty.dinner_party_id}/results`);
    }
  }, [dinnerParty, navigate]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (dinnerParty && restaurants.length > 0) {
      setLoading(false);
    }
  }, [dinnerParty, restaurants]);

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
<<<<<<< Updated upstream
      <h1 className="text-4xl font-bold mt-6 text-green">{dinnerParty.party_name}</h1>
=======
      <h1 className="text-4xl font-bold mt-6 mb-4 text-green">
        {dinnerParty.party_name}
      </h1>
>>>>>>> Stashed changes
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
            {isAdmin && !isVotingLocked ? (
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
