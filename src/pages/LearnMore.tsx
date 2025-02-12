





// export default LearnMore;
const LearnMore = () => {
    return (
        <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center">
            <h1 className="text-4xl text-center text-indigo-400 font-bold mb-5">
                Learn more with these links! ☆
            </h1>

        <div className="grid grid-cols-1 gap-5 text-center w-full max-w-2xl"></div>
            <h2>
                <a href="https://science.nasa.gov/moon/moon-phases/"
                 className="text-lg text-gray-300 hover:text-indigo-400 transition duration-300">
                ☾   Moon Phases: Nasa Science
                </a>
            </h2>
        <h2>
            <a href="https://www.mooninfo.org/"
            className="text-lg text-gray-300 hover:text-indigo-400 transition duration-300">
                ★   Today's Moon Phase: Moonrise, Moonset, Moon Age, Moon Distance
                </a>
            </h2>
        <h2>
            <a href="https://www.natgeokids.com/uk/discover/science/space/facts-about-the-moon/"
            className="text-lg text-gray-300 hover:text-indigo-400 transition duration-300">
                ☽   Facts about the Moon!: National Geographic Kids
                </a>
            </h2>
        <h2>
            <a href="https://www.astronomy.com/observing/10-tips-for-observing-the-moon/"
            className="text-lg text-gray-300 hover:text-indigo-400 transition duration-300">
                ☆   10 tips for observing the Moon: Astronomy
                </a>
            </h2>
        <h2>
            <a href="https://education.nationalgeographic.org/resource/moon/"
            className="text-lg text-gray-300 hover:text-indigo-400 transition duration-300">
                ☾   Moon: National Geographic
                </a>
        </h2>
    </div>
  )
    };
export default LearnMore;