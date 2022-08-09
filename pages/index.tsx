import React from 'react';
import { IServicePromo } from '../src/interface/servicePromo';
import servicePromoApi from '../src/api/servicePromoApi';
import { GetStaticPathsContext, GetStaticProps } from 'next';
import { Container } from "@mui/material";
import ServicePromoItem from '../next/components/ServicePromoItem/index';
import HomeSectionHead from '../next/homeSectionHead/index';
import style from '../styles/Home.module.css';

interface IPopsHomePage {
    services: IServicePromo[];
}

function index(props: IPopsHomePage) {
    const { services } = props;
    return (
        <div
            style={{ backgroundColor: "var(--bg-gray)" }}
        >
            <Container>
                <HomePromo services={services} />
            </Container>
        </div>
    );
}

export default index;

interface IPropsHomePromo {
    services: IServicePromo[]
}
const HomePromo = (props: IPropsHomePromo) => {
    const { services } = props;
    return (
        <div className={style.home_section_promo}>
            <HomeSectionHead
                title='Top Deal khủng'
            />
            <ul className={style.home_service_list}>
                {
                    services?.map((i: IServicePromo, index: number) => (
                        <li key={index}>
                            <ServicePromoItem
                                service={i}
                            />
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}
// export const getStaticProps: GetStaticProps<IPopsHomePage> = async (context: GetStaticPathsContext) => {
//     const res = await servicePromoApi.getServicesPromo({
//         page: 1,
//         sort: "-discount_percent"
//     })
//     const hits: IServicePromo[] = await res.data.data.hits
//     return {
//         props: {
//             services: hits
//         }
//     }
// }