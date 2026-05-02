import { motion } from "framer-motion";
import p from "../assets/p.jpg";

export default function About() {
  const handleViewProjectsClick = (e) => {
    e.preventDefault();

    const projectsSection =
      document.getElementById("projects") ||
      document.getElementById("Projects") ||
      document.querySelector(".projects-section");

    if (projectsSection) {
      projectsSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    } else {
      window.location.href = "#projects";
    }
  };

  const stats = [
    { label: "Experience", value: "8 Months" },
    { label: "Internship", value: "5 Months" },
    { label: "Freelance", value: "3 Months" },
  ];

  const journey = [
    {
      year: "1st - 2nd Year",
      title: "Built My Foundation in Full Stack Development",
      description:
        "In my early college years, I focused on learning how complete web applications are planned and built. I worked on frontend interfaces, backend logic, APIs, and project structure through hands-on practice and personal projects.",
      points: [
        "Built multiple practice and portfolio-level web projects",
        "Worked with React, JavaScript, backend APIs, and databases",
        "Learned how frontend, backend, and deployment connect in real projects",
      ],
    },
    {
      year: "3rd Year - Present",
      title: "Shifted My Main Focus Toward Practical AI Systems",
      description:
        "From my 3rd year, I started moving deeper into the AI domain. My current work is focused on understanding and building useful AI systems where LLMs, RAG, agents, and chatbots can support real user tasks instead of just being standalone demos.",
      points: [
        "Building AI agents and chatbot-based applications",
        "Learning how RAG improves answers using external knowledge",
        "Exploring practical AI automation for real-world use cases",
      ],
    },
  ];

  const achievements = [
    {
      title: "Published Carbon Credits Dataset",
      description:
        "Published a carbon credits dataset on Mendeley for environmental and machine learning analysis.",
      link: "https://data.mendeley.com/datasets/yvjzcpsmpc/1",
      buttonText: "View Dataset",
    },
    {
      title: "AI Demos Monthly Hackathon Winner",
      description:
        "Won the AI Demos Monthly Hackathon by building and presenting a practical AI-based solution.",
      link: "https://www.linkedin.com/posts/pradipnichite_aidemos-aichallenge-aitools-share-7326106231834591234-XnSK/?utm_source=share&utm_medium=member_desktop",
      buttonText: "View Achievement",
    },
    {
      title: "Research Paper in Progress",
      description:
        "Currently working on a research paper related to carbon credits, emissions data, and AI-driven analysis.",
      link: null,
      buttonText: "",
    },
  ];

  return (
    <section
      id="about"
      className="min-h-screen w-full flex items-center justify-center relative bg-black text-white overflow-hidden"
      aria-label="About me"
    >
      {/* Layered neon background accents */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-10 -left-10 w-[360px] h-[360px] rounded-full bg-gradient-to-r from-[#302b63] via-[#00bf8f] to-[#1CD8D2] opacity-20 blur-[120px] animate-pulse" />
        <div className="absolute bottom-0 right-10 w-[420px] h-[420px] rounded-full bg-gradient-to-r from-[#1CD8D2] via-[#00bf8f] to-[#302b63] opacity-15 blur-[140px] animate-pulse delay-300" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 translate-y-20 w-[220px] h-[220px] rounded-full bg-gradient-to-r from-[#00bf8f] to-[#1CD8D2] opacity-10 blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-6xl w-full mx-auto px-6 md:px-10 lg:px-12 py-20 flex flex-col gap-14">
        {/* Profile header */}
        <motion.div
          className="flex flex-col md:flex-row items-center md:items-stretch gap-10"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, amount: 0.4 }}
        >
          {/* Avatar / Card */}
          <motion.div
            className="relative w-[170px] h-[170px] md:w-[250px] md:h-[250px] rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-[#1CD8D2]/20 to-[#302b63]/20 border border-[#1CD8D2]/25 flex-shrink-0"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 200, damping: 18 }}
            aria-hidden="true"
          >
            <img
              src={p}
              alt="Sparsh Srivastava"
              className="w-full h-full object-cover"
              style={{
                objectPosition: "center center",
                transform: "scale(1.28)",
              }}
            />
          </motion.div>

          {/* Name + Role + Bio + CTA */}
          <div className="flex-1 flex flex-col justify-center text-center md:text-left">
            <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-[#1CD8D2] via-[#00bf8f] to-[#302b63]">
              Sparsh Srivastava
            </h2>

            <p className="mt-2 text-lg sm:text-xl text-white/90 font-semibold">
              AI Agent & Chatbot Developer
            </p>

            <p className="mt-4 text-gray-300 leading-relaxed text-base sm:text-lg max-w-2xl md:max-w-3xl">
              I started with full stack development and built several projects
              during my early college years. Later, I shifted my main direction
              toward AI, where I now focus on creating practical systems using
              LLMs, RAG, AI agents, chatbots, and automation.
            </p>

            {/* Quick stats */}
            <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 max-w-xl">
              {stats.map((item, i) => (
                <motion.div
                  key={i}
                  className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-center"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.05 * i }}
                  viewport={{ once: true, amount: 0.3 }}
                >
                  <div className="text-sm text-gray-400">{item.label}</div>
                  <div className="text-base font-semibold text-white">
                    {item.value}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* CTA */}
            <div className="mt-6 flex justify-center md:justify-start">
              <button
                type="button"
                onClick={handleViewProjectsClick}
                className="inline-flex items-center justify-center rounded-lg bg-white text-black font-semibold px-5 py-3 hover:bg-gray-200 transition"
                aria-label="View my projects"
              >
                View Projects
              </button>
            </div>
          </div>
        </motion.div>

        {/* About Me */}
        <motion.div
          className="text-center md:text-left"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, amount: 0.4 }}
        >
          <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3">
            About Me
          </h3>

          <p className="text-gray-300 leading-relaxed text-base sm:text-lg">
            My foundation is in full stack development, where I learned how to
            convert ideas into complete web applications. That helped me
            understand product structure, user experience, APIs, and how
            software works from frontend to backend.
          </p>

          <p className="mt-4 text-gray-400 text-base sm:text-lg">
            Now, my main direction is AI. I focus on building practical AI
            systems where LLMs, RAG, agents, and chatbots are used together to
            solve real problems in a useful and scalable way.
          </p>
        </motion.div>

        {/* Journey Section */}
        <motion.div
          className="text-center md:text-left"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, amount: 0.4 }}
        >
          <h3 className="text-2xl sm:text-3xl font-bold text-white mb-6">
            My Development Journey
          </h3>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {journey.map((item, i) => (
              <motion.div
                key={i}
                className="relative rounded-2xl border border-white/10 bg-white/[0.04] p-6 overflow-hidden hover:bg-white/[0.07] transition"
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.08 * i }}
                viewport={{ once: true, amount: 0.3 }}
              >
                <div className="absolute inset-0 pointer-events-none bg-gradient-to-br from-[#1CD8D2]/10 via-transparent to-[#302b63]/10" />

                <div className="relative z-10">
                  <span className="inline-flex w-fit items-center justify-center rounded-full border border-[#1CD8D2]/30 bg-[#1CD8D2]/10 px-4 py-1 text-sm font-semibold text-[#1CD8D2]">
                    {item.year}
                  </span>

                  <h4 className="mt-4 text-xl font-bold text-white">
                    {item.title}
                  </h4>

                  <p className="mt-3 text-gray-400 leading-relaxed">
                    {item.description}
                  </p>

                  <div className="mt-5 space-y-3">
                    {item.points.map((point, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <span className="mt-2 h-2 w-2 rounded-full bg-[#1CD8D2] flex-shrink-0" />
                        <p className="text-gray-300 text-sm leading-relaxed">
                          {point}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Achievements */}
        <motion.div
          className="text-center md:text-left"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, amount: 0.4 }}
        >
          <h3 className="text-2xl sm:text-3xl font-bold text-white mb-5">
            Achievements & Research
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {achievements.map((item, i) => (
              <motion.div
                key={i}
                className="rounded-2xl border border-white/10 bg-white/5 p-5 hover:bg-white/10 transition"
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.06 * i }}
                viewport={{ once: true, amount: 0.3 }}
              >
                <h4 className="text-lg font-bold text-white">{item.title}</h4>

                <p className="mt-3 text-gray-400 text-sm leading-relaxed">
                  {item.description}
                </p>

                {item.link && (
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center justify-center rounded-lg border border-[#1CD8D2]/30 bg-[#1CD8D2]/10 px-4 py-2 text-sm font-semibold text-[#1CD8D2] hover:bg-[#1CD8D2]/20 transition"
                  >
                    {item.buttonText}
                  </a>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}



