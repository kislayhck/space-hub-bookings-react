
import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter, Linkedin, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <Link to="/" className="inline-block mb-4">
              <span className="text-blue-600 font-bold text-xl">SpaceHub</span>
            </Link>
            <p className="text-gray-600 mb-4">
              Find the perfect workspace that suits your needs. Book daily passes or monthly memberships at coworking spaces across major cities in India.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-500 hover:text-blue-600">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-blue-600">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-blue-600">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-blue-600">
                <Linkedin size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">
              Popular Cities
            </h3>
            <ul className="space-y-2">
              {["Pune", "Mumbai", "Bangalore", "Delhi", "Hyderabad"].map((city) => (
                <li key={city}>
                  <Link to={`/spaces?city=${city}`} className="text-gray-600 hover:text-blue-600">
                    {city}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-gray-600 hover:text-blue-600">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-600 hover:text-blue-600">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-600 hover:text-blue-600">
                  FAQs
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-600 hover:text-blue-600">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-600 hover:text-blue-600">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">
              Contact Us
            </h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <MapPin size={18} className="mr-2 mt-0.5 text-blue-600 flex-shrink-0" />
                <span className="text-gray-600">123 Business Avenue, Koregaon Park, Pune, India</span>
              </li>
              <li className="flex items-center">
                <Phone size={18} className="mr-2 text-blue-600 flex-shrink-0" />
                <span className="text-gray-600">+91 987 654 3210</span>
              </li>
              <li className="flex items-center">
                <Mail size={18} className="mr-2 text-blue-600 flex-shrink-0" />
                <span className="text-gray-600">support@spacehub.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-center text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} SpaceHub. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
