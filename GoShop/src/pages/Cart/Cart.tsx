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
import { keyBy } from "lodash";
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
    <div className="bg-neutral-100 py-16">
      <div className="container mx-auto">
        {extendedPurchases.length > 0 ? (
          <>
            <div className="overflow-auto">
              <div className="min-w-[1000px]">
                {/* Header */}
                <div className="grid grid-cols-12 items-center rounded-sm bg-white py-5 px-9 text-sm capitalize text-gray-500 shadow">
                  <div className="col-span-6">
                    <div className="flex items-center">
                      <div className="flex items-center justify-center pr-3">
                        <input
                          type="checkbox"
                          className="h-5 w-5 accent-orange"
                          checked={isAllChecked}
                          onChange={handleCheckAll}
                        />
                      </div>
                      <div className="flex-grow text-black">Sản phẩm</div>
                    </div>
                  </div>
                  <div className="col-span-6">
                    <div className="grid grid-cols-5 text-center">
                      <div className="col-span-2">Đơn giá</div>
                      <div className="col-span-1">Số lượng</div>
                      <div className="col-span-1">Số tiền</div>
                      <div className="col-span-1">Thao tác</div>
                    </div>
                  </div>
                </div>

                {/* Danh sách sản phẩm */}
                {extendedPurchases.length > 0 && (
                  <div className="my-3 rounded-sm bg-white p-5 shadow">
                    {extendedPurchases.map((purchase, index) => (
                      <div
                        key={purchase._id}
                        className="mb-5 grid grid-cols-12 items-center rounded-sm border border-gray-200 bg-white py-5 px-4 text-center text-sm text-gray-500 first:mt-0"
                      >
                        <div className="col-span-6">
                          <div className="flex">
                            <div className="flex flex-shrink-0 items-center justify-center pr-3">
                              <input
                                type="checkbox"
                                className="h-5 w-5 accent-orange"
                                checked={purchase.checked}
                                onChange={handleCheck(index)}
                              />
                            </div>
                            <div className="flex-grow">
                              <div className="flex">
                                <Link
                                  className="h-20 w-20 flex-shrink-0"
                                  to={`${path.home}${generateNameId({
                                    name: purchase.product.name,
                                    id: purchase.product._id,
                                  })}`}
                                >
                                  <img
                                    alt={purchase.product.name}
                                    src={purchase.product.image}
                                  />
                                </Link>
                                <div className="flex-grow px-2 pt-1 pb-2">
                                  <Link
                                    to={`${path.home}${generateNameId({
                                      name: purchase.product.name,
                                      id: purchase.product._id,
                                    })}`}
                                    className="line-clamp-2"
                                  >
                                    {purchase.product.name}
                                  </Link>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Giá - số lượng - thành tiền - thao tác */}
                        <div className="col-span-6">
                          <div className="grid grid-cols-5 items-center">
                            <div className="col-span-2">
                              <div className="flex items-center justify-center">
                                <span className="text-gray-300 line-through">
                                  ₫
                                  {formatCurrency(
                                    purchase.product.price_before_discount
                                  )}
                                </span>
                                <span className="ml-3">
                                  ₫{formatCurrency(purchase.product.price)}
                                </span>
                              </div>
                            </div>
                            <div className="col-span-1">
                              <QuantityController
                                max={purchase.product.quantity}
                                value={purchase.buy_count}
                                classNameWrapper="flex items-center"
                                onIncrease={(value) =>
                                  handleQuantity(
                                    index,
                                    value,
                                    value <= purchase.product.quantity
                                  )
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
                                        (purchasesInCart as Purchase[])[index]
                                          .buy_count
                                  )
                                }
                                disabled={purchase.disabled}
                              />
                            </div>
                            <div className="col-span-1">
                              <span className="text-orange">
                                ₫
                                {formatCurrency(
                                  purchase.product.price * purchase.buy_count
                                )}
                              </span>
                            </div>
                            <div className="col-span-1">
                              <button
                                onClick={handleDelete(index)}
                                className="bg-none text-black transition-colors cursor-pointer hover:text-red-400"
                              >
                                Xóa
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div className="sticky bottom-0 z-10 mt-8 flex flex-col rounded-sm border border-gray-100 bg-white p-5 shadow sm:flex-row sm:items-center">
              <div className="flex items-center">
                <div className="flex flex-shrink-0 items-center justify-center pr-3">
                  <input
                    type="checkbox"
                    className="h-5 w-5 accent-orange"
                    checked={isAllChecked}
                    onChange={handleCheckAll}
                  />
                </div>
                <button
                  className="mx-3 border-none bg-none"
                  onClick={handleCheckAll}
                >
                  Chọn tất cả ({extendedPurchases.length})
                </button>
                <button
                  onClick={handleDeleteManyPurchases}
                  className="mx-3 border-none bg-none cursor-pointer hover:text-red-400"
                >
                  Xóa
                </button>
              </div>

              <div className="mt-5 flex flex-col sm:ml-auto sm:mt-0 sm:flex-row sm:items-center">
                <div>
                  <div className="flex items-center sm:justify-end">
                    <div>
                      Tổng thanh toán ({totalCheckedPurchase.count} sản phẩm):
                    </div>
                    <div className="ml-2 text-2xl text-orange">
                      ₫{formatCurrency(totalCheckedPurchase.total)}
                    </div>
                  </div>
                  <div className="flex items-center text-sm sm:justify-end">
                    <div className="text-gray-500">Tiết kiệm</div>
                    <div className="ml-6 text-orange">
                      ₫{formatCurrency(totalCheckedPurchaseSavingPrice)}
                    </div>
                  </div>
                </div>
                <Button
                  onClick={handleBuyPruchase}
                  disabled={buyProductMutation.isPending}
                  className="mt-5 flex h-10 w-52 items-center justify-center bg-red-500 text-sm uppercase text-white hover:bg-red-600 sm:ml-4 sm:mt-0"
                >
                  Mua hàng
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div>
            <div className="my-10 text-center text-gray-500 text-lg">
              Giỏ hàng của bạn chưa có sản phẩm
            </div>
            <Link to={path.home} className="mx-auto mt-5 flex w-max">
              <button className="bg-orange-500 text-white text-xl cursor-pointer px-2 py-2 shadow rounded-2xl hover:bg-orange-600">
                Mua Ngay
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
