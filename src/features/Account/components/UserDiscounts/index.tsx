import React from 'react';
import { IDiscountPar, IITEMS_DISCOUNT } from '../../../../interface/discount';
import DiscountItem from './DiscountItem';
import './discount.css'
import Head from '../../../Head';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAsyncDiscounts } from '../../../../redux/home/homeSlice'

function UserDiscounts(props: any) {
    const { setOpen } = props;
    const dispatch = useDispatch();
    const { DISCOUNTS } = useSelector((state: any) => state.HOME);
    const { discounts, page, totalItem } = DISCOUNTS;
    // console.log(DISCOUNTS)
    // const [data, setData] = useState<IData>({
    //     discounts: [],
    //     page: 1,
    //     total: 1
    // })
    // const handleGetDiscounts = async () => {
    //     try {
    //         const res = await discountApi.getAll({
    //             page: data.page
    //         });
    //         setData({
    //             ...data,
    //             discounts: [...data.discounts, ...res.data.context.data],
    //             total: res.data.context.total
    //         })
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }
    // useEffect(() => {
    //     handleGetDiscounts()
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [data.page])
    const onViewMore = () => {
        dispatch(fetchAsyncDiscounts({
            page: page + 1
        }))
        // setData({
        //     ...data,
        //     page: data.page + 1
        // })
    }
    return (
        <>
            <div className="discount-head">
                <Head
                    setCloseDialog={setOpen}
                />
            </div>
            <div
                className='order'
            >
                <div className="flex-column dis-cnt">
                    <ul
                        className='dis-cnt__list'
                    >
                        {
                            discounts.map((discount: IDiscountPar, index: number) => (
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
                        discounts.length < totalItem &&
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