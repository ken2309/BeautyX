import React from 'react';
import { useSelector } from 'react-redux';

function OrgDealHot() {
    const ORG = useSelector((state: any) => state.ORG);
    const ORG_SPECIALS = useSelector((state: any) => state.ORG_SPECIALS);
    const { SERVICES_SPECIAL, PRODUCTS_SPECIAL } = ORG_SPECIALS;
    console.log(SERVICES_SPECIAL, PRODUCTS_SPECIAL);
    const { org, status } = ORG;

    return (
        <div>
            OrgDealHot
        </div>
    );
}

export default OrgDealHot;