import React from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useMotionValueEvent,
} from "framer-motion";
import "./MyTimeline.css";

const timelineData = [
  {
    year: "2020",
    title: "Class 10 Completed",
    subtitle: "Montfort Inter College, Lucknow",
    description:
      "I completed Class 10 from Montfort Inter College, Lucknow under the Central Board of Secondary Education (CBSE). This phase helped me build my academic base and early interest in computers, technology, and problem solving.",
    color: "#00ffc3",
    bg1: "rgba(0, 255, 195, 0.24)",
    bg2: "rgba(0, 120, 255, 0.12)",
    points: [
      "Completed Class 10 from Montfort Inter College, Lucknow.",
      "Studied under the Central Board of Secondary Education (CBSE).",
      "Built strong academic basics and started developing interest in technology.",
    ],
  },
  {
    year: "2023",
    title: "Class 12 Completed & Engineering Journey Started",
    subtitle: "Montfort Inter College to VIT Bhopal University",
    description:
      "I completed Class 12 from Montfort Inter College, Lucknow with Physics, Chemistry, and Mathematics (PCM) under the Central Board of Secondary Education (CBSE). After that, I worked as an intern and freelancer at CuriosityEdtech Private Limited for 3 months. On 3 September 2023, I joined VIT Bhopal University in Computer Science and Engineering with specialization in Artificial Intelligence and Machine Learning.",
    color: "#00e5ff",
    bg1: "rgba(0, 229, 255, 0.22)",
    bg2: "rgba(95, 70, 255, 0.16)",
    points: [
      "Completed Class 12 with Physics, Chemistry, and Mathematics (PCM) from Montfort Inter College, Lucknow under CBSE.",
      "Worked for 3 months as an intern and freelancer at CuriosityEdtech Private Limited.",
      "Joined VIT Bhopal University on 3 September 2023 in Computer Science and Engineering with Artificial Intelligence and Machine Learning.",
    ],
  },
  {
    year: "2024",
    title: "MERN Stack Development & Hackathons",
    subtitle: "Web Development and Practical Project Building",
    description:
      "In 2024, I started learning web development with the MongoDB, Express.js, React.js, and Node.js (MERN) stack. I developed different practical projects such as an e-commerce website, food delivery application, and other full-stack projects. In the same year, I also participated in various hackathons to improve my problem-solving and project-building skills.",
    color: "#a855ff",
    bg1: "rgba(168, 85, 255, 0.24)",
    bg2: "rgba(0, 255, 195, 0.12)",
    points: [
      "Started learning full-stack web development using MongoDB, Express.js, React.js, and Node.js.",
      "Built various projects such as an e-commerce website, food delivery app, and other web applications.",
      "Participated in multiple hackathons and improved practical development and team-building skills.",
    ],
  },
  {
    year: "2025",
    title: "Shifted to AI, Built Projects & Started Paid Internship",
    subtitle: "AI, Automation, Research, and Real-World Work",
    description:
      "In 2025, I shifted my main domain from full-stack development to Artificial Intelligence. I learned new skills such as N8N automation, Retrieval-Augmented Generation (RAG), Large Language Models (LLMs), AI agents, and automation systems. I built projects such as a desktop AI assistant and other AI-based systems. I also won the AI Demos Monthly Hackathon with a cash prize of 100 dollars. From August to September, I worked as a Project Management Intern at Excelerate. Between August and October, I published a dataset on carbon credits, and my research paper is currently in progress. Later, I unlocked my first paid internship from October to February for 6 months as an AI Content Researcher.",
    color: "#00ff7b",
    bg1: "rgba(0, 255, 123, 0.24)",
    bg2: "rgba(0, 255, 195, 0.14)",
    points: [
      "Shifted my main focus to Artificial Intelligence and learned N8N automation, RAG, LLMs, AI agents, and automation skills.",
      "Built AI projects like a desktop AI assistant and won the AI Demos Monthly Hackathon with a cash prize of 100 dollars.",
      "Worked as a Project Management Intern at Excelerate from August to September, published a carbon credits dataset between August and October, and started a 6-month paid AI Content Researcher internship from October to February.",
    ],
  },
];

function TimelineNumber({ item, idx, activeIndex, onOpen, mobile = false }) {
  const isPassed = idx <= activeIndex;
  const isCurrent = idx === activeIndex;

  return (
    <button
      type="button"
      className={`${
        mobile
          ? `timeline-mobile-number timeline-mobile-point-${idx + 1}`
          : `timeline-number timeline-point-${idx + 1}`
      } ${isPassed ? "timeline-passed" : ""} ${
        isCurrent ? "timeline-current" : ""
      }`}
      style={{ "--nodeColor": item.color }}
      onClick={() => onOpen(item)}
      aria-label={`Open ${item.year} timeline details`}
    >
      {mobile ? item.year : <span>{item.year}</span>}
    </button>
  );
}

export default function MyTimeline() {
  const sceneRef = React.useRef(null);

  const [activeIndex, setActiveIndex] = React.useState(0);
  const [selectedItem, setSelectedItem] = React.useState(null);

  const activeIndexRef = React.useRef(0);

  const sceneHeight = 210;

  const { scrollYProgress } = useScroll({
    target: sceneRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const safeProgress = Math.max(0, Math.min(latest, 0.999));

    let nextIndex = 0;

    if (safeProgress >= 0.08) nextIndex = 0;
    if (safeProgress >= 0.34) nextIndex = 1;
    if (safeProgress >= 0.58) nextIndex = 2;
    if (safeProgress >= 0.86) nextIndex = 3;

    if (activeIndexRef.current !== nextIndex) {
      activeIndexRef.current = nextIndex;
      setActiveIndex(nextIndex);
    }
  });

  const snakePathLength = useTransform(scrollYProgress, [0, 0.96], [0, 1]);

  const activeItem = timelineData[activeIndex];

  return (
    <section
      id="my-timeline"
      className="my-timeline-section"
      style={{
        "--activeColor": activeItem.color,
        "--activeBgOne": activeItem.bg1,
        "--activeBgTwo": activeItem.bg2,
      }}
    >
      <div className="timeline-bg-layer">
        <div className="timeline-live-gradient" />
        <div className="timeline-grid-glow" />
      </div>

      <div
        ref={sceneRef}
        style={{ height: `${sceneHeight}vh` }}
        className="timeline-scroll-space"
      >
        <div className="timeline-sticky">
          <div className="timeline-title-wrapper">
            <h2 className="timeline-title">My Timeline</h2>
          </div>

          <div className="timeline-content">
            {/* Desktop / Tablet Snake Timeline */}
            <div className="timeline-desktop">
              <svg
                className="timeline-snake-svg"
                viewBox="0 0 1200 420"
                preserveAspectRatio="none"
              >
                <path
                  className="timeline-snake-base"
                  d="
                    M90 210
                    C190 80, 330 80, 430 210
                    C530 340, 670 340, 770 210
                    C855 100, 980 120, 1010 230
                    C1045 360, 1140 335, 1120 260
                  "
                />

                <motion.path
                  className="timeline-snake-fill"
                  d="
                    M90 210
                    C190 80, 330 80, 430 210
                    C530 340, 670 340, 770 210
                    C855 100, 980 120, 1010 230
                    C1045 360, 1140 335, 1120 260
                  "
                  style={{ pathLength: snakePathLength }}
                />
              </svg>

              <div className="timeline-items-desktop">
                {timelineData.map((item, idx) => (
                  <TimelineNumber
                    key={item.year}
                    item={item}
                    idx={idx}
                    activeIndex={activeIndex}
                    onOpen={setSelectedItem}
                  />
                ))}
              </div>
            </div>

            {/* Phone Snake Timeline */}
            <div className="timeline-mobile">
              <svg
                className="timeline-mobile-snake-svg"
                viewBox="0 0 360 620"
                preserveAspectRatio="none"
              >
                <path
                  className="timeline-snake-base"
                  d="
                    M70 70
                    C250 55, 255 195, 78 190
                    C245 205, 260 345, 75 340
                    C245 355, 255 500, 85 530
                  "
                />

                <motion.path
                  className="timeline-snake-fill"
                  d="
                    M70 70
                    C250 55, 255 195, 78 190
                    C245 205, 260 345, 75 340
                    C245 355, 255 500, 85 530
                  "
                  style={{ pathLength: snakePathLength }}
                />
              </svg>

              <div className="timeline-items-mobile">
                {timelineData.map((item, idx) => (
                  <TimelineNumber
                    key={`${item.year}-mobile`}
                    item={item}
                    idx={idx}
                    activeIndex={activeIndex}
                    onOpen={setSelectedItem}
                    mobile
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {selectedItem && (
          <motion.div
            className="timeline-modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedItem(null)}
          >
            <motion.div
              className="timeline-modal"
              style={{ "--modalColor": selectedItem.color }}
              initial={{ scale: 0.9, opacity: 0, y: 45 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 45 }}
              transition={{ type: "spring", stiffness: 180, damping: 20 }}
              onClick={(event) => event.stopPropagation()}
            >
              <button
                type="button"
                className="timeline-modal-close"
                onClick={() => setSelectedItem(null)}
                aria-label="Close timeline details"
              >
                ×
              </button>

              <span className="timeline-modal-year">{selectedItem.year}</span>

              <h2>{selectedItem.title}</h2>
              <h4>{selectedItem.subtitle}</h4>
              <p>{selectedItem.description}</p>

              <div className="timeline-modal-points">
                {selectedItem.points.map((point, index) => (
                  <div key={index} className="timeline-modal-point">
                    <span>0{index + 1}</span>
                    <p>{point}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}