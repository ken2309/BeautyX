/* eslint-disable eqeqeq */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import Head from '../Head';
import { extraParamsUrl } from '../../utils/extraParamsUrl';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAsyncDiscountDetail, onSetItemDiscount } from '../../redux/org_discounts/orgDiscountsSlice';
import HeadTitle from '../HeadTitle';
import { IDiscountPar, IITEMS_DISCOUNT } from '../../interface/discount';
import { Container } from '@mui/material'
import '../ProductDetail/product.css';
import { STATUS } from '../../redux/status';
import '../ServiceDetail/serviceDetail.css';
import '../ProductDetail/product.css';
import { fetchAsyncOrg } from '../../redux/org/orgSlice';
import DiscountDetailLeft from './components/DiscountDetailLeft';

function DiscountDetail() {
    const { DISCOUNT, ITEM_DISCOUNT } = useSelector((state: any) => state.ORG_DISCOUNTS);
    const discount: IDiscountPar = DISCOUNT.discount;
    const status_detail = DISCOUNT.status

    const dispatch = useDispatch();
    const params: any = extraParamsUrl();
    const ORG = useSelector((state: any) => state.ORG);
    const values = {
        org_id: params.org_id,
        id: params.dis_id
    }
    const callDiscountDetail = () => {
        if (status_detail !== STATUS.SUCCESS || discount.id !== parseInt(params.dis_id)) {
            dispatch(fetchAsyncDiscountDetail(values))
        }
    }
    const callOrgDetail = () => {
        if (parseInt(params.org_id) !== ORG.org?.id || ORG.status !== STATUS.SUCCESS) {
            dispatch(fetchAsyncOrg(params.org_id))
        }
    }
    const handleOnSetItemDiscount = () => {
        if (status_detail === STATUS.SUCCESS) {
            const values = discount.items.find((item: IITEMS_DISCOUNT) => item.productable_id == params.item_id)
            dispatch(onSetItemDiscount(values))
        }
    }
    useEffect(() => {
        callDiscountDetail()
        callOrgDetail()
    }, [])
    useEffect(() => {
        handleOnSetItemDiscount()
    }, [status_detail])
    console.log(ITEM_DISCOUNT);

    return (
        <>
            <HeadTitle
                title={status_detail === "LOADING" ? 'Loading...' : discount?.title}
            />
            <Head />
            {
                status_detail === STATUS.SUCCESS &&
                <Container>
                    <div className="service-detail">
                        <div className="service-detail__head">
                            <DiscountDetailLeft org={ORG.org} discount={discount} />
                        </div>
                    </div>
                </Container>
            }
        </>
    );
}

export default DiscountDetail;