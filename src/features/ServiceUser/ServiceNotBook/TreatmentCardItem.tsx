import React, { useState } from 'react';
import { IServiceUser, IUser_Items } from '../../../interface/servicesUser';
import ServiceSoldItem from './ServiceSoldItem';
import { formatDate } from '../../../utils/format';

interface IProps {
    card_items: IServiceUser
}

function TreatmentCardItem(props: IProps) {
    const { card_items } = props;
    const org = card_items.organization;
    const [enableCart, setEnableCart] = useState(true)
    return (
        <div
            className='treat-card-item'
            style={enableCart === true ? { opacity: 0.4 } : {}}
        >
            <div className="treat-card-item__head">
                <span className="org-name">
                    {org?.name}
                </span>
                <div className="head_detail">
                    <div className="time">
                        Ngày tạo:
                        <span>{formatDate(card_items?.created_at)}</span>
                    </div>
                    <div className="code">
                        Mã: <span>{card_items?.payment_gateway?.transaction_uuid}</span>
                    </div>
                </div>
            </div>
            <span className="flex-row-sp treat-card-item__ser-count">
                <span className="title">
                    Danh sách dịch vụ
                </span>
                {
                    enableCart === false ?
                        <div className="title">
                            Số lượng: <span>{card_items?.items_count}</span>
                        </div>
                        :
                        <div style={{ color: "var(--red-cl)" }} className="title">
                            Hết lần sử dụng
                        </div>
                }
            </span>
            {
                card_items?.items?.map((items: IUser_Items, index: number) => (
                    <ServiceSoldItem
                        key={index}
                        setEnableCart={setEnableCart}
                        card_items={card_items}
                        org={org}
                        service_sold={items.services_sold}
                    />
                ))
            }
        </div>
    );
}

export default TreatmentCardItem;