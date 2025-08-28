// src/components/Testimonial.jsx
import { cardsTop, cardsBottom } from '../assets/assets.js';
import { Link } from 'react-router-dom';

const Testimonial = () => {

  // Component for individual testimonial card
  const CreateCard = ({ card }) => (
    <div className="p-5 m-4 w-72 flex-shrink-0 bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300">
      {/* User info */}
      <div className="flex items-center gap-3">
        <img className="w-12 h-12 rounded-full" src={card.image} alt={card.name} />
        <div className="flex flex-col">
          <p className="font-semibold text-gray-800">{card.name}</p>
          <span className="text-xs text-gray-500">{card.handle}</span>
        </div>
      </div>

      {/* Review text */}
      <p className="mt-3 text-gray-700 text-sm">{card.text}</p>

      {/* Date and link */}
      <div className="flex justify-between items-center mt-4 text-xs text-gray-400">
        <span>Posted on {card.date}</span>
        <Link to="https://x.com" target="_blank" className="text-primary hover:text-primary-dull">
          <svg width="12" height="12" fill="currentColor" viewBox="0 0 11 10">
            <path d="m.027 0 4.247 5.516L0 10h.962l3.742-3.926L7.727 10H11L6.514 4.174 10.492 0H9.53L6.084 3.616 3.3 0z" />
          </svg>
        </Link>
      </div>
    </div>
  );

  return (
    <div className="mt-16 bg-white">
      <p className="mb-4 text-2xl font-semibold text-gray-800 md:text-3xl text-center">
        Customer Reviews
      </p>
      <div className="w-24 h-1 mb-8 mx-auto rounded-full bg-primary"></div>

      {/* Top Row */}
      <div className="overflow-hidden relative">
        <div className="absolute left-0 top-0 h-full w-16 z-10 pointer-events-none bg-gradient-to-r from-white to-transparent" />
        <div className="flex animate-marquee gap-4">
          {[...cardsTop, ...cardsTop].map((card, idx) => (
            <CreateCard key={idx} card={card} />
          ))}
        </div>
        <div className="absolute right-0 top-0 h-full w-16 z-10 pointer-events-none bg-gradient-to-l from-white to-transparent" />
      </div>

      {/* Bottom Row */}
      <div className="overflow-hidden relative mt-8">
        <div className="absolute left-0 top-0 h-full w-16 z-10 pointer-events-none bg-gradient-to-r from-white to-transparent" />
        <div className="flex animate-marquee-reverse gap-4">
          {[...cardsBottom, ...cardsBottom].map((card, idx) => (
            <CreateCard key={idx} card={card} />
          ))}
        </div>
        <div className="absolute right-0 top-0 h-full w-16 z-10 pointer-events-none bg-gradient-to-l from-white to-transparent" />
      </div>
    </div>
  );
};

export default Testimonial;
