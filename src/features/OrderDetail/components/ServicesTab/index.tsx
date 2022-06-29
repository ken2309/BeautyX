import React from "react";
import { useSelector } from "react-redux";
import ServiceItem from "./ServiceItem";

function ServicesTab(props: any) {
  const { services, tab_id, org, open } = props;
  const { discounts } = useSelector((state: any) => state.HOME.DISCOUNTS);

  const itemsDiscount = discounts
    .filter((i: any) => i.discount_type === "PRODUCT")
    .map((val: any) => val.items).flat();
  const itemsDiscountOrg = itemsDiscount.filter((i: any) => i.organization_id === org?.id);
  return (
    <div
      className="order-list-item__wrap"
      style={tab_id === 2 ? { display: "block" } : { display: "none" }}
    >
      <ul className="order-item-list">
        {services?.map((item: any, index: number) => (
          <ServiceItem
            itemsDiscountOrg={itemsDiscountOrg}
            open={open}
            key={index}
            serviceItem={item}
            org={org}
          />
        ))}
      </ul>
    </div>
  );
}

export default ServicesTab;
