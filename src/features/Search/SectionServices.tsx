import React from 'react';
import { IServicePromo } from '../../interface/servicePromo';
import ServiceResultItem from './components/ServiceResultItem';

function SectionServices(props: any) {
    const { SERVICES } = props;

    return (
        SERVICES.services.length > 0 ?
            <div className='search-section-item'>
                <span className="search-section-item__title">
                    Dịch vụ
                </span>
                <div className="search-section-item__list">
                    <ul className="list">
                        {
                            SERVICES.services.slice(0, 4).map((item: IServicePromo, index: number) => (
                                <li key={index}>
                                    <ServiceResultItem
                                        service={item}
                                    />
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </div>
            :
            <></>
    );
}

export default SectionServices;