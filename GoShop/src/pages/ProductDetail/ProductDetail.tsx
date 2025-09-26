import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import productApi from "../../api/product.api";
import DOMPurify from "dompurify";
import {
  formatCurrency,
  formatNumberToSocialStyle,
  getIdFromNameId,
  rateSale,
} from "../../utils/util";
import { useContext, useEffect, useMemo, useRef, useState } from "react";
import type {
  Product as productType,
  ProductListConfig,
} from "../../Types/product.type";
import Product from "../ProductList/Components/Product";
import QuantityController from "../../components/QuantityController";
import purchaseApi from "../../api/puchase.api";
import { toast } from "react-toastify";
import { purchasesStatus } from "../../constants/purchase";
import path from "../../constants/path";
import ProductRating from "../../components/ProductRating";
import { AppContext } from "../../Context/app.context";

const ProductDetail = () => {
  const queryClient = useQueryClient();
  const { nameId } = useParams();
  const id = getIdFromNameId(nameId as string);
  const { data: ProductDetailData } = useQuery({
    queryKey: ["product", id],
    queryFn: () => productApi.getProductDetail(id as string),
  });

  const { isAuthenticated } = useContext(AppContext);

  const product = ProductDetailData?.data.data;

  const imageRef = useRef<HTMLImageElement>(null);
  const [currentIndexImages, setCurrentIndexImages] = useState([0, 5]);
  const [activeImage, setActiveImage] = useState("");
  const currentImages = useMemo(
    () => (product ? product.images.slice(...currentIndexImages) : []),
    [product, currentIndexImages]
  );

  const [buyCount, setBuyCount] = useState(1);

  const navigate = useNavigate();

  useEffect(() => {
    if (product && product.images.length > 0) {
      setActiveImage(product.images[0]);
    }
  }, [product]);

  const queryConfig: ProductListConfig = {
    limit: "20",
    page: "1",
    category: product?.category._id,
  };
  const { data: productData } = useQuery({
    queryKey: ["products", queryConfig],
    queryFn: () => {
      return productApi.getProducts(queryConfig as ProductListConfig);
    },
    enabled: Boolean(product),
    staleTime: 3 * 60 * 1000,
  });
  console.log(productData);

  const chooseActive = (img: string) => {
    setActiveImage(img);
  };

  const addToCartMutation = useMutation({
    mutationFn: (body: { product_id: string; buy_count: number }) => {
      return purchaseApi.addToCart(body);
    },
  });

  const next = () => {
    if (currentIndexImages[1] < (product as productType)?.images.length) {
      setCurrentIndexImages((prev) => [prev[0] + 1, prev[1] + 1]);
    }
  };

  const prev = () => {
    if (currentIndexImages[0] > 0) {
      setCurrentIndexImages((prev) => [prev[0] - 1, prev[1] - 1]);
    }
  };
  const products = productData?.data?.data?.products ?? [];

  const handleZoom = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const image = imageRef.current as HTMLImageElement;
    const { naturalHeight, naturalWidth } = image;
    // Cách 1: Lấy offsetX, offsetY đơn giản khi chúng ta đã xử lý được bubble event
    // const { offsetX, offsetY } = event.nativeEvent

    // Cách 2: Lấy offsetX, offsetY khi chúng ta không xử lý được bubble event
    const offsetX = event.pageX - (rect.x + window.scrollX);
    const offsetY = event.pageY - (rect.y + window.scrollY);

    const top = offsetY * (1 - naturalHeight / rect.height);
    const left = offsetX * (1 - naturalWidth / rect.width);
    image.style.width = naturalWidth + "px";
    image.style.height = naturalHeight + "px";
    image.style.maxWidth = "unset";
    image.style.top = top + "px";
    image.style.left = left + "px";
  };

  const handleRemoveZoom = () => {
    imageRef.current?.removeAttribute("style");
  };

  const handleBuyCount = (value: number) => {
    setBuyCount(value);
  };

  const addTocart = () => {
    if (!isAuthenticated) {
      navigate(path.login);
      return;
    }
    addToCartMutation.mutate(
      {
        buy_count: buyCount,
        product_id: product?._id as string,
      },
      {
        onSuccess: (data) => {
          toast.success(data.data.message);
          queryClient.invalidateQueries({
            queryKey: ["purchases", { status: purchasesStatus.inCart }],
          });
        },
      }
    );
  };

  const buyNow = async () => {
    if (!isAuthenticated) {
      navigate(path.login);
      return;
    }
    const res = await addToCartMutation.mutateAsync({
      buy_count: buyCount,
      product_id: product?._id as string,
    });
    const purchase = res.data.data;
    navigate(path.cart, {
      state: {
        purchaseId: purchase?._id,
      },
    });
  };

  if (!product) return null;
return (
  <div className="bg-black/5 py-6">
    <div className="container mx-auto">
      <div className="bg-white p-4 shadow border border-black/20 rounded-lg">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-9">
          {/* Ảnh */}
          <div className="lg:col-span-5">
            <div
              className="relative w-full pt-[100%] shadow overflow-hidden border border-black/20 rounded-lg"
              onMouseMove={handleZoom}
              onMouseLeave={handleRemoveZoom}
            >
              {activeImage && (
                <img
                  src={activeImage}
                  alt={product.name}
                  ref={imageRef}
                  className="absolute top-0 left-0 h-full w-full object-cover transition-transform duration-200"
                />
              )}
            </div>

            {/* Thumbnail */}
            <div className="relative mt-4 grid grid-cols-4 sm:grid-cols-5 gap-2 cursor-pointer">
              <button
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 h-8 w-5 bg-black/40 text-white rounded-r"
                onClick={prev}
              >
                ‹
              </button>

              {currentImages.map((img) => {
                const isActive = img === activeImage;
                return (
                  <div
                    className="relative w-full pt-[100%]"
                    key={img}
                    onMouseEnter={() => chooseActive(img)}
                  >
                    <img
                      src={img}
                      alt={product.name}
                      className="absolute top-0 left-0 h-full w-full object-cover cursor-pointer rounded border border-black/20"
                    />
                    {isActive && (
                      <div className="absolute inset-0 border-2 border-black rounded"></div>
                    )}
                  </div>
                );
              })}

              <button
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 h-8 w-5 bg-black/40 text-white rounded-l"
                onClick={next}
              >
                ›
              </button>
            </div>
          </div>

          {/* Thông tin */}
          <div className="lg:col-span-7">
            <h1 className="text-lg sm:text-xl uppercase font-bold text-black">
              {product.name}
            </h1>

            {/* Rating + sold */}
            <div className="mt-4 sm:mt-6 flex flex-wrap items-center text-sm sm:text-base">
              <div className="flex items-center">
                <span className="mr-1 font-medium text-black">
                  {product.rating}
                </span>
                <ProductRating
                  rating={product.rating}
                  activeClassname="fill-black text-black h-4 w-4"
                  nonActiveClassname="fill-black/20 text-black/20 h-4 w-4"
                />
              </div>
              <div className="mx-3 h-4 w-[1px] bg-black/20 hidden sm:block"></div>
              <div className="mt-2 sm:mt-0">
                <span>{formatNumberToSocialStyle(product.sold)}</span>
                <span className="ml-1 text-black/60">Đã bán</span>
              </div>
            </div>

            {/* Giá */}
            <div className="mt-6 sm:mt-8 flex flex-wrap items-center bg-black/5 px-4 py-3 sm:px-5 sm:py-4 rounded-lg border border-black/20">
              <div className="text-black/60 line-through text-sm sm:text-base">
                ₫{formatCurrency(product.price_before_discount)}
              </div>
              <div className="ml-3 text-2xl sm:text-3xl font-bold text-black">
                ₫{formatCurrency(product.price)}
              </div>
              <div className="ml-3 sm:ml-4 rounded bg-black px-2 py-1 text-xs font-semibold uppercase text-white">
                {rateSale(product.price_before_discount, product.price)} Giảm
              </div>
            </div>

            {/* Số lượng */}
            <div className="mt-6 sm:mt-8 flex flex-wrap items-center gap-3 sm:gap-6">
              <div className="capitalize text-black/60 text-sm sm:text-base">
                Số lượng
              </div>
              <QuantityController
                onDecrease={handleBuyCount}
                onIncrease={handleBuyCount}
                onType={handleBuyCount}
                value={buyCount}
                max={product.quantity}
              />
              <div className="text-sm text-black/60">
                {product.quantity} sản phẩm có sẵn
              </div>
            </div>

            {/* Nút */}
            <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-3 sm:gap-6">
              <button
                onClick={addTocart}
                className="flex h-12 items-center justify-center rounded-full border border-black bg-white px-5 text-black font-medium hover:bg-black/5 transition"
              >
                Thêm vào giỏ hàng
              </button>
              <button
                onClick={buyNow}
                className="flex h-12 items-center justify-center rounded-full px-6 bg-black text-white font-semibold hover:bg-black/80 transition"
              >
                Mua ngay
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* Mô tả */}
    <div className="mt-6 sm:mt-8">
      <div className="container mx-auto">
        <div className="bg-white p-4 shadow border border-black/20 rounded-lg">
          <div className="text-lg font-semibold text-black border-b border-black/10 pb-2">
            Mô tả sản phẩm
          </div>
          <div className="mx-2 sm:mx-4 mt-4 sm:mt-6 mb-4 text-sm leading-relaxed text-black/80">
            <div
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(product.description),
              }}
            ></div>
          </div>
        </div>
      </div>
    </div>

    {/* Có thể bạn cũng thích */}
    <div className="mt-6 sm:mt-8">
      <div className="container mx-auto">
        <div className="uppercase text-black/60 font-semibold text-sm sm:text-base">
          Có thể bạn cũng thích
        </div>
        {product && (
          <div className="mt-4 sm:mt-6 grid grid-cols-2 gap-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
            {products.map((product) => (
              <div className="col-span-1" key={product._id}>
                <Product product={product} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  </div>
);



};

export default ProductDetail;
