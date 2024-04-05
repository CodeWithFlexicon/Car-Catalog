"use client";
import React, { useState, useEffect } from "react";

function CarDetails({ makeId, modelId }) {
  const [carDetails, setCarDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch data when the component mounts
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`/api/cars/${makeId}/${modelId}`);
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
  }, [makeId, modelId]);

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
      {/* Render your car details based on fetched data */}
    </div>
  );
}

export default CarDetails;
