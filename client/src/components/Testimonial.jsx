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
                        <svg className="mt-0.5" width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M4.555.72a4 4 0 0 1-.297.24c-.179.12-.38.202-.59.244a4 4 0 0 1-.38.041c-.48.039-.721.058-.922.129a1.63 1.63 0 0 0-.992.992c-.071.2-.09.441-.129.922a4 4 0 0 1-.041.38 1.6 1.6 0 0 1-.245.59 3 3 0 0 1-.239.297c-.313.368-.47.551-.56.743-.213.444-.213.96 0 1.404.09.192.247.375.56.743.125.146.187.219.24.297.12.179.202.38.244.59.018.093.026.189.041.38.039.48.058.721.129.191.015.287.023.38.041.21.042.411.125.59.245.078.052.151.114.297.239.368.313.551.47.743.56.444.213.96.213 1.404 0 .192-.09.375-.247.743-.56.146-.125.219-.187.297-.24.179-.12.38-.202.59-.244a4 4 0 0 1 .38-.041c.48-.039.721-.058.922-.129.464-.163.829-.528.992-.992.071-.2.09-.441.129-.922a4 4 0 0 1 .041-.38c.042-.21.125-.411.245-.59.052-.078.114-.151.239-.297.313-.368.47-.551.56-.743.213-.444.213-.96 0-1.404-.09-.192-.247-.375-.56-.743a4 4 0 0 1-.24-.297 1.6 1.6 0 0 1-.244-.59 3 3 0 0 1-.041-.38c-.039-.48-.058-.721-.129-.922a1.63 1.63 0 0 0-.992-.992c-.2-.071-.441-.09-.922-.129a4 4 0 0 1-.38-.041 1.6 1.6 0 0 1-.59-.245A3 3 0 0 1 7.445.72C7.077.407 6.894.25 6.702.16a1.63 1.63 0 0 0-1.404 0c-.192.09-.375.247-.743.56m4.07 3.998a.488.488 0 0 0-.691-.69l-2.91 2.91-.958-.957a.488.488 0 0 0-.69.69l1.302 1.302c.19.191.5.191.69 0z" fill="#2196F3" />
                        </svg>
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
