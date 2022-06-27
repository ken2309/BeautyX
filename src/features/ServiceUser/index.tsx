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

function ServicesUser(props: any) {
    //const history = useHistory();
    const dispatch = useDispatch();
    const fullScreen = useFullScreen();
    //const servicesBookSlice = useSelector((state: any) => state.SERVICES_BOOK);
    const { services, status } = useSelector((state: any) => state.ORDER.ORDER_SERVICES);
    //const servicesBook = servicesBookSlice.servicesBook;
    //const org = servicesBookSlice.org;
    //const order_id = servicesBookSlice?.order_id;
    const callServicesUser = () => {
        if (status !== STATUS.SUCCESS) {
            dispatch(fetchAsyncOrderServices({ page: 1 }))
        }
    }
    useEffect(() => {
        callServicesUser()
    }, [])

    // const handleNextStep = () => {
    //     if (servicesBook.length > 0) {
    //         const services = servicesBook.map((item: any) => {
    //             return {
    //                 service: item,
    //                 quantity: 1
    //             }
    //         });
    //         history.push({
    //             pathname: "/dat-hen",
    //             state: { org, services, order_id }
    //         })
    //     }
    // };
    return (
        <>
            {status !== STATUS.SUCCESS && <ModalLoad />}
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
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
            <div
                className="my-ser-bot"
            >
                {/* <Container>
                    <div className="my-ser-bot__cnt">
                        <ButtonLoading
                            onClick={handleNextStep}
                            title="Đặt lịch ngay"
                            loading={false}
                        />
                    </div>
                </Container> */}
            </div>
            <Footer />
        </>
    );
}

export default ServicesUser;
