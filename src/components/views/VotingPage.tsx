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
      <h1 className="text-4xl font-bold mt-6 mb-4 text-green">{dinnerParty.party_name}</h1>
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
              <>
                <h2 className="text-3xl font-bold mt-12 mb-4 text-green">
                  The polls are still open. Hit the lock button to count the votes!
                </h2>
                <div className="flex justify-center items-center mt-4">
                  <img 
                    src="/lockstress.jpg" 
                    alt="Lock 'Em" 
                    className="w-80 h-auto mt-6"
                  />
                </div>
              </>
            ) : (
              <>
                <h2 className="text-3xl font-bold mt-12 mb-4 text-green">
                  Votes are still being counted, check back to see the results!
                </h2>
                <div className="flex justify-center items-center mt-4">
                  <img 
                    src="/sad-pablo-lonely.gif" 
                    alt="Count the votes" 
                    className="w-120 h-auto mt-6"
                  />
                </div>
              </>
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
