import { useState } from "react";
import toast from "react-hot-toast";

const NewsLetter = () => {
  const [email, setEmail] = useState(""); // Email input state

  // Handle subscription form submission
  const handleSubscribe = (e) => {
    e.preventDefault();

    if (!email) {
      toast.error("Please enter your email");
      return;
    }

    // Simulate successful subscription
    toast.success("Thanks for subscribing!");
    setEmail(""); // Reset input
  };

  return (
    <div className="flex flex-col items-center justify-center mt-24 pt-12 pb-28 text-center">
      <h1 className="text-2xl md:text-4xl font-semibold">
        Never Miss a Deal!
      </h1>
      <p className="mt-2 mb-8 text-gray-500/70 md:text-lg">
        Subscribe to get the latest offers, new arrivals, and exclusive discounts
      </p>

      {/* <form
        onSubmit={handleSubscribe}
        className="flex  max-w-2xl h-12 md:h-14"
      >
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
          className="flex-1 px-3 text-gray-600 border border-gray-300 rounded-l-md outline-none"
        />
        <button
          type="submit"
          className="px-2 md:px-10 bg-primary hover:bg-primary-dull duration-300 text-white font-medium rounded-r-md transition-all"
        >
          Subscribe
        </button>
      </form> */}
    </div>
  );
};

export default NewsLetter;
