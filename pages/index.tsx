import React, { Suspense } from 'react';
import { Provider } from 'react-redux';
import store from '../../../redux/store';
import { IServicePromo } from '../src/interface/servicePromo';
import servicePromoApi from '../src/api/servicePromoApi';
import App from './app';
import { GetStaticPathsContext, GetStaticProps } from 'next';

interface IPopsHomePage {
    services: IServicePromo[];
}

function index(props: IPopsHomePage) {
    const {services} = props;
    return (
        <App 
        services={services}
        />
    );
}

export default index;


export const getStaticProps: GetStaticProps<IPopsHomePage> = async (context: GetStaticPathsContext) => {
    const res = await servicePromoApi.getServicesPromo({
        page: 1
    })
    const hits: IServicePromo[] = await res.data.data.hits
    return {
        props: {
            services: hits
        }
    }
}