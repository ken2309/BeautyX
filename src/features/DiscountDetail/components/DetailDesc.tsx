import React, { useContext, useState } from "react";
import SectionTitle from "../../SectionTitle";
import icon from "../../../constants/icon";
import { imgRotate } from "../../../utils/imgRotate";
import { AppContext } from "../../../context/AppProvider";

function DetailDesc(props: any) {
    const { discount } = props;
    const detailDiscountItem = discount.productable;
    const [viewMore, setViewMore] = useState(false);
    const { t } = useContext(AppContext);
    return (
        <div className="product-desc">
            <SectionTitle title={detailDiscountItem?.service_name} />
            <div
                style={
                    viewMore === true
                        ? {
                              height: "max-content",
                              boxShadow: "unset",
                              maxHeight: "1000px",
                          }
                        : {
                              height: "70px",
                          }
                }
                className={
                    detailDiscountItem?.description ? "product-desc__text" : ""
                }
            >
                <div>
                    {detailDiscountItem?.description ? (
                        <p>
                            Mô tả: <br />{" "}
                            <span>{detailDiscountItem?.description}</span>
                        </p>
                    ) : (
                        <p style={{ fontSize: "14px" }}>Mô tả: Đang cập nhật</p>
                    )}
                </div>
            </div>
            {detailDiscountItem?.description && (
                <span
                    onClick={() => setViewMore(!viewMore)}
                    className="flex-row product-desc__more"
                >
                    <img
                        style={viewMore === true ? imgRotate : {}}
                        src={icon.down}
                        alt=""
                    />
                    {viewMore === true
                        ? t("Mer_de.hide")
                        : t("Mer_de.view_more")}
                </span>
            )}
        </div>
    );
}

export default DetailDesc;
