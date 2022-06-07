/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { IOrganization } from "../../../../interface/organization";
import { fetchAsyncOrgComments, clearPrevState } from "../../../../redux/org/orgCommentsSlice";
import { STATUS } from "../../../../redux/status";
import Review from "../../../Reviews";

interface IProps {
    org: IOrganization;
    refReview: any;
}

function OrgReviews(props: IProps) {
    const { org, refReview } = props;
    const dispatch = useDispatch();
    const { org_id, comments, totalItem, status } = useSelector(
        (state: any) => state.ORG_COMMENTS
    );
    const callOrgComments = () => {
        if (org?.id !== org_id || status !== STATUS.SUCCESS) {
            dispatch(clearPrevState())
            dispatch(
                fetchAsyncOrgComments({
                    org_id: org?.id,
                    page: 1,
                })
            );
        }
    };
    useEffect(() => {
        callOrgComments();
    }, []);
    return (
        <div ref={refReview} className="org-evaluate">
            <Review
                comments={comments}
                totalItem={totalItem}
                commentable_type={"ORGANIZATION"}
                id={org_id}
            />
        </div>
    );
}

export default OrgReviews;
