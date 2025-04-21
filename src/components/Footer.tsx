
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">PDF<span className="text-pdf-purple">Wizard</span></h3>
            <p className="text-gray-600 text-sm">
              Your free web app for editing PDF files. Fast, simple, and completely online.
            </p>
          </div>
          
          <div>
            <h4 className="text-sm font-semibold mb-4 uppercase tracking-wider">Tools</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/merge" className="text-gray-600 hover:text-pdf-blue text-sm">
                  Merge PDF
                </Link>
              </li>
              <li>
                <Link to="/split" className="text-gray-600 hover:text-pdf-blue text-sm">
                  Split PDF
                </Link>
              </li>
              <li>
                <Link to="/compress" className="text-gray-600 hover:text-pdf-blue text-sm">
                  Compress PDF
                </Link>
              </li>
              <li>
                <Link to="/convert" className="text-gray-600 hover:text-pdf-blue text-sm">
                  Convert PDF
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-sm font-semibold mb-4 uppercase tracking-wider">Company</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-gray-600 hover:text-pdf-blue text-sm">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-600 hover:text-pdf-blue text-sm">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-600 hover:text-pdf-blue text-sm">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-600 hover:text-pdf-blue text-sm">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-sm font-semibold mb-4 uppercase tracking-wider">Support</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/help" className="text-gray-600 hover:text-pdf-blue text-sm">
                  Help Center
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-600 hover:text-pdf-blue text-sm">
                  FAQ
                </Link>
              </li>
              <li>
                <a href="mailto:support@pdfwizard.com" className="text-gray-600 hover:text-pdf-blue text-sm">
                  Email Support
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-gray-500 text-sm text-center">
            © {new Date().getFullYear()} PDFWizard. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
