"use client";

import { useEffect, useState } from "react";
import { useFavorites } from "@/store/useFavorites";
import { Heart, Link } from "lucide-react";
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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCharacters = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `/api/marvel?limit=20&orderBy=${sortAZ ? "name" : "-name"}${
            search ? `&nameStartsWith=${search}` : ""
          }`
        );

        const data = await res.json();

        if (!data?.data?.results) {
          console.error("❌ Resposta inesperada da API:", data);
          setCharacters([]);
          return;
        }

        let results: Character[] = data.data.results;

        if (onlyFavorites) {
          results = results.filter((char) =>
            favorites.some((fav) => fav.id === char.id)
          );
        }

        setCharacters(results);
      } catch (err) {
        console.error("Erro ao buscar personagens:", err);
        setCharacters([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCharacters();
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

        {loading ? (
          <p className="text-center mt-10 text-gray-500">
            Carregando personagens...
          </p>
        ) : characters.length === 0 ? (
          <p className="text-center mt-10 text-gray-500">
            Nenhum personagem encontrado.
          </p>
        ) : (
          <div className="grid lg:grid-cols-4 sm:grid-cols-1 md:grid-cols-4 gap-6">
            {characters.map((char) => {
              const isFav = favorites.some((f) => f.id === char.id);
              return (
                <Link
                  key={char.id}
                  href={`/characters/${char.id}`}
                  className="relative p-4 text-center block"
                >
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
                </Link>
              );
            })}
          </div>
        )}
      </main>
    </>
  );
}
