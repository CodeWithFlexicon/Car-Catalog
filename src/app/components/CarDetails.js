"use client";
import React, { useState, useEffect } from "react";

function CarDetails({ make, model, year, trim }) {
  const [carDetails, setCarDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch data when the component mounts
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          `/api/cars/${make}/${model}?year=${year}&trim=${trim}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setCarDetails(data);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setIsLoading(false);
      }
    }

    if (makeId && modelId) {
      fetchData();
    }
  }, [make, model, year, trim]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!carDetails) {
    return <p>No details available</p>;
  }

  // Render your component with carDetails data
  return (
    <div>
      <h1>Car Details</h1>
      {/* Render car details based on fetched data */}
      <div>
        <h2>
          {carDetails.make_name} {carDetails.model_name} {carDetails.year}
        </h2>
        <p>{carDetails.description}</p>
        {/* Add more details as needed */}
      </div>
    </div>
  );
}

export default CarDetails;
