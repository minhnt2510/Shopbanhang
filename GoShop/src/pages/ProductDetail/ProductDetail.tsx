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
import { useEffect, useMemo, useRef, useState } from "react";
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

const ProductDetail = () => {
  const queryClient = useQueryClient();
  const { nameId } = useParams();
  const id = getIdFromNameId(nameId as string);
  const { data: ProductDetailData } = useQuery({
    queryKey: ["product", id],
    queryFn: () => productApi.getProductDetail(id as string),
  });

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
    <div className="bg-gray-200 py-6">
      <div className="container mx-auto">
        <div className="bg-white p-4 shadow">
          <div className="grid grid-cols-12 gap-9">
            <div className="col-span-5">
              <div
                className="relative w-full pt-[100%] shadow overflow-hidden"
                onMouseMove={handleZoom}
                onMouseLeave={handleRemoveZoom}
              >
                <img
                  src={activeImage}
                  alt={product.name}
                  ref={imageRef}
                  className="absolute top-0 left-0 h-full w-full bg-white object-cover transition-transform duration-200"
                />
              </div>

              <div className="relative mt-4 grid grid-cols-5 gap-1 cursor-pointer">
                <button
                  className="absolute mt-7 left-0 top1/2 z-10 h-9 w-5 -translate-y-1/2 bg-black/20 text-white"
                  onClick={prev}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="h-5 w-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 19.5 8.25 12l7.5-7.5"
                    />
                  </svg>
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
                        className="absolute top-0 left-0 h-full w-full bg-white object-cover cursor-pointer"
                      />
                      {isActive && (
                        <div className="absolute inset-0 border-2 border-orange-500"></div>
                      )}
                    </div>
                  );
                })}

                <button
                  className="absolute mt-7 right-0 top1/2 z-10 h-9 w-5 -translate-y-1/2 bg-black/20 text-white"
                  onClick={next}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="h-5 w-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m8.25 4.5 7.5 7.5-7.5 7.5"
                    />
                  </svg>
                </button>
              </div>
            </div>
            <div className="col-span-7">
              <h1 className="text-xl uppercase font-medium">{product.name}</h1>
              <div className="mt-6 flex items-center">
                <div className="flex items-center">
                  <span className="mr-1 border-b-2 border-b-orange-600 text-orange-600">
                    {product.rating}
                  </span>
                  <ProductRating
                    rating={product.rating}
                    activeClassname="fill-orange-600 text-orange-600 h-4 w-4"
                    nonActiveClassname="fill-gray-300 text-gray-300 h-4 w-4"
                  />
                </div>
                <div className="mx-4 h-4 w-[1px] bg-gray-300"></div>
                <div>
                  <span className="">
                    {" "}
                    {formatNumberToSocialStyle(product.sold)}
                  </span>
                  <span className="ml-1 text-gray-500">Đã bán</span>
                </div>
              </div>
              <div className="mt-8 flex items-center bg-gray-50 px-5 py-4">
                <div className="text-gray-500 line-through">
                  ₫{formatCurrency(product.price_before_discount)}
                </div>
                <div className="ml-3 text-3xl font-medium text-orange-600">
                  ₫{formatCurrency(product.price)}
                </div>
                <div className="ml-4 rounded-sm bg-orange-600 px-1 py-[2px] text-xs font-semibold uppercase text-white">
                  {rateSale(product.price_before_discount, product.price)} Giảm
                </div>
              </div>
              <div className="mt-8 flex items-center ">
                <div className="capitalize text-gray-500">Số lượng</div>
                <QuantityController
                  onDecrease={handleBuyCount}
                  onIncrease={handleBuyCount}
                  onType={handleBuyCount}
                  value={buyCount}
                  max={product.quantity}
                />
                <div className="ml-6 text-sm text-gray-500">
                  {product.quantity} sản phẩm có sẵn
                </div>
              </div>
              <div className="mt-8 flex items-center ">
                <button
                  onClick={addTocart}
                  className="flex h-12 items-center justify-center rounded-sm border
                border-orange-500 bg-orange-500/10 px-5 capitalize text-orange-500 shadow-sm hover:bg-orange-100
                cursor-pointer"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                    />
                  </svg>
                  Thêm vào giỏ hàng
                </button>
                <button
                  onClick={buyNow}
                  className="flex items-center justify-center rounded-sm px-5 h-12 ml-6 bg-orange-600 text-white cursor-pointer
                "
                >
                  Mua Ngay
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-8">
        <div className="container mx-auto">
          <div className="mt-8 bg-white p-4 shadow">
            <div className="rounded bg-gray-50 p-4 text-lg capitalize text-slate-700">
              mô tả sản phẩm
            </div>
            <div className="mx-4 mt-12 mb-4 text-sm leading-loose">
              <div
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(product.description),
                }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 ">
        <div className="container mx-auto">
          <div className="uppercase text-gray-400 ">CÓ THỂ BẠN CŨNG THÍCH</div>
          {product && (
            <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
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
