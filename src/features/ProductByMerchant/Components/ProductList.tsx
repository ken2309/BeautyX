import React, { useContext, useState } from "react";
import ProductItem from "../../ViewItemCommon/ProductItem";
import { Product } from '../../../interface/product'
import { AppContext } from "../../../context/AppProvider";
import { useDispatch, useSelector } from "react-redux";
import ButtonLoading from "../../../components/ButtonLoading";
import { fetchAsyncProducts } from '../../../redux/org_products/orgProductsSlice'

interface ActiveFilter {
  id: number;
  title: string;
}
function ProductList(props: any) {
  const { t } = useContext(AppContext)
  const {
    org,
    cate_id,
  } = props;
  const dispatch = useDispatch();
  const { PRODUCTS } = useSelector((state: any) => state.ORG_PRODUCTS);
  const { products, page, totalItem } = PRODUCTS
  const buttons = [
    { id: 1, title: t("Mer_de.popular") },
    { id: 2, title: t("Mer_de.selling") },
    { id: 3, title: t("Mer_de.ascending_price") },
    { id: 4, title: t("Mer_de.decrease_price") },
  ];
  const [activeFilter, setActiveFilter] = useState<ActiveFilter>({
    id: 0,
    title: "",
  });
  const handleActiveFilter = (item: any) => {
    setActiveFilter(item);
    if (item.id === 1) {
      console.log("Phổ biến");
    } else if (item.id === 2) {
      console.log("Bán chạy");
    } else if (item.id === 3) {
      console.log("Giá thấp");
      // ascPrice();
    } else if (item.id === 4) {
      console.log("Giá cao");

      // descPrice();
    }
  };
  const pageChange = () => {
    const values = {
      page: page + 1,
      cate_id: cate_id,
      org_id: org?.id
    }
    dispatch(fetchAsyncProducts(values))
  };
  return (
    <div className="ser-list">
      <div className="flex-row-sp list-filter">
        <div className="flex-row list-filter__left">
          <span>{t("Mer_de.sort_by")}:</span>
          <div className="ser-sort__wrap">
            {buttons.map((item) => (
              <button
                style={
                  activeFilter.id === item.id
                    ? {
                      backgroundColor: "var(--purple)",
                      color: "var(--bg-gray)",
                    }
                    : {}
                }
                onClick={() => handleActiveFilter(item)}
                key={item.id}
              >
                {item.title}
              </button>
            ))}
          </div>
        </div>
        {/* <div className="flex-row list-filter__right">
          <InputProByMerSearch org_id={org?.id} setDataProducts={setDataProducts} />
        </div> */}
      </div>
      <div className="flex-column ser-list__content">
        <ul className="ser-list__content-list">
          {
            products.map((item: Product, index: number) => (
              <li
                key={index}
                className="ser-list__content-list-item"
              >
                <ProductItem
                  product={item}
                  org={org}
                />
              </li>
            ))
          }
        </ul>
        {
          products.length < totalItem &&
          <ButtonLoading
            loading={false}
            title="Xem thêm"
            onClick={pageChange}
          />
        }
      </div>
    </div>
  );
}

export default ProductList;
