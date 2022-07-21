import React from "react";
import icon from "../../../../constants/icon";

export default function OrgMapItemMB(props: any) {
    const { item } = props;
    return (
        <div className="map-item__wrap">
            <div className="map-item__mobile">
                <div className="item-img">
                    <img src={item?.image_url} alt="" />
                </div>
                <div className="item-content">
                    <div className="item-content__name">
                        <p>{item?.name}</p>
                    </div>
                    <div className="item-content__address">
                        <p>{item?.full_address}</p>
                    </div>
                    <div className="item-content__evaluate">
                        <div className="evaluate-item">
                            <div className="evaluate-item__img">
                                <img src={icon.star} alt="" />
                            </div>
                            <p>5</p>
                        </div>
                        <div className="evaluate-item">
                            <div className="evaluate-item__img">
                                <img src={icon.cartCheckPurple} alt="" />
                            </div>
                            <p>10</p>
                        </div>
                        <div className="evaluate-item">
                            <div className="evaluate-item__img">
                                <img src={icon.heart} alt="" />
                            </div>
                            <p>
                                {item?.favorites_count
                                    ? item?.favorites_count
                                    : "0"}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
