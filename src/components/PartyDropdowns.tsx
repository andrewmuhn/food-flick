import React from "react";

interface PartyDropdownsProps {
  selectedDinnerParty: string;
  setSelectedDinnerParty: (value: string) => void;
  selectedHostedParty: string;
  setSelectedHostedParty: (value: string) => void;
  handleCreateParty: () => void;
}

const PartyDropdowns: React.FC<PartyDropdownsProps> = ({
  selectedDinnerParty,
  setSelectedDinnerParty,
  selectedHostedParty,
  setSelectedHostedParty,
  handleCreateParty,
}) => {
  return (
    <div>
      <div>
        <label
          htmlFor="dinnerParties"
          className="block text-sm font-medium text-gray-700"
        >
          Dinner Parties
        </label>
        <select
          id="dinnerParties"
          value={selectedDinnerParty}
          onChange={(e) => setSelectedDinnerParty(e.target.value)}
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
        >
          <option value="">Select a dinner party</option>
          {/* Add options dynamically or statically */}
        </select>
      </div>
      <div>
        <label
          htmlFor="hostedParties"
          className="block text-sm font-medium text-gray-700"
        >
          Your hosted parties
        </label>
        <select
          id="hostedParties"
          value={selectedHostedParty}
          onChange={(e) => setSelectedHostedParty(e.target.value)}
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
        >
          <option value="">Select a hosted party</option>
          {/* Add options dynamically or statically */}
        </select>
      </div>
      <button
        onClick={handleCreateParty}
        className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green hover:bg-green-dark focus:bg-green-dark focus:outline-none"
      >
        Create party
      </button>
    </div>
  );
};

export default PartyDropdowns;