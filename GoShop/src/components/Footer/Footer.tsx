const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="flex items-center">
            <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center mr-2">
              <span className="text-white font-bold text-sm">G</span>
            </div>
            <span className="text-lg font-semibold text-gray-900">GoShop</span>
          </div>

          <div className="flex space-x-6">
            <a href="#" className="text-gray-600 hover:text-blue-600 text-sm">
              About
            </a>
            <a href="#" className="text-gray-600 hover:text-blue-600 text-sm">
              Contact
            </a>
            <a href="#" className="text-gray-600 hover:text-blue-600 text-sm">
              Privacy
            </a>
          </div>
          {/* Copyright */}
          <p className="text-gray-500 text-sm">© 2024 GoShop</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
