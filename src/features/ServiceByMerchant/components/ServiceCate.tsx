import React, { useContext } from "react";
import SectionTitle from "../../SectionTitle/index";
import icon from "../../../constants/icon";
import Skeleton from "react-loading-skeleton";
import { AppContext } from "../../../context/AppProvider";
import { useSelector, useDispatch } from "react-redux";
import { STATUS } from '../../../redux/status';
import { fetchAsyncServices, clearServices } from '../../../redux/org_services/orgServivesSlice'

function ServiceCate(props: any) {
  const { t } = useContext(AppContext)
  const { chooseCate, setChooseCate } = props;
  const dispatch = useDispatch();
  const ORG = useSelector((state: any) => state.ORG);
  const { org } = ORG;
  const { categories, status } = useSelector((state: any) => state.ORG_SERVICES.CATE);
  const allCate = () => {
    dispatch(clearServices());
    const values = {
      cate_id: undefined,
      org_id: org?.id,
      page: 1
    }
    dispatch(fetchAsyncServices(values))
    setChooseCate(undefined);
  };
  const handleActiveCateClick = (cate: any) => {
    dispatch(clearServices());
    const values = {
      cate_id: cate.id,
      org_id: org?.id,
      page: 1
    }
    dispatch(fetchAsyncServices(values))
    setChooseCate(cate.id);
  };
  return (
    <div className="ser-category">
      <div className="flex-row">
        <img src={icon.dashboard} alt="" />
        <SectionTitle title={t("Home.Filter_category")} />
      </div>
      <div className="ser-category-box">
        <ul className="ser-category-box__list">
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
              {categories.map((item: any) => (
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
