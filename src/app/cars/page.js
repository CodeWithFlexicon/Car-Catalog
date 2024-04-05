"use client";
import { useEffect, useState } from "react";
import CarCard from "../components/CarCard";
import Image from "next/image";

export default function HomePage() {
  const [models, setModels] = useState([]);

  useEffect(() => {
    async function fetchModels() {
      const response = await fetch("/api/cars/models");
      let data = await response.json();

      console.log(data);

      data.sort((a, b) => {
        if (a.make === b.make) {
          return a.model.toLowerCase().localeCompare(b.model.toLowerCase());
        }
        return a.make.toLowerCase().localeCompare(b.make.toLowerCase());
      });

      setModels(data);
    }

    fetchModels();
  }, []);

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 p-4 px-20">
        {models.map((model) => (
          <CarCard key={model.id} car={model} />
        ))}
      </div>
    </div>
  );
}
