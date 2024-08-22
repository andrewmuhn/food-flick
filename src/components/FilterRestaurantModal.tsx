import React, { useState, useCallback, useEffect } from "react";
import geoapifyApiInstance from "../utils/GeoapifyApiInstance";
import debounce from "lodash.debounce";
import { getYelpInfo } from "../services/YelpService";
import {
  createRestaurantForDinnerParty,
  updateLocationForDinnerParty,
} from "../utils/DinnerPartyApiMappers";
import { postNewRestaurant } from "../services/RestaurantService";
import { updateDinnerPartyLocationById } from "../services/DinnerPartyService";

interface FilterRestaurantModalProps {
  isOpen: boolean;
  dinnerPartyId: number;
  handleRedirect: (id: number, finalized: boolean) => void;
}

const FilterRestaurantModal: React.FC<FilterRestaurantModalProps> = ({
  isOpen,
  handleRedirect,
  dinnerPartyId,
}) => {
  const [locationInput, setLocationInput] = useState<string>("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [selectedSuggestion, setSelectedSuggestion] = useState<string>("");
  const [radiusInput, setRadiusInput] = useState("5");
  const [priceInput, setPriceInput] = useState("3");
  // const [isVegetarian, setIsVegetarian] = useState<boolean>(false);
  // const [isVegan, setIsVegan] = useState<boolean>(false);
  const [isValidYelpCall, setIsValidYelpCall] = useState<boolean>(true);

  const fetchLocationSuggestions = useCallback(
    debounce(async (input: string) => {
      if (input.length < 3 || input === selectedSuggestion) {
        setSuggestions([]);
        return;
      }

      try {
        const response = await geoapifyApiInstance.get(
          "/geocode/autocomplete",
          {
            params: { text: input },
          }
        );

        const results = response.data.features.map(
          (feature: { properties: { formatted: string } }) => feature.properties.formatted
        );
        setSuggestions(results);
      } catch (error) {
        console.error("Error fetching location suggestions:", error);
        setSuggestions([]);
      }
    }, 300),
    [selectedSuggestion]
  );

  useEffect(() => {
    if (locationInput.length >= 3) {
      fetchLocationSuggestions(locationInput);
    } else {
      setSuggestions([]);
    }
  }, [locationInput, fetchLocationSuggestions]);

  const handleSuggestionSelect = (suggestion: string) => {
    setLocationInput(suggestion);
    setSelectedSuggestion(suggestion);
    setSuggestions([]);
  };

  const handleRestaurantSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const fetchRestaurants = async () => {
      try {
        const restaurantResults = await getYelpInfo(
          locationInput,
          radiusInput,
          priceInput
        );

        if (restaurantResults.length < 3) {
          setIsValidYelpCall(false);
          return;
        }

        //TODO: add call to location endpoint here
        const updatedDinnerParty = updateLocationForDinnerParty(locationInput);
        await updateDinnerPartyLocationById(dinnerPartyId, updatedDinnerParty);

        restaurantResults.forEach(async (restaurant) => {
          const createdRestaurant = createRestaurantForDinnerParty(
            restaurant,
            dinnerPartyId
          );
          await postNewRestaurant(createdRestaurant, dinnerPartyId);
        });

        setIsValidYelpCall(true);
        handleRedirect(dinnerPartyId, false);
      } catch (error) {
        console.error("Failed to fetch list of restaurants", error);
      }
    };

    await fetchRestaurants();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-55">
      <div className="bg-white p-6 rounded-lg shadow-lg w-2/4 h-50">
        <h2 className="text-xl font-bold mb-4">Filter Restaurants</h2>
        {!isValidYelpCall && (
          <p className="text-orange font-bold mb-2">
            Not enough restaurants found. Please update your location and/or
            filters.
          </p>
        )}
        <form onSubmit={handleRestaurantSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Location
            </label>
            <input
              type="text"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              required
              id="location"
              value={locationInput}
              onChange={(e) => setLocationInput(e.target.value)}
              placeholder="Enter location"
            />
            {suggestions.length > 0 && (
              <ul className="mt-2 border border-gray-300 rounded-md bg-white">
                {suggestions.map((suggestion, index) => (
                  <li
                    key={index}
                    onClick={() => handleSuggestionSelect(suggestion)}
                  >
                    {suggestion}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Radius
            </label>
            <div className="relative mt-6">
              <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-6 text-sm text-gray-700">
                {radiusInput} miles
              </div>
              <input
                type="range"
                min="1"
                max="24"
                value={radiusInput}
                className="block w-full slider"
                onChange={(e) => setRadiusInput(e.target.value)}
              />
            </div>
            <div className="flex justify-between text-xs px-1" id="radius">
              <span className="w-8 text-left">1</span>
              <span className="w-8 text-center">12</span>
              <span className="w-8 text-right">24</span>
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Price Range
            </label>
            <select
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              value={priceInput}
              onChange={(e) => setPriceInput(e.target.value)}
              required
            >
              <option value="1">$</option>
              <option value="2">$$</option>
              <option value="3">$$$</option>
              <option value="4">$$$$</option>
            </select>
          </div>
          {/* <div className="mb-4">
            <input
              type="radio"
              name="dietaryChoice"
              id="vegetarian"
              value="vegetarian"
            />
            <label className="ml-2 text-sm font-medium text-gray-700">
              Vegetarian
            </label>
          </div>
          <div className="mb-4">
            <input type="radio" name="dietaryChoice" id="vegan" value="vegan" />
            <label className="ml-2 text-sm font-medium text-gray-700">
              Vegan
            </label>
          </div> */}
          <button
            type="submit"
            className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green hover:bg-green-dark focus:bg-green-dark focus:outline-none"
          >
            Apply Filters
          </button>
        </form>
      </div>
    </div>
  );
};

export default FilterRestaurantModal;
