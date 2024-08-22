import React from "react";
import { useNavigate } from "react-router-dom";
import { lockVotes } from "../services/DinnerPartyService";

interface LockVotesButtonProps {
  dinnerPartyId: number;
}

const LockVotesButton: React.FC<LockVotesButtonProps> = ({ dinnerPartyId }) => {
  const navigate = useNavigate();

  const handleLockVotesSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await lockVotes(dinnerPartyId);
    navigate(`/dinnerparty/${dinnerPartyId}/results`);
  };

  return (
    <div>
      <button
        type="submit"
        onClick={handleLockVotesSubmit}
        className="inline-flex items-center justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green hover:bg-green-dark focus:bg-green-dark focus:outline-none"
      >
        <svg
          height="15px"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="mr-2"
        >
          <path
            d="M12 4c1.648 0 3 1.352 3 3v3H9V7c0-1.648 1.352-3 3-3zm5 6V7c0-2.752-2.248-5-5-5S7 4.248 7 7v3H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8a2 2 0 0 0-2-2h-1zM6 12h12v8H6v-8z"
            fill="white"
          />
        </svg>
        Lock Votes
      </button>
    </div>
  );
};

export default LockVotesButton;
