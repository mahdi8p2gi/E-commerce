// src/components/ScrollToTopButton.jsx
import { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa";

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false); // Track visibility

  //  Track scroll position to toggle button visibility
  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  //  Smooth scroll to top
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Render button only when visible
  return isVisible ? (
    <button
      onClick={scrollToTop}
      className="fixed z-50 p-3 text-white transition rounded-full shadow-lg bottom-6 right-6 bg-primary hover:bg-primary-dull"
      aria-label="Scroll to Top"
    >
      <FaArrowUp size={20} />
    </button>
  ) : null;
};

export default ScrollToTopButton;
