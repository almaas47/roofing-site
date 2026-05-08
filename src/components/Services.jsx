const services = [
  {
    icon: "🏠",
    name: "New Installation",
    desc: "Full roof systems for new builds and major replacements. All material types."
  },
  {
    icon: "🔧",
    name: "Roof Repair",
    desc: "Leaks, storm damage, missing shingles — fast turnaround, lasting fixes."
  },
  {
    icon: "🌧️",
    name: "Gutters & Drainage",
    desc: "Seamless gutter install, cleaning, and guard systems to protect your foundation."
  },
  {
    icon: "📋",
    name: "Insurance Claims",
    desc: "We work directly with your insurer to streamline storm damage claims."
  }
]

function Services() {
  return (
    <section id="services" className="px-8 py-20">

      <p className="text-orange-700 text-xs tracking-widest uppercase mb-2">What We Do</p>
      <h2 className="text-4xl font-black mb-12">Our Services</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-gray-200 border border-gray-200 rounded-xl overflow-hidden">
        {services.map((service) => (
          <div key={service.name} className="bg-white p-6">
            <div className="text-3xl mb-4">{service.icon}</div>
            <div className="font-semibold text-base mb-2">{service.name}</div>
            <div className="text-sm text-gray-500 leading-relaxed">{service.desc}</div>
          </div>
        ))}
      </div>

    </section>
  )
}

export default Services