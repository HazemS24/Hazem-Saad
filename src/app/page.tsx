("use client");

import { ThemeProvider } from "next-themes";
import { Transition } from "@headlessui/react";
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
import { BiSolidAward, BiCodeAlt } from "react-icons/bi";
import Image from "next/image";
import hazem from "public/images/hazem_saad.jpg";
import sections from "./personal_portfolio_data.json";
import { useState } from "react"; 

export default function Home() {
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(4);
  const [noMore, setNoMore] = useState(false);
  const [filteredSections, setFilteredSections] = useState(sections);
  const [type, setType] = useState("ALL ABOUT ME...");

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

    if (type === "") {
      setType("ALL ABOUT ME...");
    }
    if (type === "Projects") {
      setType("PROJECTS...");
    }
    if (type === "Work Experience") {
      setType("WORK EXPERIENCES...");
    }
    if (type === "Volunteer Experience") {
      setType("VOLUNTEER EXPERIENCES...");
    }
    if (type === "Awards") {
      setType("AWARDS...");
    }
  };

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
        <title>Hazem Saad&apos;s Portfolio</title>
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
            <p className="text-md py-5 leading-8 md:text-lg max-w-2xl mx-auto text-slate-400 font-archivo">
              A current University of Waterloo student pursuing a Computer
              Engineering Major. I have gained vital life experience after
              travelling the world, living in THREE different countries, and
              observing different cultures.
            </p>
          </div>
          <div className="text-5xl text-slate-400 flex justify-center gap-[60px] py-4">
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
          <div className="relative mx-auto rounded-full w-80 h-80 my-20 overflow-hidden border-slate-200 md:h-96 md:w-96 border-2 shadow-cs-xl shadow-slate-500">
            <Image src={hazem} alt="" />
          </div>
        </section>

        <section className="flex m-5 realtive rounded-3xl overflow-hidden border-slate-300 border-2 shadow-cs-xl shadow-slate-500">
          <div
            className={`bg-slate-900 p-5 pt-8 shadow-cs-xl shadow-slate-500 duration-500 lg:relative max-lg:absolute max-lg:ml-4 max-lg:mt-4 z-10 border-slate-300 rounded-3xl ml-4 my-4 ${
              open
                ? "w-[400px] max-lg:rounded-2xl border-2"
                : "lg:w-[136px] max-lg:w-0 max-lg:h-0 max-lg:p-0 max-lg:z-40 lg:border-2"
            }`}
          >
            <MdKeyboardArrowLeft
              className={`max-lg:hidden bg-slate-900 text-slate-300 hover:bg-slate-300 hover:text-slate-900 text-4xl absolute rounded-full -right-4 top-4 border-2 border-slate-300  [transition:_color_75ms,transform_0.5s_ease-in-out] cursor-pointer my-5 ${
                !open && "rotate-180"
              }`}
              onClick={() => setOpen(!open)}
            />

            <MdOutlineFilterList
              className={`lg:hidden rounded-md border-2 bg-slate-900 text-slate-300 hover:bg-slate-300 hover:text-slate-900 border-slate-300 text-5xl duration-500 cursor-pointer mb-5 ${
                open ? "w-[360px]" : "rotate-[360deg] mt-1 ml-1"
              }`}
              onClick={() => setOpen(!open)}
            />

            <Transition
              show={open}
              enter="transition ease-in duration-200 delay-100"
              enterTo="scale-100 w-[100%]"
              enterFrom="scale-0 w-[0%]"
              leave="transition ease-in duration-100"
              leaveFrom="scale-100 w-[100%]"
              leaveTo="scale-0 w-[0%] ml-15"
            >
              <div
                className={`bg-slate-900 text-slate-300 text-6xl font-archivo ${
                  open ? "lg:ml-5 lg:mt-4 max-lg:hidden" : "h-0 m-0 pl-10 pt-10"
                }`}
              >
                FILTERS
              </div>
            </Transition>

            <div
              className={`flex py-5 ease-in-out duration-500 lg:mt-5 lg:mx-2 ${
                open ? "" : "max-lg:scale-0 p-0"
              }`}
            >
              <button
                className={`p-0 duration-500 relative rounded-md text-slate-300 hover:bg-slate-300 hover:text-slate-900 ${
                  open ? "w-[360px]" : "flex-none"
                }`}
                onClick={() => {
                  filterByType("");
                  setVisible(4);
                  setNoMore(false);
                }}
              >
                <RxDashboard
                  className={`text-5xl rounded float-left flex-shrink-0 p-1 [transition:_color_75ms,transform_0.5s_ease-in-out] m-3 ${
                    open ? "rotate-[360deg] mr-0" : ""
                  }`}
                />
                <Transition
                  show={open}
                  enter="transition ease-in duration-[200ms] delay-100"
                  enterTo="scale-100"
                  enterFrom="scale-0 absolute"
                  leave="transition duration-0"
                  leaveFrom="scale-100"
                  leaveTo="scale-0 absolute"
                >
                  <h1
                    className={`text-lg [transition:_color_75ms] text-inherit float-left ml-3 mt-[22px]`}
                  >
                    ALL ABOUT ME...
                  </h1>
                </Transition>
              </button>
            </div>

            <div
              className={`flex py-5 ease-in-out duration-500 lg:mx-2 ${
                open ? "" : "max-lg:scale-0"
              }`}
            >
              <button
                className={`p-0 duration-500 relative rounded-md text-slate-300 hover:bg-slate-300 hover:text-slate-900 ${
                  open ? "w-[360px]" : "flex-none"
                }`}
                onClick={() => {
                  filterByType("Projects");
                  setVisible(4);
                  setNoMore(false);
                }}
              >
                <BiCodeAlt
                  className={`text-5xl rounded float-left [transition:_color_75ms,transform_0.5s_ease-in-out] flex-shrink-0 p-1 m-3 ${
                    open ? "rotate-[360deg] mr-0" : ""
                  }`}
                />
                <Transition
                  show={open}
                  enter="transition ease-in duration-[200ms] delay-100"
                  enterTo="scale-100"
                  enterFrom="scale-0 absolute"
                  leave="transition duration-0"
                  leaveFrom="scale-100"
                  leaveTo="scale-0 absolute"
                >
                  <h1
                    className={`text-lg [transition:_color_75ms] text-inherit float-left ml-3 mt-[22px]`}
                  >
                    PROJECTS
                  </h1>
                </Transition>
              </button>
            </div>

            <div
              className={`flex py-5 ease-in-out duration-500 lg:mx-2 ${
                open ? "" : "max-lg:scale-0"
              }`}
            >
              <button
                className={`p-0 duration-500 relative rounded-md text-slate-300 hover:bg-slate-300 hover:text-slate-900 ${
                  open ? "w-[360px]" : "flex-none"
                }`}
                onClick={() => {
                  filterByType("Work Experience");
                  setVisible(4);
                  setNoMore(false);
                }}
              >
                <MdWorkOutline
                  className={`text-5xl rounded float-left flex-shrink-0 p-1 [transition:_color_75ms,transform_0.5s_ease-in-out] m-3 ${
                    open ? "rotate-[360deg] mr-0" : ""
                  }`}
                />
                <Transition
                  show={open}
                  enter="transition ease-in duration-[200ms] delay-100"
                  enterTo="scale-100"
                  enterFrom="scale-0 absolute"
                  leave="transition duration-0"
                  leaveFrom="scale-100"
                  leaveTo="scale-0 absolute"
                >
                  <h1
                    className={`text-lg [transition:_color_75ms] text-inherit float-left ml-3 mt-[22px]`}
                  >
                    WORK EXPERIENCE
                  </h1>
                </Transition>
              </button>
            </div>

            <div
              className={`flex py-5 ease-in-out duration-500 lg:mx-2 ${
                open ? "" : "max-lg:scale-0"
              }`}
            >
              <button
                className={`p-0 duration-500 relative rounded-md text-slate-300 hover:bg-slate-300 hover:text-slate-900 ${
                  open ? "w-[360px]" : "flex-none"
                }`}
                onClick={() => {
                  filterByType("Volunteer Experience");
                  setVisible(4);
                  setNoMore(false);
                }}
              >
                <MdOutlineVolunteerActivism
                  className={`text-5xl rounded float-left [transition:_color_75ms,transform_0.5s_ease-in-out] flex-shrink-0 p-1 m-3 ${
                    open ? "rotate-[360deg] mr-0" : ""
                  }`}
                />
                <Transition
                  show={open}
                  enter="transition ease-in duration-[200ms] delay-100"
                  enterTo="scale-100"
                  enterFrom="scale-0 absolute"
                  leave="transition duration-0"
                  leaveFrom="scale-100"
                  leaveTo="scale-0 absolute"
                >
                  <h1
                    className={`text-lg [transition:_color_75ms] text-inherit float-left ml-3 mt-[22px]`}
                  >
                    VOLUNTEER EXPERIENCE
                  </h1>
                </Transition>
              </button>
            </div>

            <div
              className={`flex py-5 ease-in-out duration-500 lg:mx-2 ${
                open ? "" : "max-lg:scale-0"
              }`}
            >
              <button
                className={`p-0 duration-500 relative rounded-md text-slate-300 hover:bg-slate-300 hover:text-slate-900 ${
                  open ? "w-[360px]" : "flex-none"
                }`}
                onClick={() => {
                  filterByType("Awards");
                  setVisible(4);
                  setNoMore(false);
                }}
              >
                <BiSolidAward
                  className={`text-5xl rounded float-left [transition:_color_75ms,transform_0.5s_ease-in-out] flex-shrink-0 p-1 m-3 ${
                    open ? "rotate-[360deg] mr-0" : ""
                  }`}
                />
                <Transition
                  show={open}
                  enter="transition ease-in duration-[200ms] delay-100"
                  enterTo="scale-100"
                  enterFrom="scale-0 absolute"
                  leave="transition duration-0"
                  leaveFrom="scale-100"
                  leaveTo="scale-0 absolute"
                >
                  <h1
                    className={`text-lg [transition:_color_75ms] text-inherit float-left ml-3 mt-[22px]`}
                  >
                    AWARDS
                  </h1>
                </Transition>
              </button>
            </div>
          </div>

          <div className="p-[30px] xl:pt-5">
            <div className="text-right font-archivo shadow-cs-lg shadow-slate-900 p-10 rounded-xl w-[100%] mx-1 xl:mx-3 md:max-lg:mx-3 mb-3">
              <div className="text-slate-300 max-h-[100%] max-w-[100%] max-sm:text-3xl sm:max-md:text-5xl md:text-6xl duration-500">
                {type}
              </div>
            </div>

            <ul className="text-slate-300 xl:flex xl:flex-row xl:flex-wrap xl:justify-between md:max-lg:flex md:max-lg:flex-row md:max-lg:flex-wrap md:max-lg:justify-between">
              {filteredSections.slice(0, visible).map((section) => {
                const { name, description, start_date, end_date, image } =
                  section;
                return (
                  <li
                    key=""
                    className="text-center hover:bg-slate-800 shadow-cs-lg p-10 rounded-xl basis-5/12 flex-1 relative mb-5 mx-1 xl:mx-3 md:max-lg:mx-3 duration-200 flex flex-col justify-center"
                  >
                    <img
                      src={section.image}
                      alt=""
                      className="max-h-[250px] rounded-2xl mx-auto drop-shadow-3xl mt-5"
                    />
                    <div className="text-lg font-medium pt-8 pb-2">
                      <strong>{name}</strong>
                    </div>
                    <div className="py-2">
                      {description.split("\n").map((line) => (
                        <p key="" className="mt-1">
                          {line}
                        </p>
                      ))}
                    </div>
                    <div className="p-4 my-5 text-teal-300 rounded-full bg-teal-400/10 shadow-cs-md">
                      {EndDate(start_date, end_date)}
                    </div>
                  </li>
                );
              })}
              <button
                className={`text-center text-lg bg-slate-300 text-slate-900 hover:bg-slate-900 hover:text-slate-300 border-2 border-slate-300 shadow-cs-lg p-10 rounded-xl w-[100%] mx-1 xl:mx-3 md:max-lg:mx-3 duration-200 ${
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
