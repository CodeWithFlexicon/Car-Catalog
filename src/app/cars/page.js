"use client";
import React, { useEffect, useState } from "react";
import FilterForm from "../components/FilterForm";
import CarCard from "../components/CarCard";

export default function CarsPage() {
  const [models, setModels] = useState([]);
  const [filters, setFilters] = useState({});

  useEffect(() => {
    fetchModels();
  }, [filters]);

  const fetchModels = async () => {
    const query = new URLSearchParams(filters).toString();
    const response = await fetch(`/api/cars/models?${query}`);
    const data = await response.json();

    data.sort((a, b) => {
      if (a.make === b.make) {
        return a.model.toLowerCase().localeCompare(b.model.toLowerCase());
      }
      return a.make.toLowerCase().localeCompare(b.make.toLowerCase());
    });

    setModels(data);
  };

  const handleFilter = (newFilters) => {
    setFilters(newFilters);
  };

  const handleReset = () => {
    setFilters({});
  };

  return (
    <div className="flex">
      <div className="w-1/4 p-4">
        <FilterForm onFilter={handleFilter} onReset={handleReset} />
      </div>
      <div className="w-3/4 p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {models.map((model) => (
            <CarCard key={model.model_id} car={model} />
          ))}
        </div>
      </div>
    </div>
  );
}
