import React, { useState } from "react";

const LandingPage: React.FC = () => {
    const [selectedDinnerParty, setSelectedDinnerParty] = useState<string>("");
    const [selectedHostedParty, setSelectedHostedParty] = useState<string>("");

    const handleCreateParty = () => {
        // Logic for creating a party
        console.log("Create party button clicked");
    };

    return (
        <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md space-y-4">
            <div>
                <select
                    id="dinnerParties"
                    value={selectedDinnerParty}
                    onChange={(e) => setSelectedDinnerParty(e.target.value)}
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                >
                    <option value="">Select a dinner party</option>
                    {/* Add options dynamically or statically */}
                    <option value="party1">Party 1</option>
                    <option value="party2">Party 2</option>
                </select>
            </div>
            <div>
                <select
                    id="hostedParties"
                    value={selectedHostedParty}
                    onChange={(e) => setSelectedHostedParty(e.target.value)}
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                >
                    <option value="">Select a hosted party</option>
                    {/* Add options dynamically or statically */}
                    <option value="hosted1">Hosted Party 1</option>
                    <option value="hosted2">Hosted Party 2</option>
                </select>
            </div>
            <button
                onClick={handleCreateParty}
                className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
                Create party
            </button>
        </div>
    );
};

export default LandingPage;