import { useEffect, useRef, useState } from 'react'

const projects = [
  {
    title: "Full Shingle Replacement",
    location: "Draper, UT",
    tag: "Replacement"
  },
  {
    title: "Storm Damage Repair",
    location: "South Jordan, UT",
    tag: "Repair"
  },
  {
    title: "New Construction Install",
    location: "Riverton, UT",
    tag: "New Install"
  },
  {
    title: "Seamless Gutter System",
    location: "Herriman, UT",
    tag: "Gutters"
  },
  {
    title: "Hail Damage Insurance Claim",
    location: "West Jordan, UT",
    tag: "Insurance"
  },
  {
    title: "Flat Roof Membrane",
    location: "Murray, UT",
    tag: "Commercial"
  }
]

const tagColors = {
  Replacement: "bg-orange-100 text-orange-700",
  Repair: "bg-blue-100 text-blue-700",
  "New Install": "bg-green-100 text-green-700",
  Gutters: "bg-purple-100 text-purple-700",
  Insurance: "bg-yellow-100 text-yellow-700",
  Commercial: "bg-stone-100 text-stone-700"
}

function Gallery() {
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
    <section id="gallery" className="px-8 py-20">
      <p className="text-orange-700 text-xs tracking-widest uppercase mb-2">Recent Projects</p>
      <h2 className="text-4xl font-black mb-12">Our Work</h2>

      <div ref={ref} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, i) => (
          <div
            key={project.title}
            className="rounded-xl overflow-hidden border border-gray-200 group transition-all duration-500 hover:shadow-lg"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateY(0)' : 'translateY(24px)',
              transitionDelay: `${i * 80}ms`
            }}
          >
            {/* Placeholder image area — replace src with real photos */}
            <div className="bg-stone-200 h-48 flex items-center justify-center relative overflow-hidden">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-16 h-16 text-stone-400 group-hover:scale-110 transition-transform duration-300">
                <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
              </svg>
              <span className={`absolute top-3 left-3 text-xs font-semibold px-2 py-1 rounded-full ${tagColors[project.tag]}`}>
                {project.tag}
              </span>
            </div>
            <div className="p-4">
              <div className="font-semibold text-sm mb-1">{project.title}</div>
              <div className="text-xs text-gray-400">{project.location}</div>
            </div>
          </div>
        ))}
      </div>

      <p className="text-xs text-gray-400 text-center mt-8">
        Photos coming soon — contact us to see examples from your neighborhood.
      </p>
    </section>
  )
}

export default Gallery
