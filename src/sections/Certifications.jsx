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
