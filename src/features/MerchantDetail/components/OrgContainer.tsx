import React from 'react';
import { IOrganization } from '../../../interface/organization';
import { onActiveTab } from '../../../redux/org/orgSlice';
import { useDispatch } from 'react-redux';
import OrgDealHot from './OrgPages/OrgDealHot';
import OrgServices from './OrgPages/OrgServices';
import OrgProducts from './OrgPages/OrgProducts';
import OrgCombos from './OrgPages/OrgCombos';
import OrgInformation from './OrgPages/OrgInformation';
import OrgReviews from './OrgPages/OrgReviews';
import useFullScreen from '../../../utils/useFullScreen';

interface IProps {
    org: IOrganization
    tab: number
}


function OrgContainer(props: IProps) {
    const is_mb = useFullScreen();
    const { org, tab } = props;
    const dispatch = useDispatch();
    let tabs = [
        { id: 1, title: "Deal Hot" },
        { id: 2, title: "Dịch vụ" },
        { id: 3, title: "Sản phẩm" },
        { id: 7, title: "Combos" },
        { id: 4, title: is_mb ? "Chi tiết" : "Doanh nghiệp" },
        { id: 5, title: "Đánh giá" },
        { id: 6, title: " Hình ảnh" }
    ]
    if (is_mb === false) {
        tabs = tabs.filter((item: any) => item.id !== 5)
    }
    const handleActiveTab = (id: number) => {
        dispatch(onActiveTab(id))
    }
    const onSwitchTab = () => {
        switch (tab) {
            case 1:
                return <OrgDealHot />;
            case 2:
                return <OrgServices org={org} />
            case 3:
                return <OrgProducts org={org} />
            case 7:
                return <OrgCombos org={org} />
            case 4:
                return <div className='org-information-cnt'>
                    <OrgInformation org={org} />
                    <OrgReviews org={org} />
                </div>
            case 5:
                return <div className='org-information-cnt'>
                    <OrgInformation org={org} />
                    <OrgReviews org={org} />
                </div>
        }
    }
    return (
        <>
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
            </div>
            {onSwitchTab()}
        </>
    );
}

export default OrgContainer;