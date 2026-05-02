// import { useState, useRef } from "react";
// import "./CertificationsSlider.css";

// const certs = [
//   {
//     title: "React Developer",
//     issuer: "Meta",
//     year: "2024",
//     color: "#1877f2",
//     abbr: "M",
//     image: "/certificates/react-meta.jpg", // replace with your actual cert image path
//     link: "https://coursera.org/verify/META-RD-2024-8821",
//     desc: "Completed the Meta React Developer professional certificate covering React fundamentals, hooks, state management, and building production-ready web applications.",
//     tags: ["React", "JSX", "Hooks", "Redux"],
//     credential: "META-RD-2024-8821",
//   },
//   {
//     title: "AWS Cloud Practitioner",
//     issuer: "Amazon Web Services",
//     year: "2023",
//     color: "#ff9900",
//     abbr: "AWS",
//     image: "/certificates/aws-clf.jpg",
//     link: "https://aws.amazon.com/verification",
//     desc: "Foundational AWS certification validating cloud fluency, core services, architecture, security, and pricing models.",
//     tags: ["Cloud", "EC2", "S3", "IAM"],
//     credential: "AWS-CLF-2023-4490",
//   },
//   {
//     title: "Full Stack Web Dev",
//     issuer: "Coursera",
//     year: "2023",
//     color: "#0056d2",
//     abbr: "C",
//     image: "/certificates/fullstack.jpg",
//     link: "https://coursera.org/verify/CORS-FS-2023-7712",
//     desc: "Mastered end-to-end development — HTML, CSS, JS, Node.js, Express, MongoDB. Capstone project: E-commerce platform.",
//     tags: ["Node.js", "MongoDB", "Express", "REST"],
//     credential: "CORS-FS-2023-7712",
//   },
//   {
//     title: "UI/UX Design",
//     issuer: "Google",
//     year: "2024",
//     color: "#34a853",
//     abbr: "G",
//     image: "/certificates/google-ux.jpg",
//     link: "https://coursera.org/verify/GOOG-UX-2024-3341",
//     desc: "Google UX Design Professional Certificate covering design thinking, wireframing, prototyping with Figma, and usability testing methodologies.",
//     tags: ["Figma", "Prototyping", "UX Research"],
//     credential: "GOOG-UX-2024-3341",
//   },
//   {
//     title: "Python for Data Science",
//     issuer: "IBM",
//     year: "2022",
//     color: "#006699",
//     abbr: "IBM",
//     image: "/certificates/ibm-python.jpg",
//     link: "https://coursera.org/verify/IBM-PDS-2022-5523",
//     desc: "IBM Python for Data Science — pandas, NumPy, Matplotlib, and machine learning fundamentals with scikit-learn.",
//     tags: ["Python", "Pandas", "NumPy", "ML"],
//     credential: "IBM-PDS-2022-5523",
//   },
//   {
//     title: "JavaScript Algorithms",
//     issuer: "freeCodeCamp",
//     year: "2022",
//     color: "#5c40b0",
//     abbr: "fCC",
//     image: "/certificates/fcc-js.jpg",
//     link: "https://freecodecamp.org/certification/verify",
//     desc: "300+ hours of JavaScript: ES6+, algorithms, data structures, functional programming, and OOP design patterns.",
//     tags: ["ES6+", "Algorithms", "DSA", "OOP"],
//     credential: "FCC-JS-2022-1198",
//   },
// ];

// export default function CertificationsSlider() {
//   const [active, setActive] = useState(null);
//   const sliderRef = useRef(null);

//   const openModal = (cert) => {
//     setActive(cert);
//     sliderRef.current?.classList.add("paused");
//   };

//   const closeModal = () => {
//     setActive(null);
//     setTimeout(() => sliderRef.current?.classList.remove("paused"), 350);
//   };

//   return (
//     <section className="cert-section">
//       <p className="cert-label">Certifications</p>

//       {/* 3D Carousel */}
//       <div className="cert-scene">
//         <div
//           className="cert-slider"
//           ref={sliderRef}
//           style={{ "--quantity": certs.length }}
//         >
//           {certs.map((c, i) => (
//             <div
//               key={i}
//               className="cert-item"
//               style={{ "--pos": i + 1 }}
//               onClick={() => openModal(c)}
//             >
//               <div className="cert-card">
//                 <div className="cert-card-top">
//                   <div className="cert-logo" style={{ background: c.color }}>
//                     {c.abbr}
//                   </div>
//                   <p className="cert-name">{c.title}</p>
//                   <p className="cert-org">{c.issuer}</p>
//                 </div>
//                 <div className="cert-card-bot">
//                   <span className="cert-year">{c.year}</span>
//                   <span className="cert-star">★</span>
//                 </div>
//                 <div className="cert-hint">Click to view</div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Modal */}
//       <div
//         className={`cert-overlay ${active ? "open" : ""}`}
//         onClick={(e) => e.target === e.currentTarget && closeModal()}
//       >
//         <div className="cert-modal">
//           <button className="cert-close" onClick={closeModal}>✕</button>

//           {active && (
//             <>
//               {/* Certificate Image */}
//               <div
//                 className="cert-modal-img-wrap"
//                 style={{
//                   background: `linear-gradient(135deg, ${active.color}22 0%, #071414 100%)`,
//                 }}
//               >
//                 {active.image ? (
//                   <img src={active.image} alt={active.title} />
//                 ) : (
//                   <div className="cert-img-placeholder">
//                     <div
//                       className="cert-placeholder-logo"
//                       style={{ background: active.color }}
//                     >
//                       {active.abbr}
//                     </div>
//                     <p>Certificate image goes here</p>
//                   </div>
//                 )}
//                 <span className="cert-img-badge">Certificate</span>
//               </div>

//               {/* Text Details */}
//               <div className="cert-modal-body">
//                 <h3 className="cert-modal-title">{active.title}</h3>
//                 <p className="cert-modal-issuer">{active.issuer}</p>
//                 <p className="cert-modal-year">Issued {active.year}</p>

//                 <hr className="cert-modal-divider" />

//                 <p className="cert-modal-desc">{active.desc}</p>

//                 <div className="cert-modal-tags">
//                   {active.tags.map((t) => (
//                     <span key={t} className="cert-tag">
//                       {t}
//                     </span>
//                   ))}
//                 </div>

//                 <p className="cert-credential">
//                   Credential ID: <span>{active.credential}</span>
//                 </p>

//                 {/* Verify Button */}
//                 <a
//                   href={active.link}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="cert-verify-btn"
//                 >
//                   <svg
//                     width="14"
//                     height="14"
//                     viewBox="0 0 24 24"
//                     fill="none"
//                     stroke="currentColor"
//                     strokeWidth="2"
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                   >
//                     <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
//                     <polyline points="15 3 21 3 21 9" />
//                     <line x1="10" y1="14" x2="21" y2="3" />
//                   </svg>
//                   View Certificate
//                 </a>
//               </div>
//             </>
//           )}
//         </div>
//       </div>
//     </section>
//   );
// }


import { useState, useRef } from "react";
import "./CertificationsSlider.css";

import AppliedMachineLearning from "../assets/Applied Machine Learning.jpeg";
import ArtificialIntelligence from "../assets/Artificial Intelligence and Machine Learning.jpeg";
import CloudComputing from "../assets/Cloud Computing.jpeg";
import GoogleITSupport from "../assets/Google IT Support Certificate.jpg";
import MicrosoftAzureFundamentals from "../assets/Microsoft Azure Fundamentals.jpeg";
import MernStackDevelopment from "../assets/Mern Stack Development.jpeg";

const certs = [
  {
    title: "Applied Machine Learning",
    issuer: "University of Michigan",
    year: "2025",
    color: "#1f77b4",
    image: AppliedMachineLearning,
    link: "https://coursera.org/verify/TGZQ8BOGDUHD",
    desc: "Completed Applied Machine Learning training focused on practical machine learning methods, model building, evaluation, and applied use of Python-based ML tools.",
    tags: ["Python", "Machine Learning", "Scikit-learn", "Model Evaluation"],
    credential: "TGZQ8BOGDUHD",
  },
  {
    title: "Artificial Intelligence",
    issuer: "Academor",
    year: "2023",
    color: "#8b5cf6",
    image: ArtificialIntelligence,
    link: "",
    desc: "Completed Artificial Intelligence and Machine Learning training covering core AI concepts, ML fundamentals, intelligent systems, and practical AI applications.",
    tags: ["AI", "Machine Learning", "Neural Networks", "Data Analysis"],
    credential: "ACM23-3066",
  },
  {
    title: "Cloud Computing",
    issuer: "NPTEL",
    year: "2025",
    color: "#00c8aa",
    image: CloudComputing,
    link: "",
    desc: "Completed Cloud Computing certification covering cloud service models, virtualization, distributed computing concepts, and cloud-based infrastructure fundamentals.",
    tags: ["Cloud Computing", "Virtualization", "IaaS", "PaaS"],
    credential: "NPTEL25CS11S950600247",
  },
  {
    title: "Google IT Support Certificate",
    issuer: "Google",
    year: "2026",
    color: "#34a853",
    image: GoogleITSupport,
    link: "https://www.credly.com/go/mD2PSNAq",
    desc: "Completed Google IT Support training focused on troubleshooting, customer support, networking, operating systems, system administration, and security.",
    tags: ["Troubleshooting", "Networking", "System Administration", "Security"],
    credential: "mD2PSNAq",
  },
  {
    title: "Microsoft Azure Fundamentals",
    issuer: "Microsoft",
    year: "2025",
    color: "#0078d4",
    image: MicrosoftAzureFundamentals,
    link: "https://certiport.com",
    desc: "Completed Microsoft Azure Fundamentals certification covering cloud concepts, Azure services, security, compliance, pricing, and Azure management basics.",
    tags: ["Azure", "Cloud Concepts", "Azure Services", "Security"],
    credential: "certiport.com: wyWpy-48Dm",
  },
  {
    title: "MERN Stack Development",
    issuer: "FacePrep",
    year: "2025",
    color: "#22c55e",
    image: MernStackDevelopment,
    link: "",
    desc: "Completed MERN Stack Development training focused on building full-stack web applications using MongoDB, Express.js, React.js, and Node.js.",
    tags: ["MongoDB", "Express.js", "React.js", "Node.js"],
    credential: "FacePrep MERN Stack Development",
  },
];

export default function CertificationsSlider() {
  const [active, setActive] = useState(null);
  const sliderRef = useRef(null);

  const openModal = (cert) => {
    setActive(cert);
    sliderRef.current?.classList.add("paused");
  };

  const closeModal = () => {
    setActive(null);

    setTimeout(() => {
      sliderRef.current?.classList.remove("paused");
    }, 350);
  };

  return (
    <section id="certifications" className="cert-section">
      <h2 className="cert-label">Certifications</h2>

      <div className="cert-scene">
        <div
          className="cert-slider"
          ref={sliderRef}
          style={{ "--quantity": certs.length }}
        >
          {certs.map((cert, index) => (
            <div
              key={cert.credential}
              className="cert-item"
              style={{
                "--pos": index + 1,
                "--cert-color": cert.color,
              }}
            >
              <div className="cert-card">
                <div className="cert-card-image">
                  <img src={cert.image} alt={cert.title} />
                </div>

                <div className="cert-card-content">
                  <h3>{cert.title}</h3>

                  <p className="cert-card-issuer">
                    {cert.issuer} • {cert.year}
                  </p>

                  <p className="cert-card-desc">{cert.desc}</p>

                  <button
                    type="button"
                    className="cert-card-link"
                    onClick={() => openModal(cert)}
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div
        className={`cert-overlay ${active ? "open" : ""}`}
        onClick={(event) => {
          if (event.target === event.currentTarget) {
            closeModal();
          }
        }}
      >
        {active && (
          <div className="cert-modal" style={{ "--cert-color": active.color }}>
            <button
              type="button"
              className="cert-close"
              onClick={closeModal}
              aria-label="Close certificate details"
            >
              ✕
            </button>

            <div className="cert-modal-grid">
              <div className="cert-modal-img-wrap">
                <img src={active.image} alt={active.title} />
                <span className="cert-img-badge">Certificate Preview</span>
              </div>

              <div className="cert-modal-body">
                <p className="cert-modal-kicker">Certificate Details</p>

                <h3 className="cert-modal-title">{active.title}</h3>

                <p className="cert-modal-issuer">{active.issuer}</p>

                <p className="cert-modal-year">Issued {active.year}</p>

                <hr className="cert-modal-divider" />

                <p className="cert-modal-desc">{active.desc}</p>

                <div className="cert-modal-tags">
                  {active.tags.map((tag) => (
                    <span key={tag} className="cert-tag">
                      {tag}
                    </span>
                  ))}
                </div>

                <p className="cert-credential">
                  Credential ID: <span>{active.credential}</span>
                </p>

                {active.link && (
                  <a
                    href={active.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cert-verify-btn"
                  >
                    Open Certificate Link
                  </a>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}