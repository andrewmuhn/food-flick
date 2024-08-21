import React from "react";
import { Restaurant } from "../models/Restaurant";
import VotingButtons from "./VotingButtons";

interface CarouselCardProps {
  restaurant: Restaurant;
  cardIndex: number;
  restaurantArrayLength: number;
}

const CarouselCard: React.FC<CarouselCardProps> = ({
  restaurant,
  cardIndex,
  restaurantArrayLength,
}) => {
  const nextCard =
    cardIndex === restaurantArrayLength - 1 ? "0" : (cardIndex + 1).toString();
  const previousCard =
    cardIndex === 0
      ? (restaurantArrayLength - 1).toString()
      : (cardIndex - 1).toString();

  return (
    <div className="">
      <input
        className="sr-only peer"
        type="radio"
        name="carousel"
        id={cardIndex.toString()}
        checked
        readOnly
      />
      {/* <!-- content --> */}
      <div className="w-96 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-lg transition-all duration-300 opacity-0 peer-checked:opacity-100 peer-checked:z-10 z-0">
        <a
          href={restaurant.yelpMetaData.url}
          target="_blank"
          rel="noopener noreferrer"
          className="relative block"
        >
          <img
            className="rounded-t-lg w-96 h-64 object-cover transition duration-300 ease-in-out hover:blur-sm"
            src={restaurant.yelpMetaData.image_url}
            alt={`Link to ${restaurant.yelpMetaData.name} on Yelp`}
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition duration-300 ease-in-out">
            <span className="text-white text-lg font-bold">Visit on Yelp</span>
          </div>
        </a>
        <div className="py-4 px-8">
          <h1 className="mt-2 text-gray-900 font-bold text-2xl tracking-tight">
            {restaurant.yelpMetaData.name}
          </h1>
          <p className="py-3 text-gray-600 leading-6">
            {restaurant.yelpMetaData.address}
          </p>
          <div className="flex items-center justify-center">
            <img
              className="object-contain h-6"
              src={
                "https://foodflickimages.s3.us-east-2.amazonaws.com/assets/YelpAssets/Desktop/small_16/" +
                restaurant.yelpMetaData.stars_url
              }
              alt={`${restaurant.yelpMetaData.review_count} stars`}
            />
            <p className="text-gray-600 text-sm ml-1">
              ({restaurant.yelpMetaData.rating})
            </p>
          </div>
          <p className="text-gray-600 text-sm ml-2">
            Based on {restaurant.yelpMetaData.review_count} reviews
          </p>
          <p className="py-3 text-gray-900 leading-6">
            {restaurant.yelpMetaData.price
              ? restaurant.yelpMetaData.price
              : "N/A"}
          </p>
          <div className="flex justify-center">
            <ul className="flex space-x-2  text-gray-900 font-medium">
              {restaurant.yelpMetaData.categories.map((category, index) => (
                <React.Fragment key={index}>
                  <li>{category}</li>
                  {index < restaurant.yelpMetaData.categories.length - 1 && (
                    <span className="mx-2">•</span>
                  )}
                </React.Fragment>
              ))}
            </ul>
          </div>
        </div>
        {/* <!-- controls --> */}
        {restaurantArrayLength > 1 && (
          <div className="absolute top-1/2 w-full flex justify-between z-20">
            <label
              htmlFor={previousCard}
              className="inline-block text-orange cursor-pointer -translate-x-5 bg-white rounded-full shadow-md active:translate-y-0.5 hover:bg-gray-300"
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
              className="inline-block text-orange cursor-pointer translate-x-5 bg-white rounded-full shadow-md active:translate-y-0.5 hover:bg-gray-300"
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
        )}
        <div className="flex justify-center w-full pb-4">
          <VotingButtons restaurantId={restaurant.restaurant_id} />
          <div className="absolute bottom-3 right-3 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg p-2">
            <a
              href={restaurant.yelpMetaData.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                className="object-contain w-16"
                src={"/yelp_logo.png"}
                alt="Link to yelp page"
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarouselCard;
