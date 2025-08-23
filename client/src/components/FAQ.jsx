import { useState } from "react";

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqsData = [
    {
      question: "Lightning-Fast Performance",
      answer: "Built with speed — minimal load times and optimized rendering.",
    },
    {
      question: "Fully Customizable Components",
      answer:
        "Easily adjust styles, structure, and behavior to match your project needs.",
    },
    {
      question: "Responsive by Default",
      answer:
        "Every component is responsive by default — no extra CSS required.",
    },
    {
      question: "Tailwind CSS Powered",
      answer:
        "Built using Tailwind utility classes — no extra CSS or frameworks required.",
    },
    {
      question: "Dark Mode Support",
      answer:
        "All components come ready with light and dark theme support out of the box.",
    },
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="flex flex-col items-center text-center text-slate-800 px-4  py-14">
      <p className="text-base font-medium text-primary">FAQ</p>
      <h1 className="text-3xl md:text-4xl font-semibold mt-2">
        Frequently Asked Questions
      </h1>
      <p className="text-sm text-slate-500 mt-4 max-w-md">
        Proactively answering FAQs boosts user confidence and cuts down on
        support tickets.
      </p>

      {/* Accordion */}
      <div className="max-w-3xl w-full mt-8 flex flex-col gap-5">
        {faqsData.map((faq, index) => (
          <div key={index} className="w-full">
            {/* سوال */}
            <div
              className="flex items-center justify-between w-full cursor-pointer 
              bg-primary/10 border border-primary/30 hover:border-primary-dull 
              px-6 py-5 rounded-xl transition-all"
              onClick={() => toggleFAQ(index)}
            >
              <h2 className="text-base font-medium text-slate-800">
                {faq.question}
              </h2>
              <svg
                width="20"
                height="20"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className={`transition-transform duration-500 ${
                  openIndex === index ? "rotate-180" : ""
                }`}
              >
                <path
                  d="m4.5 7.2 3.793 3.793a1 1 0 0 0 1.414 0L13.5 7.2"
                  stroke="#4fbf8b"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            {/* جواب */}
            <div
              className={`px-6 overflow-hidden transition-all duration-500 ease-in-out 
              ${openIndex === index ? "max-h-40 opacity-100 py-4" : "max-h-0 opacity-0"}`}
            >
              <p className="text-sm text-slate-600">{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
