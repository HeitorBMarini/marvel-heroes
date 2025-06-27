import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import md5 from 'md5';

const ts = '1';
const publicKey = process.env.NEXT_PUBLIC_MARVEL_PUBLIC_KEY!;
const privateKey = process.env.MARVEL_PRIVATE_KEY!;

const hash = md5(ts + privateKey + publicKey);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const response = await axios.get('https://gateway.marvel.com/v1/public/characters', {
      params: {
        ts,
        apikey: publicKey,
        hash,
        ...req.query,
      },
    });
    res.status(200).json(response.data);
  } catch (error: any) {
    res.status(500).json({ error: error?.response?.data || "Erro desconhecido" });
  }
}
