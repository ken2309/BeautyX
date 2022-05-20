import React, { useContext, useEffect, useState } from 'react';
import Head from '../Head';
import HeadTitle from '../HeadTitle';
import { useLocation } from 'react-router-dom'
import { AppContext } from '../../context/AppProvider';
import './search-results.css';
import { Container } from '@mui/material';
import FilterOrgs from '../FilterOrgs';
import TabService from './components/TabService';
import Footer from '../Footer';
import TabOrgs from './components/TabOrgs';
import TabLocation from './components/TabLocation';
import orgApi from '../../api/organizationApi';
import icon from '../../constants/icon';
import { Drawer } from '@mui/material'

interface ITabs {
    id: number,
    title: string,
    count: number
}

function SearchResults(props: any) {
    const { t } = useContext(AppContext)
    const location = useLocation();
    const searchKey = decodeURI(location.search.slice(1, location.search.length));
    const [tabs, setTabs] = useState<ITabs[]>([]);
    const [acTab, setAcTab] = useState(0);
    const [openFilter, setOpenFilter] = useState(false);
    const onActiveTab = (tab: any) => {
        setAcTab(tab.id)
    }
    const [itemCount, setItemCount] = useState({
        servicesCount: 0,
        orgsCount: 0
    })
    //filter for org
    const [data, setData] = useState({
        orgs: [],
        page: 1,
        lastPage: 1
    })
    const [orgFilter, setOrgFilter] = useState({
        tags: [],
        province_code: 0,
        min_price: 0,
        max_price: 0
    })
    async function handleOrgsByKeyword() {
        try {
            const res = await orgApi.getOrgByKeyword({
                keyword: searchKey,
                page: data.page,
                tags: orgFilter.tags.join("|"),
                province: orgFilter.province_code,
                price: {
                    min: orgFilter.min_price,
                    max: orgFilter.max_price
                }
            })
            setData({
                ...data,
                orgs: res.data.context.data,
                lastPage: res.data.context.last_page
            })
            setItemCount({ ...itemCount, orgsCount: res.data.context.total })
        } catch (error) {
            console.log(error)
        }
    }
    //
    useEffect(() => {
        const tags = [
            { id: 1, title: t("Mer_de.services"), count: itemCount.servicesCount },
            { id: 2, title: t("Mer_de.products"), count: itemCount.servicesCount },
            { id: 3, title: t("my_ser.business"), count: itemCount.orgsCount },
            { id: 4, title: t("Home.Filter_location"), count: itemCount.orgsCount },
        ]
        const tagsSort = tags.sort((a: any, b: any) => b.count - a.count);
        setTabs(tagsSort)
        setAcTab(tagsSort[0].id)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [itemCount])
    return (
        <>
            <HeadTitle title={`${t("Search_result.text_result")} : ${searchKey}`} />
            <Head />
            <Container>
                <div className="se-re-cnt">
                    <div className="se-re-cnt__left">
                        <div className="se-re-cnt__left-top">
                            <ul className="se-re-cnt__left-list">
                                {
                                    tabs.map(item => (
                                        <li
                                            style={acTab === item.id ?
                                                { backgroundColor: 'var(--purple)', color: 'var(--bgWhite)' } : {}
                                            }
                                            onClick={() => onActiveTab(item)}
                                            key={item.id}
                                        >
                                            {item.title}
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>
                        {
                            acTab === 3 ?
                                <>
                                    <FilterOrgs
                                        orgFilter={orgFilter}
                                        setOrgFilter={setOrgFilter}
                                        setData={setData}
                                        handleOrgsByKeyword={handleOrgsByKeyword}
                                    />
                                    <div className="home-result-org-cnt__mb">
                                        <div className="flex-row-sp cnt">
                                            <span className="title">Bộ lọc tìm kiếm</span>
                                            <button onClick={() => setOpenFilter(true)} className="filter-btn">
                                                <img src={icon.filter} alt="" />
                                            </button>
                                            <Drawer
                                                anchor='right'
                                                open={openFilter}
                                                onClose={() => setOpenFilter(false)}
                                            >
                                                <FilterOrgs
                                                    orgFilter={orgFilter}
                                                    setOrgFilter={setOrgFilter}
                                                    setData={setData}
                                                    handleOrgsByKeyword={handleOrgsByKeyword}
                                                    setOpenFilter={setOpenFilter}
                                                />
                                            </Drawer>
                                        </div>
                                    </div>
                                </>
                                :
                                <></>
                        }
                    </div>
                    <div className="se-re-cnt__right">
                        <span className="se-re-cnt-title">
                            {t("se.search_results_for_keyword")} : "{searchKey}"
                        </span>
                        <TabService
                            keyword={searchKey}
                            acTab={acTab}
                            itemCount={itemCount}
                            setItemCount={setItemCount}
                        />
                        <TabOrgs
                            orgFilter={orgFilter}
                            keyword={searchKey}
                            acTab={acTab}
                            data={data}
                            setData={setData}
                            handleOrgsByKeyword={handleOrgsByKeyword}
                        />
                        <TabLocation
                            acTab={acTab}
                            searchKey={searchKey}
                        />
                    </div>
                </div>
            </Container>
            <Footer />
        </>
    );
}

export default SearchResults;