import React, { useContext, useEffect } from "react";
import SectionTitle from "../../SectionTitle/index";
import icon from "../../../constants/icon";
import categoryApi from "../../../api/categoryApi";
import Skeleton from "react-loading-skeleton";
import { AppContext } from "../../../context/AppProvider";

function ProductCate(props: any) {
  const { t } = useContext(AppContext)
  const { mer_id, cate_id, setCate_id, dataCates, setDataCates, dataProducts, setDataProducts } = props;
  const handleActiveCateClick = (cate: any) => {
    setCate_id(cate.id);
    setDataProducts({
      ...dataProducts,
      page: 1
    })
  };
  useEffect(() => {
    async function getCateByOrgId() {
      try {
        const res = await categoryApi.getByOrgId(mer_id);
        setDataCates({
          cates: res.data.context.data,
          loading: false
        })
      } catch (err) {
        setDataCates({
          ...dataCates,
          loading: true
        })
        console.log(err);
      }
    }
    getCateByOrgId();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mer_id]);
  return (
    <div className="ser-category">
      <div className="flex-row">
        <img src={icon.dashboard} alt="" />
        <SectionTitle title={t("Home.Filter_category")} />
      </div>
      <div className="ser-category-box">
        <ul className="ser-category-box__list">
          <li onClick={() => setCate_id(0)} className="ser-category-box__item">
            <div
              style={
                cate_id === 0
                  ? { color: "var(--purple)" }
                  : { color: "var(--text-hover)" }
              }
              className="flex-row-sp">
              Tất cả
              <img src={icon.next} alt="" />
            </div>
          </li>
          {dataCates.loading === true ? (
            <Skeleton
              count={8}
              style={{
                width: "100%",
                height: "20px",
                margin: "6px 0px",
              }}
            />
          ) : (
            dataCates.cates.map((item: any) => (
              <li
                onClick={() => handleActiveCateClick(item)}
                key={item.id}
                className="ser-category-box__item"
              >
                <div
                  style={
                    cate_id === item.id
                      ? { color: "var(--purple)" }
                      : { color: "var(--text-hover)" }
                  }
                  className="flex-row-sp"
                >
                  {item.name}
                  <img src={icon.next} alt="" />
                </div>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
}

export default ProductCate;
