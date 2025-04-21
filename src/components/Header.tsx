
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Header = () => {
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
        </nav>
        
        <div>
          <Button className="bg-pdf-blue hover:bg-blue-700 text-white">Sign In</Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
