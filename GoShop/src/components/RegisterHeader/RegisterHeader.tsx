import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

const RegisterHeader = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top row */}
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <Link to="/" className="inline-block">
              <h1 className="text-2xl font-bold text-gray-900">GoShop</h1>
            </Link>
          </div>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center space-x-4">
            <a
              href="#support"
              className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
            >
              Liên hệ hỗ trợ
            </a>
            <a
              href="#about"
              className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
            >
              Về chúng tôi
            </a>
            <a
              href="#faq"
              className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
            >
              FAQ
            </a>
            <a
              href="#contact"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Liên hệ
            </a>
          </nav>

          {/* Mobile toggle */}
          <button
            className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:bg-gray-100 transition"
            aria-label="Toggle navigation"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile menu */}
        {open && (
          <nav className="md:hidden pb-4 border-t border-gray-200">
            <ul className="flex flex-col gap-2 pt-4">
              <li>
                <a
                  href="#support"
                  className="block px-2 py-2 rounded-md text-gray-700 hover:bg-gray-100"
                  onClick={() => setOpen(false)}
                >
                  Liên hệ hỗ trợ
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  className="block px-2 py-2 rounded-md text-gray-700 hover:bg-gray-100"
                  onClick={() => setOpen(false)}
                >
                  Về chúng tôi
                </a>
              </li>
              <li>
                <a
                  href="#faq"
                  className="block px-2 py-2 rounded-md text-gray-700 hover:bg-gray-100"
                  onClick={() => setOpen(false)}
                >
                  FAQ
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="block w-full text-center bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition"
                  onClick={() => setOpen(false)}
                >
                  Liên hệ
                </a>
              </li>
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
};

export default RegisterHeader;
