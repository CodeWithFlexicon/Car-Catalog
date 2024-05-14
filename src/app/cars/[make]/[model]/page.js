"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

const CarModelPage = () => {
  const [carDetails, setCarDetails] = useState([]);
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedTrim, setSelectedTrim] = useState("");
  const [filteredTrims, setFilteredTrims] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);
  const [message, setMessage] = useState("");
  const { data: session } = useSession();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const pathParts = pathname.split("/").filter(Boolean); // Split and remove any empty strings
    if (pathParts.length >= 3) {
      const make = pathParts[1];
      const model = pathParts[2];

      fetch(`/api/cars/${make}/${model}`)
        .then((response) => response.json())
        .then((data) => {
          setCarDetails(data);

          // Set initial selectedYear and selectedTrim from query parameters
          const year = searchParams.get("year");
          const trim = searchParams.get("trim");
          if (year) {
            setSelectedYear(year);
          }
          if (trim) {
            setSelectedTrim(trim);
          }
        })
        .catch((error) => console.error("Failed to load car details:", error));
    }
  }, [pathname, searchParams]);

  useEffect(() => {
    if (selectedYear) {
      setFilteredTrims(
        carDetails.filter((car) => car.year.toString() === selectedYear)
      );
    } else {
      setFilteredTrims([]);
    }
  }, [selectedYear, carDetails]);

  useEffect(() => {
    if (session && selectedTrim) {
      checkFavoriteStatus(selectedTrim);
    }
  }, [session, selectedTrim]);

  const years = [
    ...new Set(carDetails.map((car) => car.year.toString())),
  ].sort();

  const handleYearChange = (e) => {
    setSelectedYear(e.target.value);
    setSelectedTrim("");
    setMessage(""); // Reset the message when user changes selection
  };

  const handleTrimChange = (e) => {
    setSelectedTrim(e.target.value);
    setMessage(""); // Reset the message when user changes selection
  };

  const toggleFavorite = async () => {
    if (!session) {
      router.push("/login");
      return;
    }

    if (!selectedYear || !selectedTrim) {
      setMessage("Please select a year and a trim.");
      return;
    }

    const endpoint = isFavorite
      ? "/api/favorites/remove"
      : "/api/favorites/add";
    const method = "POST";
    const response = await fetch(endpoint, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: session.user.id,
        makeModelTrimId: selectedTrim,
      }),
    });

    if (response.ok) {
      setIsFavorite(!isFavorite);
      setMessage("");
    } else {
      const errorData = await response.json();
      console.error("Error toggling favorite:", errorData.message);
      setMessage("Failed to toggle favorite. Please try again.");
    }
  };

  const checkFavoriteStatus = async (trimId) => {
    if (!session || !trimId) return;
    const response = await fetch(
      `/api/favorites/check/${session.user.id}/${trimId}`
    );
    if (response.ok) {
      const data = await response.json();
      setIsFavorite(data.isFavorite);
    }
  };

  const msrpNumber = (msrp) => {
    const msrpNumber = Number(msrp);
    return isNaN(msrpNumber)
      ? ""
      : msrpNumber.toLocaleString("en-US", {
          style: "decimal",
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        });
  };

  const selectedCar = carDetails.find(
    (car) => car.year.toString() === selectedYear && car.id === selectedTrim
  );

  if (carDetails.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex justify-center items-start mt-10 mx-20">
      <div className="w-1/2 p-5">
        <img
          src={selectedCar?.model_image || "/images/CarPlaceHolder.webp"}
          alt="Car"
          className="w-full h-auto rounded-lg shadow-lg"
        />
      </div>
      <div className="w-1/2 p-5">
        <h1 className="text-3xl font-bold mb-4">
          Car Details: {carDetails[0]?.make_name} {carDetails[0]?.model_name}
        </h1>

        <div className="mb-4">
          <select
            className="w-full p-2 border rounded-md text-3xl"
            value={selectedYear}
            onChange={handleYearChange}
          >
            <option value="">Select Year</option>
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <select
            className="w-full p-2 border rounded-md text-3xl"
            value={selectedTrim}
            onChange={handleTrimChange}
            disabled={!selectedYear}
          >
            <option value="">Select Trim</option>
            {filteredTrims.map((trim) => (
              <option key={trim.id} value={trim.id}>
                {trim.name} {trim.type}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={toggleFavorite}
          className={`p-2 text-white rounded-md ${
            isFavorite ? "bg-red-500" : "bg-blue-500"
          }`}
        >
          {isFavorite ? "Unfavorite" : "Favorite"}
        </button>
        {message && <p className="text-red-500 mt-2">{message}</p>}

        {selectedCar && (
          <div className="border p-4 rounded-lg">
            <h2 className="text-3xl font-semibold mb-2">
              Trim: {selectedCar.name}
            </h2>
            <details className="mb-3 text-2xl">
              <summary className="font-semibold">Description</summary>
              <p>Model: {selectedCar.name}</p>
              <p>Body Type: {selectedCar.type}</p>
              <p>Trim: {selectedCar.description}</p>
              <p>MSRP: $ {msrpNumber(selectedCar.msrp)}</p>
              <p>Transmission: {selectedCar.transmission}</p>
              <p>Drive Type: {selectedCar.drive_type}</p>
              <p>Doors: {selectedCar.doors}</p>
              {selectedCar.curb_weight && (
                <p>Curb Weight: {selectedCar.curb_weight} lbs</p>
              )}
              {selectedCar.gross_weight && (
                <p>Gross Weight: {selectedCar.gross_weight} lbs</p>
              )}
            </details>
            <details className="mb-3 text-2xl">
              <summary className="font-semibold">Engine Specifications</summary>
              <p>Engine Type: {selectedCar.engine_type}</p>
              <p>Engine Fuel: {selectedCar.fuel_type}</p>
              <p>Cylinders: {selectedCar.cylinders}</p>
              <p>
                Horsepower: {selectedCar.horsepower_hp} hp @{" "}
                {selectedCar.horsepower_rpm} rpm
              </p>
              <p>
                Torque: {selectedCar.torque_ft_lbs} ft-lbs @{" "}
                {selectedCar.torque_rpm} rpm
              </p>
              {/* Add more engine specifications as needed */}
            </details>
            {/* Add more categories as needed */}
          </div>
        )}
      </div>
    </div>
  );
};

export default CarModelPage;
