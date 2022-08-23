import React from 'react';
import { IServicePromo } from '../src/interface/servicePromo';
import servicePromoApi from '../api/client/servicePromoApi';
import { GetStaticPathsContext, GetStaticProps } from 'next';
import { Container } from "@mui/material";
import ServicePromoItem from '../components/ServicePromoItem';
import HomeSectionHead from "../components/homeSectionHead";
import style from '../styles/Home.module.css';
import ExtraFlatForm from '../rootComponents/extraPlatForm';
import { useRouter } from 'next/router';
import useTrans from '../context/hooks/useTrans';
import useStorage from '../context/hooks/useStorage';
import Head from 'next/head'

interface IPopsHomePage {
    services: any[];
}

function Home(props: IPopsHomePage) {
    const { services } = props;
    const { setItem } = useStorage()
    const router = useRouter()
    const changeLang = (lang: string) => {
        setItem("lang", lang, "local")
        router.push('/', '/', { locale: lang })
    }
    return (
        <>
            <Head>
                <title>BeautyX - Đặt lịch làm đẹp online</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <ExtraFlatForm />
            <button onClick={() => changeLang("vi")} >Việt</button>
            <button onClick={() => changeLang("en")}  >Anh</button>
            <div style={{ backgroundColor: "var(--bg-gray)" }}>
                <Container>
                    <HomePromo services={services} />
                </Container>
            </div>
        </>
    );
}

export default Home;

interface IPropsHomePromo {
    services: IServicePromo[]
}
const HomePromo = (props: IPropsHomePromo) => {
    const trans = useTrans();
    const { services } = props;
    return (
        <div className={style.home_section_promo}>
            <HomeSectionHead
                title={trans.home_2.top_deal}
            />
            <ul className={style.home_service_list}>
                {
                    services?.map((i: IServicePromo, index: number) => (
                        <li key={index}>
                            <ServicePromoItem
                                service={i}
                            />
                            {/* <span>
                                {i.service_name}
                            </span> */}
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}

export const getStaticProps: GetStaticProps<IPopsHomePage> = async (context: GetStaticPathsContext) => {
    const res = await servicePromoApi.getServicesPromo({
        page: 1
    })
    const hits: any[] = await res.data.data.hits
    return {
        props: {
            services: hits
        }
    }
}