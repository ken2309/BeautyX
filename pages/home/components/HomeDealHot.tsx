import { GetStaticPathsContext, GetStaticProps } from 'next';
import React from 'react';
import { IServicePromo } from '../../../src/interface/servicePromo';
import servicePromoApi from '../../../src/api/servicePromoApi';

interface IPopsHomeDiscount {
    services: IServicePromo[]
}

function HomeDealHot(props: IPopsHomeDiscount) {
    const { services } = props;
    return (
        <ul>
            list
            {
                services?.map((i: IServicePromo, index:number) => (
                    <li key={index}>
                        {i.service_name}
                    </li>
                ))
            }
        </ul>
    );
}

export default HomeDealHot;

