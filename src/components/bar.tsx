import Image from "next/image";
import hero from "./../img/hero.png";
import { Heart } from "lucide-react";

interface BarProps {
  sortAZ: boolean;
  setSortAZ: (value: boolean) => void;
  heroCount: number;
  onlyFavorites: boolean;
  setOnlyFavorites: (value: boolean) => void;
}

export default function Bar({
  sortAZ,
  setSortAZ,
  heroCount,
  onlyFavorites,
  setOnlyFavorites,
}: BarProps) {
  return (
    <div className="flex justify-between items-center px-5  lg:flex-row md:flex-row sm:flex-col">
      <div>
        <span className="text-sm text-gray-light">
          {heroCount} herói(s) encontrado(s)
        </span>
      </div>

      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2">
          <Image src={hero} alt="Ordenar" width={20} height={20} />
          <p className="text-brand-red text-sm">Ordenar por nome A-Z</p>
          <button
            onClick={() => setSortAZ(!sortAZ)}
            className="flex items-center gap-2 ml-2 rounded-full transition-colors duration-300"
          >
            <div
              className={`w-12 h-6 rounded-full flex items-center px-1 transition-colors duration-300 ${
                sortAZ ? "bg-brand-red" : "bg-gray-300"
              }`}
            >
              <div
                className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform duration-300 ${
                  sortAZ ? "translate-x-4" : "translate-x-0"
                }`}
              />
            </div>
          </button>
        </div>

        <button
          onClick={() => setOnlyFavorites(!onlyFavorites)}
          className="flex items-center gap-2 text-sm text-brand-red"
        >
          <Heart
            className="w-5 h-5"
            fill={onlyFavorites ? "#f43f5e" : "transparent"}
            color="#f43f5e"
            
          />
          <span className="text-brand-red opacity-70">Somente favoritos</span>
        </button>
      </div>
    </div>
  );
}
