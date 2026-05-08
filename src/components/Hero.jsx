function Hero() {
  return (
    <section className="bg-stone-900 text-white px-8 py-20 relative overflow-hidden">

      <div className="absolute inset-0 bg-orange-700 opacity-10 skew-x-12 translate-x-96" />

      <p className="text-orange-400 text-xs tracking-widest uppercase mb-4">
        Licensed & Insured · Salt Lake County
      </p>

      <h1 className="text-6xl font-black leading-none mb-6 max-w-lg">
        Roofs Built to <span className="text-orange-400">Last.</span>
      </h1>

      <p className="text-stone-400 text-lg italic max-w-sm mb-10 leading-relaxed">
        Expert installation, repair, and replacement — done right the first time, on time, on budget.
      </p>

      <div className="flex gap-4">
        <a href="#contact">
          <button className="bg-orange-700 text-white px-7 py-3 rounded font-medium hover:bg-orange-800">
            Get a Free Estimate
          </button>
        </a>
        <button className="border border-white border-opacity-30 text-white px-7 py-3 rounded hover:border-opacity-60">
          View Our Work
        </button>
      </div>

      <div className="flex gap-12 mt-16 pt-10 border-t border-white border-opacity-10">
        <div>
          <div className="text-4xl font-black text-orange-400">18+</div>
          <div className="text-xs text-stone-500 uppercase tracking-widest mt-1">Years in Business</div>
        </div>
        <div>
          <div className="text-4xl font-black text-orange-400">2,400</div>
          <div className="text-xs text-stone-500 uppercase tracking-widest mt-1">Roofs Installed</div>
        </div>
        <div>
          <div className="text-4xl font-black text-orange-400">4.9★</div>
          <div className="text-xs text-stone-500 uppercase tracking-widest mt-1">Google Rating</div>
        </div>
      </div>

    </section>
  )
}

export default Hero