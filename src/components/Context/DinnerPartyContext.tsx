import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { useParams } from "react-router-dom";
import { getDinnerPartyById } from "../../services/DinnerPartyService";
import { Restaurant } from "../../models/Restaurant";
import { DinnerParty } from "../../models/DinnerParty";
import { useAuthenticator } from "@aws-amplify/ui-react";

interface DinnerPartyContextProps {
  dinnerParty: DinnerParty | undefined;
  restaurants: Restaurant[];
  loading: boolean;
  error: string | null;
  removeRestaurantToRender: (restaurantId: number) => void;
}

const DinnerPartyContext = createContext<DinnerPartyContextProps | undefined>(
  undefined
);

export const DinnerPartyProvider = ({ children }: { children: ReactNode }) => {
  const { dinnerPartyId } = useParams<{ dinnerPartyId: string }>();
  const [dinnerParty, setDinnerParty] = useState<DinnerParty>();
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const dinnerPartyId = Number(window.location.pathname.split("/")[2]);
    if (!dinnerPartyId) return;

    const fetchDinnerParty = async (id: number) => {
      try {
        const response = await getDinnerPartyById(id);
        setDinnerParty(response);
        filterRestaurantsToRender(response);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch dinner party info");
        setLoading(false);
      }
    };

    fetchDinnerParty(dinnerPartyId);
  }, [dinnerPartyId]);

  const { user } = useAuthenticator((context) => [context.user]);

  const filterRestaurantsToRender = (dinnerParty: DinnerParty) => {
    const allRestaurantsInDinnerParty: Restaurant[] = dinnerParty.restaurants;

    const filteredRestaurants = allRestaurantsInDinnerParty.filter(
      (restaurant) => {
        return !restaurant.votes.some((vote) => vote.createdBy === user.userId);
      }
    );

    setRestaurants(filteredRestaurants);
  };

  const removeRestaurantToRender = (restaurantId: number) => {
    setRestaurants((prevRestaurants: Restaurant[]) =>
      prevRestaurants.filter(
        (restaurant) => restaurant.restaurant_id !== restaurantId
      )
    );
  };

  return (
    <DinnerPartyContext.Provider
      value={{
        dinnerParty,
        restaurants,
        loading,
        error,
        removeRestaurantToRender,
      }}
    >
      {children}
    </DinnerPartyContext.Provider>
  );
};

export const useDinnerPartyContext = () => {
  const context = useContext(DinnerPartyContext);
  if (context === undefined) {
    throw new Error("useDinnerParty must be used within a DinnerPartyProvider");
  }
  return context;
};
