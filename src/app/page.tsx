"use client";

import { useEffect, useState } from "react";
import { api } from "@/services/api";
import { useFavorites } from "@/store/useFavorites";


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
    <main className="p-6">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
        <input
          type="text"
          placeholder="Buscar por nome..."
          className="border px-4 py-2 rounded w-full sm:w-1/2"
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          className="bg-gray-800 text-white px-4 py-2 rounded"
          onClick={() => setSortAZ(!sortAZ)}
        >
          {sortAZ ? "Ordenar Z-A" : "Ordenar A-Z"}
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {characters.map((char) => {
          const isFav = favorites.some((f) => f.id === char.id);
          return (
            <div key={char.id} className="relative border rounded p-4 text-center shadow">
  {/* Estrela no canto superior direito da imagem */}
  <div className="absolute top-2 right-2 z-10">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill={isFav ? "#facc15" : "#d1d5db"} // amarelo ou cinza
      viewBox="0 0 24 24"
      stroke="currentColor"
      className="w-6 h-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.518 4.674a1 1 0 00.95.69h4.92c.969 0 1.371 1.24.588 1.81l-3.98 2.89a1 1 0 00-.364 1.118l1.518 4.674c.3.921-.755 1.688-1.54 1.118l-3.98-2.89a1 1 0 00-1.176 0l-3.98 2.89c-.784.57-1.838-.197-1.539-1.118l1.518-4.674a1 1 0 00-.364-1.118l-3.98-2.89c-.784-.57-.38-1.81.588-1.81h4.92a1 1 0 00.951-.69l1.518-4.674z"
      />
    </svg>
  </div>

  <img
    src={`${char.thumbnail.path}.${char.thumbnail.extension}`}
    alt={char.name}
    className="w-full h-48 object-cover rounded mb-2"
  />
  <h2 className="font-bold text-lg">{char.name}</h2>
  <button
    onClick={() => toggleFavorite(char)}
    className={`mt-2 w-full py-1 px-3 rounded ${
      isFav ? "bg-red-500 text-white" : "bg-gray-200 text-zinc-800"
    }`}
  >
    {isFav ? "Desfavoritar" : "Favoritar"}
  </button>
</div>

          );
        })}
      </div>

      <div className="mt-10">
        <h3 className="font-bold text-xl mb-2">⭐ Favoritos ({favorites.length}/5)</h3>
        <div className="flex flex-wrap gap-4">
          {favorites.map((fav) => (
            <div key={fav.id} className="text-sm border p-2 rounded">
              {fav.name}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
