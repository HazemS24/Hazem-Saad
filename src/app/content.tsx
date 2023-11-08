"use client";

import { Transition } from "@headlessui/react";
import {
  MdWorkOutline,
  MdOutlineVolunteerActivism,
  MdOutlineFilterList,
  MdKeyboardArrowLeft,
} from "react-icons/md";
import { RxDashboard } from "react-icons/rx";
import { BiSolidAward, BiCodeAlt } from "react-icons/bi";
import sections from "./personal_portfolio_data.json";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const Content = () => {
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
      setType("WORK EXPERIENCE...");
    }
    if (type === "Volunteer Experience") {
      setType("VOLUNTEER EXPERIENCE...");
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
    <section className="flex m-5 max-sm:my-1 relative rounded-3xl h-[92vh] overflow-y-scroll overflow-x-hidden [@media(min-width:0)]:scrollbar-hide border-slate-300 border-2 shadow-cs-xl shadow-slate-500 z-10">
      <div className="sticky top-0 h-0 w-0 -z-10">
        <div className="h-[300px] w-[350px] lg:h-[500px] lg:w-[700px] -right-[20rem] top-[5rem] lg:-top-[10rem] lg:-right-[35rem] absolute bg-teal-800 rounded-full blur-[9rem]" />
      </div>

      <div className="sticky top-0 h-0 w-0 -z-10">
        <div className="h-[350px] w-[350px] lg:h-[500px] lg:w-[800px] -right-[45rem] md:-right[80rem] lg:-right-[75rem] xl:-right-[115rem] -bottom-[50rem] absolute bg-teal-800 rounded-full blur-[9rem]" />
      </div>

      <div className="sticky max-lg:h-0 max-lg:w-0 top-0 max-lg:z-[99]">
        <div
          className={`bg-slate-900 lg:h-[96%] p-5 pt-8 shadow-cs-xl shadow-slate-500 duration-500 max-lg:ml-4 max-lg:mt-4 z-[99] border-slate-300 rounded-3xl ml-4 my-4 ${
            open
              ? "w-[400px] max-sm:w-[335px] max-lg:rounded-2xl border-2"
              : "lg:w-[136px] max-lg:w-0 max-lg:h-0 max-lg:p-0 max-lg:z-40 lg:border-2"
          }`}
        >
          <MdKeyboardArrowLeft
            className={`max-lg:hidden bg-slate-900 text-slate-300 hover:bg-slate-300 hover:text-slate-900 text-4xl absolute rounded-full -right-4 top-4 border-2 border-slate-300 [transition:_color_75ms,transform_0.5s_ease-out] cursor-pointer my-5 ${
              !open && "rotate-180"
            }`}
            onClick={() => setOpen(!open)}
          />

          <MdOutlineFilterList
            className={`lg:hidden rounded-lg border-2 bg-slate-900 text-slate-300 hover:bg-slate-300 hover:text-slate-900 border-slate-300 text-5xl duration-500 cursor-pointer mb-5 ${
              open ? "w-[100%]" : "rotate-[360deg] mt-1 ml-1"
            }`}
            onClick={() => setOpen(!open)}
          />

          <Transition
            show={open}
            enter="transition duration-200 delay-100"
            enterTo="scale-100 w-[100%]"
            enterFrom="scale-0 w-[0%] ml-15 h-0"
            leave="transition duration-100"
            leaveFrom="scale-100 w-[100%]"
            leaveTo="scale-0 w-[0%] ml-15 h-0"
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
            className={`flex py-3 max-sm:py-1 ease-out duration-500 lg:mt-5 lg:mx-2 ${
              open ? "" : "max-lg:scale-0 p-0"
            }`}
          >
            <button
              className={`p-0 duration-300 relative rounded-3xl text-slate-300 hover:bg-slate-200 hover:text-slate-900 hover:scale-[105%] ${
                open ? "w-[360px]" : "flex-none"
              }`}
              onClick={() => {
                filterByType("");
                setVisible(4);
                setNoMore(false);
              }}
            >
              <RxDashboard
                className={`text-5xl max-sm:text-4xl rounded float-left flex-shrink-0 p-1 [transition:_color_75ms,transform_0.5s_ease-out] m-3 ${
                  open ? "rotate-[360deg] mr-0" : ""
                }`}
              />
              <Transition
                show={open}
                enter="transition ease-in duration-[200ms] delay-100"
                enterTo="scale-100"
                enterFrom="scale-0"
                leave="transition duration-0"
                leaveFrom="scale-100"
                leaveTo="scale-0"
              >
                <h1
                  className={`absolute text-lg max-sm:text-sm [transition:_color_75ms] text-inherit left-[60px] ml-3 mt-[22px]`}
                >
                  ALL ABOUT ME...
                </h1>
              </Transition>
            </button>
          </div>

          <div
            className={`flex py-3 max-sm:py-1 ease-out duration-500 lg:mx-2 ${
              open ? "" : "max-lg:scale-0"
            }`}
          >
            <button
              className={`p-0 duration-200 relative rounded-3xl text-slate-300 hover:bg-slate-300 hover:text-slate-900 hover:scale-[105%] ${
                open ? "w-[360px]" : "flex-none"
              }`}
              onClick={() => {
                filterByType("Projects");
                setVisible(4);
                setNoMore(false);
              }}
            >
              <BiCodeAlt
                className={`text-5xl max-sm:text-4xl rounded float-left [transition:_color_75ms,transform_0.5s_ease-out] flex-shrink-0 p-1 m-3 ${
                  open ? "rotate-[360deg] mr-0" : ""
                }`}
              />
              <Transition
                show={open}
                enter="transition ease-in duration-[200ms] delay-100"
                enterTo="scale-100"
                enterFrom="scale-0"
                leave="transition duration-0"
                leaveFrom="scale-100"
                leaveTo="scale-0"
              >
                <h1
                  className={`absolute text-lg max-sm:text-sm [transition:_color_75ms] text-inherit left-[60px] ml-3 mt-[22px]`}
                >
                  PROJECTS
                </h1>
              </Transition>
            </button>
          </div>

          <div
            className={`flex py-3 max-sm:py-1 ease-out duration-500 lg:mx-2 ${
              open ? "" : "max-lg:scale-0"
            }`}
          >
            <button
              className={`p-0 duration-200 relative rounded-3xl text-slate-300 hover:bg-slate-300 hover:text-slate-900 hover:scale-[105%] ${
                open ? "w-[360px]" : "flex-none"
              }`}
              onClick={() => {
                filterByType("Work Experience");
                setVisible(4);
                setNoMore(false);
              }}
            >
              <MdWorkOutline
                className={`text-5xl max-sm:text-4xl rounded float-left flex-shrink-0 p-1 [transition:_color_75ms,transform_0.5s_ease-out] m-3 ${
                  open ? "rotate-[360deg] mr-0" : ""
                }`}
              />
              <Transition
                show={open}
                enter="transition ease-in duration-[200ms] delay-100"
                enterTo="scale-100"
                enterFrom="scale-0"
                leave="transition duration-0"
                leaveFrom="scale-100"
                leaveTo="scale-0"
              >
                <h1
                  className={`absolute text-lg max-sm:text-sm [transition:_color_75ms] text-inherit left-[60px] ml-3 mt-[22px]`}
                >
                  WORK EXPERIENCE
                </h1>
              </Transition>
            </button>
          </div>

          <div
            className={`flex py-3 max-sm:py-1 ease-out duration-500 lg:mx-2 ${
              open ? "" : "max-lg:scale-0"
            }`}
          >
            <button
              className={`p-0 duration-200 relative rounded-3xl text-slate-300 hover:bg-slate-300 hover:text-slate-900 hover:scale-[105%] ${
                open ? "w-[360px]" : "flex-none"
              }`}
              onClick={() => {
                filterByType("Volunteer Experience");
                setVisible(4);
                setNoMore(false);
              }}
            >
              <MdOutlineVolunteerActivism
                className={`text-5xl max-sm:text-4xl rounded float-left [transition:_color_75ms,transform_0.5s_ease-out] flex-shrink-0 p-1 m-3 ${
                  open ? "rotate-[360deg] mr-0" : ""
                }`}
              />
              <Transition
                show={open}
                enter="transition ease-in duration-[200ms] delay-100"
                enterTo="scale-100"
                enterFrom="scale-0"
                leave="transition duration-0"
                leaveFrom="scale-100"
                leaveTo="scale-0"
              >
                <h1
                  className={`absolute text-lg max-sm:text-sm [transition:_color_75ms] text-inherit left-[60px] ml-3 mt-[22px]`}
                >
                  VOLUNTEER EXPERIENCE
                </h1>
              </Transition>
            </button>
          </div>

          <div
            className={`flex py-3 max-sm:py-1 ease-out duration-500 lg:mx-2 ${
              open ? "" : "max-lg:scale-0"
            }`}
          >
            <button
              className={`p-0 duration-200 relative rounded-3xl text-slate-300 hover:bg-slate-300 hover:text-slate-900 hover:scale-[105%] ${
                open ? "w-[360px]" : "flex-none"
              }`}
              onClick={() => {
                filterByType("Awards");
                setVisible(4);
                setNoMore(false);
              }}
            >
              <BiSolidAward
                className={`text-5xl max-sm:text-4xl rounded float-left [transition:_color_75ms,transform_0.5s_ease-out] flex-shrink-0 p-1 m-3 ${
                  open ? "rotate-[360deg] mr-0" : ""
                }`}
              />
              <Transition
                show={open}
                enter="transition ease-in duration-[200ms] delay-100"
                enterTo="scale-100"
                enterFrom="scale-0"
                leave="transition duration-0"
                leaveFrom="scale-100"
                leaveTo="scale-0"
              >
                <h1
                  className={`absolute text-lg max-sm:text-sm [transition:_color_75ms] text-inherit left-[60px] ml-3 mt-[22px]`}
                >
                  AWARDS
                </h1>
              </Transition>
            </button>
          </div>
        </div>
      </div>

      <div className="p-[30px] xl:pt-5">
        <div className="text-right font-archivo p-10 rounded-xl w-[100%] mx-1 xl:mx-3 md:max-lg:mx-3 mb-3">
          <div className="text-slate-300 max-h-[100%] max-w-[100%] max-sm:text-3xl sm:max-md:text-5xl md:text-6xl z-[99]">
            {type}
          </div>
        </div>
        <ul
          className={`text-slate-300 xl:flex xl:flex-row xl:flex-wrap xl:justify-between md:max-lg:flex md:max-lg:flex-row md:max-lg:flex-wrap md:max-lg:justify-between z-[99] ${
            noMore ? "max-lg:py-3" : ""
          }`}
        >
          {filteredSections.slice(0, visible).map((section, index) => {
            const { name, description, start_date, end_date, image, tools } =
              section;
            return (
              <AnimatePresence key={index} mode="wait">
                <motion.li
                  key={type ? type : "empty"}
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -10, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="bg-slate-900 text-center hover:bg-slate-800 shadow-cs-section px-10 py-5 rounded-xl basis-5/12 flex-1 relative mb-5 mx-1 xl:mx-3 md:max-lg:mx-3 duration-200 flex flex-col justify-center max-w-[100%]"
                >
                  <img
                    src={image}
                    alt=""
                    className="max-h-[250px] rounded-2xl mx-auto drop-shadow-3xl mt-5"
                  />
                  <div className="text-lg font-medium pt-8 pb-2">
                    <strong>{name}</strong>
                  </div>
                  <hr className="w-[60%] self-center my-3 rounded h-1 bg-slate-500 border-none" />
                  <div className="py-2 text-md max-sm:text-sm mb-3">
                    {description.split("\n").map((line, index_two) => (
                      <p key={index_two} className="mt-1">
                        {line}
                      </p>
                    ))}
                  </div>
                  <div className="flex flex-row gap-[10px] flex-wrap justify-center max-sm:text-sm">
                    {tools.map((tool, index_three) => {
                      return (
                        <p
                          key={index_three}
                          className="text-teal-300 bg-teal-400/10 rounded-full my-1 px-3 py-2 max-sm:px-2 max-sm:py-1 drop-shadow-xl duration-200 hover:scale-[108%] hover:bg-teal-400/40"
                        >
                          {tool}
                        </p>
                      );
                    })}
                  </div>
                  <div className="p-4 my-5 text-teal-300 rounded-full bg-teal-400/10 shadow-cs-md max-sm:text-sm">
                    {EndDate(start_date, end_date)}
                  </div>
                </motion.li>
              </AnimatePresence>
            );
          })}
          <button
            className={`text-center text-lg bg-slate-300 text-slate-900 hover:bg-slate-900 hover:text-slate-300 border-2 border-slate-300 shadow-cs-lg py-5 max-sm:p-5 rounded-xl w-[100%] mx-1 xl:mx-3 md:max-lg:mx-3 mb-5 duration-200 max-sm:text-sm z-[99] ${
              noMore ? "hidden" : ""
            }`}
            onClick={showMoreItems}
          >
            LOAD MORE...
          </button>
        </ul>
      </div>
    </section>
  );
};
