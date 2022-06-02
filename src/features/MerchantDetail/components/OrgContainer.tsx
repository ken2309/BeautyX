import React from 'react';
import ProductByMerchant from '../../ProductByMerchant';
import ServiceByMerchant from '../../ServiceByMerchant';
//import SaleByMerchant from '../../SaleByMerchant';
import { IOrganization } from '../../../interface/organization';
import { onActiveTab } from '../../../redux/org/orgSlice';
import { useDispatch } from 'react-redux';
import OrgDealHot from './OrgPages/OrgDealHot';
import OrgServices from './OrgPages/OrgServices';

interface IProps {
    org: IOrganization
    tab: number
}

function OrgContainer(props: IProps) {
    const { org, tab } = props;
    const dispatch = useDispatch();
    const tabs = [
        { id: 1, title: "Deal Hot" },
        { id: 2, title: "Dịch vụ" },
        { id: 3, title: "Sản phẩm" },
        { id: 4, title: "Đánh giá" },
        { id: 5, title: "Chi tiết doanh nghiệp" },
    ]
    const handleActiveTab = (id: number) => {
        dispatch(onActiveTab(id))
    }
    const onSwitchTab = () => {
        switch (tab) {
            case 1:
                return <OrgDealHot />;
            case 2:
                return <OrgServices org={org} />

        }
    }
    return (
        <div className="org-container">
            <div className="org-container__tab-cnt">
                <ul className="flex-row org-tab-list">
                    {
                        tabs.map(item => (
                            <li
                                onClick={() => handleActiveTab(item.id)}
                                key={item.id}
                            >
                                <span
                                    style={
                                        tab === item.id ?
                                            {
                                                color: "var(--purple)",
                                                borderBottom: "solid 1px var(--purple)"
                                            }
                                            :
                                            {}
                                    }
                                    className="org-tab-list__item">
                                    {item.title}
                                </span>
                            </li>
                        ))
                    }
                </ul>
            </div>
            {onSwitchTab()}
        </div>
    );
}

export default OrgContainer;