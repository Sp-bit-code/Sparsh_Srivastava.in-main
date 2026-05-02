import React, { useRef, useState } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import "./Projects.css";

const projects = [
  {
    title: "SmartFlow Personal AI Agent",
    category: "AI Automation Project",
    duration: "July 2025 – Aug 2025",
    description:
      "Developed a personal AI assistant using N8N workflow automation for task management through conversational AI, calendar integration, automated Gmail functionality, document analysis, vector databases, chatbots, and AI agents. Reduced manual work time by 60 percent.",
    tech: ["N8N", "AI Agents", "Gmail API", "Calendar", "Vector DB"],
    image:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&auto=format&fit=crop&q=80",
    github: "https://github.com/Sp-bit-code/n8n-Agenrt-AI",
    live: "",
  },
  {
    title: "Desktop AI Assistant",
    category: "Python AI Assistant",
    duration: "May 2025",
    description:
      "Engineered a Python-based voice assistant for web search, media playback, and AI-powered content generation with 95 percent accuracy. Built dynamic scripts to automate Chrome interactions and LinkedIn search using automation, web scraping, and API integration.",
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
    tech: ["Python", "Machine Learning", "FastAPI", "NASA API", "Ensemble ML"],
    image:
      "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=1200&auto=format&fit=crop&q=80",
    github: "https://github.com/AR2706/Carbon-Credits-Predictor",
    live: "",
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

  const [activeIndex, setActiveIndex] = useState(0);
  const [localProgress, setLocalProgress] = useState(0.5);
  const [showFinalGrid, setShowFinalGrid] = useState(false);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    /*
      0.00 - 0.18 = first card visible and stable
      0.18 - 0.76 = 3D animation
      0.76 - 1.00 = final all projects grid
    */

    if (latest >= 0.76) {
      setShowFinalGrid(true);
      return;
    }

    setShowFinalGrid(false);

    if (latest < 0.18) {
      setActiveIndex(0);
      setLocalProgress(0.5);
      return;
    }

    const animationStart = 0.18;
    const animationEnd = 0.76;

    const animationProgress =
      (latest - animationStart) / (animationEnd - animationStart);

    const total = projects.length;
    let index = Math.floor(animationProgress * total);

    if (index >= total) index = total - 1;

    const segmentStart = index / total;
    const segmentEnd = (index + 1) / total;

    let progressInside =
      (animationProgress - segmentStart) / (segmentEnd - segmentStart);

    progressInside = clamp(progressInside, 0, 1);

    /*
      First card should not go back to far position.
      It is already visible, so it starts from 0.5 and only moves forward.
    */
    if (index === 0) {
      progressInside = 0.5 + progressInside * 0.5;
    }

    setActiveIndex(index);
    setLocalProgress(progressInside);
  });

  const project = projects[activeIndex];
  const isReverse = activeIndex % 2 !== 0;

  const get3DStyle = () => {
    /*
      localProgress:
      0   = far away
      0.5 = normal clear view
      1   = moves toward camera and disappears
    */

    let scale;
    let translateZ;
    let translateY;
    let opacity;
    let rotateX;
    let rotateY;

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
      transform: `
        translate3d(0px, ${translateY}px, ${translateZ}px)
        scale(${scale})
        rotateX(${rotateX}deg)
        rotateY(${rotateY}deg)
      `,
    };
  };

  return (
    <section id="projects" className="projects-scroll-section" ref={sectionRef}>
      <div className="projects-sticky">
        <div className="projects-bg-particles"></div>
        <div className="projects-vignette"></div>

        <div className="projects-heading">
          <h2>Projects</h2>
        </div>

        {!showFinalGrid ? (
          <div className="projects-camera">
            <motion.div
              key={activeIndex}
              className={`project-card ${isReverse ? "reverse" : ""}`}
              style={get3DStyle()}
            >
              <div className="project-info">
                <span className="project-number">
                  0{activeIndex + 1}
                </span>

                <p className="project-category">{project.category}</p>
                <p className="project-duration">{project.duration}</p>

                <h3>{project.title}</h3>

                <p className="project-description">{project.description}</p>

                <div className="project-tech">
                  {project.tech.map((item, index) => (
                    <span key={index}>{item}</span>
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
            initial={{ opacity: 0, y: 70, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          >
            {projects.map((item, index) => (
              <motion.div
                className="final-project-card"
                key={index}
                initial={{ opacity: 0, y: 55, rotateX: 10 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
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