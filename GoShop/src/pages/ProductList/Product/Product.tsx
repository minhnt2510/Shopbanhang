import { Link } from "react-router-dom";

const Product = () => {
  return (
    <Link to="">
      <div className="bg-white rounded-sm shadow hover:translate-y-[-0.0625rem] hover:shadow-md duration-100 transition-transform overflow-hidden ">
        <div className="w-full pt-[100%] relative ">
          <img
            src="https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lkk5ruzefoiy83_tn.webp"
            alt=""
            className="absolute top-0 left-0 bg-white w-full h-full object-cover"
          />
        </div>
        <div className="p-2 overflow-hidden">
          <div className="min-h-[1.75rem] line-clamp-2 text-sm">
            Thắt Lưng Nam Mặt Xoay Khóa Tự Động Cao Cấp,Dây Nịt Nam Thắt Lưng Da
            Mặt Xoay Khóa Kim Loại
          </div>
          <div className="flex items-center mt-3">
            <div className="line-through max-w-[50%] text-gray-500 truncate text-xs">
              ₫5.000
            </div>
            <div className="text-orange-600 truncate ml-1">
              <span className="text-xs">₫</span>
              <span className="">2.000</span>
            </div>
          </div>
          <div className="mt-3 flex items-center justify-end">
            <div className="flex items-center">
              <div className="relative w-4 h-4">
                {/* sao vàng (fill 50%) */}
                <div
                  className="absolute top-0 left-0 h-full overflow-hidden"
                  style={{ width: "50%" }}
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-4 h-4 text-yellow-400"
                  >
                    <path d="M12 .587l3.668 7.431L24 9.753l-6 5.847 1.416 8.268L12 19.771l-7.416 4.097L6 15.6 0 9.753l8.332-1.735z" />
                  </svg>
                </div>

                {/* sao rỗng (outline) */}
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  className="w-4 h-4 text-yellow-400"
                >
                  <path d="M12 .587l3.668 7.431L24 9.753l-6 5.847 1.416 8.268L12 19.771l-7.416 4.097L6 15.6 0 9.753l8.332-1.735z" />
                </svg>
              </div>
              <div className="pl-2 text-xs">
                <span className="ml-1 mr-1">Đã bán</span>
                <span className="">5.77k</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Product;
