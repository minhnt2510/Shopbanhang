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
    <footer className="bg-slate-700 border-t border-border text-slate-300 ">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">
                  G
                </span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-foreground">GoShop</h3>
                <p className="text-sm text-muted-foreground">
                  Mua sắm thông minh
                </p>
              </div>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Nền tảng thương mại điện tử hàng đầu Việt Nam, mang đến trải
              nghiệm mua sắm tuyệt vời với hàng triệu sản phẩm chất lượng.
            </p>
            <div className="flex space-x-3">
              <a
                href="#"
                className="w-9 h-9 bg-muted rounded-lg flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                <Facebook size={18} />
              </a>
              <a
                href="#"
                className="w-9 h-9 bg-muted rounded-lg flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                <Instagram size={18} />
              </a>
              <a
                href="#"
                className="w-9 h-9 bg-muted rounded-lg flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                <Twitter size={18} />
              </a>
              <a
                href="#"
                className="w-9 h-9 bg-muted rounded-lg flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                <Linkedin size={18} />
              </a>
            </div>
          </div>
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Liên kết nhanh</h4>
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
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Hỗ trợ khách hàng</h4>
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
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Đăng ký nhận tin</h4>
            <p className="text-muted-foreground text-sm">
              Nhận thông tin khuyến mãi và sản phẩm mới nhất từ GoShop
            </p>
            <div className="flex space-x-2">
              <Input placeholder="Email của bạn" className="flex-1 text-sm" />
              <Button className="bg-secondary hover:bg-secondary/90 text-secondary-foreground">
                <Send size={16} />
              </Button>
            </div>
          </div>
        </div>
        <div className="border-t border-border pt-8 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
                <Phone size={18} className="text-primary" />
              </div>
              <div>
                <p className="font-medium text-foreground">Hotline</p>
                <p className="text-sm text-muted-foreground">1900 1234</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
                <Mail size={18} className="text-primary" />
              </div>
              <div>
                <p className="font-medium text-foreground">Email</p>
                <p className="text-sm text-muted-foreground">
                  tanminh.office183@gmail.com
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
                <MapPin size={18} className="text-primary" />
              </div>
              <div>
                <p className="font-medium text-foreground">Địa chỉ</p>
                <p className="text-sm text-muted-foreground">
                  123 Nguyễn Huệ, Q1, TP.HCM
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="border-t border-border pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-muted-foreground">
              © 2025 GoShop. Tất cả quyền được bảo lưu.
            </p>
            <div className="flex space-x-6">
              <a
                href="#"
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Chính sách bảo mật
              </a>
              <a
                href="#"
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Điều khoản dịch vụ
              </a>
              <a
                href="#"
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
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
