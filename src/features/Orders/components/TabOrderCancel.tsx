/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ButtonLoading from '../../../components/ButtonLoading';
import { IOrderV2 } from '../../../interface/orderv2';
import { fetchAsyncOrderCancel } from '../../../redux/order/orderSlice';
import { STATUS } from '../../../redux/status';
import OrderItem from './OrderItem';


function TabOrderCancel() {
    const ORDER_CANCEL = useSelector((state: any) => state.ORDER.ORDER_CANCEL);
    const dispatch = useDispatch();
    const { orders, status, page, totalItem } = ORDER_CANCEL;
    console.log(totalItem)
    const callOrdersCancel = () => {
        if (status !== STATUS.SUCCESS) {
            dispatch(fetchAsyncOrderCancel({
                page: 1,
                // status: "PAID"
            }))
        }
    }
    useEffect(() => {
        callOrdersCancel()
    }, [])
    const onMoreOrder = () => {
        dispatch(fetchAsyncOrderCancel({
            page: page + 1,

        }))
    }
    return (
        <div>
            <ul className="order-list__cnt">
                {
                    orders.map((order: IOrderV2, index: number) => (
                        <OrderItem
                            key={index}
                            order={order}
                        />
                    ))
                }
            </ul>
            <div className="order-list__bottom">
                {
                    orders.length < totalItem &&
                    <ButtonLoading
                        title='Xem thêm'
                        loading={false}
                        onClick={onMoreOrder}
                    />
                }
            </div>
        </div>
    );
}

export default TabOrderCancel;