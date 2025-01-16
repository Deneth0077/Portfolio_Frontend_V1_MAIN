import React from "react";
import Hero from "./miniComponents/Hero";
import Timeline from "./miniComponents/Timeline";
import Skills from "./miniComponents/Skills";
import MyApps from "./miniComponents/MyApps";
import About from "./miniComponents/About";
import { ThemeProvider } from "@/components/theme-provider";
import Portfolio from "./miniComponents/Portfolio";
import Contact from "./miniComponents/Contact";

const Home = () => {
  return (
    <article className="px-1 mt-1 sm:mt-8 md:mt-8 lg:mt-8 xl:mt-6 sm:mx-auto w-full max-w-[1420px] flex flex-col gap-10">
      <Hero />
      <About />
      <Portfolio />
      <Skills />
      <Timeline />
      <Contact />
    </article>
  );
};

export default Home;
