import { useEffect, useRef, useState } from 'react'

const testimonials = [
  {
    text: "Crew showed up on time, finished a full replacement in one day, and cleaned up perfectly. Our neighbors hired them the next week.",
    name: "Sandra M.",
    location: "Draper, UT"
  },
  {
    text: "Called about a leak on a Thursday, they were out Friday morning. Fixed it in two hours. Very fair price, very professional.",
    name: "Mike T.",
    location: "South Jordan, UT"
  },
  {
    text: "Handled everything with our insurance company after the hail storm. Took so much stress off our plate. Roof looks brand new.",
    name: "Lorena & Dave K.",
    location: "Riverton, UT"
  }
]

function Testimonials() {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true)
        observer.disconnect()
      }
    }, { threshold: 0.1 })
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="reviews" className="px-8 py-20 bg-stone-50">
      <p className="text-orange-700 text-xs tracking-widest uppercase mb-2">What Clients Say</p>
      <h2 className="text-4xl font-black mb-12">Real Reviews</h2>

      <div ref={ref} className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {testimonials.map((t, i) => (
          <div
            key={t.name}
            className="bg-white border border-gray-200 rounded-xl p-6 transition-all duration-500"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateY(0)' : 'translateY(20px)',
              transitionDelay: `${i * 120}ms`
            }}
          >
            <div className="text-orange-400 text-sm mb-3">★★★★★</div>
            <p className="text-gray-600 text-sm italic leading-relaxed mb-5">"{t.text}"</p>
            <div className="text-sm font-semibold">{t.name}</div>
            <div className="text-xs text-gray-400">{t.location}</div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Testimonials
