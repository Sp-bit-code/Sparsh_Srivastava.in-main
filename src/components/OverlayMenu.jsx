import { motion, AnimatePresence } from "framer-motion";
import { FiX } from "react-icons/fi";

const menuLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Talk With My Buddy", href: "#talk-with-my-buddy" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "My Timeline", href: "#my-timeline" },
  { label: "Certifications", href: "#certifications" },
];

export default function OverlayMenu({ isOpen, onClose }) {
  const isMobile = typeof window !== "undefined" && window.innerWidth < 1024;
  const origin = isMobile ? "95% 8%" : "50% 8%";

  const handleLinkClick = (href) => {
    onClose();

    setTimeout(() => {
      const target = document.querySelector(href);

      if (target) {
        const yOffset = -80;
        const y =
          target.getBoundingClientRect().top + window.pageYOffset + yOffset;

        window.scrollTo({
          top: y,
          behavior: "smooth",
        });
      }
    }, 350);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center z-50"
          initial={{ clipPath: `circle(0% at ${origin})` }}
          animate={{ clipPath: `circle(150% at ${origin})` }}
          exit={{ clipPath: `circle(0% at ${origin})` }}
          transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
          style={{ backgroundColor: "rgba(0,0,0,0.95)" }}
        >
          <button
            onClick={onClose}
            className="absolute top-6 right-6 text-white text-3xl"
            aria-label="Close menu"
          >
            <FiX />
          </button>

          <ul className="space-y-5 text-center">
            {menuLinks.map((item, index) => (
              <motion.li
                key={item.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.08 }}
              >
                <button
                  type="button"
                  onClick={() => handleLinkClick(item.href)}
                  className="text-3xl sm:text-4xl text-white font-semibold hover:text-pink-400 transition-colors duration-300"
                >
                  {item.label}
                </button>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      )}
    </AnimatePresence>
  );
}