import { Link } from "react-router-dom";

const AsideFilter = () => {
  return (
    <>
      <div className="py-4">
        <Link
          to="/"
          className="flex items-center font-bold px-3 hover:text-gray-500"
        >
          Tất cả danh mục
        </Link>
      </div>
      <div className="bg-gray-300 h-[1px] my-4" />
      <ul>
        <li className="py-2 pl-4 relative">
          <Link to="/" className="hover:text-gray-500">
            Danh mục 1
          </Link>
          {/* icon hình tròn màu cam phía trước chữ */}
          <span className="absolute top-1/2 -left-2 h-2 w-2 bg-orange-500 rounded-full transform -translate-y-1/2"></span>
        </li>
        <li className="py-2 pl-4 relative">
          <Link to="/" className="hover:text-gray-500">
            Danh mục 2
          </Link>
          <span className="absolute top-1/2 -left-2 h-2 w-2 bg-orange-500 rounded-full transform -translate-y-1/2"></span>
        </li>
      </ul>
    </>
  );
};

export default AsideFilter;
