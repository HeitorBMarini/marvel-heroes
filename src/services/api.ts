import axios from "axios";
import md5 from "md5";

const ts = String(Date.now());
const publicKey = process.env.NEXT_PUBLIC_MARVEL_PUBLIC_KEY!;
const privateKey = process.env.NEXT_PUBLIC_MARVEL_PRIVATE_KEY!;

const hash = md5(ts + privateKey + publicKey);

console.log("ts", ts);
console.log("publicKey", publicKey);
console.log("privateKey", privateKey);
console.log("hash", hash);

export const api = axios.create({
  baseURL: "https://gateway.marvel.com/v1/public/",
  params: {
    apikey: publicKey,
    ts,
    hash,
  },
});
