import React, { useState } from "react";
import '../../index.css';

const LandingPage: React.FC = () => {
    const [selectedDinnerParty, setSelectedDinnerParty] = useState<string>("");
    const [selectedHostedParty, setSelectedHostedParty] = useState<string>("");
    const [isPartyModalOpen, setIsPartyModalOpen] = useState<boolean>(false);
    const [isRestaurantModalOpen, setIsRestaurantModalOpen] = useState<boolean>(false);

    const handleCreateParty = () => {
        setIsPartyModalOpen(true);
    };

    const handlePartySubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Logic to create a dinner party in the database
        setIsPartyModalOpen(false);
        setIsRestaurantModalOpen(true);
    };

    const handleRestaurantSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Logic to create the list of restaurants for the party in the database
        setIsRestaurantModalOpen(false);
    };

    return (
        <div>
            <div className={`p-6 max-w-md mx-auto bg-white rounded-xl shadow-md space-y-4 ${isPartyModalOpen || isRestaurantModalOpen ? 'blur' : ''}`}>
                <div>
                    <label htmlFor="dinnerParties" className="block text-sm font-medium text-gray-700">Dinner Parties</label>
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
                    <label htmlFor="hostedParties" className="block text-sm font-medium text-gray-700">Your hosted parties</label>
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

            {isPartyModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-2/4 h-50">
                        <h2 className="text-xl font-bold mb-4">Party Details</h2>
                        <form onSubmit={handlePartySubmit}>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Name</label>
                                <input type="text" className="mt-1 block w-full p-2 border border-gray-300 rounded-md" required />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Location</label>
                                <input type="text" className="mt-1 block w-full p-2 border border-gray-300 rounded-md" required />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Date</label>
                                <input type="date" className="mt-1 block w-full p-2 border border-gray-300 rounded-md" required />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Time</label>
                                <input type="time" className="mt-1 block w-full p-2 border border-gray-300 rounded-md" required />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Voting Strategy</label>
                                <select className="mt-1 block w-full p-2 border border-gray-300 rounded-md" required>
                                    <option value="">Select strategy</option>
                                    <option value="strategy1">Strategy 1</option>
                                    <option value="strategy2">Strategy 2</option>
                                </select>
                            </div>
                            <button
                              type="submit"
                              className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green hover:bg-green-dark focus:bg-green-dark focus:outline-none"
                            >
                              Submit
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {isRestaurantModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-55">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-2/4 h-50">
                        <h2 className="text-xl font-bold mb-4">Filter Restaurants</h2>
                        <form onSubmit={handleRestaurantSubmit}>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Price Range</label>
                                <div className="flex justify-between text-xs px-2">
                                    <span>$</span>
                                    <span className="ml-4">$$</span>
                                    <span className="ml-2">$$$</span>
                                    <span className="ml-2">$$$$</span>
                                    <span>$$$$$</span>
                                </div>
                                <input type="range" min="1" max="5" className="mt-1 block w-full slider" />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Radius(in miles)</label>
                                <input type="number" className="mt-1 block w-full p-2 border border-gray-300 rounded-md" placeholder="MAX 25" max="25" required />
                            </div>
                            <div className="mb-4">
                                <input type="checkbox" name="vegetarian" className="mr-2" defaultChecked={false} /> Vegetarian
                            </div>
                            <div className="mb-4">
                                <input type="checkbox" name="vegan" className="mr-2" defaultChecked={false} /> Vegan
                            </div>
                            <button type="submit" className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green hover:bg-green-dark focus:bg-green-dark focus:outline-none">
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default LandingPage;