import React, { useEffect, useState } from 'react';
import Head from '../../Head';
import { Container } from '@mui/material'
import { useLocation } from 'react-router-dom';
import HeadTitle from '../../HeadTitle';
import '../home-result.css';
import FilterOrgs from '../../FilterOrgs';
import orgApi from '../../../api/organizationApi';
import OrgItem from '../../ViewItemCommon/OrgItem';
import { IOrganization } from '../../../interface/organization';
import { Pagination } from '@mui/material'
import scrollTop from '../../../utils/scrollTop';

function HomeTags(props: any) {
    const location = useLocation();
    const [orgFilter, setOrgFilter] = useState({
        tags: [],
        province_code: 0,
        min_price: 0,
        max_price: 0
    })
    const [data, setData] = useState({
        orgs: [],
        page: 1,
        lastPage: 1
    })
    const tag_name = decodeURI(location.search.slice(1, location.search.length));

    async function handleGetOrgsSingleTag() {
        try {
            const res = await orgApi.getOrgsByTag({
                page: data.page,
                tag: tag_name,
                province: orgFilter.province_code,
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
        handleGetOrgsSingleTag()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data.page, orgFilter.province_code])

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
                title={`Kết quả tìm kiếm cho : ${tag_name}`}
            />
            <Container>
                <div
                    className='home-result-org-cnt'
                >
                    <div className="home-result-org-cnt__left">
                        <FilterOrgs
                            hideTags={true}
                            orgFilter={orgFilter}
                            setOrgFilter={setOrgFilter}
                            setData={setData}
                            handleOrgsByKeyword={handleGetOrgsSingleTag}
                        />
                    </div>
                    <div className="home-result-org-cnt__right">
                        <span className="se-re-cnt-title">
                            Kết quả tìm kiếm cho : "{tag_name}"
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

export default HomeTags;