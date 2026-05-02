import { memo, useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Edges, OrbitControls } from "@react-three/drei";
import {
  FaJava,
  FaReact,
  FaHtml5,
  FaCss3Alt,
  FaGithub,
  FaDatabase,
  FaCode,
  FaRobot,
  FaTools,
  FaCloud,
  FaGitAlt,
} from "react-icons/fa";
import {
  SiPython,
  SiMongodb,
  SiJavascript,
  SiCplusplus,
  SiTensorflow,
  SiScikitlearn,
  SiSelenium,
  SiNodedotjs,
} from "react-icons/si";
import "./Skills.css";

const skills = [
  {
    icon: <SiCplusplus />,
    name: "C++",
    color: "#00599c",
    usedIn:
      "Used at a basic level for programming fundamentals and problem solving practice.",
  },
  {
    icon: <FaJava />,
    name: "Java",
    color: "#f89820",
    usedIn:
      "Used for Object-Oriented Programming, DSA practice, and core programming concepts.",
  },
  {
    icon: <SiPython />,
    name: "Python",
    color: "#3776ab",
    usedIn:
      "Used in machine learning, AI experiments, data handling, and automation-based work.",
  },
  {
    icon: <FaCode />,
    name: "OOP",
    color: "#9b5cff",
    usedIn:
      "Used to structure code with classes, objects, inheritance, and reusable logic.",
  },
  {
    icon: <FaCode />,
    name: "DSA",
    color: "#00d084",
    usedIn:
      "Used for strengthening problem-solving skills and writing efficient logic.",
  },
  {
    icon: <FaHtml5 />,
    name: "HTML5",
    color: "#e34f26",
    usedIn:
      "Used in Sparch E-Commerce website to create the main page structure and layout.",
  },
  {
    icon: <FaCss3Alt />,
    name: "CSS3",
    color: "#1572b6",
    usedIn:
      "Used in Sparch E-Commerce website for styling, responsive design, and visual layout.",
  },
  {
    icon: <SiJavascript />,
    name: "JavaScript",
    color: "#f7df1e",
    usedIn:
      "Used in Sparch E-Commerce website for frontend logic, interactions, and dynamic behavior.",
  },
  {
    icon: <FaReact />,
    name: "React.js",
    color: "#61dafb",
    usedIn:
      "Used in Sparch E-Commerce website to build reusable UI components and product pages.",
  },
  {
    icon: <SiNodedotjs />,
    name: "Node.js",
    color: "#83cd29",
    usedIn:
      "Used in Sparch E-Commerce website for backend APIs and server-side logic.",
  },
  {
    icon: <FaDatabase />,
    name: "SQL",
    color: "#4db6ac",
    usedIn:
      "Used for learning relational database concepts, queries, and structured data handling.",
  },
  {
    icon: <SiMongodb />,
    name: "MongoDB",
    color: "#00ed64",
    usedIn:
      "Used in Sparch E-Commerce website for storing product, user, and application data.",
  },
  {
    icon: <SiTensorflow />,
    name: "TensorFlow",
    color: "#ff6f00",
    usedIn:
      "Used for machine learning and deep learning model experimentation.",
  },
  {
    icon: <SiScikitlearn />,
    name: "Scikit-learn",
    color: "#f7931e",
    usedIn:
      "Used for ML model training, preprocessing, evaluation, and prediction-based tasks.",
  },
  {
    icon: <FaRobot />,
    name: "LangChain",
    color: "#1cd8d2",
    usedIn:
      "Used for building LLM-powered applications, AI agents, and chatbot logic.",
  },
  {
    icon: <FaDatabase />,
    name: "RAG",
    color: "#00bf8f",
    usedIn:
      "Used for connecting LLMs with external knowledge to create more useful AI answers.",
  },
  {
    icon: <FaTools />,
    name: "N8N",
    color: "#ea4b71",
    usedIn:
      "Used for AI automation, tool integration, and building automated workflows.",
  },
  {
    icon: <FaGitAlt />,
    name: "Git",
    color: "#f05032",
    usedIn:
      "Used for tracking code changes and managing project versions.",
  },
  {
    icon: <FaGithub />,
    name: "GitHub",
    color: "#ffffff",
    usedIn:
      "Used for hosting code, managing repositories, and sharing projects.",
  },
  {
    icon: <FaTools />,
    name: "API Integration",
    color: "#38bdf8",
    usedIn:
      "Used to connect frontend apps, backend services, and third-party tools.",
  },
  {
    icon: <SiSelenium />,
    name: "Selenium",
    color: "#43b02a",
    usedIn:
      "Used for web automation, testing browser actions, and scraping-based tasks.",
  },
  {
    icon: <FaCloud />,
    name: "Cloud Computing",
    color: "#60a5fa",
    usedIn:
      "Used for understanding deployment, hosting, and scalable application infrastructure.",
  },
];

function WhiteBallMesh({ active }) {
  const meshRef = useRef(null);

  useFrame((state, delta) => {
    if (!meshRef.current) return;

    const speed = active ? 0.5 : 0.32;

    meshRef.current.rotation.y += delta * speed;
    meshRef.current.rotation.x += delta * speed * 0.22;
  });

  return (
    <Float
      speed={active ? 0.75 : 0.55}
      rotationIntensity={0}
      floatIntensity={active ? 0.13 : 0.07}
    >
      <mesh ref={meshRef} scale={active ? 1.08 : 1}>
        <icosahedronGeometry args={[1.45, 1]} />
        <meshStandardMaterial
          color="#f4f1e8"
          roughness={0.46}
          metalness={0.04}
          flatShading={true}
        />
        <Edges threshold={15} color="#8c897f" scale={1.01} />
      </mesh>
    </Float>
  );
}

const SkillBallCanvas = memo(function SkillBallCanvas({
  icon,
  color,
  active,
  large = false,
}) {
  return (
    <div className={`skill-ball-wrap ${large ? "large-ball" : ""}`}>
      <div className="white-ball-fallback"></div>

      <Canvas
        frameloop="always"
        dpr={[1, 1.2]}
        performance={{ min: 0.5 }}
        gl={{
          alpha: true,
          antialias: true,
          powerPreference: "high-performance",
          preserveDrawingBuffer: false,
        }}
        camera={{ position: [0, 0, 4.7], fov: 42 }}
      >
        <ambientLight intensity={1.15} />
        <directionalLight position={[3, 4, 5]} intensity={2.55} />
        <directionalLight position={[-4, -3, 2]} intensity={0.7} />
        <pointLight position={[0, 0, 4]} intensity={1.15} color={color} />

        <WhiteBallMesh active={active} />

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          enableRotate={true}
          enableDamping={true}
          dampingFactor={0.1}
          rotateSpeed={0.55}
          autoRotate={false}
        />
      </Canvas>

      <div className="skill-ball-icon" style={{ color }}>
        {icon}
      </div>
    </div>
  );
});

export default function Skills() {
  const sectionRef = useRef(null);

  const [activeIndex, setActiveIndex] = useState(0);
  const [manualPause, setManualPause] = useState(false);

  useEffect(() => {
    if (manualPause) return;

    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % skills.length);
    }, 4200);

    return () => clearInterval(timer);
  }, [manualPause]);

  useEffect(() => {
    const resume = () => setManualPause(false);

    const outsideClick = (e) => {
      if (!e.target.closest(".skill-point")) {
        setManualPause(false);
      }
    };

    window.addEventListener("scroll", resume);
    window.addEventListener("wheel", resume);
    document.addEventListener("click", outsideClick);

    return () => {
      window.removeEventListener("scroll", resume);
      window.removeEventListener("wheel", resume);
      document.removeEventListener("click", outsideClick);
    };
  }, []);

  const handleClick = (e, index) => {
    e.stopPropagation();
    setActiveIndex(index);
    setManualPause(true);
  };

  const getPosition = (index) => {
    const total = skills.length;
    let diff = index - activeIndex;

    if (diff > total / 2) diff -= total;
    if (diff < -total / 2) diff += total;

    return diff;
  };

  const activeSkill = skills[activeIndex];

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="skills-section"
      style={{ "--activeClr": activeSkill.color }}
    >
      <div className="skills-main-content">
        <div className="skill-bg-glow"></div>

        <h2 className="skills-title">My Skills</h2>

        <div className="semi-orbit-wrapper">
          <div className="orbit-line outer-line"></div>
          <div className="orbit-line inner-line"></div>

          <div className="center-info">
            <div className="center-icon-box">
              <SkillBallCanvas
                icon={activeSkill.icon}
                color={activeSkill.color}
                active={true}
                large={true}
              />
            </div>

            <h3>{activeSkill.name}</h3>
            <p>{activeSkill.usedIn}</p>
          </div>

          <div className="semi-orbit">
            {skills.map((skill, index) => {
              const pos = getPosition(index);
              const isVisible = Math.abs(pos) <= 5;
              const angle = 270 + pos * 15;

              return (
                <button
                  key={skill.name}
                  className={`skill-point ${
                    index === activeIndex ? "active" : ""
                  } ${!isVisible ? "hide-skill" : ""}`}
                  onClick={(e) => handleClick(e, index)}
                  style={{
                    "--angle": `${angle}deg`,
                    "--clr": skill.color,
                  }}
                >
                  <div className="skill-cube">
                    {isVisible && (
                      <SkillBallCanvas
                        icon={skill.icon}
                        color={skill.color}
                        active={index === activeIndex}
                      />
                    )}
                  </div>

                  <p>{skill.name}</p>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}