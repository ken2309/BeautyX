import React from "react";
import { Container } from "@mui/material";
import "./mySer.css";
import ServiceBook from "./components/ServiceBook";
import Footer from "../Footer";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import ButtonCus from "../../components/ButtonCus";

function ServicesUser(props: any) {
    const history = useHistory();
    const servicesBookSlice = useSelector((state: any) => state.SERVICES_BOOK);
    const servicesBook = servicesBookSlice.servicesBook;
    console.log(servicesBook)
    const org = servicesBookSlice.org;
    const order_id = servicesBookSlice?.order_id;

    const handleNextStep = () => {
        if (servicesBook.length > 0) {
            const services = servicesBook.map((item: any) => {
                return {
                    service: item,
                    quantity: 1
                }
            });
            history.push({
                pathname: "/dat-hen",
                state: { org, services, order_id }
            })
        }
    };
    return (
        <>
            <Container>
                <div className="flex-row-sp my-ser">
                    <div className="my-ser__right">
                        <ServiceBook />
                    </div>
                </div>
            </Container>
            <div
                className="my-ser-bot"
            >
                <Container>
                    <div className="my-ser-bot__cnt">
                        <ButtonCus
                            color="var(--bgWhite)"
                            backColor="var(--purple)"
                            padding="8px 16px"
                            borderRadius="16px"
                            margin="0px 0px 0px 12px"
                            opacity={servicesBook.length > 0 ? "1" : ".3"}
                            onClick={handleNextStep}
                        />
                    </div>
                </Container>
            </div>
            <Footer />
        </>
    );
}

export default ServicesUser;
