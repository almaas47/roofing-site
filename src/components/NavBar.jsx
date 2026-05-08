function NavBar() {
  return (
    <nav className="flex items-center justify-between px-8 py-4 border-b border-gray-200 sticky top-0 bg-white z-10">
      
      <div className="text-2xl font-bold tracking-wide">
        <span className="text-orange-700">Peak Ridge</span> Roofing
      </div>

      <div className="flex gap-8">
        <a href="#services" className="text-sm text-gray-500 hover:text-orange-700 cursor-pointer">Services</a>
        <a href="#reviews" className="text-sm text-gray-500 hover:text-orange-700 cursor-pointer">Reviews</a>
        <a href="#contact" className="text-sm text-gray-500 hover:text-orange-700 cursor-pointer">Contact</a>
      </div>

      <button className="bg-orange-700 text-white text-sm px-5 py-2 rounded hover:bg-orange-800">
        Free Estimate
      </button>

    </nav>
  )
}

export default NavBar