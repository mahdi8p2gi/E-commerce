

import { useState, useEffect, useCallback } from "react";

const Cookies = () => {
  const [showBanner, setShowBanner] = useState(false);

  // بررسی consent کاربر بعد از رندر اولیه
  useEffect(() => {
    const consent = localStorage.getItem("cookieConsent") ?? null;
    if (!consent) setShowBanner(true);
  }, []);

  // تابع برای ذخیره تصمیم کاربر
  const handleConsent = useCallback((value) => {
    localStorage.setItem("cookieConsent", value);
    setShowBanner(false);
  }, []);

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 flex flex-col items-center w-11/12 max-w-sm sm:max-w-md bg-white text-gray-500 text-center p-6 rounded-lg border border-gray-300/30 shadow-lg transition-all duration-300">
      <img
        className="w-14 h-14 mb-2"
        src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/cookies/cookieImage1.svg"
        alt="Cookie icon"
      />
      <h2 className="text-gray-800 text-xl font-semibold mb-2">
        We care about your privacy
      </h2>
      <p className="w-11/12 mb-4 text-sm sm:text-base">
        This website uses cookies for functionality, analytics, and marketing. By accepting, you agree to our{" "}
        <a href="/cookie-policy" className="font-medium underline hover:text-primary">
          Cookie Policy
        </a>.
      </p>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full">
        <button
          type="button"
          className="w-full sm:w-auto px-6 py-2 rounded border border-gray-300/40 font-medium text-gray-700 hover:bg-gray-100 transition-transform active:scale-95"
          onClick={() => handleConsent("declined")}
        >
          Decline
        </button>
        <button
          type="button"
          className="w-full sm:w-auto px-6 py-2 rounded bg-primary text-white font-medium hover:bg-primary-dull transition-transform active:scale-95"
          onClick={() => handleConsent("accepted")}
        >
          Accept
        </button>
      </div>
    </div>
  );
};

export default Cookies;
