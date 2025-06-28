import Image from "next/image";
import lupa from "./../img/lupa.png";

interface SearchInputProps {
  setSearch: (value: string) => void;
  sortAZ: boolean;
  setSortAZ: (value: boolean) => void;
}

export default function SearchInput({
  setSearch,
  sortAZ,
  setSortAZ,
}: SearchInputProps) {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
      <div className="relative w-full sm:w-1/2">
        <Image
          src={lupa}
          alt="Marvel Logo"
          width={30}
          height={30}
          className="absolute left-4 pr-3 top-1/2 transform -translate-y-1/2 bg-brand-pink text-red-600"
        />{" "}
        <input
          type="text"
          placeholder="Procure por heróis"
          className="pl-12 pr-6 py-4 w-full rounded-full bg-[#FDECEC] text-red-600 placeholder:text-red-400 focus:outline-none"
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <button
        className="bg-gray-800 text-white px-4 py-2 rounded"
        onClick={() => setSortAZ(!sortAZ)}
      >
        {sortAZ ? "Ordenar Z-A" : "Ordenar A-Z"}
      </button>
    </div>
  );
}
