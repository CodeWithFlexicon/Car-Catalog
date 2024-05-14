import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { getData } from "../util/getData";

function CarCard({ car }) {
  const router = useRouter();

  const handleClick = async () => {
    const makeSlug = car.make.toLowerCase().replace(/\s+/g, "-");
    const modelSlug = car.model.toLowerCase().replace(/\s+/g, "-");

    console.log(`Navigating to: /cars/${makeSlug}/${modelSlug}`); // Log to console, check if it works

    const carDetails = await getData(car.make, car.model);
    if (carDetails) {
      console.log(`Fetched car details:`, carDetails);

      //router.push(`/cars/${makeSlug}/${modelSlug}`, { state: { carDetails } });
      router.push(`/cars/${makeSlug}/${modelSlug}`);
    } else {
      console.error("Failed to fetch car details for:", car.make, car.model);
    }
  };
  return (
    <div
      className="max-w-sm rounded overflow-hidden shadow-lg hover:shadow-xl cursor-pointer"
      onClick={handleClick}
    >
      <div className="h-56 w-full overflow-hidden">
        <img
          src={car.imageurl || "/images/CarPlaceHolder.webp"}
          alt={`${car.make} ${car.model}`}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{`${car.make} ${car.model}`}</div>
        <p className="text-gray-700 text-base">
          Body Type: {car.body_type || "N/A"}
        </p>
        <p className="text-gray-700 text-base">
          MSRP: {car.msrp ? `$${car.msrp}` : "N/A"}
        </p>
      </div>
    </div>
  );
}

export default CarCard;
