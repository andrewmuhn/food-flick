import React from "react";
import { Restaurant } from "../models/Restaurant";
import VotingButtons from "./VotingButtons";

interface CarouselCardProps {
  restaurant: Restaurant;
  cardIndex: number;
  resturantArrayLength: number;
}

const CarouselCard: React.FC<CarouselCardProps> = ({
  restaurant,
  cardIndex,
  resturantArrayLength,
}) => {
  let nextCard = (cardIndex + 1).toString();
  let previousCard = (cardIndex - 1).toString();

  if (cardIndex === resturantArrayLength - 1) {
    nextCard = "0";
  }
  if (cardIndex === 0) {
    previousCard = (resturantArrayLength - 1).toString();
  }

  return (
    <div className="">
      <input
        className="sr-only peer"
        type="radio"
        name="carousel"
        id={cardIndex.toString()}
        checked
      />
      {/* <!-- content --> */}
      <div className="w-96 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-lg transition-all duration-300 opacity-0 peer-checked:opacity-100 peer-checked:z-10 z-0">
        <img className="rounded-t-lg w-96 h-64" src={restaurant.yelpMetaData.image_url} />
        <div className="py-4 px-8">
          <h1 className="hover:cursor-pointer mt-2 text-gray-900 font-bold text-2xl tracking-tight">
            {restaurant.yelpMetaData.name}
          </h1>
          <img
            className="rounded-t-lg mx-auto my-4"
            src={
              "src/assets/YelpAssets/Desktop/small_16/" + restaurant.yelpMetaData.stars_url
            }
          />
          <p className="hover:cursor-pointer py-3 text-gray-600 leading-6">
            {restaurant.yelpMetaData.price ? restaurant.yelpMetaData.price : "N/A"}
          </p>
          <p className="hover:cursor-pointer py-3 text-gray-600 leading-6">
            {restaurant.yelpMetaData.address}
          </p>
        </div>
        {/* <!-- controls --> */}
        <div className="absolute top-1/2 w-full flex justify-between z-20">
          <label
            htmlFor={previousCard}
            className="inline-block text-orange cursor-pointer -translate-x-5 bg-white rounded-full shadow-md active:translate-y-0.5"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm.707-10.293a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L9.414 11H13a1 1 0 100-2H9.414l1.293-1.293z"
                clipRule="evenodd"
              />
            </svg>
          </label>
          <label
            htmlFor={nextCard}
            className="inline-block text-orange cursor-pointer translate-x-2 bg-white rounded-full shadow-md active:translate-y-0.5"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </label>
        </div>
        <div className="flex justify-center w-full">
            <VotingButtons restaurantId={restaurant.restaurant_id} />
          </div>
      </div>
    </div>
  );
};

export default CarouselCard;
