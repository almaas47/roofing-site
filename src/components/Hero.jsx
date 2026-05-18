import { useEffect, useRef, useState } from 'react'
import heroBg from '../assets/hero.png'

function useCountUp(target, duration = 1500, start = false) {
  const [value, setValue] = useState(0)
  useEffect(() => {
    if (!start) return
    let startTime = null
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      setValue(Math.floor(progress * target))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [start, target, duration])
  return value
}

function Hero() {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true)
        observer.disconnect()
      }
    }, { threshold: 0.3 })
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  const years = useCountUp(18, 1200, visible)
  const roofs = useCountUp(2400, 1600, visible)

  return (
    <section
      className="text-white px-8 py-20 relative overflow-hidden bg-cover bg-center"
      style={{ backgroundImage: `url(${heroBg})` }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-stone-900 opacity-80" />
      {/* Accent shape */}
      <div className="absolute inset-0 bg-orange-700 opacity-10 skew-x-12 translate-x-96" />

      <div className="relative z-10">
        <p className="text-orange-400 text-xs tracking-widest uppercase mb-4">
          Licensed &amp; Insured · Salt Lake County
        </p>

        <h1 className="text-6xl font-black leading-none mb-6 max-w-lg">
          Roofs Built to <span className="text-orange-400">Last.</span>
        </h1>

        <p className="text-stone-400 text-lg italic max-w-sm mb-10 leading-relaxed">
          Expert installation, repair, and replacement — done right the first time, on time, on budget.
        </p>

        <div className="flex gap-4 flex-wrap">
          <a href="#contact">
            <button className="bg-orange-700 text-white px-7 py-3 rounded font-medium hover:bg-orange-800 transition-colors">
              Get a Free Estimate
            </button>
          </a>
          <a href="#gallery">
            <button className="border border-white border-opacity-30 text-white px-7 py-3 rounded hover:border-opacity-60 transition-colors">
              View Our Work
            </button>
          </a>
        </div>

        <div ref={ref} className="flex gap-12 mt-16 pt-10 border-t border-white border-opacity-10 flex-wrap">
          <div>
            <div className="text-4xl font-black text-orange-400">{years}+</div>
            <div className="text-xs text-stone-500 uppercase tracking-widest mt-1">Years in Business</div>
          </div>
          <div>
            <div className="text-4xl font-black text-orange-400">{roofs.toLocaleString()}</div>
            <div className="text-xs text-stone-500 uppercase tracking-widest mt-1">Roofs Installed</div>
          </div>
          <div>
            <div className="text-4xl font-black text-orange-400">4.9★</div>
            <div className="text-xs text-stone-500 uppercase tracking-widest mt-1">Google Rating</div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
