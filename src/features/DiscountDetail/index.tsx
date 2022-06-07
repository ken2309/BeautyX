/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import Head from '../Head';
import { extraParamsUrl } from '../../utils/extraParamsUrl';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAsyncDiscountDetail } from '../../redux/org_discounts/orgDiscountsSlice';
import HeadTitle from '../HeadTitle';
import { IDiscountPar } from '../../interface/discount';
import { Container } from '@mui/material'
import '../ProductDetail/product.css';
import DetailLeft from './components/DetailLeft';
import DetailRight from './components/DetailRight';
import { STATUS } from '../../redux/status'
import { useLocation } from 'react-router-dom';

function DiscountDetail() {
    const location: any = useLocation();
    console.log(location.state)
    const { DISCOUNT } = useSelector((state: any) => state.ORG_DISCOUNTS);
    //const discount: IDiscountPar = DISCOUNT.discount;
    const status_detail = DISCOUNT.status

    const dispatch = useDispatch();
    const params: any = extraParamsUrl();
    const values = {
        org_id: params.org_id,
        id: params.id
    }
    const callDiscountDetail = () => {
        if (status_detail !== STATUS.SUCCESS || DISCOUNT.discount?.id !== parseInt(params.id)) {
            dispatch(fetchAsyncDiscountDetail(values))
        }
    }
    useEffect(() => {
        if (!location.state) {
            callDiscountDetail()
        }
    }, [])
    const discount: IDiscountPar = location.state ? location.state.discountPar : DISCOUNT.discount
    return (
        <>
            <HeadTitle
                title={status_detail === "LOADING" ? 'Loading...' : discount?.title}
            />
            <Head />
            {
                (status_detail === STATUS.SUCCESS || location.state) &&
                <Container>
                    <div className="product-cnt">
                        <DetailLeft
                            discount={discount}
                        />
                        <DetailRight
                            discount={discount}
                        />
                    </div>
                </Container>
            }
        </>
    );
}

export default DiscountDetail;