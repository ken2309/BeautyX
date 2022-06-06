/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { IOrganization } from '../../../../interface/organization';
import { STATUS } from '../../../../redux/status';
import { fetchAsyncCombosOrg } from '../../../../redux/org_combos/orgCombosSlice'
import OrgComboItem from './OrgComboItem';
import InfiniteScroll from "react-infinite-scroll-component";

interface IProps {
    org: IOrganization
}

function OrgCombos(props: IProps) {
    const { org } = props;
    const dispatch = useDispatch();
    const { org_id, combos, totalItem, page, status } = useSelector((state: any) => state.ORG_COMBOS);
    const callCombos = () => {
        if (org_id !== org?.id || status !== STATUS.SUCCESS) {
            const values = {
                org_id: org?.id,
                page: 1
            }
            dispatch(fetchAsyncCombosOrg(values))
        }
    }
    useEffect(() => {
        callCombos()
    }, [])
    const onViewMore = () => {
        if (totalItem >= 15 && combos.length < totalItem) {
            const values = {
                org_id: org?.id,
                page: page + 1,
            }
            dispatch(fetchAsyncCombosOrg(values))
        }
    }
    return (
        <div className="org-services-cnt">
            <InfiniteScroll
                dataLength={combos.length}
                hasMore={true}
                next={onViewMore}
                loader={<></>}
            >
                <ul className="org-combos-cnt__right">
                    {
                        combos.map((item: any, index: number) => (
                            <li key={index}>
                                <OrgComboItem
                                    org={org}
                                    combo={item}
                                />
                            </li>
                        ))
                    }
                </ul>
            </InfiniteScroll>
        </div>
    );
}

export default OrgCombos;