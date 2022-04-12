import React, { useState } from "react";
import { Pagination } from "@mui/material";
import { Service } from "../../../interface/service";
import GridLoading from "../../Loading/GridLoading";
import scrollTop_2 from "../../../utils/scrollTop_2";
import InputSearch from "./InputSearch";
import ServiceItem from "../../ViewItemCommon/ServiceItem";

interface ActiveFilter {
  id: number;
  title: string;
}
function ServiceList(props: any) {
  const {
    t,
    mer_id,
    org,
    //services,
    //setServices,
    //totalPage,
    //setPage,
    //loading,
    dataServices, setDataServices
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
    setDataServices({
      ...dataServices,
      page: value
    })
    scrollTop_2(500);
  };
  return (
    <div className="ser-list">
      <div className="flex-row-sp list-filter">
        <div className="flex-row list-filter__left">
          <span>Sắp xếp theo:</span>
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
          <InputSearch
            mer_id={mer_id}
            dataServices={dataServices}
            setDataServices={setDataServices}
          />
        </div>
      </div>
      <div className="flex-column ser-list__content">
        <ul className="ser-list__content-list">
          {dataServices.loading === true ? (
            <GridLoading />
          ) : (
            dataServices.services.map((item: Service) => (
              <li key={item.id} className="ser-list__content-list-item">
                <ServiceItem
                  service={item}
                  org={org}
                />
              </li>
            ))
          )}
        </ul>
        <Pagination
          color="secondary"
          shape="rounded"
          count={dataServices.page_count}
          onChange={pageChange}
        />
      </div>
    </div>
  );
}

export default ServiceList;
