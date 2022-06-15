import React from "react";
import { useSelector } from "react-redux";
import { Container } from "@mui/material";
import { IDiscountPar, IITEMS_DISCOUNT } from "../../interface/discount";
import DiscountItem from "./DiscountItem";
import "./style.css";
import { useHistory } from "react-router-dom";

function HomeDiscount() {
    const { DISCOUNTS } = useSelector((state: any) => state.HOME);
    const { discounts } = DISCOUNTS;
    const history = useHistory();
    return (
        <div className="home-discounts">
            <Container>
                <div className="flex-row-sp home-discounts__title">
                    <span>KHUYỄN MÃI HOT</span>
                    <span onClick={() => history.push("/giam-gia")}>
                        Xem thêm {">"}
                    </span>
                </div>
                <div className="home-discounts__list-wrap">
                    <ul className="home-discounts__list">
                        {discounts
                            .slice(0, 12)
                            .map((discount: IDiscountPar, index: number) =>
                                <>
                                    {discount.items.map(
                                        (item: IITEMS_DISCOUNT, i: number) => (
                                            <li key={i}>
                                                <DiscountItem
                                                    discountItem={item}
                                                    discountPar={discount}
                                                />
                                            </li>
                                        )
                                    )
                                    }
                                </>
                            )}
                    </ul>
                </div>
            </Container>
        </div>
    );
}

export default HomeDiscount;
