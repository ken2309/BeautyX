/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Container, Drawer } from '@mui/material';
import './style.css';
import FilterOrgs from '../Filter/FilterOrgs';
import HeadTitle from '../HeadTitle';
import Head from '../Head';
import { extraParamsUrl } from '../../utils/extraParamsUrl';

import { useDispatch, useSelector } from 'react-redux';
import { IOrganization } from '../../interface/organization';
import OrgItem from '../ViewItemCommon/OrgItem';
import { STATUS } from '../../redux/status';
import InfiniteScroll from 'react-infinite-scroll-component';
import BackTopButton from '../../components/BackTopButton';
import Footer from '../Footer';
import { fetchAsyncOrgsByFilter, onSetFilterType, onSetOrgsEmpty } from '../../redux/filter/filterSlice';
import HeadMobile from '../HeadMobile';
import useFullScreen from '../../utils/useDeviceMobile';
import icon from '../../constants/icon';
import LoadingMore from '../../components/LoadingMore';
import { LoadingOrgs } from '../../components/LoadingSketion';

function Result() {
    const IS_MB = useFullScreen();
    const params: any = extraParamsUrl();
    const dispatch = useDispatch();
    const { tags, sort, province, district } = useSelector((state: any) => state.FILTER.FILTER_ORG);
    const { TYPE_FILTER } = useSelector((state: any) => state.FILTER);
    const { orgs, status, page, totalItem } = useSelector((state: any) => state.FILTER.ORGS);
    let titleHeader: string = "";
    let type: string = ""
    if (params.tag) {
        titleHeader = params.tag;
        type = params.tag
    } else if (params.name) {
        titleHeader = params.name;
        type = params.province
    }
    const paramsFilter = {
        page: 1,
        tags: params?.tag ? [params?.tag, ...tags].join("|") : tags.join("|"),
        province_code: params?.province || province?.province_code,
        district_code: district?.district_code,
        sort: sort
    }
    const callOrgsByFilterTag = async () => {
        if (status !== STATUS.SUCCESS || type !== TYPE_FILTER) {
            dispatch(fetchAsyncOrgsByFilter(paramsFilter))
            dispatch(onSetFilterType(type))
        }
    }
    useEffect(() => {
        callOrgsByFilterTag()
    }, [])
    const handleApplyByFilter = () => {
        dispatch(onSetOrgsEmpty())
        dispatch(fetchAsyncOrgsByFilter(paramsFilter))
    }
    const onViewMore = () => {
        if (orgs.length >= 15 && orgs.length < totalItem) {
            dispatch(fetchAsyncOrgsByFilter({
                ...paramsFilter,
                page: page + 1
            }))
        }
    }
    return (
        <>
            <HeadTitle title={`Kết quả tìm kiếm cho : ${titleHeader}`} />
            {
                IS_MB ?
                    <HeadMobile
                        title={titleHeader}
                        element={<HeaderFilterMobile handleApplyByFilter={handleApplyByFilter} />}
                    />
                    :
                    <Head />
            }
            <Container className='result-cont' >
                <div className="result-cont">
                    <div className="result-cont__left">
                        <FilterOrgs
                            onApplyFilterOrgs={handleApplyByFilter}
                        />
                    </div>
                    <div className="result-cont__right">
                        {(status !== STATUS.SUCCESS && page === 1) && <LoadingOrgs />}
                        <InfiniteScroll
                            dataLength={orgs.length}
                            hasMore={true}
                            loader={<></>}
                            next={onViewMore}
                        >
                            <ul className="result-cont__right-list">
                                {
                                    orgs.map((org: IOrganization, index: number) => (
                                        <li
                                            key={index}
                                            className="result-cont__right-item"
                                        >
                                            <OrgItem org={org} />
                                        </li>
                                    ))
                                }
                            </ul>
                        </InfiniteScroll>
                        {orgs.length === totalItem ? <></> : <LoadingMore />}
                    </div>
                </div>
            </Container>
            <BackTopButton />
            <Footer />
        </>
    );
}

export default Result;

function HeaderFilterMobile(props: any) {
    const { handleApplyByFilter } = props;
    const [open, setOpen] = useState(false);
    const onApplyFilterMb = () => {
        handleApplyByFilter()
        setOpen(false)
    }
    return (
        <>
            <button
                style={{
                    border: "none",
                    outline: "none",
                    backgroundColor: "transparent",
                    padding: "8px"
                }}
                onClick={() => setOpen(true)}
            >
                <img src={icon.settingsSliders} alt="" />
            </button>
            <Drawer
                open={open}
                onClose={() => setOpen(false)}
                anchor={"right"}
            >
                <div className="result-cont__mobile">
                    <FilterOrgs
                        onApplyFilterOrgs={onApplyFilterMb}
                    />
                </div>
            </Drawer>
        </>
    )
}