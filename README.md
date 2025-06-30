This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.



---

### 📌Como você lidaria com o limite de 5 favoritos se estivesse usando Redux ou Zustand?

Se eu estivesse usando Redux ou Zustand para gerenciar os favoritos, criaria um slice (Redux) ou store (Zustand) com um array de favoritos e funções. Para manter o limite de 5 favoritos, a lógica seria centralizada na função de adicionar: antes de inserir um novo personagem, a função verificaria o comprimento atual da lista e impediria a adição se já houvesse 5 itens. Também Pouparia requisições desnecessárias.

Com Zustand, o controle fica ainda mais simples e direto, já que o estado é acessível de qualquer componente e as funções podem conter validações inline. Dessa forma, a lógica de restrição de favoritos não fica espalhada, e o estado se mantém previsível e escalável, mesmo se fosse necessário persistir em localStorage ou backend futuramente.
