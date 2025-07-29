import { assets, features } from "../assets/assets";

function BottomBanner() {
  return (
    <div className="relative mt-24">
      {/* تصویر دسکتاپ */}
      <img
        src={assets.bottom_banner_image}
        alt="banner"
        className="hidden w-full md:block"
      />
      {/* تصویر موبایل */}
      <img
        src={assets.bottom_banner_image_sm}
        alt="banner"
        className="w-full md:hidden"
      />

      {/* متن و ویژگی‌ها روی تصویر */}
      <div className="absolute inset-0 flex flex-col items-center pt-16 md:items-end md:pr-24 md:pt-0">
        <h1 className="mt-16 text-2xl font-semibold mb-9 md:text-4xl text-primary">
          Why We Are The Best?
        </h1>

        <div className="flex flex-col gap-6 md:flex-col md:gap-8">
          {features.map((feature, index) => (
            <div key={index} className="flex items-center gap-4">
              <img
                src={feature.icon}
                alt={feature.title}
                className="md:w-11 w-9"
              />
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
