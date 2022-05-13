import React from "react";
//import HomeFilter from "../../Home/components/HomeFilter";
import icon from "../../../constants/icon";
import "../../Home/home.css";
import { Pagination } from "@mui/material";
//import Loading from '../loading/Loading';
import SearchLoading from "../../Loading/SearchLoading";
import ResultItem from "./ResultItem";
import SearchResultMb from "../../../featuresMobile/SearchResult/SearchResultMb";
import scrollTop from "../../../utils/scrollTop";

function Result(props: any) {
  const {
    t,
    keySearch,
    setChooseItem,
    data,
    setData
  } = props;
  const serviceOfCardOrg = [
    { title: t("Search_result.parking"), text: "100m2", icon: icon.car },
    { title: t("Search_result.bed"), text: "80", icon: icon.bed },
    { title: t("Search_result.room"), text: "190", icon: icon.door },
    { title: t("Search_result.capacity"), text: "106 người", icon: icon.car },
  ];
  //const history = useHistory();
  // const handleChooseItem = (item: any) => {
  //       setChooseItem(item);
  // }
  // const gotoDetail = (org: any) => {
  //       history.push({
  //             pathname: `/Merchant-detail/${slugify(org.name)}`,
  //             search: `${org.id}`,
  //             state: org
  //       })
  //       scrollTop();
  // }
  const pageChange = (event: any, value: any) => {
    scrollTop();
    //setCurPage(value);
    setData({
      ...data,
      curPage: value
    })
  };
  return (
    <div className="result-detail">
      {/* <div className="result-detail__filter">
        <HomeFilter setData={setData} />
      </div> */}
      <SearchResultMb setData={setData} />
      <div className="result-detail__title">
        <div className="result-detail__result">
          <h3>{keySearch.length > 0 ? keySearch : ""}</h3>
          <span className="result-detail__result-total">
            <span>{data.total}</span> {t("Search_result.text_result")}
          </span>
        </div>
        <div className="result-detail__path">
          <span>{t("Search_result.text_home")}</span>
          <img src={icon.Expand_right_2} alt="" />
          <span>{t("Search_result.text_search")}</span>
          <img src={icon.Expand_right_2} alt="" />
          <span>Tp. Hồ Chí Minh</span>
          <img src={icon.Expand_right_2} alt="" />
          <span>Quận 3</span>
        </div>
      </div>
      <ul className="result-detail__org">
        {data.loading === true ? (
          <>
            <SearchLoading />
          </>
        ) : (
          data.orgs.map((item: any) => (
            <ResultItem
              key={item.id}
              item={item}
              setChooseItem={setChooseItem}
              serviceOfCardOrg={serviceOfCardOrg}
              resultList={data.orgs}
            />
          ))
        )}
      </ul>
      <Pagination
        color="secondary"
        shape="rounded"
        count={data.totalItem}
        onChange={pageChange}
      />
    </div>
  );
}

export default Result;
