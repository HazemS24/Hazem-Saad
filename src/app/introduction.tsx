import {
  AiFillLinkedin,
  AiFillYoutube,
  AiOutlineInstagram,
  AiOutlineGithub,
} from "react-icons/ai";
import Image from "next/image";
import hazem from "public/images/hazem_saad.jpg";
import { motion } from "framer-motion";

export const Introduction = () => {
  return (
    <motion.div
      key={""}
      initial={{ y: 10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <section className="min-h-screen px-10 pb-10 md:pt-5 md:px-20 lg:px-30">
        <div className="text-center p-10">
          <h2 className="text-5xl max-sm:text-3xl pb-2 md:pt-20 max-lg:pt-16 text-slate-200 font-bold">
            Hazem Saad
          </h2>
          <h3 className="text-2xl max-sm:text-lg py-2 md:text-3xl text-slate-300">
            Developer and Engineer.
          </h3>
          <p className="text-md max-sm:text-sm py-5 leading-8 md:text-lg max-w-2xl mx-auto text-slate-400 font-archivo">
            A current{" "}
            <span className="text-slate-100">University of Waterloo</span>{" "}
            student pursuing a <span className="text-slate-100">Computer Engineering Degree with a minor inArtifical Intelligence.</span> I am passionate about creating innovative solutions for modern complex problems!{" "} Feel free to explore my portfolio and connect on my social media accounts!
          </p>
        </div>
        <div className="text-5xl max-sm:text-3xl max-sm:py-0 text-slate-400 flex justify-center gap-[60px] py-4 max-md:gap-[30px]">
          <div className="hover:scale-110 duration-100">
            <a href="https://github.com/HazemS24">
              <AiOutlineGithub className="hover:text-slate-200" />
            </a>
          </div>
          <div className="hover:scale-110 duration-100">
            <a href="https://www.linkedin.com/in/hazem-saad">
              <AiFillLinkedin className="hover:text-slate-200" />
            </a>
          </div>
          <div className="hover:scale-110 duration-100">
            <a href="https://www.instagram.com/hazem_saad04/">
              <AiOutlineInstagram className="hover:text-slate-200" />
            </a>
          </div>
          <div className="hover:scale-110 duration-100">
            <a href="https://www.youtube.com/channel/UCW2xU773uz7wGhp5ToAIX2A/">
              <AiFillYoutube className="hover:text-slate-200" />
            </a>
          </div>
        </div>
        <div className="relative mx-auto rounded-full w-80 h-80 my-20 max-sm:mb-0  overflow-hidden border-slate-200 md:h-96 md:w-96 border-2 shadow-cs-xl shadow-slate-500 max-sm:h-60 max-sm:w-60">
          <Image src={hazem} alt="" />
        </div>
      </section>
    </motion.div>
  );
};
