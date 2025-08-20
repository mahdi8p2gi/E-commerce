const CookiePolicy = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-20">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-6">
          Cookie Policy
        </h1>
        <p className="text-gray-600 mb-4">
          This website uses cookies to ensure you get the best experience on our website. Cookies help us analyze site traffic, remember your preferences, and serve personalized content.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-3">Types of Cookies We Use</h2>
        <ul className="list-disc list-inside text-gray-600 space-y-2">
          <li><strong>Necessary Cookies:</strong> Required for basic site functionality.</li>
          <li><strong>Analytics Cookies:</strong> Help us understand how users interact with our site.</li>
          <li><strong>Marketing Cookies:</strong> Used to personalize content and ads.</li>
        </ul>

        <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-3">Managing Cookies</h2>
        <p className="text-gray-600 mb-4">
          You can manage or disable cookies in your browser settings. Please note that disabling some cookies may affect the website functionality.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-3">Consent</h2>
        <p className="text-gray-600 mb-4">
          By using our website, you consent to the use of cookies as described in this policy. You can withdraw your consent at any time by changing your browser settings or using the cookie banner.
        </p>

        <div className="mt-8 flex justify-center">
          <a
            href="/"
            className="px-6 py-3 bg-primary text-white font-medium rounded-lg hover:bg-primary-dull transition"
          >
            Back to Home
          </a>
        </div>
      </div>
    </div>
  );
};

export default CookiePolicy;
