import React from 'react';
import { IServiceSold, IUser_Service, IServiceUser } from '../../../interface/servicesUser';
import ServiceItem from './ServiceItem';
import { useDispatch } from 'react-redux';
import { addService, clearAllServices } from '../../../redux/servicesBookSlice';
import {IOrganization} from '../../../interface/organization';
import {useSelector} from 'react-redux'

interface IProps {
    service_sold: IServiceSold,
    card_items: IServiceUser,
    org: IOrganization | undefined
}

function ServiceSoldItem(props: IProps) {
    const dispatch = useDispatch();
    const { service_sold, card_items, org } = props;
    const order_id = card_items.items[0]?.order_id;

    const servicesBookSlice = useSelector((state: any) => state.SERVICES_BOOK);
    const order_id_slice = servicesBookSlice.order_id;

    const handleServiceBook = (service: any) => {
        const action = addService({
            ...service,
            ser_book_id: parseInt(`${order_id}${service.id}`),
            org_id: card_items?.organization_id,
            order_id: order_id,
            org: org
        });
        if(order_id_slice === null || order_id_slice === order_id){
            dispatch(action)
        }else{
            dispatch(clearAllServices());
            dispatch(action)
        }
    }
    return (
        <>
            {
                service_sold?.services?.map((service: IUser_Service, index: number) => (
                    <ServiceItem
                        key={index}
                        service={service}
                        order_id={order_id}
                        handleServiceBook={handleServiceBook}
                    />
                ))
            }
        </>
    );
}

export default ServiceSoldItem;