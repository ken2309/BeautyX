import React from 'react';
//import DetailSaleList from '../MerchantDetail/components/DetailSaleList';
import './sale.css';

function SaleByMerchant(props: any) {
    const { activeTab, org } = props;
    return (
        activeTab === 5 ?
            <div
                className='flex-row-sp sale-content'
            >
                {/* <DetailSaleList org={org} /> */}
            </div>
            :
            <></>
    );
}

export default SaleByMerchant;