import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import BootScreen from "@/components/BootScreen";
import MatrixRain from "@/components/MatrixRain";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Education from "@/components/Education";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact";
import Chatbot from "@/components/Chatbot";

const Index = () => {
  const [booted, setBooted] = useState(false);

  return (
    <>
      <AnimatePresence>
        {!booted && <BootScreen onComplete={() => setBooted(true)} />}
      </AnimatePresence>

      {booted && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}>
          <MatrixRain />
          <Navbar />
          <main className="relative z-10">
            <Hero />
            <About />
            <Education />
            <Experience />
            <Projects />
            <Skills />
            <Contact />
          </main>
          <Chatbot />
        </motion.div>
      )}
    </>
  );
};

export default Index;
