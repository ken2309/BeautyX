import React, { useContext, useState } from "react";
import { Pagination } from "@mui/material";
import scrollTop_2 from "../../../utils/scrollTop_2";
import InputProByMerSearch from "./InputProByMerSearch";
import ProductItem from "../../ViewItemCommon/ProductItem";
import { Product } from '../../../interface/product'
import { AppContext } from "../../../context/AppProvider";

interface ActiveFilter {
  id: number;
  title: string;
}
function ProductList(props: any) {
  const { t } = useContext(AppContext)
  const {
    //t,
    //products,
    //setPage,
    //loading,
    //pageLength,
    org,
    mer_id,
    //setProducts,
    dataProducts, setDataProducts
  } = props;
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
  const pageChange = (event: any, value: any) => {
    setDataProducts({
      ...dataProducts,
      page: value
    })
    scrollTop_2(500);
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
        <div className="flex-row list-filter__right">
          <InputProByMerSearch mer_id={mer_id} setDataProducts={setDataProducts} />
        </div>
      </div>
      <div className="flex-column ser-list__content">
        <ul className="ser-list__content-list">
          {
            dataProducts.products.map((item: Product, index: number) => (
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
        <Pagination
          color="secondary"
          shape="rounded"
          count={dataProducts.page_count}
          onChange={pageChange}
        />
      </div>
    </div>
  );
}

export default ProductList;
