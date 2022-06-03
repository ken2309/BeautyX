/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { IOrganization } from '../../../../interface/organization';
import { fetchAsyncOrgComments } from '../../../../redux/org/orgCommentsSlice';
import { STATUS } from '../../../../redux/status'
import Review from '../../../Reviews';

interface IProps {
    org: IOrganization
}

function OrgReviews(props: IProps) {
    const { org } = props;
    const dispatch = useDispatch();
    const { org_id, comments, page, totalItem, status } = useSelector((state: any) => state.ORG_COMMENTS);
    console.log(org_id, comments)
    const callOrgComments = () => {
        if (org?.id !== org_id || status !== STATUS.SUCCESS) {
            dispatch(fetchAsyncOrgComments({
                org_id: org?.id,
                page: 1
            }))
        }
    }
    useEffect(() => {
        callOrgComments()
    }, [])
    return (
        <div>
            <Review
                comments={comments}
                totalItem={totalItem}
            />
        </div>
    );
}

export default OrgReviews;