import React, { useState } from 'react';
import Products from './components/Products';
import Services from './components/Services';
import './sale.css';

function SaleByMerchant(props: any) {
    const { activeTab, org } = props;
    const cates = [
        { id: 1, title: 'Sản phẩm' },
        { id: 2, title: 'Dịch vụ' }
    ]
    const [act, setAct] = useState(cates[0].id)
    return (
        activeTab === 5 ?
            <div
                className='flex-row-sp sale-content'
            >
                <div className="sale-content__left">
                    <ul>
                        {
                            cates.map(item => (
                                <li
                                    onClick={() => setAct(item.id)}
                                    key={item.id}
                                    style={
                                        item.id === act ? { backgroundColor: 'var(--purple)', color: 'var(--bgWhite)' }
                                            :
                                            {}
                                    }
                                >
                                    {item.title}
                                </li>
                            ))
                        }
                    </ul>
                </div>
                <div className="sale-content__right">
                    <Services act={act} org={org} />
                    <Products act={act} org={org} />
                </div>
            </div>
            :
            <></>
    );
}

export default SaleByMerchant;