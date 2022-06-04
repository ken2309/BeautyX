import React, { useEffect, useState } from "react";
import formatPrice from "../../../utils/formatPrice";
import DetailControl from "./DetailControl";
import "./detailNameMb.css";

function DetailNameMb(props: any) {
    const { discount, is_type } = props;
    const [old_price, setOld_price] = useState(0);
    const [sale_price, setSale_price] = useState(0);
    const detailDiscountItem = discount.productable;
    const [open, setOpen] = useState(false);
    useEffect(() => {
        if (is_type === 1 || is_type === "SERVICE") {
            if (discount?.view_price > 0) {
                setSale_price(discount?.view_price);
                setOld_price(detailDiscountItem?.price);
            } else {
                setSale_price(discount?.price);
            }
        } else if (is_type === 2 || is_type === "PRODUCT") {
            if (discount?.view_price > 0) {
                setSale_price(discount?.view_price);
                setOld_price(detailDiscountItem?.price);
            } else {
                setSale_price(discount?.price);
            }
        }
    }, [
        is_type,
        detailDiscountItem.price,
        detailDiscountItem?.view_price,
        discount?.view_price,
        discount?.price,
    ]);
    return (
        <>
            <div className="detail-name-mb">
                <div className="detail-name-mb__name">
                    {detailDiscountItem?.service_name}
                </div>
                <div className="detail-name-mb__price">
                    <span
                        style={old_price === 0 ? { display: "none" } : {}}
                        className="price-old"
                    >
                        {formatPrice(old_price)}đ
                    </span>
                    <div className="flex-row price-sale">
                        <span
                            style={old_price === 0 ? { display: "none" } : {}}
                        >
                            Giảm{" "}
                            {Math.round(100 - (sale_price / old_price) * 100)}%
                        </span>
                        <span
                            style={
                                old_price === 0
                                    ? { color: "var(--purple)" }
                                    : {}
                            }
                        >
                            {formatPrice(sale_price)}đ
                        </span>
                    </div>
                </div>
                <div className="detail-name-mb__add">
                    <button onClick={() => setOpen(true)}>
                        Thêm vào giỏ hàng
                    </button>
                </div>
            </div>
            <DetailControl open={open} setOpen={setOpen} discount={discount} />
        </>
    );
}

export default DetailNameMb;
