import React from "react";
import onErrorImg from "../../../utils/errorImg";

export default function ServiceDetailLeft(props: any) {
    const { org, service } = props;
    console.log("org", org);
    return (
        <>
            <div className="service-detail__left">
                <div className="detail-left__img">
                    <img
                        src={
                            service.image_url
                                ? service.image_url
                                : org.image_url
                        }
                        alt=""
                        onError={(e) => onErrorImg(e)}
                    />
                </div>
            </div>

            <div className="service-detail__info"></div>
        </>
    );
}
