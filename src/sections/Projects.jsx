import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import "./Projects.css";

const projects = [
  {
    title: "Interview IQ - AI Interview Platform",
    category: "AI Interview Platform",
    duration: "2026",
    description:
      "Developed AI-powered mock interview platform using RAG, LangChain, LLM, React, and Node.js with notes and PPT upload, chat-based topic questions, summaries, viva questions, interview questions, MCQ generation, and resume gap analyzer to evaluate role fit.",
    tech: ["RAG", "LangChain", "LLM", "React", "Node.js"],
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&auto=format&fit=crop&q=80",
    github: "https://github.com/Sp-bit-code/Interview-IQ",
    live: "https://interview-iq-0imv.onrender.com/",
  },
  {
    title: "AI-EchOo E-commerce Platform",
    category: "AI E-commerce Platform",
    duration: "2026",
    description:
      "Developed AI-enabled e-commerce platform using React, Supabase, product catalog, cart, wishlist, orders, payments, admin dashboard, and RAG chatbot support. Implemented secure authentication, product management, responsive UI, and deployment workflows for optimized user experience.",
    tech: [
      "React",
      "Supabase",
      "RAG Chatbot",
      "Authentication",
      "Admin Dashboard",
    ],
    image:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&auto=format&fit=crop&q=80",
    github: "https://github.com/Sp-bit-code/AI-EchOo-Ecommerce-Platform",
    live: "https://ai-echoo-ecommerce-platform.onrender.com/",
  },
  {
    title: "Desktop AI Assistant",
    category: "Python AI Assistant",
    duration: "May 2025",
    description:
      "Engineered Python-based voice assistant for web search, media playback, and AI-powered content generation with 95 percent accuracy. Authored dynamic scripts to automate Chrome interactions and LinkedIn search demonstrating advanced automation, web scraping, and API integration.",
    tech: ["Python", "Voice Assistant", "Automation", "Web Scraping", "API"],
    image:
      "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=1200&auto=format&fit=crop&q=80",
    github: "https://github.com/Sp-bit-code/AI-Assistant",
    live: "https://ai-assistant-version-2-1ww8.onrender.com/",
  },
  {
    title: "Carbon Credits Predictor",
    category: "Machine Learning Project",
    duration: "Feb 2026",
    description:
      "Engineered a high-precision Voting Regressor ensemble using HistGradientBoosting, RandomForest, and ExtraTrees with physics-based feature engineering. Built a performance-optimized FastAPI backend to calculate real-time carbon credits using live solar irradiance data from NASA POWER API.",
    tech: ["Python", "Machine Learning", "FastAPI", "NASA API"],
    image:
      "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=1200&auto=format&fit=crop&q=80",
    github: "https://github.com/AR2706/Carbon-Credits-Predictor",
    live: "https://carbon-credits-predictor-main.onrender.com/",
  },
  {
    title: "Full Stack Ecommerce Platform",
    category: "MERN Stack Project",
    duration: "July 2025",
    description:
      "Built a responsive e-commerce platform using HTML, CSS, and React.js with secure login and signup functionality, smooth add-to-cart experience, and full-stack product and order management using MongoDB, Express.js, React.js, and Node.js.",
    tech: ["MongoDB", "Express.js", "React.js", "Node.js", "CSS"],
    image:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&auto=format&fit=crop&q=80",
    github: "https://github.com/Sp-bit-code/mern-ecommerce-main",
    live: "https://ecommerce9-ata8.onrender.com/",
  },
];

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

const Projects = () => {
  const sectionRef = useRef(null);
  const rafRef = useRef(null);
  const latestProgressRef = useRef(0);

  const activeIndexRef = useRef(0);
  const localProgressRef = useRef(0.5);
  const showFinalGridRef = useRef(false);

  const [isMobile, setIsMobile] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [localProgress, setLocalProgress] = useState(0.5);
  const [showFinalGrid, setShowFinalGrid] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 900);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  useEffect(() => {
    activeIndexRef.current = 0;
    localProgressRef.current = 0.5;
    showFinalGridRef.current = false;

    setActiveIndex(0);
    setLocalProgress(0.5);
    setShowFinalGrid(false);
  }, [isMobile]);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const updateStateSafely = (nextIndex, nextProgress, nextFinalGrid) => {
    const roundedProgress = Math.round(nextProgress * 100) / 100;

    if (showFinalGridRef.current !== nextFinalGrid) {
      showFinalGridRef.current = nextFinalGrid;
      setShowFinalGrid(nextFinalGrid);
    }

    if (activeIndexRef.current !== nextIndex) {
      activeIndexRef.current = nextIndex;
      setActiveIndex(nextIndex);
    }

    if (Math.abs(localProgressRef.current - roundedProgress) >= 0.01) {
      localProgressRef.current = roundedProgress;
      setLocalProgress(roundedProgress);
    }
  };

  const calculateScrollState = (latest) => {
    /*
      Desktop / Laptop:
      old pinned animation timing kept same.

      Mobile:
      animation starts from 0 so blank starting space is removed.
      final grid comes near end so section remains pinned during scroll.
    */

    const finalGridStart = isMobile ? 0.9 : 0.76;
    const animationStart = isMobile ? 0 : 0.18;
    const animationEnd = finalGridStart;

    if (latest >= finalGridStart) {
      updateStateSafely(projects.length - 1, 0.5, true);
      return;
    }

    if (latest <= animationStart) {
      updateStateSafely(0, 0.5, false);
      return;
    }

    const animationProgress =
      (latest - animationStart) / (animationEnd - animationStart);

    const safeAnimationProgress = clamp(animationProgress, 0, 0.999);
    const total = projects.length;

    let index = Math.floor(safeAnimationProgress * total);

    if (index >= total) {
      index = total - 1;
    }

    const segmentStart = index / total;
    const segmentEnd = (index + 1) / total;

    let progressInside =
      (safeAnimationProgress - segmentStart) / (segmentEnd - segmentStart);

    progressInside = clamp(progressInside, 0, 1);

    if (index === 0) {
      progressInside = 0.5 + progressInside * 0.5;
    }

    updateStateSafely(index, progressInside, false);
  };

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    latestProgressRef.current = latest;

    if (rafRef.current) return;

    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = null;
      calculateScrollState(latestProgressRef.current);
    });
  });

  const project = projects[activeIndex];
  const isReverse = activeIndex % 2 !== 0;

  const get3DStyle = () => {
    let scale;
    let translateZ;
    let translateY;
    let opacity;
    let rotateX;
    let rotateY;

    if (isMobile) {
      /*
        Mobile light animation:
        no heavy translateZ, less rotation, smooth pinned scroll.
      */
      if (localProgress <= 0.5) {
        const p = localProgress / 0.5;

        scale = 0.74 + p * 0.26;
        translateZ = 0;
        translateY = 26 - p * 26;
        opacity = 0.35 + p * 0.65;
        rotateX = 4 - p * 4;
        rotateY = isReverse ? 3 - p * 3 : -3 + p * 3;
      } else {
        const p = (localProgress - 0.5) / 0.5;

        scale = 1 + p * 0.24;
        translateZ = 0;
        translateY = 0 - p * 28;
        opacity = 1 - p * 0.82;
        rotateX = 0 - p * 3;
        rotateY = isReverse ? 0 - p * 3 : 0 + p * 3;
      }

      return {
        opacity,
        willChange: "transform, opacity",
        backfaceVisibility: "hidden",
        WebkitBackfaceVisibility: "hidden",
        transform: `
          translate3d(0px, ${translateY}px, ${translateZ}px)
          scale(${scale})
          rotateX(${rotateX}deg)
          rotateY(${rotateY}deg)
        `,
      };
    }

    /*
      Desktop / laptop original 3D animation.
    */
    if (localProgress <= 0.5) {
      const p = localProgress / 0.5;

      scale = 0.42 + p * 0.58;
      translateZ = -520 + p * 520;
      translateY = 55 - p * 55;
      opacity = 0.1 + p * 0.9;
      rotateX = 10 - p * 10;
      rotateY = isReverse ? 8 - p * 8 : -8 + p * 8;
    } else {
      const p = (localProgress - 0.5) / 0.5;

      scale = 1 + p * 1.35;
      translateZ = 0 + p * 620;
      translateY = 0 - p * 65;
      opacity = 1 - p;
      rotateX = 0 - p * 8;
      rotateY = isReverse ? 0 - p * 6 : 0 + p * 6;
    }

    return {
      opacity,
      willChange: "transform, opacity",
      backfaceVisibility: "hidden",
      WebkitBackfaceVisibility: "hidden",
      transform: `
        translate3d(0px, ${translateY}px, ${translateZ}px)
        scale(${scale})
        rotateX(${rotateX}deg)
        rotateY(${rotateY}deg)
      `,
    };
  };

  return (
    <section
      id="projects"
      className={`projects-scroll-section ${
        isMobile ? "projects-mobile-optimized" : ""
      }`}
      ref={sectionRef}
    >
      <div className="projects-sticky">
        <div className="projects-bg-particles"></div>
        <div className="projects-vignette"></div>

        <div className="projects-heading">
          <h2>Projects</h2>
        </div>

        {!showFinalGrid ? (
          <div className="projects-camera">
            <motion.div
              key={`${activeIndex}-${isMobile ? "mobile" : "desktop"}`}
              className={`project-card ${isReverse ? "reverse" : ""}`}
              style={get3DStyle()}
            >
              <div className="project-info">
                <span className="project-number">0{activeIndex + 1}</span>

                <p className="project-category">{project.category}</p>
                <p className="project-duration">{project.duration}</p>

                <h3>{project.title}</h3>

                <p className="project-description">{project.description}</p>

                <div className="project-tech">
                  {project.tech.map((item, index) => (
                    <span key={`${item}-${index}`}>{item}</span>
                  ))}
                </div>

                <div className="project-buttons">
                  <a href={project.github} target="_blank" rel="noreferrer">
                    GitHub
                  </a>

                  {project.live && (
                    <a href={project.live} target="_blank" rel="noreferrer">
                      Live Demo
                    </a>
                  )}
                </div>
              </div>

              <div className="project-image-box">
                <img src={project.image} alt={project.title} />
              </div>
            </motion.div>
          </div>
        ) : (
          <motion.div
            className="projects-final-grid"
            initial={{ opacity: 0, y: isMobile ? 28 : 70, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
              duration: isMobile ? 0.35 : 0.65,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {projects.map((item, index) => (
              <motion.div
                className="final-project-card"
                key={`${item.title}-${index}`}
                initial={{
                  opacity: 0,
                  y: isMobile ? 24 : 55,
                  rotateX: isMobile ? 0 : 10,
                }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{
                  duration: isMobile ? 0.3 : 0.5,
                  delay: isMobile ? index * 0.035 : index * 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <div className="final-project-image">
                  <img src={item.image} alt={item.title} />
                </div>

                <div className="final-project-content">
                  <span>0{index + 1}</span>
                  <p>{item.category}</p>
                  <p className="final-project-duration">{item.duration}</p>
                  <h3>{item.title}</h3>

                  <div className="final-project-buttons">
                    <a href={item.github} target="_blank" rel="noreferrer">
                      GitHub
                    </a>

                    {item.live && (
                      <a href={item.live} target="_blank" rel="noreferrer">
                        Live
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        <div className="project-progress-dots">
          {projects.map((_, index) => (
            <span
              key={index}
              className={showFinalGrid || activeIndex === index ? "active" : ""}
            ></span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
