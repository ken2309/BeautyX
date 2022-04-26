import React, { useContext, useState, KeyboardEvent, useCallback } from "react";
import ButtonCus from "../../../components/ButtonCus/index";
import icon from "../../../constants/icon";
import { AppContext } from "../../../context/AppProvider";
import { useHistory } from "react-router-dom";
import scrollTop from "../../../utils/scrollTop";
import FilterKeywordHome from "../../FilterKeywordHome";
import orgApi from "../../../api/organizationApi";
import servicePromoApi from "../../../api/servicePromoApi";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import _, { debounce } from 'lodash';


function HomeFilter(props: any) {
  const { styleFilter, setData, setOpenFilter, forcusMb, hiddenFilter } = props;
  const { t } = useContext(AppContext);
  const history = useHistory();
  const [searchText, setSearchText] = useState("");
  const [dataSearch, setDataSearch] = useState({
    orgs: [],
    services: []
  })


  async function handleGetOrgsByKeyword(keyword: string) {
    try {
      const res = await orgApi.getOrgByKeyword({
        keyword: keyword,
        page: 1,
        tags: [],
        province: 0,
        price: { min: 0, max: 0 }
      })
      const resSer = await servicePromoApi.getByKeyword({
        page: 1,
        keyword: keyword
      })
      setDataSearch({
        orgs: res.data.context.data,
        services: resSer.data.data.hits
      })
    } catch (error) {
      console.log(error)
    }
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debounceDropDown = useCallback(debounce((nextValue) => handleGetOrgsByKeyword(nextValue), 500), [])

  const handleOnSearchChange = (e: any) => {
    setSearchText(e.target.value);
    const key = e.target.value;
    debounceDropDown(key)
  };


  const searchFunc = () => {
    history.push({
      pathname: "/ket-qua-tim-kiem/",
      search: `${searchText}`,
    });
    if (setData) {
      setData({
        orgs: [],
        loading: false,
        totalItem: 1,
        total: 1,
        curPage: 1
      })
      if (setOpenFilter) {
        setOpenFilter(false);
      }
    }
  };

  const handleSearchClick = () => {
    // history.push(`/Search-result/${searchText}`)
    searchFunc();
    hiddenFilter()
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.code === "Enter" || event?.nativeEvent.keyCode === 13) {
      searchFunc();
      scrollTop();
      hiddenFilter()
    }
  };
  return (
    <div
      style={{
        position: styleFilter?.position,
        width: styleFilter?.width,
        boxShadow: styleFilter?.boxShadow,
        padding: styleFilter?.padding,
        transform: styleFilter?.transform
      }}
      className="home-banner__filter"
    >
      <div className="home__filter-search-box">
        <input
          autoFocus={forcusMb === true ? true : false}
          onKeyDown={handleKeyDown}
          onChange={handleOnSearchChange}
          value={searchText}
          className="input-search"
          type="text"
          placeholder={t("Home.Filter_form_input")}
        />
        <ButtonCus
          disabled={searchText.length === 0 ? true : false}
          onClick={handleSearchClick}
          imgIcon={icon.search}
          backColor="var(--purple)"
          borderRadius="0px 12px 12px 0px"
        />
      </div>
      {
        searchText.length > 0 ?
          <FilterKeywordHome
            dataSearch={dataSearch}
            searchText={searchText}
            hiddenFilter={hiddenFilter}
          />
          :
          <></>
      }
    </div>
  );
}

export default HomeFilter;
