import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta name="theme-color" content="#0f172a" />
        <meta
          name="description"
          content="Reno Notice Board internship assignment - Next.js, Prisma, MySQL"
        />
      </Head>
      <body className="bg-slate-50 text-slate-900">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
