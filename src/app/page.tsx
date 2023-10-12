"use client";

import Head from "next/head";
import { BsFillMoonStarsFill, BsArrowLeftShort } from "react-icons/bs";
import { AiFillLinkedin, AiFillYoutube } from "react-icons/ai";
import Image from "next/image";
import hazem from "public/hazem_saad.jpg";
import sections from "./personal_portfolio_data.json";
import { useState } from "react";

export default function Home() {
  const [darkMode, setDarkMode] = useState(false);
  const [filteredSections, setFilteredSections] = useState(sections);

  const filterByType = (type: string) => {
    const filtered = sections.filter((section) => section.type.includes(type));
    setFilteredSections(filtered);
  };

  const types = Array.from(new Set(sections.map((section) => section.type)));

  function EndDate(section_start_date: any, section_end_date: any) {
    if (section_end_date) {
      return (
        <div>
          {section_start_date} - {section_end_date}
        </div>
      );
    }
    return <div>{section_start_date}</div>;
  }

  return (
    <div className={darkMode ? "dark" : ""}>
      <Head>
        <title>Hazem Saad's Portfolio</title>
        <meta name="description" content="Personal Portfolio" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="bg-white px-10 pb-10 md:pt-5 md:px-20 lg:px-30 dark:bg-gray-900">
        <section className=" min-h-screen">
          <nav className="py-10 mb-12 flex justify-between">
            <h1 className="text-xl font-tanker">Hazem Saad</h1>
            <ul className="flex items-center">
              <li>
                <BsFillMoonStarsFill
                  onClick={() => setDarkMode(!darkMode)}
                  className="cursor-pointer text-2xl hover:animate-pulse dark:text-white"
                />
              </li>
              <li>
                <a
                  className="bg-gradient-to-r from-cyan-500 to-teal-500 text-white px-4 py-2 rounded-md ml-8"
                  href="https://www.linkedin.com/in/hazem-saad"
                  rel="noreferrer"
                >
                  LinkedIn
                </a>
              </li>
            </ul>
          </nav>
          <div className="text-center p-10">
            <h2 className="text-5xl py-2 text-teal-600 font-md">Hazem Saad</h2>
            <h3 className="text-2xl py-2 md:text-3xl ">
              Developer and Engineer.
            </h3>
            <p className="text-md py-5 leading-8 text-gray-800 md:text-xl max-w-xl mx-auto">
              Dm=ummy text, this owuld be a parragrpah
            </p>
          </div>
          <div className="text-5xl flex justify-center gap-20 py-4 text-gray-600">
            <AiFillLinkedin />
            <AiFillYoutube />
          </div>
          <div className="relative mx-auto rounded-full w-80 h-80 mt-20 overflow-hidden border-black md:h-96 md:w-96 dark:border-white border-2">
            <Image src={hazem} alt="" />
          </div>
        </section>

        <section>
          <div>
            <h3 className="text-3xl py-1">Projects</h3>
            <p className="text-md py-2 leading-8 text-gray-800">
              Bio goes here bruh <span className="text-teal-500">this</span> is
              filler text to make it big neough but u should probaky rremove it
              later heh. anyways, enjoy making this fancy wesbite{" "}
            </p>
          </div>
        </section>

        <section>
          <div>
            <button onClick={(e) => filterByType("Work Experience")}>
              Work Experience
            </button>
            <ul className="lg:flex lg:flex-row lg:flex-wrap lg:justify-between gap-10">
              {filteredSections.map((section) => {
                const { name, description, start_date, end_date } = section;
                return (
                  <li className="text-center shadow-lg p-10 rounded-xl basis-5/12 flex-1">
                    <div className="text-lg font-medium pt-8 pb-2">
                      Name: <strong>{name}</strong>
                    </div>
                    <div className="py-2">Description: {description}</div>
                    <div className="py-4 text-teal-600">
                      {EndDate(start_date, end_date)}
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>
      </main>

      <section className="flex">
        <div className="bg-blue-800 h-screen p-5 pt-8 ${open ? w-72: w-20} relative">
          <BsArrowLeftShort className="bg-white text-blue-800 text-3xl absolute rounded-full -right-3 top-9 border border-blue-800 cursor-pointer" />
        </div>
        <div className="p-7">
          <h1 className="text-2xl font-semibold">home</h1>
        </div>
      </section>
    </div>
  );
}
