import { Link } from "react-router-dom";

const RegisterHeader = () => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <Link to="/">
              <h1 className="text-2xl font-bold text-gray-900">GoShop</h1>
            </Link>
          </div>
          <div className="flex items-center space-x-4">
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
          </div>
        </div>
      </div>
    </header>
  );
};

export default RegisterHeader;
