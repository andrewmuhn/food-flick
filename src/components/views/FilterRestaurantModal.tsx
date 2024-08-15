import React, { useState, useCallback, useEffect } from "react";
import geoapifyApiInstance from "../../utils/GeoapifyApiInstance";
import yelpApiInstance from "../../utils/YelpApiInstance"; // Import your Yelp API instance
import debounce from "lodash.debounce";
import { getYelpInfo } from "../../services/YelpService";

interface FilterRestaurantModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyFilters: (filters: {
    location: string;
    radius: number;
    priceRange: number;
    isVegetarian: boolean;
    isVegan: boolean;
  }) => void;
}

const FilterRestaurantModal: React.FC<FilterRestaurantModalProps> = ({
  isOpen,
  onClose,
  onApplyFilters,
}) => {
  const [locationInput, setLocationInput] = useState<string>("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [selectedSuggestion, setSelectedSuggestion] = useState<string>("");
  const [radiusInput, setRadiusInput] = useState("");
  const [priceInput, setPriceInput] = useState("");
  const [isVegetarian, setIsVegetarian] = useState<boolean>(false);
  const [isVegan, setIsVegan] = useState<boolean>(false);
  const [isValidLocation, setIsValidLocation] = useState<boolean>(true); // For location validation
  const [restaurants, setRestaurants] = useState<RestaurantInfo[]>([]);

  // Function to fetch location suggestions
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
          (feature: any) => feature.properties.formatted
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

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    if (name === "vegetarian") {
      setIsVegetarian(checked);
    } else if (name === "vegan") {
      setIsVegan(checked);
    }
  };

  const handleRestaurantSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    const location = locationInput;
    const term = "restaurants";
    const limit = 10; // Increase the limit if you want to fetch more restaurants
    
    const requestUrl = `/businesses/search?location=${encodeURIComponent(location)}&term=${term}&limit=${limit}`;
    
    console.log("Request URL:", requestUrl);
  
    try {
      const response = await yelpApiInstance.get(requestUrl);
      console.log("Yelp API response:", response.data);
  
      // Validate based on the actual response data
      const businesses = response.data.businesses;
      if (businesses.length < 3) {
        console.log("Less than 3 businesses found");
        setIsValidLocation(false);
        return;
      }
  
      console.log("3 or more businesses found");
      setIsValidLocation(true); // Clear the error state if valid response
  
      // Apply filters if the number of restaurants is sufficient
      onApplyFilters({
        location: locationInput,
        radius: Number(radiusInput),
        priceRange: Number(priceInput),
        isVegetarian,
        isVegan,
      });
      onClose();
    } catch (error) {
      console.error("Error fetching restaurants from Yelp:", error);
      setIsValidLocation(false);
    }
  
    const fetchRestaurants = async () => {
      console.log("Fetching restaurants with:", locationInput, radiusInput, priceInput);
      try {
        const restaurantResults = await getYelpInfo(
          locationInput,
          radiusInput,
          priceInput
        );
        console.log("Api data: ", restaurantResults);
        setRestaurants(restaurantResults);
      } catch (error) {
        console.error("Failed to fetch list of restaurants", error);
      }
    };
  
    fetchRestaurants();
  };  

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-55">
      <div className="bg-white p-6 rounded-lg shadow-lg w-2/4 h-50">
        <h2 className="text-xl font-bold mb-4">Filter Restaurants</h2>
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
              Radius(in miles)
            </label>
            <input
              type="number"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              placeholder="MAX 25"
              max="25"
              id="miles"
              value={radiusInput}
              onChange={(e) => setRadiusInput(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Price Range
            </label>
            <div className="flex justify-between text-xs px-1" id="price">
              <span className="w-8 text-left">$</span>
              <span className="w-8 text-left">$$</span>
              <span className="w-8">$$$</span>
              <span className="w-8 text-right">$$$$</span>
              <span className="w-8">$$$$$</span>
            </div>
            <input
              type="range"
              min="1"
              max="5"
              value={priceInput}
              className="mt-1 block w-full slider"
              onChange={(e) => setPriceInput(e.target.value)}
            />
          </div>
          <div className="mb-4">
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
          </div>
          <button
            type="submit"
            className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green hover:bg-green-dark focus:bg-green-dark focus:outline-none"
          >
            Apply Filters
          </button>
          {!isValidLocation && (
            <p className="text-red-500 mt-2">
              Not enough restaurants found. Please update your location and/or filters.
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default FilterRestaurantModal;