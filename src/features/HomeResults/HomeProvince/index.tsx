import React, { useEffect, useState } from 'react';
import Head from '../../Head';
import HeadTitle from '../../HeadTitle';
import { useLocation } from 'react-router-dom';
import { Container, Pagination } from '@mui/material';
import FilterOrgs from '../../FilterOrgs';
import orgApi from '../../../api/organizationApi';
import OrgItem from '../../ViewItemCommon/OrgItem';
import { IOrganization } from '../../../interface/organization';
import scrollTop from '../../../utils/scrollTop';

function HomeProvince(props: any) {
    const location = useLocation();
    const search = location.search.slice(1, location.search.length);
    const searchArr = search.split(',');
    const province_name = decodeURI(searchArr[0]);
    const province_code = searchArr[1]
    const [orgFilter, setOrgFilter] = useState({
        tags: [],
        province_code: parseInt(province_code),
        min_price: 0,
        max_price: 0
    })
    const [data, setData] = useState({
        orgs: [],
        page: 1,
        lastPage: 1
    })
    async function getOrgsByProvince() {
        try {
            const res = await orgApi.getOrgsByProvinceCode({
                page: data.page,
                province: orgFilter.province_code,
                tags: orgFilter.tags.join("|"),
                price: { min: orgFilter.min_price, max: orgFilter.max_price }
            })
            setData({
                ...data,
                orgs: res.data.context.data,
                lastPage: res.data.context.last_page
            })
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        getOrgsByProvince()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [orgFilter.tags])
    const onPageChange = (e: any, value: any) => {
        setData({
            ...data,
            page: value
        })
        scrollTop()
    }
    
    return (
        <>
            <Head />
            <HeadTitle
                title={`Khu vực : ${province_name}`}
            />
            <Container>
                <div className="home-result-org-cnt">
                    <div className="home-result-org-cnt__left">
                        <FilterOrgs
                            hideProvinces={true}
                            orgFilter={orgFilter}
                            setOrgFilter={setOrgFilter}
                            setData={setData}
                        />
                    </div>
                    <div className="home-result-org-cnt__right">
                        <span className="se-re-cnt-title">
                            Khu vực : "{province_name}"
                        </span>
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
                        <Pagination
                            color="secondary"
                            shape="rounded"
                            count={data.lastPage}
                            onChange={onPageChange}
                        />
                    </div>
                </div>
            </Container>
        </>
    );
}

export default HomeProvince;