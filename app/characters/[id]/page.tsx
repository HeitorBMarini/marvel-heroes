import { notFound } from "next/navigation";
import md5 from "md5";
import { Metadata } from "next";

type PageProps = {
  params: {
    id: string;
  };
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  return {
    title: `Personagem #${params.id}`,
  };
}

export default async function CharacterPage({ params }: PageProps) {
  const ts = Date.now().toString();
  const publicKey = process.env.NEXT_PUBLIC_MARVEL_PUBLIC_KEY!;
  const privateKey = process.env.MARVEL_PRIVATE_KEY!;
  const hash = md5(ts + privateKey + publicKey);

  const res = await fetch(
    `https://gateway.marvel.com/v1/public/characters/${params.id}?ts=${ts}&apikey=${publicKey}&hash=${hash}`
  );

  const data = await res.json();

  if (!res.ok || !data?.data?.results?.[0]) return notFound();

  const char = data.data.results[0];

  return (
    <main className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">{char.name}</h1>
      <img
        src={`${char.thumbnail.path}.${char.thumbnail.extension}`}
        alt={char.name}
        className="w-full h-96 object-cover rounded mb-6"
      />
      <p className="text-gray-700">
        {char.description || "Este personagem não possui descrição."}
      </p>
    </main>
  );
}
