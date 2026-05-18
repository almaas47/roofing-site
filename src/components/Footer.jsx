function Footer() {
  return (
    <footer className="bg-stone-900 text-stone-500 px-8 py-8 flex flex-col sm:flex-row justify-between items-center gap-4">
      <div className="text-orange-400 font-black text-lg tracking-wide">Peak Ridge Roofing</div>
      <div className="text-xs text-center">© 2026 Peak Ridge Roofing LLC · South Jordan, UT · All rights reserved</div>
      <div className="flex gap-6 text-xs">
        <a href="#services" className="hover:text-orange-400 cursor-pointer">Services</a>
        <a href="#reviews" className="hover:text-orange-400 cursor-pointer">Reviews</a>
        <a href="#contact" className="hover:text-orange-400 cursor-pointer">Contact</a>
      </div>
    </footer>
  )
}

export default Footer