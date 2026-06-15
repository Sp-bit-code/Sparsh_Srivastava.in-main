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
  const shouldShowDesktop = isActive || showAllCards;

  const markerScale = useTransform(
    scrollYProgress,
    [start, Math.min(start + 0.1, 1)],
    [0.82, 1]
  );

  const cardY = useTransform(
    scrollYProgress,
    [start, Math.min(start + 0.1, 1)],
    [isAbove ? 28 : -28, 0]
  );

  const openDetails = (event) => {
    event.preventDefault();
    event.stopPropagation();
    onView(exp);
  };

  const desktopCardContent = (
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
          shouldShowDesktop ? "experience-active" : "experience-hidden"
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
          {desktopCardContent}
        </motion.article>
      </div>
    );
  }

  return null;
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
    Mobile:
    - 128vh keeps bottom empty space low.
    - showAllAt 0.9 gives enough scroll time for all 3 dots.
  */
  const sceneHeight = isMobile ? 128 : 185;
  const showAllAt = isMobile ? 0.9 : 0.72;

  React.useEffect(() => {
    if (sceneRef.current) {
      sceneRef.current.style.setProperty(
        "height",
        `${sceneHeight}vh`,
        "important"
      );

      sceneRef.current.style.setProperty(
        "min-height",
        `${sceneHeight}vh`,
        "important"
      );
    }
  }, [sceneHeight]);

  const { scrollYProgress } = useScroll({
    target: sceneRef,
    offset: ["start start", "end end"],
  });

  const thresholds = React.useMemo(() => {
    return experiences.map((_, index) => index / experiences.length);
  }, []);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const safeProgress = Math.max(0, Math.min(latest, 0.999));

    /*
      Mobile logic:
      Card changes according to vertical line progress.
      This keeps cards synced with dots.
    */
    if (isMobile) {
      const linePercent = Math.min((safeProgress / showAllAt) * 100, 100);

      let nextIndex = 0;

      if (linePercent >= 46 && linePercent < 80) {
        nextIndex = 1;
      } else if (linePercent >= 80) {
        nextIndex = 2;
      }

      if (activeIndexRef.current !== nextIndex) {
        activeIndexRef.current = nextIndex;
        setActiveIndex(nextIndex);
      }

      if (showAllCardsRef.current !== false) {
        showAllCardsRef.current = false;
        setShowAllCards(false);
      }

      return;
    }

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

  React.useEffect(() => {
    activeIndexRef.current = 0;
    showAllCardsRef.current = false;
    setActiveIndex(0);
    setShowAllCards(false);
  }, [isMobile]);

  const lineWidth = useTransform(scrollYProgress, (value) => {
    return showAllCards
      ? "100%"
      : `${Math.min((value / showAllAt) * 100, 100)}%`;
  });

  const mobileLineHeight = useTransform(scrollYProgress, (value) => {
    return `${Math.min((value / showAllAt) * 100, 100)}%`;
  });

  const mobileCardY = useTransform(scrollYProgress, [0, 1], [14, 0]);

  const ModalBox = () => (
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
  );

  if (isMobile) {
    return (
      <section
        id="experience"
        className="experience-section experience-mobile-static"
      >
        <div className="experience-bg-layer">
          <div className="experience-live-gradient" />
          <div className="experience-grid-glow" />
        </div>

        <div
          ref={sceneRef}
          style={{ height: `${sceneHeight}vh` }}
          className="experience-mobile-scroll-space"
        >
          <div className="experience-mobile-static-inner">
            <div className="experience-title-wrapper">
              <h2 className="experience-title">Experience</h2>
            </div>

            <div className="experience-mobile-animated-wrap">
              <div className="experience-line-mobile">
                <motion.div
                  className="experience-line-mobile-fill"
                  style={{ height: mobileLineHeight }}
                />
              </div>

              <div className="experience-items-mobile">
                {experiences.map((exp, idx) => {
                  const isCurrent = activeIndex === idx;

                  return (
                    <motion.div
                      key={`${exp.company}-mobile-${idx}`}
                      className={`experience-item-mobile experience-mobile-point-${
                        idx + 1
                      } ${
                        isCurrent
                          ? "experience-mobile-active experience-mobile-current"
                          : "experience-mobile-hidden"
                      }`}
                    >
                      <motion.div
                        className="experience-marker-mobile"
                        animate={{
                          scale: isCurrent ? 1 : 0.82,
                          opacity: isCurrent ? 1 : 0.35,
                        }}
                        transition={{ duration: 0.28 }}
                      />

                      <AnimatePresence mode="wait">
                        {isCurrent && (
                          <motion.article
                            key={`${exp.company}-${idx}`}
                            className="experience-card-mobile"
                            initial={{ opacity: 0, y: 44, scale: 0.92 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -24, scale: 0.94 }}
                            transition={{
                              duration: 0.38,
                              ease: "easeOut",
                            }}
                            style={{ y: mobileCardY }}
                          >
                            <div className="experience-mobile-simple-card">
                              <div className="experience-image-holder">
                                <img
                                  src={exp.previewImage}
                                  alt={`${exp.company} preview`}
                                />
                              </div>

                              <h3>{exp.role}</h3>

                              <p className="experience-meta">
                                {exp.company} | {exp.duration}
                              </p>

                              <p className="experience-description">
                                {exp.description}
                              </p>

                              <div className="experience-link-buttons">
                                <button
                                  type="button"
                                  onClick={(event) => {
                                    event.preventDefault();
                                    event.stopPropagation();
                                    setSelectedExp(exp);
                                  }}
                                >
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
                          </motion.article>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <ModalBox />
      </section>
    );
  }

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
          </div>
        </div>
      </div>

      <ModalBox />
    </section>
  );
}
