import { useState, useRef, useEffect } from "react";

const primaryColor = "#4fbf8b";

const AccordionItem = ({ id, title, children, isOpen, onToggle }) => {
  const contentRef = useRef(null);
  const [maxHeight, setMaxHeight] = useState("0px");

  useEffect(() => {
    setMaxHeight(isOpen ? `${contentRef.current.scrollHeight}px` : "0px");
  }, [isOpen]);

  return (
    <div className="mb-4 border border-gray-200 rounded-md">
      <h2 id={`accordion-collapse-heading-${id}`}>
        <button
          type="button"
          onClick={() => onToggle(id)}
          className="flex items-center justify-between w-full gap-3 p-5 font-medium text-gray-700 border-b border-gray-200 rtl:text-right hover:bg-gray-100 focus:outline-none"
          aria-expanded={isOpen}
          aria-controls={`accordion-collapse-body-${id}`}
          style={{ color: primaryColor }}
        >
          <span>{title}</span>
          <svg
            className={`w-4 h-4 shrink-0 transition-transform duration-900 ${
              isOpen ? "rotate-180" : ""
            }`}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 10 6"
            stroke={primaryColor}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M9 5L5 1 1 5" />
          </svg>
        </button>
      </h2>
      <div
        id={`accordion-collapse-body-${id}`}
        ref={contentRef}
        style={{ maxHeight }}
        className="overflow-hidden transition-[max-height] duration-300 ease-in-out bg-white"
        aria-labelledby={`accordion-collapse-heading-${id}`}
      >
        <div className="p-5 border border-t-0 border-gray-200">{children}</div>
      </div>
    </div>
  );
};

export default function FAQ() {
  const [openId, setOpenId] = useState(null);

  const handleToggle = (id) => {
    setOpenId((prevId) => (prevId === id ? null : id));
  };

  return (
    <div id="accordion-collapse" data-accordion="collapse" className="max-w-3xl p-6 mx-auto">
      <AccordionItem id={1} title="What is Flowbite?" isOpen={openId === 1} onToggle={handleToggle}>
        <p className="mb-2 text-gray-700">
          Flowbite is an open-source library of interactive components built on top of Tailwind CSS including buttons, dropdowns, modals, navbars, and more.
        </p>
        <p className="text-gray-700">
          Check out this guide to learn how to{" "}
          <a href="/docs/getting-started/introduction/" className="text-primary hover:underline" style={{color: primaryColor}}>
            get started
          </a>{" "}
          and start developing websites even faster with components on top of Tailwind CSS.
        </p>
      </AccordionItem>

      <AccordionItem id={2} title="Is there a Figma file available?" isOpen={openId === 2} onToggle={handleToggle}>
        <p className="mb-2 text-gray-700">
          Flowbite is first conceptualized and designed using the Figma software so everything you see in the library has a design equivalent in our Figma file.
        </p>
        <p className="text-gray-700">
          Check out the{" "}
          <a href="https://flowbite.com/figma/" className="text-primary hover:underline" style={{color: primaryColor}}>
            Figma design system
          </a>{" "}
          based on the utility classes from Tailwind CSS and components from Flowbite.
        </p>
      </AccordionItem>

      <AccordionItem
        id={3}
        title="What are the differences between Flowbite and Tailwind UI?"
        isOpen={openId === 3}
        onToggle={handleToggle}
      >
        <p className="mb-2 text-gray-700">
          The main difference is that the core components from Flowbite are open source under the MIT license, whereas Tailwind UI is a paid product. Another difference is that Flowbite relies on smaller and standalone components, whereas Tailwind UI offers sections of pages.
        </p>
        <p className="mb-2 text-gray-700">
          However, we actually recommend using both Flowbite, Flowbite Pro, and even Tailwind UI as there is no technical reason stopping you from using the best of two worlds.
        </p>
        <p className="mb-2 text-gray-700">Learn more about these technologies:</p>
        <ul className="text-gray-700 list-disc ps-5">
          <li>
            <a href="https://flowbite.com/pro/" className="text-primary hover:underline" style={{color: primaryColor}}>
              Flowbite Pro
            </a>
          </li>
          <li>
            <a href="https://tailwindui.com/" rel="nofollow" className="text-primary hover:underline" style={{color: primaryColor}}>
              Tailwind UI
            </a>
          </li>
        </ul>
      </AccordionItem>
    </div>
  );
}
