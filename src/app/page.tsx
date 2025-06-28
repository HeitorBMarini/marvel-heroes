"use client";

import { useEffect, useState } from "react";
import { api } from "@/services/api";
import { useFavorites } from "@/store/useFavorites";
import { Heart, Search } from "lucide-react";
import Header from "@/components/header";
import SearchInput from "@/components/search";
import Bar from "@/components/bar";

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
  const [onlyFavorites, setOnlyFavorites] = useState(false);

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
        let results = res.data.data.results;

        if (onlyFavorites) {
          results = results.filter((char: Character) =>
            favorites.some((fav) => fav.id === char.id)
          );
        }

        setCharacters(results);
      });
  }, [search, sortAZ, onlyFavorites, favorites]);

  return (
    <>
      <Header />
      <main className="p-6">
        <SearchInput
          setSearch={setSearch}
          sortAZ={sortAZ}
          setSortAZ={setSortAZ}
        />
        <Bar
          sortAZ={sortAZ}
          setSortAZ={setSortAZ}
          heroCount={characters.length}
          onlyFavorites={onlyFavorites}
          setOnlyFavorites={setOnlyFavorites}
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

        
      </main>
    </>
  );
}
