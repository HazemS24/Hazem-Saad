"use client";

import Head from "next/head";
import { BsFillMoonStarsFill, BsArrowLeftShort } from "react-icons/bs";
import { AiFillLinkedin, AiFillYoutube } from "react-icons/ai";
import {
  MdWorkOutline,
  MdOutlineVolunteerActivism,
  MdOutlineFilterList,
} from "react-icons/md";
import { RxDashboard } from "react-icons/rx";
import { BiSolidAward } from "react-icons/bi";
import Image from "next/image";
import hazem from "public/hazem_saad.jpg";
import sections from "./personal_portfolio_data.json";
import { useState } from "react";

export default function Home() {
  const [darkMode, setDarkMode] = useState(false);
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(4);
  const [filteredSections, setFilteredSections] = useState(sections);

  const showMoreItems = () => {
    setVisible((previousValue) => previousValue + 4);
  };

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

      <main className="bg-white  dark:bg-gray-900">
        <section className=" min-h-screen px-10 pb-10 md:pt-5 md:px-20 lg:px-30">
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

        <section className="px-10 pb-10 md:pt-5 md:px-20 lg:px-30">
          <div>
            <h3 className="text-3xl py-1">Projects</h3>
            <p className="text-md pt-2 leading-8 text-gray-800">
              Bio goes here bruh <span className="text-teal-500">this</span> is
              filler text to make it big neough but u should probaky rremove it
              later heh. anyways, enjoy making this fancy wesbite{" "}
            </p>
          </div>
        </section>

        <section className="flex bg-white m-5 realtive rounded-3xl overflow-hidden border-very-dark-gray dark:border-white border-[4px]">
          <div
            className={`bg-very-dark-gray p-5 pt-8 shadow-xl  duration-500 md:relative max-md:absolute max-md:ml-4 max-md:mt-4 font-oswald${
              open ? "md:w-72 max-md:rounded-2xl" : "md:w-24 max-md:w-0 max-md:h-0 max-md:p-0"
            }`}
          >
            <BsArrowLeftShort
              className={`max-md:hidden bg-white text-teal-500 text-3xl absolute rounded-full -right-3 top-4 border-2 border-teal-500 duration-500 cursor-pointer ${
                !open && "rotate-180"
              }`}
              onClick={() => setOpen(!open)}
            />

            <MdOutlineFilterList
              className={`md:hidden bg-teal-500 rounded-md border-2  border-very-dark-gray text-very-dark-gray text-5xl duration-500 cursor-pointer ${
                open === true ? "w-60" : "rotate-[360deg]"
              }`}
              onClick={() => setOpen(!open)}
            />

            <div
              className={`flex py-5 transition-all ease-in-out duration-500 ${
                open === true ? "" : "max-md:scale-0"
              }`}
            >
              <button
                className={`p-0 pt-5 ${
                  open ? "w-60" : "w-10"
                } duration-500 relative`}
                onClick={() => {
                  filterByType("");
                  setVisible(4);
                }}
              >
                <RxDashboard
                  className={`bg-teal-500 text-5xl rounded float-left mr-2 duration-500 flex-shrink-0 p-1 ${
                    open && "rotate-[360deg]"
                  }`}
                />
                <h1
                  className={`text-white origin-left font-medium text-lg duration-75 pt-2 text-left pl-16 ${
                    !open && "scale-0"
                  }`}
                >
                  MY WORK
                </h1>
              </button>
            </div>

            <div
              className={`flex py-5 transition-all ease-in-out duration-500 ${
                open === true ? "" : "max-md:scale-0"
              }`}
            >
              <button
                className={`p-0 ${
                  open ? "w-60" : "w-10"
                } duration-500 relative`}
                onClick={() => {
                  filterByType("Work Experience");
                  setVisible(4);
                }}
              >
                <MdWorkOutline
                  className={`bg-teal-500 text-5xl rounded float-left mr-2 duration-500 flex-shrink-0 p-1 ${
                    open && "rotate-[360deg]"
                  }`}
                />
                <h1
                  className={`text-white origin-left font-medium text-lg duration-75 pt-2 text-left pl-16 ${
                    !open && "scale-0"
                  }`}
                >
                  WORK EXPERIENCE
                </h1>
              </button>
            </div>

            <div
              className={`flex py-5 transition-all ease-in-out duration-500 ${
                open === true ? "" : "max-md:scale-0"
              }`}
            >
              <button
                className={`p-0 ${
                  open ? "w-60" : "w-10"
                } duration-500 relative`}
                onClick={() => {
                  filterByType("Volunteer Experience");
                  setVisible(4);
                }}
              >
                <MdOutlineVolunteerActivism
                  className={`bg-teal-500 text-5xl rounded float-left mr-2 duration-500 flex-shrink-0 p-1 ${
                    open && "rotate-[360deg]"
                  }`}
                />
                <h1
                  className={`text-white origin-left font-medium text-lg duration-75  text-left pl-16 ${
                    !open && "scale-0"
                  }`}
                >
                  VOLUNTEER EXPERIENCE
                </h1>
              </button>
            </div>

            <div
              className={`flex py-5 transition-all ease-in-out duration-500 ${
                open === true ? "" : "max-md:scale-0"
              }`}
            >
              <button
                className={`p-0 ${
                  open ? "w-60" : "w-12 pr-10"
                } duration-500 relative`}
                onClick={() => {
                  filterByType("Awards");
                  setVisible(4);
                }}
              >
                <BiSolidAward
                  className={`bg-teal-500 text-5xl rounded float-left mr-2 duration-500 flex-shrink-0 p-1 ${
                    open && "rotate-[360deg]"
                  }`}
                />
                <h1
                  className={`text-white origin-left font-medium text-lg duration-75 pt-2 text-left pl-16 ${
                    !open && "scale-0"
                  }`}
                >
                  AWARDS
                </h1>
              </button>
            </div>
          </div>

          <div className="p-[30px] md:pt-5 ">
            {/* <h1></h1> */}
            <ul className="lg:flex lg:flex-row lg:flex-wrap lg:justify-between gap-10">
              {filteredSections.slice(0, visible).map((section) => {
                const { name, description, start_date, end_date } = section;
                return (
                  <li className="text-center shadow-lg p-10 rounded-xl basis-5/12 flex-1">
                    <div className="text-lg font-medium pt-8 pb-2">
                      <strong>{name}</strong>
                    </div>
                    <div className="py-2">Description: {description}</div>
                    <div className="py-4 text-teal-600">
                      {EndDate(start_date, end_date)}
                    </div>
                  </li>
                );
              })}
              <button
                className="text-center shadow-lg p-10 rounded-xl w-[100%] block"
                onClick={showMoreItems}
              >
                Load More
              </button>
            </ul>
          </div>
        </section>
      </main>
    </div>
  );
}
