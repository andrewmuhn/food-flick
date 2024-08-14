import { useEffect, useState } from "react";
import { getYelpInfo } from "../../services/YelpService";
import { RestaurantInfo } from "../../models/RestaurantInfo";

const VotingPage: React.FC = () => {
  const [restaurants, setRestaurants] = useState<RestaurantInfo[]>([]);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const restaurantResults = await getYelpInfo();
        console.log("Api data: ", restaurantResults);
        setRestaurants(restaurantResults);
      } catch (error) {
        console.error("Failed to fetch list of restaurants", error);
      }
    };
    fetchRestaurants();
  }, []);

  return (
    <div>
      <p>Restaurants</p>
    </div>
  );
};

export default VotingPage;
