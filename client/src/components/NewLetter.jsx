const NewsLetter  = () => {
    
    return (
        <div className="flex flex-col items-center justify-center mt-[96px] pt-[46px] space-y-2 text-center pb-[115px]">
            <h1 className="text-2xl font-semibold md:text-4xl">Never Miss a Deal!</h1>
            <p className="pb-8 md:text-lg text-gray-500/70">
                Subscribe to get the latest offers, new arrivals, and exclusive discounts
            </p>
            <form className="flex items-center justify-between w-full h-12 max-w-2xl md:h-13">
                <input
                    className="w-full h-full px-3 text-gray-500 border border-r-0 border-gray-300 rounded-md rounded-r-none outline-none"
                    type="text"
                    placeholder="Enter your email id"
                    required
                />
                <button type="submit" className="h-full px-8 text-white transition-all rounded-md rounded-l-none cursor-pointer bg-primary md:px-12 hover:bg-primary-dull">
                    Subscribe
                </button>
            </form>
        </div>
    )
}


export default NewsLetter;