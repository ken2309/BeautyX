import React, { useContext } from "react";
import SectionTitle from "../../SectionTitle/index";
import icon from "../../../constants/icon";
import Skeleton from "react-loading-skeleton";
import { AppContext } from "../../../context/AppProvider";

function ServiceCate(props: any) {
  const { t } = useContext(AppContext)
  const { dataCates, chooseCate, setChooseCate, dataServices, setDataServices } =
    props;
  const allCate = () => {
    setChooseCate();
    setDataServices({
      ...dataServices, page: 1
    })
  };
  const handleActiveCateClick = (cate: any) => {
    setChooseCate(cate.id);
    setDataServices({
      ...dataServices, page: 1
    })
  };
  return (
    <div className="ser-category">
      <div className="flex-row">
        <img src={icon.dashboard} alt="" />
        <SectionTitle title={t("Home.Filter_category")} />
      </div>
      <div className="ser-category-box">
        <ul className="ser-category-box__list">
          {dataCates.loadingCate === true ? (
            <Skeleton
              count={8}
              style={{
                width: "100%",
                height: "20px",
                margin: "6px 0px",
              }}
            />
          ) : (
            <>
              <li onClick={allCate} className="ser-category-box__item">
                <div
                  style={
                    !chooseCate
                      ? { color: "var(--purple)" }
                      : { color: "var(--text-hover)" }
                  }
                  className="flex-row-sp"
                >
                  Tất cả
                  <img src={icon.next} alt="" />
                </div>
              </li>
              {dataCates.cates.map((item: any) => (
                <li
                  onClick={() => handleActiveCateClick(item)}
                  key={item.id}
                  className="ser-category-box__item"
                >
                  <div
                    style={
                      chooseCate === item.id
                        ? { color: "var(--purple)" }
                        : { color: "var(--text-hover)" }
                    }
                    className="flex-row-sp"
                  >
                    {item.name}
                    <img src={icon.next} alt="" />
                  </div>
                </li>
              ))}
            </>
          )}
        </ul>
      </div>
    </div>
  );
}

export default ServiceCate;
