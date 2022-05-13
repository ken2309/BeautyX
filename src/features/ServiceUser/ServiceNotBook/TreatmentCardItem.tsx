import React, { useEffect, useState } from 'react';
import { IServiceUser, IUser_Items } from '../../../interface/servicesUser';
import ServiceSoldItem from './ServiceSoldItem';
import {IOrganization} from '../../../interface/organization';
import orgApi from '../../../api/organizationApi';

interface IProps {
    card_items: IServiceUser
}

function TreatmentCardItem(props: IProps) {
    const { card_items } = props;
    const [org, setOrg] = useState<IOrganization>()
    async function handleGetOrg() {
        try {
            const res = await orgApi.getOrgById(card_items.organization_id)
            setOrg(res.data.context)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(()=>{
        handleGetOrg()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    return (
        <div
            className='treat-card-item'
        >
            <div className="treat-card-item__head">
                <span className="org-name">
                    {org?.name}
                </span>
                <div className="head_detail">
                    <div className="time">
                        Ngày tạo:
                        <span>{card_items?.created_at}</span>
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
                <div className="title">
                    Số lượng: <span>{card_items?.items_count}</span>
                </div>
            </span>
            {
                card_items?.items?.map((items: IUser_Items, index: number) => (
                    <ServiceSoldItem
                        key={index}
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