import { About } from "./components/About";
import { Companion } from "./components/Companion";
import { Contact } from "./components/Contact";
import { Hero } from "./components/Hero";
import { ScrollSpine } from "./components/ScrollSpine";
import { Stack } from "./components/Stack";
import { Timeline } from "./components/Timeline";
import { Work } from "./components/Work";
import { Divider } from "./components/primitives";

export default function Home() {
  return (
    <>
      <ScrollSpine />
      <Companion />

      <main className="relative">
        <Hero />
        <About />
        <Divider />
        <Timeline />
        <Divider />
        <Work />
        <Divider />
        <Stack />
        <Contact />
      </main>
    </>
  );
}
