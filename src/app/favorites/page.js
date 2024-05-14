"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import FavoriteCarCard from "../components/FavoriteCarCard";

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState([]);
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      //.log("Session data:", session);
      fetch(`/api/favorites/check/${session.user.id}/get`)
        .then((response) => response.json())
        .then((data) => {
          // console.log("Fetched favorites data:", data);
          setFavorites(data);
        })
        .catch((error) => console.error("Failed to load favorites:", error));
    }
  }, [session]);

  if (!session) {
    return <div>Please log in to see your favorites.</div>;
  }

  if (!Array.isArray(favorites) || favorites.length === 0) {
    return <div>No favorites added yet.</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">My Favorites</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {favorites.map((car) => (
          <FavoriteCarCard key={car.make_model_trim_id} car={car} />
        ))}
      </div>
    </div>
  );
}
