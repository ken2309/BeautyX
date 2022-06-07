import React from "react";

export default function ServiceDetailLeft(props: any) {
    const { org, service } = props;

    return (
        <>
            <div className="service-detail__left">
                <div className="detail-left__img">
                    <img src={service.image_url} alt="" />
                </div>
            </div>

            <div className="service-detail__info"></div>
        </>
    );
}
