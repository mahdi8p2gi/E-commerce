import { useEffect, useRef } from "react";
import { assets } from "../assets/assets";
import { Link } from "react-router-dom";
import Typewriter from "typewriter-effect/dist/core";

const MainBanner = () => {
  const typewriterRef = useRef(null);

  // Initialize typewriter effect
  useEffect(() => {
    if (typewriterRef.current) {
      new Typewriter(typewriterRef.current, {
        strings: [
          "Freshness you can trust",
          "Savings you will love!",
          "Shop smart with us",
        ],
        autoStart: true,
        loop: true,
        delay: 60,
        deleteSpeed: 40,
      });
    }
  }, []);

  return (
    <div className="relative">
      {/* Mobile banner */}
      <img
        loading="lazy"
        src={assets.main_banner_bg_sm}
        alt="banner"
        className="block w-full md:hidden"
      />

      {/* Desktop banner */}
      <img
        loading="lazy"
        src={assets.main_banner_bg}
        alt="banner"
        className="hidden w-full md:block"
      />

      {/* Banner content */}
      <div className="absolute inset-0 flex flex-col items-center justify-end px-4 pb-20 md:items-start md:justify-center md:pl-24 md:pb-0">
        {/* Typewriter heading */}
        <h1
          ref={typewriterRef}
          className="text-3xl text-gray-600 font-bold text-center leading-tight capitalize md:text-left md:text-5xl lg:text-6xl max-w-[90%] md:max-w-[500px] lg:max-w-[750px] lg:leading-[4rem]"
        >
          {/* Text inserted by Typewriter */}
        </h1>

        {/* Action buttons */}
        <div className="flex flex-col items-center gap-3 mt-6 font-medium md:flex-row">
          <Link
            to="/products"
            className="flex btn-primary items-center gap-2 py-3 text-white"
          >
            Shop now
          </Link>

          <Link
            to="/products"
            className="group flex items-center gap-2 py-3 text-black transition px-7"
          >
            Explore Deals
            <img
              loading="lazy"
              className="transition transform group-hover:translate-x-1"
              src={assets.black_arrow_icon}
              alt="arrow"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MainBanner;
