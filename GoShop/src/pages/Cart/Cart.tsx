import { useMutation, useQuery } from "@tanstack/react-query";
import { Link, useLocation } from "react-router-dom";
import { purchasesStatus } from "../../constants/purchase";
import purchaseApi from "../../api/puchase.api";
import QuantityController from "../../components/QuantityController";
import Button from "../../components/Button";
import path from "../../constants/path";
import { formatCurrency, generateNameId } from "../../utils/util";
import type { Purchase } from "../../Types/purchase.type";
import { useContext, useEffect } from "react";
import { produce } from "immer";
import keyBy from "lodash/keyBy";
import { AppContext } from "../../Context/app.context";

export default function Cart() {
  const { extendedPurchases, setExtendedPurchases } = useContext(AppContext);
  const { data: purchasesInCartData, refetch } = useQuery({
    queryKey: ["purchases", { status: purchasesStatus.inCart }],
    queryFn: () => purchaseApi.getPurchases({ status: purchasesStatus.inCart }),
  });

  const updatePurchaseMutation = useMutation({
    mutationFn: purchaseApi.updatePurchase,
    onSuccess: () => {
      refetch();
    },
  });
  const buyProductMutation = useMutation({
    mutationFn: purchaseApi.buyProducts,
    onSuccess: () => {
      refetch();
    },
  });

  const deletePurchaseMutation = useMutation({
    mutationFn: purchaseApi.deletePurchase,
    onSuccess: () => {
      refetch();
    },
  });

  const purchasesInCart = purchasesInCartData?.data.data;
  const isAllChecked = extendedPurchases.every((purchase) => purchase.checked);
  const checkedPurchases = extendedPurchases.filter(
    (purchase) => purchase.checked
  );
  const location = useLocation();
  const choosenPurchaseIdFromLocation = (
    location.state as { purchaseId: string } | null
  )?.purchaseId;

  useEffect(() => {
    setExtendedPurchases((prev) => {
      const extendedPurchasesObject = keyBy(prev, "_id");
      return (
        purchasesInCart?.map((purchase) => {
          const isChoosenPurchaseIdFromLocation =
            choosenPurchaseIdFromLocation === purchase._id;
          return {
            ...purchase,
            disabled: false,
            checked:
              isChoosenPurchaseIdFromLocation ||
              Boolean(extendedPurchasesObject[purchase._id]?.checked),
          };
        }) || []
      );
    });
  }, [purchasesInCart, choosenPurchaseIdFromLocation]);

  useEffect(() => {
    return () => {
      history.replaceState(null, "");
    };
  }, []);

  const handleCheck =
    (purchaseIndex: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setExtendedPurchases(
        produce((draft) => {
          draft[purchaseIndex].checked = event.target.checked;
        })
      );
    };

  const handleCheckAll = () => {
    setExtendedPurchases((prev) =>
      prev.map((purchase) => ({
        ...purchase,
        checked: !isAllChecked,
      }))
    );
  };

  const handleTypeQuantity = (purchaseIndex: number) => (value: number) => {
    setExtendedPurchases(
      produce((draft) => {
        draft[purchaseIndex].buy_count = value;
      })
    );
  };

  const handleQuantity = (
    purchaseIndex: number,
    value: number,
    enable: boolean
  ) => {
    if (enable) {
      const purchase = extendedPurchases[purchaseIndex];
      setExtendedPurchases(
        produce((draft) => {
          draft[purchaseIndex].disabled = true;
        })
      );
      updatePurchaseMutation.mutate({
        product_id: purchase.product._id,
        buy_count: value,
      });
    }
  };

  // Tính tổng tiền và tổng số sản phẩm đã chọn
  const totalCheckedPurchase = extendedPurchases.reduce(
    (result, purchase) => {
      if (purchase.checked) {
        const productTotal = purchase.product.price * purchase.buy_count;
        result.total += productTotal;
        result.count += purchase.buy_count;
      }
      return result;
    },
    { total: 0, count: 0 }
  );

  const totalCheckedPurchaseSavingPrice = checkedPurchases.reduce(
    (result, current) => {
      return (
        result +
        (current.product.price_before_discount - current.product.price) *
          current.buy_count
      );
    },
    0
  );

  const handleDelete = (purchaseIndex: number) => () => {
    const purchaseId = extendedPurchases[purchaseIndex]._id;
    deletePurchaseMutation.mutate([purchaseId]);
  };
  const handleDeleteManyPurchases = () => {
    const purchaseIds = checkedPurchases.map((purchase) => purchase._id);
    deletePurchaseMutation.mutate(purchaseIds);
  };

  const handleBuyPruchase = () => {
    if (checkedPurchases.length > 0) {
      const body = checkedPurchases.map((purchase) => ({
        product_id: purchase.product._id,
        buy_count: purchase.buy_count,
      }));
      buyProductMutation.mutate(body);
    }
  };

 return (
  <div className="bg-neutral-100 py-8 sm:py-16">
    <div className="container mx-auto">
      {extendedPurchases.length > 0 ? (
        <>
          <div className="overflow-auto">
            <div className="min-w-full lg:min-w-[1000px]">
              {/* Header - ẩn trên mobile */}
              <div className="hidden sm:grid grid-cols-12 items-center rounded-sm bg-white py-4 px-4 sm:px-9 text-sm capitalize text-gray-500 shadow">
                <div className="col-span-6 flex items-center">
                  <input
                    type="checkbox"
                    className="h-5 w-5 accent-orange mr-3"
                    checked={isAllChecked}
                    onChange={handleCheckAll}
                  />
                  <span className="text-black">Sản phẩm</span>
                </div>
                <div className="col-span-6 grid grid-cols-5 text-center">
                  <div className="col-span-2">Đơn giá</div>
                  <div className="col-span-1">Số lượng</div>
                  <div className="col-span-1">Số tiền</div>
                  <div className="col-span-1">Thao tác</div>
                </div>
              </div>

              {/* Danh sách sản phẩm */}
              <div className="my-3 rounded-sm bg-white p-3 sm:p-5 shadow">
                {extendedPurchases.map((purchase, index) => (
                  <div
                    key={purchase._id}
                    className="mb-5 grid grid-cols-1 sm:grid-cols-12 gap-4 sm:gap-0 items-center rounded-sm border border-gray-200 bg-white py-4 px-3 sm:px-4 text-sm text-gray-700"
                  >
                    {/* Thông tin sản phẩm */}
                    <div className="sm:col-span-6 flex items-start gap-3">
                      <input
                        type="checkbox"
                        className="h-5 w-5 accent-orange mt-2"
                        checked={purchase.checked}
                        onChange={handleCheck(index)}
                      />
                      <Link
                        to={`${path.home}${generateNameId({
                          name: purchase.product.name,
                          id: purchase.product._id,
                        })}`}
                        className="w-20 h-20 flex-shrink-0 border rounded overflow-hidden"
                      >
                        <img
                          alt={purchase.product.name}
                          src={purchase.product.image}
                          className="w-full h-full object-cover"
                        />
                      </Link>
                      <div className="flex-grow">
                        <Link
                          to={`${path.home}${generateNameId({
                            name: purchase.product.name,
                            id: purchase.product._id,
                          })}`}
                          className="line-clamp-2 font-medium text-black"
                        >
                          {purchase.product.name}
                        </Link>
                        {/* Ẩn header, hiện giá trực tiếp trên mobile */}
                        <div className="mt-2 flex sm:hidden flex-wrap gap-2 text-sm">
                          <span className="line-through text-gray-400">
                            ₫{formatCurrency(purchase.product.price_before_discount)}
                          </span>
                          <span className="text-orange font-semibold">
                            ₫{formatCurrency(purchase.product.price)}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Giá - số lượng - thành tiền - thao tác */}
                    <div className="sm:col-span-6 grid grid-cols-2 sm:grid-cols-5 items-center gap-2 sm:gap-0 text-center">
                      <div className="hidden sm:flex col-span-2 justify-center items-center gap-2">
                        <span className="text-gray-400 line-through">
                          ₫{formatCurrency(purchase.product.price_before_discount)}
                        </span>
                        <span>₫{formatCurrency(purchase.product.price)}</span>
                      </div>
                      <div className="col-span-1 flex justify-center">
                        <QuantityController
                          max={purchase.product.quantity}
                          value={purchase.buy_count}
                          classNameWrapper="flex items-center"
                          onIncrease={(value) =>
                            handleQuantity(index, value, value <= purchase.product.quantity)
                          }
                          onDecrease={(value) =>
                            handleQuantity(index, value, value >= 1)
                          }
                          onType={handleTypeQuantity(index)}
                          onFocusOut={(value) =>
                            handleQuantity(
                              index,
                              value,
                              value >= 1 &&
                                value <= purchase.product.quantity &&
                                value !==
                                  (purchasesInCart as Purchase[])[index].buy_count
                            )
                          }
                          disabled={purchase.disabled}
                        />
                      </div>
                      <div className="col-span-1 font-semibold text-orange">
                        ₫{formatCurrency(purchase.product.price * purchase.buy_count)}
                      </div>
                      <div className="col-span-1">
                        <button
                          onClick={handleDelete(index)}
                          className="text-red-500 hover:text-red-600 text-sm"
                        >
                          Xóa
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Thanh toán */}
          <div className="sticky bottom-0 z-10 mt-6 sm:mt-8 flex flex-col sm:flex-row sm:items-center rounded-sm border border-gray-100 bg-white p-4 sm:p-5 shadow gap-4 sm:gap-0">
            <div className="flex items-center">
              <input
                type="checkbox"
                className="h-5 w-5 accent-orange mr-3"
                checked={isAllChecked}
                onChange={handleCheckAll}
              />
              <button className="mx-2" onClick={handleCheckAll}>
                Chọn tất cả ({extendedPurchases.length})
              </button>
              <button
                onClick={handleDeleteManyPurchases}
                className="mx-2 text-red-500 hover:text-red-600"
              >
                Xóa
              </button>
            </div>

            <div className="sm:ml-auto flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
              <div>
                <div className="flex items-center justify-between sm:justify-end">
                  <span>
                    Tổng ({totalCheckedPurchase.count} sản phẩm):
                  </span>
                  <span className="ml-2 text-xl sm:text-2xl text-orange font-semibold">
                    ₫{formatCurrency(totalCheckedPurchase.total)}
                  </span>
                </div>
                <div className="flex items-center text-sm text-gray-500 justify-between sm:justify-end">
                  <span>Tiết kiệm</span>
                  <span className="ml-2 text-orange font-medium">
                    ₫{formatCurrency(totalCheckedPurchaseSavingPrice)}
                  </span>
                </div>
              </div>
              <Button
                onClick={handleBuyPruchase}
                disabled={buyProductMutation.isPending}
                className="flex h-10 w-full sm:w-52 items-center justify-center bg-black text-sm uppercase text-white hover:bg-red-600 rounded"
              >
                Mua hàng
              </Button>
            </div>
          </div>
        </>
      ) : (
        <div className="text-center py-16">
          <div className="text-gray-500 text-lg">
            Giỏ hàng của bạn chưa có sản phẩm
          </div>
          <Link to={path.home} className="mt-6 inline-block">
            <button className="bg-black text-white text-lg px-6 py-3 shadow rounded-2xl hover:bg-gray-600">
              Mua Ngay
            </button>
          </Link>
        </div>
      )}
    </div>
  </div>
);

}
