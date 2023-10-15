"use client";

import Head from "next/head";
import {
  AiFillLinkedin,
  AiFillYoutube,
  AiOutlineInstagram,
  AiOutlineGithub,
} from "react-icons/ai";
import {
  MdWorkOutline,
  MdOutlineVolunteerActivism,
  MdOutlineFilterList,
  MdKeyboardArrowLeft,
} from "react-icons/md";
import { RxDashboard } from "react-icons/rx";
import { BiSolidAward } from "react-icons/bi";
import Image from "next/image";
import hazem from "public/images/hazem_saad.jpg";
import sections from "./personal_portfolio_data.json";
import { useState } from "react";

export default function Home() {
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(4);
  const [noMore, setNoMore] = useState(false);
  const [filteredSections, setFilteredSections] = useState(sections);

  const showMoreItems = () => {
    if (visible + 4 >= filteredSections.length) {
      setNoMore(true);
    } else {
      setNoMore(false);
    }
    setVisible((previousValue) => previousValue + 4);
  };

  const filterByType = (type: string) => {
    const filtered = sections.filter((section) => section.type.includes(type));
    setFilteredSections(filtered);
  };

  const types = Array.from(
    new Set(sections.map((section) => section.type))
  );

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
    <div className="bg-slate-900 font-poopins overflow-hidden">
      <Head>
        <title>Hazem Saad's Portfolio</title>
        <meta name="description" content="Personal Portfolio" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <section className="min-h-screen px-10 pb-10 md:pt-5 md:px-20 lg:px-30">
          <div className="text-center p-10">
            <h2 className="text-5xl pb-2 md:pt-20 max-lg:pt-16 text-slate-200 font-bold">
              Hazem Saad
            </h2>
            <h3 className="text-2xl py-2 md:text-3xl text-slate-300">
              Developer and Engineer.
            </h3>
            <p className="text-md py-5 leading-8 md:text-xl max-w-xl mx-auto text-slate-400">
              Dm=ummy text, this owuld be a parragrpah
            </p>
          </div>
          <div className="text-5xl text-slate-400 flex justify-center gap-20 py-4">
            <a href="https://github.com/HazemS24">
              <AiOutlineGithub className="hover:text-slate-200" />
            </a>
            <a href="https://www.linkedin.com/in/hazem-saad">
              <AiFillLinkedin className="hover:text-slate-200" />
            </a>
            <a href="https://www.instagram.com/hazem_saad04/">
              <AiOutlineInstagram className="hover:text-slate-200" />
            </a>
            <a href="https://www.youtube.com/channel/UCW2xU773uz7wGhp5ToAIX2A/">
              <AiFillYoutube className="hover:text-slate-200" />
            </a>
          </div>
          <div className="relative mx-auto rounded-full w-80 h-80 mt-20 overflow-hidden border-slate-200 md:h-96 md:w-96 border-2 shadow-cs-xl shadow-slate-500">
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

        <section className="flex m-5 realtive rounded-3xl overflow-hidden border-slate-300 border-2 shadow-cs-xl shadow-slate-500">
          <div
            className={`bg-slate-900 p-5 pt-8 shadow-cs-xl shadow-slate-500 duration-500 lg:relative max-lg:absolute max-lg:ml-4 max-lg:mt-4 z-10 ${
              open
                ? " w-[340px] max-lg:rounded-2xl"
                : "lg:w-[104px] max-lg:w-0 max-lg:h-0 max-lg:p-0 max-lg:z-40"
            }`}
          >
            <MdKeyboardArrowLeft
              className={`max-lg:hidden bg-slate-900 text-slate-300 text-4xl absolute rounded-full -right-4 top-4 border-2 border-slate-300 duration-500 cursor-pointer my-5 ${
                !open && "rotate-180"
              }`}
              onClick={() => setOpen(!open)}
            />

            <MdOutlineFilterList
              className={`lg:hidden rounded-md border-2 bg-slate-900 text-slate-300 hover:bg-slate-300 hover:text-slate-900 border-slate-300 text-5xl duration-500 cursor-pointer mb-5 ${
                open ? "w-[300px]" : "rotate-[360deg] mt-1 ml-1"
              }`}
              onClick={() => setOpen(!open)}
            />

            <div
              className={`flex py-5 transition-all ease-in-out duration-500 lg:mt-10 lg:mx-2 ${
                open ? "" : "max-lg:scale-0"
              }`}
            >
              <button
                className={`p-0 duration-500 relative rounded-md text-slate-300 hover:bg-slate-300 hover:text-slate-900 ${
                  open ? "w-[300px]" : ""
                }`}
                onClick={() => {
                  filterByType("");
                  setVisible(4);
                  setNoMore(false);
                }}
              >
                <RxDashboard
                  className={`text-5xl rounded float-left flex-shrink-0 p-1 [transition:_color_75ms,transform_0.5s_ease-in-out] ${
                    open ? "rotate-[360deg]" : ""
                  }`}
                />
                <h1
                  className={`text-slate-300 text-lg duration-75 text-inherit float-left ml-3 mt-2.5 ${
                    open ? "" : "hidden"
                  }`}
                >
                  ABOUT ME...
                </h1>
              </button>
            </div>

            <div
              className={`flex py-5 transition-all ease-in-out duration-500 lg:mx-2 ${
                open ? "" : "max-lg:scale-0"
              }`}
            >
              <button
                className={`p-0 duration-500 relative rounded-md text-slate-300 hover:bg-slate-300 hover:text-slate-900 ${
                  open ? "w-[300px]" : ""
                }`}
                onClick={() => {
                  filterByType("Work Experience");
                  setVisible(4);
                  setNoMore(false);
                }}
              >
                <MdWorkOutline
                  className={`text-5xl rounded float-left flex-shrink-0 p-1 [transition:_color_75ms,transform_0.5s_ease-in-out] ${
                    open ? "rotate-[360deg]" : ""
                  }`}
                />
                <h1
                  className={`text-slate-300 text-lg duration-75 text-inherit float-left ml-3 mt-2.5 ${
                    open ? "" : "hidden"
                  }`}
                >
                  WORK EXPERIENCE
                </h1>
              </button>
            </div>

            <div
              className={`flex py-5 transition-all ease-in-out duration-500 lg:mx-2 ${
                open ? "" : "max-lg:scale-0"
              }`}
            >
              <button
                className={`p-0 duration-500 relative rounded-md text-slate-300 hover:bg-slate-300 hover:text-slate-900 ${
                  open ? "w-[300px]" : ""
                }`}
                onClick={() => {
                  filterByType("Volunteer Experience");
                  setVisible(4);
                  setNoMore(false);
                }}
              >
                <MdOutlineVolunteerActivism
                  className={`text-5xl rounded float-left [transition:_color_75ms,transform_0.5s_ease-in-out] flex-shrink-0 p-1 ${
                    open ? "rotate-[360deg]" : ""
                  }`}
                />
                <h1
                  className={`text-slate-300 text-lg duration-75 text-inherit float-left ml-3 mt-2.5 ${
                    open ? "" : "hidden"
                  }`}
                >
                  VOLUNTEER EXPERIENCE
                </h1>
              </button>
            </div>

            <div
              className={`flex py-5 transition-all ease-in-out duration-500 lg:mx-2 ${
                open ? "" : "max-lg:scale-0"
              }`}
            >
              <button
                className={`p-0 duration-500 relative rounded-md text-slate-300 hover:bg-slate-300 hover:text-slate-900 ${
                  open ? "w-[300px]" : ""
                }`}
                onClick={() => {
                  filterByType("Awards");
                  setVisible(4);
                  setNoMore(false);
                }}
              >
                <BiSolidAward
                  className={`text-5xl rounded float-left [transition:_color_75ms,transform_0.5s_ease-in-out] flex-shrink-0 p-1 ${
                    open ? "rotate-[360deg]" : ""
                  }`}
                />
                <h1
                  className={`text-slate-300 text-lg duration-75 text-inherit float-left ml-3 mt-2.5 ${
                    open ? "" : "hidden"
                  }`}
                >
                  AWARDS
                </h1>
              </button>
            </div>
          </div>

          <div className="p-[30px] xl:pt-5">
            <ul className="text-slate-300 xl:flex xl:flex-row xl:flex-wrap xl:justify-between md:max-lg:flex md:max-lg:flex-row md:max-lg:flex-wrap md:max-lg:justify-between">
              {filteredSections.slice(0, visible).map((section) => {
                const { name, description, start_date, end_date, image } =
                  section;
                return (
                  <li className="text-center hover:bg-slate-800 shadow-cs-lg p-10 rounded-xl basis-5/12 flex-1 relative mb-5 mx-1 xl:mx-3 md:max-lg:mx-3 duration-200 flex flex-col justify-center">
                    <img
                      src={section.image}
                      className="max-h-[250px] bg-slate-700 p-4 rounded-2xl mx-auto"
                    />
                    <div className="text-lg font-medium pt-8 pb-2">
                      <strong>{name}</strong>
                    </div>
                    <div className="py-2">{description}</div>
                    <div className="p-4 my-5 text-teal-300 rounded-full bg-teal-400/10">
                      {EndDate(start_date, end_date)}
                    </div>
                  </li>
                );
              })}
              <button
                className={`text-center shadow-cs-xl shadow-slate-500 p-10 rounded-xl w-[100%] font-pixel ${
                  noMore ? "hidden" : ""
                }`}
                onClick={showMoreItems}
              >
                LOAD MORE...
              </button>
            </ul>
          </div>
        </section>
      </main>
    </div>
  );
}
