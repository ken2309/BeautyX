import React, { useEffect, useState } from 'react';
import discountApi from '../../../../api/discountApi';
import { IDiscountPar, IITEMS_DISCOUNT } from '../../../../interface/discount';
import DiscountItem from './DiscountItem';
import './discount.css'
import Head from '../../../Head';

interface IData {
    discounts: IDiscountPar[],
    page: number,
    total: number
}

function UserDiscounts(props: any) {
    const { setOpen } = props;
    const [data, setData] = useState<IData>({
        discounts: [],
        page: 1,
        total: 1
    })
    const handleGetDiscounts = async () => {
        try {
            const res = await discountApi.getAll({
                page: data.page
            });
            setData({
                ...data,
                discounts: [...data.discounts, ...res.data.context.data],
                total: res.data.context.total
            })
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        handleGetDiscounts()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data.page])
    const onViewMore = () => {
        setData({
            ...data,
            page: data.page + 1
        })
    }
    return (
        <>
            <Head
                setCloseDialog={setOpen}
            />
            <div
                className='order'
            >
                <div className="flex-column dis-cnt">
                    <ul
                        className='dis-cnt__list'
                    >
                        {
                            data.discounts.map((discount: IDiscountPar, index: number) => (
                                <li
                                    className='dis-cnt__list-item'
                                    key={index}
                                >
                                    {
                                        discount.items.map((item: IITEMS_DISCOUNT, i: number) => (
                                            <DiscountItem
                                                key={i}
                                                discountItem={item}
                                                discountPar={discount}
                                            />
                                        ))
                                    }
                                </li>
                            ))
                        }
                    </ul>
                    {
                        data.discounts.length < data.total &&
                        <button
                            onClick={onViewMore}
                            className='dis-cnt__list-btn'
                        >
                            Xem thêm mã ưu đãi
                        </button>
                    }
                </div>
            </div>
        </>
    );
}

export default UserDiscounts;