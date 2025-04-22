
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { useState } from "react";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="w-full py-4 px-4 sm:px-6 lg:px-8 bg-white shadow-sm">
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <span className="text-2xl font-bold text-pdf-blue">PDF<span className="text-pdf-purple">Wizard</span></span>
        </Link>
        
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/merge" className="text-sm font-medium text-gray-600 hover:text-pdf-blue transition-colors">
            Merge PDF
          </Link>
          <Link to="/split" className="text-sm font-medium text-gray-600 hover:text-pdf-blue transition-colors">
            Split PDF
          </Link>
          <Link to="/compress" className="text-sm font-medium text-gray-600 hover:text-pdf-blue transition-colors">
            Compress PDF
          </Link>
          <Link to="/convert" className="text-sm font-medium text-gray-600 hover:text-pdf-blue transition-colors">
            Convert PDF
          </Link>
          <Link to="/pdf-to-image" className="text-sm font-medium text-gray-600 hover:text-pdf-blue transition-colors">
            PDF to Image
          </Link>
          <Link to="/edit" className="text-sm font-medium text-gray-600 hover:text-pdf-blue transition-colors">
            Edit PDF
          </Link>
        </nav>
        
        <div className="flex items-center gap-4">
          <Button className="bg-pdf-blue hover:bg-blue-700 text-white">Sign In</Button>
          
          <button 
            className="md:hidden text-gray-600 hover:text-pdf-blue"
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            <Menu size={24} />
          </button>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden mt-4 px-4 pb-4">
          <nav className="flex flex-col space-y-3">
            <Link 
              to="/merge" 
              className="text-sm font-medium text-gray-600 hover:text-pdf-blue transition-colors p-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Merge PDF
            </Link>
            <Link 
              to="/split" 
              className="text-sm font-medium text-gray-600 hover:text-pdf-blue transition-colors p-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Split PDF
            </Link>
            <Link 
              to="/compress" 
              className="text-sm font-medium text-gray-600 hover:text-pdf-blue transition-colors p-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Compress PDF
            </Link>
            <Link 
              to="/convert" 
              className="text-sm font-medium text-gray-600 hover:text-pdf-blue transition-colors p-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Convert PDF
            </Link>
            <Link 
              to="/pdf-to-image" 
              className="text-sm font-medium text-gray-600 hover:text-pdf-blue transition-colors p-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              PDF to Image
            </Link>
            <Link 
              to="/edit" 
              className="text-sm font-medium text-gray-600 hover:text-pdf-blue transition-colors p-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Edit PDF
            </Link>
            <Link 
              to="/print" 
              className="text-sm font-medium text-gray-600 hover:text-pdf-blue transition-colors p-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Print PDF
            </Link>
            <Link 
              to="/reader" 
              className="text-sm font-medium text-gray-600 hover:text-pdf-blue transition-colors p-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              PDF Reader
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
