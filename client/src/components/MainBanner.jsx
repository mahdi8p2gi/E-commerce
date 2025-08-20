import { assets } from "../assets/assets";
import { Link } from "react-router-dom";

function MainBanner() {
  return (
    <div className="relative">
      {/* موبایل بنر */}
      <img
        src={assets.main_banner_bg_sm}
        alt="banner"
        className="block w-full md:hidden"
      />

      {/* دسکتاپ بنر */}
      <img
        src={assets.main_banner_bg}
        alt="banner"
        className="hidden w-full md:block"
      />

      {/* محتوا */}
      <div className="absolute inset-0 flex flex-col items-center justify-end px-4 pb-20 md:items-start md:justify-center md:pl-24 md:pb-0">
        <h1
          className="text-3xl text-gray-600 font-bold text-center leading-tight capitalize md:text-left md:text-5xl lg:text-6xl max-w-[90%] md:max-w-[500px] lg:max-w-[750px] lg:leading-[4rem]"
        >
          Freshness you can trust, savings you will love!
        </h1>

        <div className="flex flex-col items-center gap-3 mt-6 font-medium md:flex-row">
          <Link
            to="/products"
            className="flex items-center gap-2 py-3 text-white transition rounded px-7 bg-primary hover:bg-primary-dull"
          >
            Shop now

          </Link>

          <Link
            to="/products"
            className="group flex items-center gap-2 py-3 text-black transition px-7"
          >
            Explore Deals
            <img
              className="transition transform group-hover:translate-x-1"
              src={assets.black_arrow_icon}
              alt="arrow"
            />
          </Link>

        </div>
      </div>
    </div>
  );
}

export default MainBanner;
