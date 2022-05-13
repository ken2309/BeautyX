import React, { useContext, useEffect, useState } from "react";
import "./searchResult.css";
import { useLocation } from "react-router-dom";
import Result from "./components/Result";
import MapWrapper from "./components/MapWrapper";
import { Container } from "@mui/material";
import Footer from "../Footer/index";
import { IOrganization } from "../../interface/organization";
import orgApi from "../../api/organizationApi";
import { AppContext } from "../../context/AppProvider";
import Head from "../Head";
import Bottom from "../../featuresMobile/Bottom";
import HeadTitle from "../HeadTitle";
// import img from '../../constants/img';

interface IData {
  orgs: IOrganization[],
  loading: boolean,
  totalItem: number,
  total: number,
  curPage: number
}

function SearchResult(props: any) {
  const { t } = useContext(AppContext);
  const location = useLocation();
  const [chooseItem, setChooseItem] = useState();
  const params = location.search.slice(8, location.search.length);
  const keySearch = decodeURI(params);
  const [data, setData] = useState<IData>({
    orgs: [],
    loading: false,
    totalItem: 1,
    total: 1,
    curPage: 1
  })

  const paramsFilter = location.state;
  async function handleGetOrgs() {
    setData({ ...data, loading: true })
    try {
      const res = await orgApi.getOrgByKeyword({
        page: data.curPage,
        keySearch: keySearch,
      });
      setData({
        ...data,
        orgs: res.data.context.data,
        totalItem: res.data.context.last_page,
        total: res.data.context.total,
        loading: false
      })
    } catch (err) {
      console.log(err);
    }
  }

  async function handleGetOrgsByFilter() {
    try {
      const res = await orgApi.getOrgByFilter({
        page: 1,
        limit: 15,
        params: paramsFilter
      })
      setData({
        ...data,
        orgs: res.data.context.data,
        totalItem: res.data.context.last_page,
        total: res.data.context.total,
        loading: false
      })
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (paramsFilter) {
      handleGetOrgsByFilter();
    } else {
      handleGetOrgs()
    }
    //handleGetOrgs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keySearch, data.curPage]);
  return (
    <div
      style={{
        backgroundColor: "var(--bg-gray)",
      }}
    >
      <HeadTitle title={`${t("Search_result.text_result")} : ${keySearch}`} />
      <Head />
      <Container className="result-section_map">
        {
          // orgs.length === 0 ?
          //       <div className="flex-column result-null">
          //             <span className="result-null__title">
          //                   {t('Search_result.no_result_title')}
          //             </span>
          //             <span className="result-null__text">
          //                  {t('Search_result.sorry')}
          //             </span>
          //             <img src={img.resultNull} alt="" />
          //       </div>
          //       :
          <div className="result-content">
            <Result
              t={t}
              keySearch={keySearch}
              data={data}
              setData={setData}
              //totalItem={totalItem}
              //setCurPage={setCurPage}
              //resultList={orgs}
              setChooseItem={setChooseItem}
            //loading={loading}
            //total={total}
            />
            <MapWrapper chooseItem={chooseItem} width="50%" />
          </div>
        }
      </Container>
      <Footer />
      <Bottom />
    </div>
  );
}

export default SearchResult;
