import React, { useContext } from "react";
import SectionTitle from "../../SectionTitle/index";
import icon from "../../../constants/icon";
import Skeleton from "react-loading-skeleton";
import { AppContext } from "../../../context/AppProvider";
import { useDispatch, useSelector } from "react-redux";
import { STATUS } from '../../../redux/status';
import { fetchAsyncProducts, clearProducts } from '../../../redux/org_products/orgProductsSlice'

function ProductCate(props: any) {
  const { t } = useContext(AppContext)
  const { cate_id, setCate_id, org } = props;
  const dispatch = useDispatch();
  const { CATE } = useSelector((state: any) => state.ORG_PRODUCTS);
  const { categories, status } = CATE
  const handleActiveCateClick = (cate: any) => {
    setCate_id(cate.id);
    const values = {
      page: 1,
      cate_id: cate.id,
      org_id: org?.id
    }
    dispatch(clearProducts())
    dispatch(fetchAsyncProducts(values))
  };
  return (
    <div className="ser-category">
      <div className="flex-row">
        <img src={icon.dashboard} alt="" />
        <SectionTitle title={t("Home.Filter_category")} />
      </div>
      <div className="ser-category-box">
        <ul className="ser-category-box__list">
          <li onClick={() => setCate_id(null)} className="ser-category-box__item">
            <div
              style={
                !cate_id
                  ? { color: "var(--purple)" }
                  : { color: "var(--text-hover)" }
              }
              className="flex-row-sp">
              {t("cart.all")}
              <img src={icon.next} alt="" />
            </div>
          </li>
          {status === STATUS.LOADING ? (
            <Skeleton
              count={8}
              style={{
                width: "100%",
                height: "20px",
                margin: "6px 0px",
              }}
            />
          ) : (
            categories.map((item: any) => (
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
