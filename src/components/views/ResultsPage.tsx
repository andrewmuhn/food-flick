import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getDinnerPartyById } from "../../services/DinnerPartyService";
import LoadingState from "../LoadingState";
import CarouselCard from "../CarouselCard";
import { Restaurant } from "../../models/Restaurant";

const ResultsPage: React.FC = () => {
  const { dinnerPartyId } = useParams<{ dinnerPartyId: string }>();
  const [dinnerParty, setDinnerParty] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDinnerParty = async () => {
      try {
        const response = await getDinnerPartyById(Number(dinnerPartyId));
        setDinnerParty(response);
        setLoading(false);
      } catch {
        setError("Failed to fetch dinner party details");
        setLoading(false);
      }
    };
    fetchDinnerParty();
  }, [dinnerPartyId]);

  if (loading) {
    return (
      <div className="bg-beige min-h-screen flex items-center justify-center">
        <LoadingState loadingMessage={"Drumroll please..."} />
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

  if (!dinnerParty) {
    return (
      <div className="bg-beige min-h-screen flex items-center justify-center">
        <p>No results available yet.</p>
      </div>
    );
  }

  const winningRestaurants = dinnerParty.restaurants.filter(
    (restaurant: { winner: boolean }) => restaurant.winner
  );

  return (
    <div className="bg-beige min-h-screen flex flex-col items-center justify-center space-y-4 p-4">
      <h1 className="text-4xl font-bold mt-8 text-green">
        
        {winningRestaurants.length === 1
        
          ? `${dinnerParty.party_name}'s winner is:`
          : winningRestaurants.length > 1
          ? `${dinnerParty.party_name} has ${winningRestaurants.length} winners!`
          : "No winners found."}
      </h1>
      {winningRestaurants.length > 0 ? (
        <div className="flex-1 p-4">
          {winningRestaurants.map((restaurant: Restaurant, index: number) => (
            <CarouselCard
              key={restaurant.restaurant_id}
              restaurant={restaurant}
              cardIndex={index}
              restaurantArrayLength={winningRestaurants.length}
            />
          ))}
        </div>
      ) : (
        <p className="text-lg text-red-500">No winners found.</p>
      )}
    </div>
  );
};

export default ResultsPage;
