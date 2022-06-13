import React from "react";
import icon from "../../../../constants/icon";
import { IOrganization } from "../../../../interface/organization";
import onErrorImg from "../../../../utils/errorImg";
interface IProps {
    item: IOrganization;
    handleSetLocation: any;
    location: any;
}
export default function OrgMapItem(props: IProps) {
    const { item, handleSetLocation, location } = props;
    return (
        <div
            onClick={() => {
                handleSetLocation(item);
            }}
            style={
                item.latitude === location.lat
                    ? {
                          backgroundColor: "var(--bgGray)",
                      }
                    : {
                          backgroundColor: "var(--bgWhite)",
                      }
            }
            className="dialog-map__item"
        >
            <div className="map-item__img">
                <img
                    onError={(e) => onErrorImg(e)}
                    src={item?.image_url}
                    alt=""
                />
            </div>
            <div className="map-item__content">
                <div className="map-item__name">
                    <p>{item?.name}</p>
                </div>
                <div className="map-item__address">
                    <p>{item?.address ? item?.address : item?.full_address}</p>
                </div>
                <div className="map-item__evaluate">
                    <div className="evaluate-item">
                        <img src={icon.star} alt="" />
                        <p>5</p>
                    </div>
                    <div className="evaluate-item">
                        <img src={icon.cartCheckPurple} alt="" />
                        <p>10</p>
                    </div>
                    <div className="evaluate-item">
                        <img src={icon.heart} alt="" />
                        <p>
                            {item?.favorites_count
                                ? item?.favorites_count
                                : "0"}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
