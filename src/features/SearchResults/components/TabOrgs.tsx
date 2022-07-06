import React from 'react';
import { IOrganization } from '../../../interface/organization';
import OrgItem from '../../ViewItemCommon/OrgItem';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAsyncOrgsByFilter } from '../../../redux/search/searchResultSlice'

function TabOrgs(props: any) {
    const { acTab, keyword, FILTER_ORGS_VAL } = props;
    const dispatch = useDispatch();
    const { orgs, page, totalItem } = useSelector((state: any) => state.SEARCH_RESULT.RE_ORGS)

    const onViewMore = () => {
        if (orgs.length >= 15 && orgs.length < totalItem) {
            dispatch(fetchAsyncOrgsByFilter({
                ...FILTER_ORGS_VAL,
                page: page + 1,
                keyword: keyword
            }))
        }
    }
    return (
        acTab === 3 ?
            <>
                <InfiniteScroll
                    dataLength={orgs.length}
                    hasMore={true}
                    loader={<></>}
                    next={onViewMore}
                >
                    <ul className="re-ser-list">
                        {
                            orgs.map((item: IOrganization, index: number) => (
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
            </>
            :
            <></>
    );
}

export default TabOrgs;