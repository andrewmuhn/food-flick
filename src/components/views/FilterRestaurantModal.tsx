import React, { useState, useCallback, useEffect } from 'react';
import geoapifyApiInstance from '../../utils/GeoapifyApiInstance';
import yelpApiInstance from '../../utils/YelpApiInstance'; // Import your Yelp API instance
import debounce from 'lodash.debounce';

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

const FilterRestaurantModal: React.FC<FilterRestaurantModalProps> = ({ isOpen, onClose, onApplyFilters }) => {
    const [locationInput, setLocationInput] = useState<string>("");
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const [selectedSuggestion, setSelectedSuggestion] = useState<string>("");
    const [radius, setRadius] = useState<number>(0);
    const [priceRange, setPriceRange] = useState<number>(1); // Default value
    const [isVegetarian, setIsVegetarian] = useState<boolean>(false);
    const [isVegan, setIsVegan] = useState<boolean>(false);
    const [isValidLocation, setIsValidLocation] = useState<boolean>(true); // For location validation

    // Function to fetch location suggestions
    const fetchLocationSuggestions = useCallback(
        debounce(async (input: string) => {
            if (input.length < 3 || input === selectedSuggestion) {
                setSuggestions([]);
                return;
            }

            try {
                const response = await geoapifyApiInstance.get('/geocode/autocomplete', {
                    params: { text: input },
                });

                const results = response.data.features.map((feature: any) => feature.properties.formatted);
                setSuggestions(results);
            } catch (error) {
                console.error('Error fetching location suggestions:', error);
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

    const handleRadiusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setRadius(Number(e.target.value));
    };

    const handlePriceRangeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPriceRange(Number(e.target.value));
    };

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = e.target;
        if (name === 'vegetarian') {
            setIsVegetarian(checked);
        } else if (name === 'vegan') {
            setIsVegan(checked);
        }
    };

    // Function to validate location using Yelp
    const validateLocationWithYelp = async (location: string) => {
        try {
            const response = await yelpApiInstance.get('/businesses/search', {
                params: {
                    location,
                    term: 'restaurants', // To ensure we are searching for restaurants
                    limit: 1 // We only need to check if there is at least one result
                },
            });

            // Check if Yelp returns any businesses
            return response.data.businesses.length > 0;
        } catch (error) {
            console.error('Error validating location with Yelp:', error);
            return false;
        }
    };

    const handleRestaurantSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const validLocation = await validateLocationWithYelp(locationInput);

        if (validLocation) {
            onApplyFilters({
                location: locationInput,
                radius,
                priceRange,
                isVegetarian,
                isVegan
            });
            setIsValidLocation(true); // Reset valid location state
            onClose(); // Close the modal
        } else {
            setIsValidLocation(false); // Set invalid location state
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-55">
            <div className="bg-white p-6 rounded-lg shadow-lg w-2/4 h-50">
                <h2 className="text-xl font-bold mb-4">Filter Restaurants</h2>
                <form onSubmit={handleRestaurantSubmit}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Location</label>
                        <input
                            type="text"
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                            required
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
                                        className="p-2 hover:bg-gray-200 cursor-pointer"
                                    >
                                        {suggestion}
                                    </li>
                                ))}
                            </ul>
                        )}
                        {!isValidLocation && (
                            <p className="text-red-500 text-xs mt-2">Please enter a valid location.</p>
                        )}
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Radius (in miles)</label>
                        <input
                            type="text" // Changed to text input to use placeholder
                            value={radius === 0 ? '' : radius} // Show empty string when default value is 0
                            onChange={handleRadiusChange}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                            placeholder="MAX 25"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Price Range</label>
                        <div className="flex justify-between text-xs px-1">
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
                            value={priceRange}
                            onChange={handlePriceRangeChange}
                            className="mt-1 block w-full slider"
                        />
                    </div>
                    <div className="mb-4">
                        <input
                            type="checkbox"
                            name="vegetarian"
                            checked={isVegetarian}
                            onChange={handleCheckboxChange}
                        />
                        <label className="ml-2 text-sm font-medium text-gray-700">Vegetarian</label>
                    </div>
                    <div className="mb-4">
                        <input
                            type="checkbox"
                            name="vegan"
                            checked={isVegan}
                            onChange={handleCheckboxChange}
                        />
                        <label className="ml-2 text-sm font-medium text-gray-700">Vegan</label>
                    </div>
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

