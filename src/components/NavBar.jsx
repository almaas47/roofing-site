import { useState } from 'react'

function NavBar() {
  const [open, setOpen] = useState(false)

  return (
    <nav className="sticky top-0 bg-white z-10 border-b border-gray-200">
      <div className="flex items-center justify-between px-8 py-4">
        <div className="text-2xl font-bold tracking-wide">
          <span className="text-orange-700">Peak Ridge</span> Roofing
        </div>

        {/* Desktop links */}
        <div className="hidden md:flex gap-8">
          <a href="#services" className="text-sm text-gray-500 hover:text-orange-700">Services</a>
          <a href="#gallery" className="text-sm text-gray-500 hover:text-orange-700">Our Work</a>
          <a href="#reviews" className="text-sm text-gray-500 hover:text-orange-700">Reviews</a>
          <a href="#contact" className="text-sm text-gray-500 hover:text-orange-700">Contact</a>
        </div>

        <a href="#contact" className="hidden md:block bg-orange-700 text-white text-sm px-5 py-2 rounded hover:bg-orange-800">
          Free Estimate
        </a>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          <span className={`block w-6 h-0.5 bg-gray-700 transition-transform duration-300 ${open ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-6 h-0.5 bg-gray-700 transition-opacity duration-300 ${open ? 'opacity-0' : ''}`} />
          <span className={`block w-6 h-0.5 bg-gray-700 transition-transform duration-300 ${open ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden flex flex-col px-8 pb-4 gap-4 border-t border-gray-100">
          <a href="#services" onClick={() => setOpen(false)} className="text-sm text-gray-600 hover:text-orange-700 pt-3">Services</a>
          <a href="#gallery" onClick={() => setOpen(false)} className="text-sm text-gray-600 hover:text-orange-700">Our Work</a>
          <a href="#reviews" onClick={() => setOpen(false)} className="text-sm text-gray-600 hover:text-orange-700">Reviews</a>
          <a href="#contact" onClick={() => setOpen(false)} className="text-sm text-gray-600 hover:text-orange-700">Contact</a>
          <a href="#contact" onClick={() => setOpen(false)} className="bg-orange-700 text-white text-sm px-5 py-2 rounded hover:bg-orange-800 text-center">
            Free Estimate
          </a>
        </div>
      )}
    </nav>
  )
}

export default NavBar
