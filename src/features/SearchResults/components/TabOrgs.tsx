import React from "react";
import { IOrganization } from "../../../interface/organization";
import OrgItem from "../../ViewItemCommon/OrgItem";
import InfiniteScroll from "react-infinite-scroll-component";
import { useDispatch, useSelector } from "react-redux";
import { fetchAsyncOrgsByFilter } from "../../../redux/search/searchResultSlice";
import LoadingMore from "../../../components/LoadingMore";
import { LoadingOrgs } from "../../../components/LoadingSketion";
import { STATUS } from "../../../redux/status";

function TabOrgs(props: any) {
    const { keyword, FILTER_ORGS_VAL } = props;
    const dispatch = useDispatch();
    const { orgs, page, totalItem, status } = useSelector(
        (state: any) => state.SEARCH_RESULT.RE_ORGS
    );

    const onViewMore = () => {
        if (orgs.length >= 15 && orgs.length < totalItem) {
            dispatch(
                fetchAsyncOrgsByFilter({
                    ...FILTER_ORGS_VAL,
                    page: page + 1,
                    keyword: keyword,
                })
            );
        }
    };
    return (
        <>
            {page === 1 && status !== STATUS.SUCCESS && <LoadingOrgs />}
            <InfiniteScroll
                dataLength={orgs.length}
                hasMore={true}
                loader={<></>}
                next={onViewMore}
            >
                <ul className="re-ser-list">
                    {orgs.map((item: IOrganization, index: number) => (
                        <li key={index}>
                            <OrgItem org={item} />
                        </li>
                    ))}
                </ul>
            </InfiniteScroll>
            {orgs.length < totalItem && <LoadingMore />}
        </>
    );
}

export default TabOrgs;
