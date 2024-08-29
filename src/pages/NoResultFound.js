import React from "react";
import { Link } from "react-router-dom";
import NoResults from "../assets/images/no-result-found.png";
import Button from "../ui/Button";

export default function NoResultFound({ searchTerm }) {
  return (
    <div className="flex flex-col items-center justify-center h-full py-10 bg-white :">
      <div className="flex flex-col items-center max-w-md px-4 py-8 text-center">
        <img src={NoResults} alt="No results found" className="w-1.5/2 mb-4" />
        <h2 className="text-xl font-semibold text-gray-800 ">
          Oops! No Results Found
        </h2>
        <p className="mt-2 text-sm text-gray-600 ">
          We couldn't find any results for{" "}
          <span className="font-semibold text-gray-900 ">"{searchTerm}"</span>.
          Try different keywords or explore our categories.
        </p>
        <Button className="mt-7">
          <Link to="/">Go back Home</Link>
        </Button>
      </div>
    </div>
  );
}
