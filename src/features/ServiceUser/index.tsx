/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { Container } from "@mui/material";
import "./mySer.css";
import Footer from "../Footer";
//import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
//import ButtonLoading from "../../components/ButtonLoading";
import useFullScreen from "../../utils/useFullScreen";
import { Masonry } from "@mui/lab";
import { IServiceUser } from "../../interface/servicesUser";
import TreatmentCardItem from "./ServiceNotBook/TreatmentCardItem";
import { STATUS } from '../../redux/status';
import { fetchAsyncOrderServices } from '../../redux/order/orderSlice';
import ModalLoad from "../../components/ModalLoad";
import ButtonLoading from "../../components/ButtonLoading";

function ServicesUser(props: any) {
    const dispatch = useDispatch();
    const fullScreen = useFullScreen();
    const { services, status, totalItem, page } = useSelector((state: any) => state.ORDER.ORDER_SERVICES);
    const callServicesUser = () => {
        if (status !== STATUS.SUCCESS) {
            dispatch(fetchAsyncOrderServices({ page: 1 }))
        }
    }
    useEffect(() => {
        callServicesUser()
    }, [])
    const onViewMore = () => {
        dispatch(fetchAsyncOrderServices({
            page: page + 1
        }))
    }
    let loading = false;
    if (status === STATUS.LOADING) {
        loading = true
    }
    return (
        <>
            {status === STATUS.LOADING && page === 1 && <ModalLoad />}
            <Container>
                <div className="flex-row-sp my-ser">
                    <div className="my-ser__right">
                        <div className="my-ser-book__cnt">
                            <div className="my-ser-book">
                                <Masonry
                                    columns={fullScreen ? 1 : 2}
                                    spacing={fullScreen ? 1 : 3}
                                >
                                    {
                                        services.map((item: IServiceUser, index: number) => (
                                            <TreatmentCardItem
                                                key={index}
                                                card_items={item}
                                            />
                                        ))
                                    }
                                </Masonry>
                                {
                                    (services.length >= 15 && services.length < totalItem) &&
                                    <div
                                        className="my-ser-bot"
                                    >
                                        <ButtonLoading
                                            title="Xem thêm dịch vụ"
                                            onClick={onViewMore}
                                            loading={loading}
                                        />
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
            <Footer />
        </>
    );
}

export default ServicesUser;
