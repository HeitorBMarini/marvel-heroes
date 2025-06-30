import { NextRequest } from "next/server";
import md5 from "md5";

const publicKey = process.env.NEXT_PUBLIC_MARVEL_PUBLIC_KEY!;
const privateKey = process.env.MARVEL_PRIVATE_KEY!;

export async function GET(req: NextRequest) {
  const ts = Date.now().toString();
  const hash = md5(ts + privateKey + publicKey);

  const { searchParams } = new URL(req.url);
  const params = new URLSearchParams(searchParams);

  // Adiciona os parâmetros de autenticação
  params.set("ts", ts);
  params.set("apikey", publicKey);
  params.set("hash", hash);

  const marvelUrl = `https://gateway.marvel.com/v1/public/characters?${params.toString()}`;

  console.log("🔗 URL da API Marvel:", marvelUrl);
  try {
    const response = await fetch(marvelUrl);
    const data = await response.json();

    return new Response(JSON.stringify(data), {
      status: response.status || 500,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error: any) {
    return new Response(
      JSON.stringify({ error: error?.message || "Erro desconhecido" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
