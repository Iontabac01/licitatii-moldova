export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Licitații Moldova</h3>
            <p className="text-gray-300">
              Platforma națională pentru licitații publice și private din Republica Moldova.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Link-uri utile</h3>
            <ul className="space-y-2 text-gray-300">
              <li><a href="#" className="hover:text-white transition-colors">Despre noi</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Termeni și condiții</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Politica de confidențialitate</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <div className="text-gray-300 space-y-2">
              <p>📧 info@licitatii.md</p>
              <p>📞 +373 22 123 456</p>
              <p>📍 Chișinău, Moldova</p>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300">
          <p>&copy; 2024 Licitații Moldova. Toate drepturile rezervate.</p>
        </div>
      </div>
    </footer>
  );
}