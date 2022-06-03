import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IOrganization } from '../../../../interface/organization';

interface IProps {
    org: IOrganization
}

function OrgServices(props: IProps) {
    const dispatch = useDispatch();
    const state = useSelector((state: any) => state.ORG_SERVICES);
    console.log(state)
    const { org } = props;
    return (
        <div>
            OrgServices
        </div>
    );
}

export default OrgServices;