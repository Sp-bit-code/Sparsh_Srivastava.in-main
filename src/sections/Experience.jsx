// // Importing React for building UI components
// import React from "react";
// // Importing motion components and scroll hooks from Framer Motion for animations
// import { motion, useScroll, useTransform } from "framer-motion";

// // Array of experience objects containing job details
// const experiences = [
//   {
//     role: "Web Developer",
//     company: "Brain Mentors",
//     duration: "2022",
//     description:
//       "Worked with team to build high-performance apps, integrated AI features, and improved engagement by 10%.",
//   },
  
//   {
//     role: "Web Developer Intern",
//     company: "Mobisoft Technologies",
//     duration: "2022 - 2023",
//     description:
//       "In this internship , I gained valuable hands on experience and exposure to various aspects of web development.",
//   },
// {
//     role: "Graduate Engineer",
//     company: "HCL Technologies",
//     duration: "2024 - 2025",
//     description:
//       "Built the frontend of a GenAI-powered PV Intake Application using Next.js and TypeScript for a U.S life sciences client, enabling automated patient report processing across global regions.",
//   },


// ];

// // Reusable component to render each experience item with animations
// function ExperienceItem({ exp, idx, start, end, scrollYProgress, layout }) {
//   // Animates the size of the marker (dot) as user scrolls
//   const markerScale = useTransform(scrollYProgress, [start, end], [0, 1]);
//   // Animates the opacity of the marker
//   const markerOpacity = useTransform(scrollYProgress, [start, end], [0, 1]);
//   // Animates the opacity of the card
//   const cardOpacity = useTransform(scrollYProgress, [start, end], [0, 1]);

//   // Checks if card should be displayed above or below the timeline line
//   const isAbove = idx % 2 === 0;
//   // Animates vertical movement of cards for desktop layout
//   const cardY = useTransform(scrollYProgress, [start, end], [isAbove ? 30 : -30, 0]);
//   // Animates horizontal movement of cards for mobile layout
//   const cardX = useTransform(scrollYProgress, [start, end], [-24, 0]);

//   // Render for Desktop layout
//   if (layout === "desktop") {
//     return (
//       <div className="relative flex-1 flex justify-center items-center min-w-0" key={`${exp.company}-${exp.role}-${idx}`}>
//         {/* Marker dot on the timeline */}
//         <motion.div
//           className="z-10 w-7 h-7 rounded-full bg-white shadow-[0_0_0_8px_rgba(255,255,255,0.1)]"
//           style={{ scale: markerScale, opacity: markerOpacity }}
//         />
//         {/* Small vertical line above or below the marker */}
//         <motion.div
//           className={`absolute ${isAbove ? "-top-8" : "-bottom-8"} w-[3px] bg-white/40`}
//           style={{ height: 40, opacity: cardOpacity }}
//         />
//         {/* Experience card with role, company, duration, description */}
//         <motion.article
//           className={`absolute ${isAbove ? "bottom-12" : "top-12"} bg-gray-900/80 backdrop-blur border border-gray-700/70 rounded-xl p-7 w-[320px] shadow-lg`}
//           style={{ opacity: cardOpacity, y: cardY, maxWidth: "90vw" }}
//           transition={{ duration: 0.4, delay: idx * 0.15 }}
//         >
//           <h3 className="text-xl font-semibold">{exp.role}</h3>
//           <p className="text-md text-gray-400 mb-3">{exp.company} | {exp.duration}</p>
//           <p className="text-md text-gray-300 break-words">{exp.description}</p>
//         </motion.article>
//       </div>
//     );
//   }

//   // Render for Mobile layout
//   return (
//     <div key={`${exp.company}-${exp.role}-m-${idx}`} className="relative flex items-start">
//       {/* Marker dot on mobile timeline */}
//       <motion.div
//         className="absolute -left-[14px] top-3 z-10 w-7 h-7 rounded-full bg-white shadow-[0_0_0_8px_rgba(255,255,255,0.1)]"
//         style={{ scale: markerScale, opacity: markerOpacity }}
//       />
//       {/* Experience card (mobile version) */}
//       <motion.article
//         className="bg-gray-900/80 backdrop-blur border border-gray-700/70 rounded-xl p-5 w-[90vw] max-w-sm ml-6 shadow-lg"
//         style={{ opacity: cardOpacity, x: cardX }}
//         transition={{ duration: 0.4, delay: idx * 0.15 }}
//       >
//         <h3 className="text-lg font-semibold break-words">{exp.role}</h3>
//         <p className="text-sm text-gray-400 mb-2 break-words">{exp.company} | {exp.duration}</p>
//         <p className="text-sm text-gray-300 break-words">{exp.description}</p>
//       </motion.article>
//     </div>
//   );
// }

// // Main Experience component
// const Experience = () => {
//   const sceneRef = React.useRef(null); // Ref for the scrolling section
//   const [isMobile, setIsMobile] = React.useState(false); // State to track if device is mobile

//   // Detect window size and set isMobile state
//   React.useEffect(() => {
//     const checkMobile = () => setIsMobile(window.innerWidth < 768);
//     checkMobile();
//     window.addEventListener("resize", checkMobile);
//     return () => window.removeEventListener("resize", checkMobile);
//   }, []);

//   // Dynamic scene height based on device type and number of experiences
//   const SCENE_HEIGHT_VH = isMobile ? 100 * experiences.length * 1.6 : 100 * experiences.length * 1.2;

//   // Get scroll progress for animations
//   const { scrollYProgress } = useScroll({ target: sceneRef, offset: ["start start", "end end"] });

//   // Calculate thresholds for each experience card's animation start/end
//   const numExperiences = experiences.length;
//   const thresholds = React.useMemo(
//     () => Array.from({ length: numExperiences }, (_, i) => (i + 1) / numExperiences),
//     [numExperiences]
//   );

//   // Animate timeline line width (desktop) and height (mobile)
//   const lineWidth = useTransform(scrollYProgress, (v) => `${v * 100}%`);
//   const lineHeight = useTransform(scrollYProgress, (v) => `${v * 100}%`);

//   return (
//     <section id="experience" className="relative bg-black text-white">
//       {/* Main container with dynamic height */}
//       <div ref={sceneRef} style={{ height: `${SCENE_HEIGHT_VH}vh`, minHeight: "120vh" }} className="relative">
//         <div className="sticky top-0 h-screen flex flex-col">
//           {/* Section Title */}
//           <div className="shrink-0 px-6 pt-8">
//             <h2 className="text-4xl sm:text-5xl font-semibold mt-5 text-center">Experience</h2>
//           </div>
//           {/* Timeline container */}
//           <div className="flex-1 flex items-center justify-center px-6 pb-10">
//             {/* Desktop Timeline */}
//             <div className="relative w-full max-w-7xl hidden md:block">
//               {/* Horizontal timeline line */}
//               <div className="relative h-[6px] bg-white/15 rounded">
//                 <motion.div className="absolute left-0 top-0 h-[6px] bg-white rounded origin-left" style={{ width: lineWidth }} />
//               </div>
//               {/* Experience items mapped for desktop */}
//               <div className="relative flex justify-between mt-0">
//                 {experiences.map((exp, idx) => {
//                   const start = idx === 0 ? 0 : thresholds[idx - 1];
//                   const end = thresholds[idx];
//                   return (
//                     <ExperienceItem
//                       key={`${exp.company}-${exp.role}-${idx}`}
//                       exp={exp}
//                       idx={idx}
//                       start={start}
//                       end={end}
//                       scrollYProgress={scrollYProgress}
//                       layout="desktop"
//                     />
//                   );
//                 })}
//               </div>
//             </div>
//             {/* Mobile Timeline */}
//             <div className="relative w-full max-w-md md:hidden">
//               {/* Vertical timeline line */}
//               <div className="absolute left-0 top-0 bottom-0 w-[6px] bg-white/15 rounded">
//                 <motion.div className="absolute top-0 left-0 w-[6px] bg-white rounded origin-top" style={{ height: lineHeight }} />
//               </div>
//               {/* Experience items mapped for mobile */}
//               <div className="relative flex flex-col gap-10 ml-10 mt-6 pb-28">
//                 {experiences.map((exp, idx) => {
//                   const start = idx === 0 ? 0 : thresholds[idx - 1];
//                   const end = thresholds[idx];
//                   return (
//                     <ExperienceItem
//                       key={`${exp.company}-${exp.role}-m-${idx}`}
//                       exp={exp}
//                       idx={idx}
//                       start={start}
//                       end={end}
//                       scrollYProgress={scrollYProgress}
//                       layout="mobile"
//                     />
//                   );
//                 })}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Experience; // Exporting Experience component





// new















import React from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useMotionValueEvent,
} from "framer-motion";
import "./Experience.css";

import FuturesmartOfferLetter from "../assets/FuturesmartAI_Offerletter.jpeg";
import FuturesmartCertificate from "../assets/Certificate of Completion.jpeg";

import ExcelerateOfferLetter from "../assets/Excelerate_Offerletter.jpeg";
import ExcelerateCertificate from "../assets/Excelerate_Certificate.jpeg";

import CuriosityOfferLetter from "../assets/Curiosityedtech_offerletter.jpeg";

const experiences = [
  {
    role: "Content Research Intern",
    company: "Future Smart AI",
    duration: "Sept 2025 – Present",
    description:
      "Conducted research on 50+ emerging AI tools and technologies to identify practical solutions for different use cases and business purposes.",
    details:
      "Researched and evaluated AI tools across multiple domains by analyzing their features, capabilities, performance metrics, traffic insights, and possible applications for content development initiatives.",
    offerLetter: FuturesmartOfferLetter,
    certificate: FuturesmartCertificate,
    previewImage: FuturesmartCertificate,
  },
  {
    role: "Project Management Intern",
    company: "Excelerate",
    duration: "Aug 2025 – Sept 2025",
    description:
      "Developed project proposals, curriculum plans, and structured guidelines for different organizations with clear timelines and milestones.",
    details:
      "Worked on project planning tasks including curriculum design, proposal writing, resource allocation strategies, milestone planning, and guideline documentation for organizational projects.",
    offerLetter: ExcelerateOfferLetter,
    certificate: ExcelerateCertificate,
    previewImage: ExcelerateCertificate,
  },
  {
    role: "Subject Matter Expert & Quality Checker",
    company: "CuriosityEdtech Pvt. Ltd.",
    duration: "May 2023 – July 2023",
    description:
      "Worked as a freelance Subject Matter Expert and Quality Checker on Brainly, helping improve the quality and accuracy of educational content.",
    details:
      "Reviewed academic answers, checked content quality, corrected errors, and ensured that solutions were clear, accurate, and helpful for students using the Brainly platform.",
    offerLetter: CuriosityOfferLetter,
    certificate: null,
    previewImage: CuriosityOfferLetter,
  },
];

function ExperienceItem({
  exp,
  idx,
  start,
  scrollYProgress,
  layout,
  onView,
  isActive,
  showAllCards,
}) {
  const isAbove = idx % 2 === 0;
  const shouldShow = isActive || showAllCards;

  const markerScale = useTransform(
    scrollYProgress,
    [start, Math.min(start + 0.08, 1)],
    [0.85, 1]
  );

  const cardY = useTransform(
    scrollYProgress,
    [start, Math.min(start + 0.08, 1)],
    [isAbove ? 24 : -24, 0]
  );

  const cardX = useTransform(
    scrollYProgress,
    [start, Math.min(start + 0.08, 1)],
    [-18, 0]
  );

  const openDetails = (event) => {
    event.preventDefault();
    event.stopPropagation();
    onView(exp);
  };

  const cardContent = (
    <div className="experience-flip-card">
      <div className="experience-flip-inner">
        <div className="experience-card-front">
          <div className="experience-image-holder">
            <img src={exp.previewImage} alt={`${exp.company} preview`} />
          </div>

          <h3>{exp.role}</h3>

          <p className="experience-meta">
            {exp.company} | {exp.duration}
          </p>

          <p className="experience-description">{exp.description}</p>
        </div>

        <div className="experience-card-back">
          <h3>More Details</h3>

          <p>{exp.details}</p>

          <div className="experience-link-buttons">
            <button type="button" onClick={openDetails}>
              View Details
            </button>

            {exp.offerLetter && (
              <a
                href={exp.offerLetter}
                target="_blank"
                rel="noreferrer"
                onClick={(event) => event.stopPropagation()}
              >
                Offer Letter
              </a>
            )}

            {exp.certificate && (
              <a
                href={exp.certificate}
                target="_blank"
                rel="noreferrer"
                onClick={(event) => event.stopPropagation()}
              >
                Certificate
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  if (layout === "desktop") {
    return (
      <div
        className={`experience-item-desktop ${
          shouldShow ? "experience-active" : "experience-hidden"
        }`}
      >
        <motion.div
          className="experience-marker"
          style={{ scale: markerScale }}
        />

        <motion.div
          className={`experience-small-line ${
            isAbove ? "line-above" : "line-below"
          }`}
        />

        <motion.article
          className={`experience-card-desktop ${
            isAbove ? "card-above" : "card-below"
          }`}
          style={{ y: cardY }}
        >
          {cardContent}
        </motion.article>
      </div>
    );
  }

  return (
    <div
      className={`experience-item-mobile ${
        shouldShow ? "experience-active" : "experience-hidden"
      }`}
    >
      <motion.div
        className="experience-marker-mobile"
        style={{ scale: markerScale }}
      />

      <motion.article className="experience-card-mobile" style={{ x: cardX }}>
        {cardContent}
      </motion.article>
    </div>
  );
}

export default function Experience() {
  const sceneRef = React.useRef(null);

  const [isMobile, setIsMobile] = React.useState(false);
  const [selectedExp, setSelectedExp] = React.useState(null);
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [showAllCards, setShowAllCards] = React.useState(false);

  const activeIndexRef = React.useRef(0);
  const showAllCardsRef = React.useRef(false);

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  /*
    Scroll space = 220vh
    Sticky visible screen = 100vh

    0% - 68%: cards appear one by one
    68% - 100%: all cards visible
  */
  const sceneHeight = 220;
  const showAllAt = 0.68;

  const { scrollYProgress } = useScroll({
    target: sceneRef,
    offset: ["start start", "end end"],
  });

  const thresholds = React.useMemo(() => {
    return experiences.map((_, index) => index / experiences.length);
  }, []);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const safeProgress = Math.max(0, Math.min(latest, 0.999));

    const nextShowAllCards = safeProgress >= showAllAt;

    if (showAllCardsRef.current !== nextShowAllCards) {
      showAllCardsRef.current = nextShowAllCards;
      setShowAllCards(nextShowAllCards);
    }

    if (!nextShowAllCards) {
      const cardProgress = safeProgress / showAllAt;

      const nextIndex = Math.min(
        experiences.length - 1,
        Math.floor(cardProgress * experiences.length)
      );

      if (activeIndexRef.current !== nextIndex) {
        activeIndexRef.current = nextIndex;
        setActiveIndex(nextIndex);
      }
    } else if (activeIndexRef.current !== experiences.length - 1) {
      activeIndexRef.current = experiences.length - 1;
      setActiveIndex(experiences.length - 1);
    }
  });

  const lineWidth = useTransform(scrollYProgress, (value) => {
    return showAllCards
      ? "100%"
      : `${Math.min((value / showAllAt) * 100, 100)}%`;
  });

  const lineHeight = useTransform(scrollYProgress, (value) => {
    return showAllCards
      ? "100%"
      : `${Math.min((value / showAllAt) * 100, 100)}%`;
  });

  return (
    <section id="experience" className="experience-section">
      <div className="experience-bg-layer">
        <div className="experience-live-gradient" />
        <div className="experience-grid-glow" />
      </div>

      <div
        ref={sceneRef}
        style={{ height: `${sceneHeight}vh` }}
        className="experience-scroll-space"
      >
        <div className="experience-sticky">
          <div className="experience-title-wrapper">
            <h2 className="experience-title">Experience</h2>
          </div>

          <div className="experience-content">
            <div className="experience-desktop">
              <div className="experience-line-wrapper">
                <motion.div
                  className="experience-line-fill"
                  style={{ width: lineWidth }}
                />
              </div>

              <div className="experience-items-desktop">
                {experiences.map((exp, idx) => (
                  <ExperienceItem
                    key={`${exp.company}-${idx}`}
                    exp={exp}
                    idx={idx}
                    start={thresholds[idx]}
                    scrollYProgress={scrollYProgress}
                    layout="desktop"
                    onView={setSelectedExp}
                    isActive={activeIndex === idx}
                    showAllCards={showAllCards}
                  />
                ))}
              </div>
            </div>

            <div className="experience-mobile">
              <div className="experience-line-mobile">
                <motion.div
                  className="experience-line-mobile-fill"
                  style={{ height: lineHeight }}
                />
              </div>

              <div className="experience-items-mobile">
                {experiences.map((exp, idx) => (
                  <ExperienceItem
                    key={`${exp.company}-mobile-${idx}`}
                    exp={exp}
                    idx={idx}
                    start={thresholds[idx]}
                    scrollYProgress={scrollYProgress}
                    layout="mobile"
                    onView={setSelectedExp}
                    isActive={activeIndex === idx}
                    showAllCards={showAllCards}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {selectedExp && (
          <motion.div
            className="experience-modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedExp(null)}
          >
            <motion.div
              className="experience-modal"
              initial={{ scale: 0.88, opacity: 0, y: 60 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.88, opacity: 0, y: 60 }}
              transition={{ type: "spring", stiffness: 180, damping: 20 }}
              onClick={(event) => event.stopPropagation()}
            >
              <button
                type="button"
                className="experience-modal-close"
                onClick={() => setSelectedExp(null)}
                aria-label="Close experience details modal"
              >
                ×
              </button>

              <div className="experience-modal-header">
                <h2>{selectedExp.role}</h2>

                <h4>
                  {selectedExp.company} | {selectedExp.duration}
                </h4>

                <p>{selectedExp.description}</p>
                <p>{selectedExp.details}</p>
              </div>

              <div className="experience-documents-grid">
                {selectedExp.offerLetter && (
                  <div className="experience-document-box">
                    <h3>Offer Letter</h3>

                    <a
                      href={selectedExp.offerLetter}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <img
                        src={selectedExp.offerLetter}
                        alt={`${selectedExp.company} offer letter`}
                      />
                    </a>
                  </div>
                )}

                {selectedExp.certificate && (
                  <div className="experience-document-box">
                    <h3>Certificate</h3>

                    <a
                      href={selectedExp.certificate}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <img
                        src={selectedExp.certificate}
                        alt={`${selectedExp.company} certificate`}
                      />
                    </a>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}