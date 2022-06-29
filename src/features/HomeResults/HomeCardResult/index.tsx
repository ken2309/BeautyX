import React, { useEffect, useState } from 'react';
import Head from '../../Head';
import { useLocation } from 'react-router-dom';
import { IOrganization } from '../../../interface/organization';
import orgApi from '../../../api/organizationApi';
import '../../SearchResults/search-results.css';
import { Container, Drawer } from '@mui/material';
import FilterOrgs from '../../FilterOrgs';
import OrgItem from '../../ViewItemCommon/OrgItem';
import icon from '../../../constants/icon';
import InfiniteScroll from 'react-infinite-scroll-component';
import HeadMobile from '../../HeadMobile';
import useFullScreen from '../../../utils/useFullScreen';
import BackTopButton from '../../../components/BackTopButton';
import Footer from '../../Footer';

interface IData {
    orgs: IOrganization[],
    page: number,
    totalItem: number
}

function HomeCardResult() {
    const location = useLocation();
    const IS_MB = useFullScreen();
    const KEY = parseInt(location.search.slice(1, location.search.length));
    const [openFilter, setOpenFilter] = useState(false);
    let hideProvinces;
    if (KEY === 3) {
        hideProvinces = true
    }

    const [orgFilter, setOrgFilter] = useState({
        tags: [],
        province_code: 0,
        min_price: 0,
        max_price: 0
    })
    const [data, setData] = useState<IData>({
        orgs: [],
        page: 1,
        totalItem: 1
    })
    const handleGetOrgsDealLocation = async () => {
        try {
            const res = await orgApi.getOrgsByManyDealHot({
                page: data.page,
                limit: 15,
                province_code: orgFilter.province_code,
                tags: orgFilter.tags.join('|'),
                price: { min: orgFilter.min_price, max: orgFilter.max_price }
            });
            setData({
                ...data,
                orgs: [...data.orgs, ...res.data.context.data],
                totalItem: res.data.context.total
            })
        } catch (error) {
            console.log(error)
        }
    }
    const handleGetOrgsDistance = async () => {
        try {
            const res = await orgApi.getOrgsByDistance({
                page: data.page,
                limit: 15,
                tags: orgFilter.tags.join('|'),
                price: { min: orgFilter.min_price, max: orgFilter.max_price }
            });
            setData({
                ...data,
                orgs: [...data.orgs, ...res.data.context.data],
                totalItem: res.data.context.total
            })
        } catch (error) {
            console.log(error)
        }
    }
    const handleGetOrgsByTrust = async () => {
        try {
            const res = await orgApi.getOrgsByTrust({
                page: data.page,
                limit: 15,
                province_code: orgFilter.province_code,
                tags: orgFilter.tags.join('|'),
                price: { min: orgFilter.min_price, max: orgFilter.max_price }
            });
            setData({
                ...data,
                orgs: [...data.orgs, ...res.data.context.data],
                totalItem: res.data.context.total
            })
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        if (KEY === 1) {
            handleGetOrgsDealLocation()
        } else if (KEY === 2) {
            handleGetOrgsByTrust()
        } else if (KEY === 3) {
            handleGetOrgsDistance()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [orgFilter.province_code, orgFilter.tags, data.page])

    const onViewMore = () => {
        if (data.orgs.length >= 15 && data.orgs.length < data.totalItem) {
            setData({
                ...data,
                page: data.page + 1
            })
        }
    }

    return (
        <>
            {
                IS_MB ?
                    <HeadMobile
                        title=''
                        element={<button onClick={() => setOpenFilter(true)} className="filter-btn">
                            <img src={icon.filter} alt="" />
                        </button>}
                    />
                    :
                    <Head />
            }
            <Container>
                <div className="se-re-cnt">
                    <div className="se-re-cnt__left">
                        <FilterOrgs
                            // props hide sort
                            hideProvinces={hideProvinces}
                            //
                            orgFilter={orgFilter}
                            setOrgFilter={setOrgFilter}
                            setData={setData}

                            handleGetOrgsDealLocation={handleGetOrgsDealLocation}
                            handleGetOrgsDistance={handleGetOrgsDistance}
                            handleGetOrgsByTrust={handleGetOrgsByTrust}
                        />
                    </div>
                    <div className="home-result-org-cnt__mb">
                        <div className="flex-row-sp cnt">
                            <Drawer
                                anchor='right'
                                open={openFilter}
                                onClose={() => setOpenFilter(false)}
                            >
                                <FilterOrgs
                                    // props hide sort
                                    hideProvinces={hideProvinces}
                                    //
                                    orgFilter={orgFilter}
                                    setOrgFilter={setOrgFilter}
                                    setData={setData}
                                    handleGetOrgsDealLocation={handleGetOrgsDealLocation}
                                    handleGetOrgsDistance={handleGetOrgsDistance}
                                    handleGetOrgsByTrust={handleGetOrgsByTrust}
                                    setOpenFilter={setOpenFilter}
                                />
                            </Drawer>
                        </div>
                    </div>
                    <div className="se-re-cnt__right">
                        <InfiniteScroll
                            hasMore={true}
                            dataLength={data.orgs.length}
                            loader={<></>}
                            next={onViewMore}
                        >
                            <ul className="re-ser-list">
                                {
                                    data.orgs.map((item: IOrganization, index: number) => (
                                        <li
                                            key={index}
                                        >
                                            <OrgItem
                                                org={item}
                                            />
                                        </li>
                                    ))
                                }
                            </ul>
                        </InfiniteScroll>
                    </div>
                </div>
            </Container>
            <BackTopButton />
            <Footer />
        </>
    );
}

export default HomeCardResult;