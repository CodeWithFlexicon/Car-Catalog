"use client";
import React, { useState, useEffect } from "react";
import ReactSlider from "react-slider";
import "./FilterForm.css";

const FilterForm = ({ onFilter, onReset }) => {
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [driveType, setDriveType] = useState("");
  const [msrpRange, setMsrpRange] = useState([0, 1000000]);
  const [engineType, setEngineType] = useState("");
  const [fuelType, setFuelType] = useState("");
  const [cylinderType, setCylinderType] = useState("");
  const [enumValues, setEnumValues] = useState({});

  useEffect(() => {
    fetch("/api/cars/enums")
      .then((response) => response.json())
      .then((data) => setEnumValues(data))
      .catch((error) => console.error("Error fetching enum values:", error));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    onFilter({
      make,
      model,
      driveType,
      minMsrp: msrpRange[0],
      maxMsrp: msrpRange[1],
      engineType,
      fuelType,
      cylinderType,
    });
  };

  const handleReset = () => {
    setMake("");
    setModel("");
    setDriveType("");
    setMsrpRange([0, 1000000]);
    setEngineType("");
    setFuelType("");
    setCylinderType("");
    onReset();
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4 p-4 bg-gray-100 rounded-lg">
      <div className="grid grid-cols-1 gap-4">
        <input
          type="text"
          value={make}
          onChange={(e) => setMake(e.target.value)}
          placeholder="Make"
          className="p-2 border rounded-md"
        />
        <input
          type="text"
          value={model}
          onChange={(e) => setModel(e.target.value)}
          placeholder="Model"
          className="p-2 border rounded-md"
        />
        <select
          value={driveType}
          onChange={(e) => setDriveType(e.target.value)}
          className="p-2 border rounded-md"
        >
          <option value="">Drive Type</option>
          {enumValues.driveType?.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
        <div className="mb-4">
          <label className="block mb-2">MSRP Range</label>
          <ReactSlider
            className="horizontal-slider"
            thumbClassName="thumb"
            trackClassName="track"
            defaultValue={[0, 1000000]}
            min={0}
            max={1000000}
            value={msrpRange}
            onChange={setMsrpRange}
            pearling
            minDistance={1000}
            renderTrack={(props, state) => (
              <div
                {...props}
                className={`${props.className} ${
                  state.index === 1 ? "track-1" : ""
                }`}
              />
            )}
          />
          <div className="flex justify-between">
            <span>${msrpRange[0]}</span>
            <span>${msrpRange[1]}</span>
          </div>
        </div>
        <select
          value={engineType}
          onChange={(e) => setEngineType(e.target.value)}
          className="p-2 border rounded-md"
        >
          <option value="">Engine Type</option>
          {enumValues.engineType?.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
        <select
          value={fuelType}
          onChange={(e) => setFuelType(e.target.value)}
          className="p-2 border rounded-md"
        >
          <option value="">Fuel Type</option>
          {enumValues.fuelType?.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
        <select
          value={cylinderType}
          onChange={(e) => setCylinderType(e.target.value)}
          className="p-2 border rounded-md"
        >
          <option value="">Cylinder Type</option>
          {enumValues.cylinderType?.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>
      <div className="flex justify-between mt-4">
        <button type="submit" className="bg-blue-500 text-white p-2 rounded-md">
          Apply Filters
        </button>
        <button
          type="button"
          onClick={handleReset}
          className="bg-red-500 text-white p-2 rounded-md"
        >
          Reset Filters
        </button>
      </div>
    </form>
  );
};

export default FilterForm;
