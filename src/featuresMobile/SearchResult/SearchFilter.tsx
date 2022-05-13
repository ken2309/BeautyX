/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useState, useCallback, KeyboardEvent } from "react";
import { Slide, Dialog } from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import BackButton from '../../components/BackButton';
import icon from '../../constants/icon';
import ButtonCus from '../../components/ButtonCus';
import { AppContext } from '../../context/AppProvider';
import orgApi from '../../api/organizationApi';
import servicePromoApi from '../../api/servicePromoApi';
import { useHistory } from 'react-router-dom'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import _, { debounce } from 'lodash';
import SectionOrgs from "../../features/FilterKeywordHome/components/SectionOrgs";
import SectionServices from "../../features/FilterKeywordHome/components/SectionServices";

const Transition = React.forwardRef(function Transition(
      props: TransitionProps & {
            children: React.ReactElement;
      },
      ref: React.Ref<unknown>,
) {
      return <Slide direction="left" ref={ref} {...props} />;
});

function SearchFilter(props: any) {
      const { openSearch, setOpenSearch } = props;
      const { t } = useContext(AppContext)
      const history = useHistory();
      const [text, setText] = useState('');
      const [data, setData] = useState({
            orgs: [],
            services: []
      })
      async function handleGetOrgsByKeyword(text: string) {
            try {
                  const res = await orgApi.getOrgByKeyword({
                        keyword: text,
                        page: 1,
                        tags: [],
                        province: 0,
                        price: { min: 0, max: 0 }
                  })
                  const resSer = await servicePromoApi.getByKeyword({
                        page: 1,
                        keyword: text
                  })
                  setData({
                        orgs: res.data.context.data,
                        services: resSer.data.data.hits
                  })
            } catch (error) {
                  console.log(error)
            }
      }
      const debounceDropDown = useCallback(debounce((nextValue) => handleGetOrgsByKeyword(nextValue), 500), [])

      const handleOnSearchChange = (e: any) => {
            setText(e.target.value);
            const key = e.target.value;
            debounceDropDown(key)
      };
      const searchFunc = () => {
            setOpenSearch(false)
            if (text.length > 0) {
                  history.push({
                        pathname: "/ket-qua-tim-kiem/",
                        search: `${text}`,
                  });
            }
      };
      const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
            if (event.code === "Enter" || event?.nativeEvent.keyCode === 13) {
                  searchFunc();
            }
      };
      return (
            <Dialog
                  fullScreen
                  open={
                        !openSearch ? false : openSearch}
                  TransitionComponent={Transition}
            >
                  <div className="mb-filter">
                        <BackButton
                              setOpenFilter={setOpenSearch}
                        />
                        <div className="home__filter-search-box mb-se-ip__cnt">
                              <input
                                    autoFocus={true}
                                    onKeyDown={handleKeyDown}
                                    onChange={handleOnSearchChange}
                                    value={text}
                                    className="input-search"
                                    type="text"
                                    placeholder={t("Home.Filter_form_input")}
                              />
                              <ButtonCus
                                    disabled={text.length === 0 ? true : false}
                                    onClick={searchFunc}
                                    imgIcon={icon.search}
                                    backColor="var(--purple)"
                                    borderRadius="0px 12px 12px 0px"
                              />
                        </div>
                        {
                              text.length > 0 ?
                                    <div
                                          style={{ padding: '20px' }}
                                          className="mb-se-re__cnt"
                                    >
                                          {
                                                data.orgs.length > 0 &&
                                                <SectionOrgs
                                                      orgs={data.orgs}
                                                      setOpenSearch={setOpenSearch}
                                                />
                                          }
                                          {
                                                data.services.length > 0 &&
                                                <SectionServices
                                                      services={data.services}
                                                      setOpenSearch={setOpenSearch}
                                                />
                                          }
                                    </div>
                                    :
                                    <></>
                        }
                  </div>
            </Dialog>
      );
}

export default SearchFilter;
