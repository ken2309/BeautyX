import React from 'react';
import { NextPageWithLayout } from '../../models';
import { HeaderLayout } from '../../components/layout';
import Head from 'next/head';
import useSWR from 'swr';
import { IDiscountPar } from '../../interfaces/discount'

const Discounts: NextPageWithLayout = () => {
    const { data, error, mutate, isValidating } = useSWR("/discounts", {
        revalidateOnFocus: false,
    });
    let discounts: IDiscountPar[] = [];
    if (!data) {
        return <>Loading...</>
    } else {
        discounts = data.data.context.data
    }
    return (
        <>
            <Head>
                <title>Giá tốt, Ưu đãi khủng - BEAUTYX</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <div>
                <ul>
                    {
                        discounts.map((item: IDiscountPar, index: number) => (
                            <li key={index} >
                                <span>{item.title}</span>
                            </li>
                        ))
                    }
                </ul>
            </div>
        </>
    );
}

Discounts.Layout = HeaderLayout

export default Discounts;
