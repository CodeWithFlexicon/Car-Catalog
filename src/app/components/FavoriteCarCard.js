import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

function FavoriteCarCard({ car }) {
  const router = useRouter();

  const handleClick = () => {
    const makeSlug = car.make_name.toLowerCase().replace(/\s+/g, "-");
    const modelSlug = car.model_name.toLowerCase().replace(/\s+/g, "-");

    router.push(
      `/cars/${makeSlug}/${modelSlug}?year=${car.year}&trim=${car.trim_name}`
    );
  };

  return (
    <div
      className="max-w-sm rounded overflow-hidden shadow-lg hover:shadow-xl cursor-pointer"
      onClick={handleClick}
    >
      <img
        src={car.imageurl || "/images/CarPlaceHolder.webp"}
        alt={`${car.make_name} ${car.model_name}`}
        width={1000}
        height={1000}
        layout="responsive"
      />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">
          {`${car.make_name} ${car.model_name} ${car.year}`}
        </div>
        <p className="text-gray-700 text-base">Trim: {car.trim_name}</p>
        <p className="text-gray-700 text-base">
          MSRP: {car.msrp ? `$${car.msrp}` : "N/A"}
        </p>
      </div>
    </div>
  );
}

export default FavoriteCarCard;
