import React, { useState, useEffect } from "react";
import formatPrice from "../../utils/formatPrice";
import DetailControl from "./DetailControl";
import "./detailNameMb.css";

function DetailNameMb(props: any) {
    const { detail, is_type, org } = props;
    const [old_price, setOld_price] = useState(0);
    const [sale_price, setSale_price] = useState(0);
    const [open, setOpen] = useState(false);
    useEffect(() => {
        if (is_type === 1 || is_type === "SERVICE") {
            if (detail?.special_price > 0) {
                setSale_price(detail?.special_price);
                setOld_price(detail?.retail_price);
            } else {
                setSale_price(detail?.retail_price);
            }
        } else if (is_type === 2 || is_type === "PRODUCT") {
            if (detail?.special_price > 0) {
                setSale_price(detail?.special_price);
                setOld_price(detail?.price);
            } else {
                setSale_price(detail?.price);
            }
        }
    }, [is_type, detail?.price, detail?.retail_price, detail?.special_price]);
    return (
        <>
            <div className="detail-name-mb">
                <div className="detail-name-mb__name">
                    {detail?.product_name
                        ? detail?.product_name
                        : detail?.service_name}
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
            <DetailControl
                open={open}
                setOpen={setOpen}
                detail={detail}
                is_type={is_type}
                org={org}
            />
        </>
    );
}

export default DetailNameMb;
