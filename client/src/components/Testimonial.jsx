const Testimonial = () => {
    // داده‌های ردیف بالا
    const cardsTop = [
        {
            image: "https://i.pravatar.cc/200?img=11",
            name: "Sara Johnson",
            handle: "@sara_design",
            date: "April 12, 2025",
            text: "This platform has completely changed the way I shop online. Super fast and reliable!"
        },
        {
            image: "https://i.pravatar.cc/200?img=12",
            name: "Michael Lee",
            handle: "@mlee_dev",
            date: "May 03, 2025",
            text: "I found exactly what I needed, and the checkout process was seamless."
        },
        {
            image: "https://i.pravatar.cc/200?img=13",
            name: "Emily Carter",
            handle: "@emilywrites",
            date: "June 08, 2025",
            text: "Customer support is outstanding. They answered my questions instantly."
        },
        {
            image: "https://i.pravatar.cc/200?img=14",
            name: "David Brown",
            handle: "@dbrown",
            date: "July 15, 2025",
            text: "Very easy to navigate. The product categories make finding items super simple."
        },
    ];
    // assset
    // داده‌های ردیف پایین 
    const cardsBottom = [
        {
            image: "https://i.pravatar.cc/200?img=21",
            name: "Olivia Green",
            handle: "@oliviag",
            date: "April 25, 2025",
            text: "Great experience overall! My order arrived earlier than expected."
        },
        {
            image: "https://i.pravatar.cc/200?img=22",
            name: "James Miller",
            handle: "@jamesm",
            date: "May 18, 2025",
            text: "The mobile version works like a charm. Super responsive!"
        },
        {
            image: "https://i.pravatar.cc/200?img=23",
            name: "Sophia Turner",
            handle: "@sophiat",
            date: "June 20, 2025",
            text: "I love how intuitive the UI is. Adding to cart and checkout takes seconds."
        },
        {
            image: "https://i.pravatar.cc/200?img=24",
            name: "Daniel Adams",
            handle: "@daniela",
            date: "July 28, 2025",
            text: "High quality products at unbeatable prices. Highly recommend!"
        },
    ];

    const CreateCard = ({ card }) => (
        <div className="p-4 rounded-lg mx-4 mt-8 shadow hover:shadow-lg transition-all duration-200 w-72 shrink-0 bg-white">
            <div className="flex gap-2">

                <img className="size-11 rounded-full" src={card.image} alt="User" />
                <div className="flex flex-col">
                    <div className="flex items-center gap-1">
                        <p className="font-semibold">{card.name}</p>
                    
                    </div>
                    <span className="text-xs text-slate-500">{card.handle}</span>
                </div>
            </div>
            <p className="text-sm py-4 text-gray-800">{card.text}</p>
            <div className="flex items-center justify-between text-slate-500 text-xs">
                <div className="flex items-center gap-1">
                    <span>Posted on</span>
                    <a href="https://x.com" target="_blank" className="hover:text-sky-500">
                        <svg width="11" height="10" viewBox="0 0 11 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="m.027 0 4.247 5.516L0 10h.962l3.742-3.926L7.727 10H11L6.514 4.174 10.492 0H9.53L6.084 3.616 3.3 0zM1.44.688h1.504l6.64 8.624H8.082z" fill="currentColor" />
                        </svg>
                    </a>
                </div>
                <p>{card.date}</p>
            </div>
        </div>
    );

    return (
        <>
            <style>{`
            @keyframes marqueeScroll {
                0% { transform: translateX(0%); }
                100% { transform: translateX(-50%); }
            }

            .marquee-inner {
                animation: marqueeScroll 25s linear infinite;
            }

            .marquee-reverse {
                animation-direction: reverse;
            }
        `}</style>

            {/* ردیف بالا */}
            <div className="mt-[4rem]">
                <p className="mb-4 text-2xl font-semibold text-gray-800 md:text-3xl">
                   Customer Reviews
                </p>
                <div className="w-[150px] h-1 mb-8 rounded-full bg-primary"></div>
            </div>

            <div className="marquee-row w-full mx-auto max-w-5xl overflow-hidden relative">
                <div className="absolute left-0 top-0 h-full w-20 z-10 pointer-events-none bg-gradient-to-r from-white to-transparent"></div>
                <div className="marquee-inner flex transform-gpu min-w-[200%] pt-10 pb-5">
                    {[...cardsTop, ...cardsTop].map((card, index) => (
                        <CreateCard key={index} card={card} />
                    ))}
                </div>
                <div className="absolute right-0 top-0 h-full w-20 md:w-40 z-10 pointer-events-none bg-gradient-to-l from-white to-transparent"></div>
            </div>

            {/* ردیف پایین */}
            <div className="marquee-row w-full mx-auto max-w-5xl overflow-hidden relative">
                <div className="absolute left-0 top-0 h-full w-20 z-10 pointer-events-none bg-gradient-to-r from-white to-transparent"></div>
                <div className="marquee-inner marquee-reverse flex transform-gpu min-w-[200%] pt-10 pb-5">
                    {[...cardsBottom, ...cardsBottom].map((card, index) => (
                        <CreateCard key={index} card={card} />
                    ))}
                </div>
                <div className="absolute right-0 top-0 h-full w-20 md:w-40 z-10 pointer-events-none bg-gradient-to-l from-white to-transparent"></div>
            </div>
        </>
    )
}

export default Testimonial;
