"use client";

import { useEffect, useState } from "react";
import { api } from "@/services/api";
import { useFavorites } from "@/store/useFavorites";
import { Heart, Search } from "lucide-react";
import Header from "@/components/header";
import SearchInput from "@/components/search";

type Character = {
  id: number;
  name: string;
  thumbnail: {
    path: string;
    extension: string;
  };
};

export default function Home() {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [search, setSearch] = useState("");
  const [sortAZ, setSortAZ] = useState(true);
  const { favorites, toggleFavorite } = useFavorites();

  useEffect(() => {
    api
      .get("characters", {
        params: {
          limit: 20,
          nameStartsWith: search || undefined,
          orderBy: sortAZ ? "name" : "-name",
        },
      })
      .then((res) => {
        setCharacters(res.data.data.results);
      });
  }, [search, sortAZ]);

  return (
    <>
      <Header />
      <main className="p-6">
        <SearchInput
          setSearch={setSearch}
          sortAZ={sortAZ}
          setSortAZ={setSortAZ}
        />
        <div className="grid lg:grid-cols-4 sm:grid-cols-1 md:grid-cols-4 gap-6">
          {characters.map((char) => {
            const isFav = favorites.some((f) => f.id === char.id);
            return (
              <div key={char.id} className="relative  p-4 text-center ">
                <button
                  onClick={() => toggleFavorite(char)}
                  className="absolute bottom-0 right-2 z-10"
                  aria-label="Favoritar personagem"
                >
                  <Heart
                    className="w-6 h-6"
                    fill={isFav ? "#f43f5e" : "transparent"}
                    color={isFav ? "#f43f5e" : "#9ca3af"}
                  />
                </button>

                <img
                  src={`${char.thumbnail.path}.${char.thumbnail.extension}`}
                  alt={char.name}
                  className="w-full h-48 object-cover rounded mb-2"
                />
                <h2 className="font-bold text-lg">{char.name}</h2>
              </div>
            );
          })}
        </div>

        <div className="mt-10">
          <h3 className="font-bold text-xl mb-2">
            ⭐ Favoritos ({favorites.length}/5)
          </h3>
          <div className="flex flex-wrap gap-4">
            {favorites.map((fav) => (
              <div key={fav.id} className="text-sm border p-2 rounded">
                {fav.name}
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
