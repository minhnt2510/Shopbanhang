import {
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Send,
  Twitter,
} from "lucide-react";
import Input from "../Input";
import Button from "../Button";

const Footer = () => {
  return (
    <footer className="bg-black text-gray-300">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Logo + mô tả */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                <span className="text-black font-bold text-lg">G</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">GoShop</h3>
                <p className="text-sm text-gray-400">Mua sắm thông minh</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Nền tảng thương mại điện tử hàng đầu Việt Nam, mang đến trải
              nghiệm mua sắm tuyệt vời với hàng triệu sản phẩm chất lượng.
            </p>
            <div className="flex space-x-3">
              <a
                href="#"
                className="w-9 h-9 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-white hover:text-black transition-colors"
              >
                <Facebook size={18} />
              </a>
              <a
                href="#"
                className="w-9 h-9 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-white hover:text-black transition-colors"
              >
                <Instagram size={18} />
              </a>
              <a
                href="#"
                className="w-9 h-9 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-white hover:text-black transition-colors"
              >
                <Twitter size={18} />
              </a>
              <a
                href="#"
                className="w-9 h-9 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-white hover:text-black transition-colors"
              >
                <Linkedin size={18} />
              </a>
            </div>
          </div>

          {/* Liên kết nhanh */}
          <div className="space-y-4">
            <h4 className="font-semibold text-white">Liên kết nhanh</h4>
            <ul className="space-y-2">
              {[
                "Về chúng tôi",
                "Danh mục sản phẩm",
                "Khuyến mãi",
                "Tin tức",
                "Tuyển dụng",
              ].map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Hỗ trợ */}
          <div className="space-y-4">
            <h4 className="font-semibold text-white">Hỗ trợ khách hàng</h4>
            <ul className="space-y-2">
              {[
                "Câu hỏi thường gặp",
                "Chính sách đổi trả",
                "Hướng dẫn mua hàng",
                "Chính sách bảo mật",
                "Điều khoản sử dụng",
              ].map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Đăng ký nhận tin */}
          <div className="space-y-4">
            <h4 className="font-semibold text-white">Đăng ký nhận tin</h4>
            <p className="text-gray-400 text-sm">
              Nhận thông tin khuyến mãi và sản phẩm mới nhất từ GoShop
            </p>
            <div className="flex space-x-2">
              <Input
                placeholder="Email của bạn"
                className="flex-1 text-sm bg-gray-800 border border-gray-600 text-white placeholder-gray-400"
              />
              <Button className="bg-black hover:bg-gray-700 text-white border border-gray-600">
                <Send size={16} />
              </Button>
            </div>
          </div>
        </div>

        {/* Liên hệ */}
        <div className="border-t border-gray-600 pt-8 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center space-x-3">
              <Phone size={18} className="text-white" />
              <div>
                <p className="font-medium text-white">Hotline</p>
                <p className="text-sm text-gray-400">1900 1234</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Mail size={18} className="text-white" />
              <div>
                <p className="font-medium text-white">Email</p>
                <p className="text-sm text-gray-400">
                  tanminh.office183@gmail.com
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <MapPin size={18} className="text-white" />
              <div>
                <p className="font-medium text-white">Địa chỉ</p>
                <p className="text-sm text-gray-400">
                  123 Nguyễn Huệ, Q1, TP.HCM
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bản quyền */}
        <div className="border-t border-gray-600 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-gray-400">
              © 2025 GoShop. Tất cả quyền được bảo lưu.
            </p>
            <div className="flex space-x-6">
              <a
                href="#"
                className="text-sm text-gray-400 hover:text-white transition-colors"
              >
                Chính sách bảo mật
              </a>
              <a
                href="#"
                className="text-sm text-gray-400 hover:text-white transition-colors"
              >
                Điều khoản dịch vụ
              </a>
              <a
                href="#"
                className="text-sm text-gray-400 hover:text-white transition-colors"
              >
                Sitemap
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
