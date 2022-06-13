import React from 'react';
import { Service } from '../../../interface/service';
import { IOrganization } from '../../../interface/organization';

interface IProps {
    service: {
        service: Service,
        quantity?: number
    },
    org: IOrganization
}

function ServiceBookItem(props: IProps) {
    const { service, org } = props;
    return (
        <div className='flex-row book__service-item'>
            <img src={service?.service?.image ? `${service?.service?.image_url}` : `${org?.image_url}`}
                alt=""
                className="book__service-item__img" />
            <div className="book__service-item__de">
                <p className="name">{service?.service?.service_name}</p>
                <p className="quantity">Số lượng : {service.quantity}</p>
            </div>
        </div>
    );
}

export default ServiceBookItem;