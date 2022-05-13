import React, { useEffect } from 'react';
import { IOrganization } from '../../../interface/organization';
import OrgItem from '../../ViewItemCommon/OrgItem';
import { Pagination } from '@mui/material';
import scrollTop from '../../../utils/scrollTop';

function TabOrgs(props: any) {
    const { acTab, keyword, orgFilter, data, setData, handleOrgsByKeyword } = props;
    useEffect(() => {
        handleOrgsByKeyword()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data.page, orgFilter.tags, orgFilter.province_code, keyword])
    const onPageChange = (e: any, value: any) => {
        setData({
            ...data,
            page: value
        })
        scrollTop()
    }
    return (
        acTab === 3 ?
            <>
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
            </>
            :
            <></>
    );
}

export default TabOrgs;