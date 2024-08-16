import React, { useState } from "react";
import CreatePartyModal from "../CreatePartyModal"; // Adjust path as needed
import FilterRestaurantModal from "../FilterRestaurantModal"; // Adjust path as needed
import PartyDropdowns from "../PartyDropdowns"; // Adjust path as needed
import { DinnerParty } from "../../models/DinnerParty";

const LandingPage: React.FC = () => {
  const [selectedDinnerParty, setSelectedDinnerParty] = useState<string>("");
  const [selectedHostedParty, setSelectedHostedParty] = useState<string>("");
  const [isPartyModalOpen, setIsPartyModalOpen] = useState<boolean>(false);
  const [isRestaurantModalOpen, setIsRestaurantModalOpen] =
    useState<boolean>(false);

  const [dinnerPartyId, setDinnerPartyId] = useState<number>(1);

  const handleCreateParty = () => {
    setIsPartyModalOpen(true);
  };

  const handlePartyModalSubmit = (dinnerParty: DinnerParty) => {
    console.log("Dinner Party:", dinnerParty);
    setIsPartyModalOpen(false);
    setDinnerPartyId(dinnerParty.dinner_party_id);
    setIsRestaurantModalOpen(true);
  };

  const handleRedirect = (dinnerPartyId: number) => {
    // Redirect or proceed to /vote
    window.location.href = `/vote/${dinnerPartyId}`; // Adjust this line based on your routing setup
  };

  return (
    <div>
      <div>
        <h1 className="text-3xl font-bold text-center mt-8">
          Welcome to FoodFlick!
        </h1>
      </div>
      <div
        className={`p-6 max-w-md mx-auto bg-white rounded-xl shadow-md space-y-4 ${
          isPartyModalOpen || isRestaurantModalOpen ? "blur" : ""
        }`}
      >
        <PartyDropdowns
          selectedDinnerParty={selectedDinnerParty}
          setSelectedDinnerParty={setSelectedDinnerParty}
          selectedHostedParty={selectedHostedParty}
          setSelectedHostedParty={setSelectedHostedParty}
          handleCreateParty={handleCreateParty}
        />
      </div>

      {/* Create Party Modal */}
      <CreatePartyModal
        isOpen={isPartyModalOpen}
        onClose={() => setIsPartyModalOpen(false)}
        handlePartyModalSubmit={handlePartyModalSubmit}
      />

      {/* Filter Restaurant Modal */}
      <FilterRestaurantModal
        isOpen={isRestaurantModalOpen}
        handleRedirect={handleRedirect}
        dinnerPartyId={dinnerPartyId}
      />
    </div>
  );
};

export default LandingPage;
