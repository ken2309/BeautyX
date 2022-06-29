import React, { useEffect } from 'react';
import { IOrganization } from '../../../interface/organization';
import OrgItem from '../../ViewItemCommon/OrgItem';
import InfiniteScroll from 'react-infinite-scroll-component';

function TabOrgs(props: any) {
    const { acTab, keyword, orgFilter, data, setData, handleOrgsByKeyword } = props;
    useEffect(() => {
        handleOrgsByKeyword()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data.page, orgFilter.tags, orgFilter.province_code, keyword])

    const onViewMore = () => {
        if (data.orgs.length >= 15 && data.orgs.length < data.totalItem) {
            setData({
                ...data,
                page: data.page + 1
            })
        }
    }

    return (
        acTab === 3 ?
            <>
                <InfiniteScroll
                    dataLength={data.orgs.length}
                    hasMore={true}
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
            </>
            :
            <></>
    );
}

export default TabOrgs;