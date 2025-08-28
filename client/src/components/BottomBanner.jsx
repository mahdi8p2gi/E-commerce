import { assets, features } from "../assets/assets";

const BottomBanner = () => {
  return (
    <div className="relative mt-24">
      {/* Desktop banner image */}
      <img
        loading="lazy"
        src={assets.bottom_banner_image}
        alt="banner"
        className="hidden w-full md:block"
      />

      {/* Mobile banner image */}
      <img
        loading="lazy"
        src={assets.bottom_banner_image_sm}
        alt="banner"
        className="w-full md:hidden"
      />

      {/* Text and features overlay */}
      <div className="absolute inset-0 flex flex-col items-center pt-16 md:items-end md:pr-24 md:pt-0">
        {/* Section title */}
        <h1 className="mt-8 text-2xl font-semibold mb-9 md:text-4xl text-primary">
          Why We Are The Best?
        </h1>

        {/* Features list */}
        <div className="flex flex-col gap-6 md:flex-col md:gap-8">
          {features.map((feature, index) => (
            <div key={index} className="flex items-center gap-4">
              {/* Feature icon */}
              <img
                loading="lazy"
                src={feature.icon}
                alt={feature.title}
                className="md:w-11 w-9"
              />
              {/* Feature text */}
              <div>
                <h3 className="text-lg font-semibold md:text-xl">
                  {feature.title}
                </h3>
                <p className="text-xs text-gray-500/70 md:text-sm">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default BottomBanner;
