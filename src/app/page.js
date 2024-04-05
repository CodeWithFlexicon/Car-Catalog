"use client";
import { useEffect, useState } from "react";
import CarCard from "./components/CarCard";
import Image from "next/image";

export default function HomePage() {
  const [models, setModels] = useState([]);

  useEffect(() => {
    async function fetchModels() {
      const response = await fetch("/api/brands/models?brand=lexus");
      const data = await response.json();
      setModels(data);
    }

    fetchModels();
  }, []);

  return (
    <div>
      <div className="relative w-full" style={{ height: "50vh" }}>
        <Image
          src="/images/LC500.jpeg"
          alt="Lexus"
          layout="fill"
          objectFit="cover"
        />
        <div className="absolute bottom-0 left-0 p-8">
          <div className="p-4">
            <p className="text-white font-bold">MSRP*</p>
            <p className="text-white">$99,800</p>
          </div>
        </div>
        <h2 className="absolute top-1/2 right-0 transform -translate-y-1/2 text-white text-4xl underline pr-8 floating-text">
          Experience Amazing
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4 px-20">
        {models.map((model) => (
          <CarCard key={model.id} car={model} />
        ))}
      </div>
    </div>
  );
}
