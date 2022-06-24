/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IOrderV2 } from '../../../interface/orderv2';
import { fetchAsyncOrderPaid } from '../../../redux/order/orderSlice';
import OrderItem from './OrderItem';
import ButtonLoading from '../../../components/ButtonLoading';

function TabOrderPaid() {
    const ORDER = useSelector((state: any) => state.ORDER.ORDER);
    const dispatch = useDispatch();
    const { orders, totalItem, page } = ORDER;
    const onMoreOrder = () => {
        dispatch(fetchAsyncOrderPaid({
            page: page + 1,
            status: "PAID"
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

export default TabOrderPaid;