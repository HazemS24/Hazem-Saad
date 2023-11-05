"use client";

import Head from "next/head";
import { Introduction } from "./introduction";
import { Content } from "./content";

export default function Home() {
  return (
    <div className="bg-slate-900 font-poopins overflow-hidden">
      <Head>
        <title>Hazem Saad&apos;s Portfolio</title>
        <meta name="description" content="Personal Portfolio" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="light">
        <Introduction />
        <Content />
      </main>
    </div>
  );
}
