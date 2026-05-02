import { useState } from "react";
import IntroAnimation from "./components/IntroAnimation";
import Navbar from "./components/Navbar";
import CustomCursor from "./components/CustomCursor";

import Home from "./sections/Home";
import About from "./sections/About";
import TalkWithMyBuddy from "./sections/TalkWithMyBuddy";
import Skills from "./sections/Skills";
import Projects from "./sections/Projects";
import Experience from "./sections/Experience";
import CertificationsSlider from "./sections/Certifications";
import StoryTimeline from "./sections/StoryTimeline";
// ❌ Removed Contact import
import Footer from "./sections/Footer";

export default function App() {
  const [introDone, setIntroDone] = useState(() => {
    return sessionStorage.getItem("introDone") === "true";
  });

  const handleIntroFinish = () => {
    sessionStorage.setItem("introDone", "true");
    setIntroDone(true);
  };

  return (
    <div className="relative animated-gradient text-white">
      <CustomCursor />
      <Navbar />

      {!introDone && <IntroAnimation onFinish={handleIntroFinish} />}

      <Home introDone={introDone} />
      <About />
      <TalkWithMyBuddy />

      <Skills />
      <Projects />
      <Experience />
      <CertificationsSlider />
      <StoryTimeline />

      {/* ❌ Contact removed */}

      <Footer />
    </div>
  );
}