import React from "react";
import ProductItem from "./ProductItem";

function ProductsTab(props: any) {
  const { products, tab_id, org, open } = props;
  return (
    <div
      className="order-list-item__wrap"
      style={tab_id === 1 ? { display: "block" } : { display: "none" }}
    >
      <ul className="order-item-list">
        {products?.map((item: any, index: number) => (
          <ProductItem open={open} key={index} productItem={item} org={org} />
        ))}
      </ul>
    </div>
  );
}

export default ProductsTab;
