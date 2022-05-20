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

interface IData {
    orgs: IOrganization[],
    page: number,
    totalItem: number
}

function HomeCardResult() {
    const location = useLocation();
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
                orgs: res.data.context.data,
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
                orgs: res.data.context.data,
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
                orgs: res.data.context.data,
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
    }, [orgFilter.province_code, orgFilter.tags])
    return (
        <>
            <Head />
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
                    </div>
                </div>
            </Container>
        </>
    );
}

export default HomeCardResult;