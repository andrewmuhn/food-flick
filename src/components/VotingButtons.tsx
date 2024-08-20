import { postNewVote } from "../services/VoteService";
import { createVoteForRestaurant } from "../utils/DinnerPartyApiMappers";
import { useDinnerPartyContext } from "./Context/DinnerPartyContext";

interface VotingButtonsProps {
  restaurantId: number;
}


const VotingButtons: React.FC<VotingButtonsProps> = ({ restaurantId }) => {
  
  const { removeRestaurantToRender } = useDinnerPartyContext();

  const handleVoteFalse = async (restaurantId: number) => {
    const createdVote = createVoteForRestaurant(restaurantId, false);
    await postNewVote(createdVote, restaurantId);
    removeRestaurantToRender(restaurantId);
  };
  
  const handleVoteTrue = async (restaurantId: number) => {
    const createdVote = createVoteForRestaurant(restaurantId, true);
    await postNewVote(createdVote, restaurantId);
    removeRestaurantToRender(restaurantId);
  };
  return (
    <div className="flex flex-row justify-center space-x-4">
      <div
        onClick={() => handleVoteFalse(restaurantId)}
        className="text-orange cursor-pointer space-x-4 bg-white rounded-full shadow-md active:translate-y-0.5 hover:bg-gray-200"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-10 w-10"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <circle cx="12" cy="12" r="10" fill="currentColor" />
          <path
            fillRule="evenodd"
            d="M8.293 9.293a1 1 0 011.414 0L12 11.586l2.293-2.293a1 1 0 011.414 1.414L13.414 13l2.293 2.293a1 1 0 01-1.414 1.414L12 14.414l-2.293 2.293a1 1 0 01-1.414-1.414L10.586 13 8.293 10.707a1 1 0 010-1.414z"
            clipRule="evenodd"
            fill="white"
          />
        </svg>
      </div>

      <div
        onClick={() => handleVoteTrue(restaurantId)}
        className="text-green cursor-pointer space-x-4 bg-white rounded-full shadow-md active:translate-y-0.5 hover:bg-gray-200"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-10 w-10"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <circle cx="12" cy="12" r="10" fill="currentColor" />
          <path
            fillRule="evenodd"
            d="M16.7071,8.29289 C17.0976,8.68342 17.0976,9.31658 16.7071,9.70711 L10.7071,15.7071 C10.3166,16.0976 9.68342,16.0976 9.29289,15.7071 L6.29289,12.7071 C5.90237,12.3166 5.90237,11.6834 6.29289,11.2929 C6.68342,10.9024 7.31658,10.9024 7.70711,11.2929 L10,13.5858 L15.2929,8.29289 C15.6834,7.90237 16.3166,7.90237 16.7071,8.29289 Z"
            clipRule="evenodd"
            fill="white"
          />
        </svg>
      </div>
    </div>
  );
};

export default VotingButtons;
