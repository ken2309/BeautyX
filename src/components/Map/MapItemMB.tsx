import React from "react";
import { useHistory } from "react-router-dom";
import icon from "../../constants/icon";
import img from "../../constants/img";
import { IOrganization } from "../../interface/organization";
import onErrorImg from "../../utils/errorImg";
import { formatDistance } from "../../utils/format";

interface IProps{
    item: IOrganization,
    handleDirection?:() => void
}

export default function MapTagsItemMB(props: IProps) {
    const { item, handleDirection } = props;
    const history = useHistory();
    const gotoDetail = () => {
        history.push({
            pathname: `/org/${item.subdomain}`,
            // search: `${item.id}`,
            state: item,
        });
    };
    const onRouteDirection = (e:any) =>{
        e.stopPropagation()
        handleDirection&&handleDirection()
    }
    return (
        <div onClick={gotoDetail} className="map-item__wrap">
            <div className="map-item__mobile">
                <div className="item-img">
                    <img
                        onError={(e) => onErrorImg(e)}
                        src={item?.image_url ? item?.image_url : img.beautyX}
                        alt=""
                    />
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
                        {/* <div className="evaluate-item">
                            <div className="evaluate-item__img">
                                <img src={icon.cartCheckPurple} alt="" />
                            </div>
                            <p>10</p>
                        </div> */}
                        <div className="evaluate-item">
                            <div className="evaluate-item__img">
                                <img src={icon.heart} alt="" />
                            </div>
                            <p>
                                {item?.favorites?.length}
                            </p>
                        </div>
                        {item.distance && (
                            <div className="flex-row map-item__distance">
                                <img
                                    className="map-item__distance-icon"
                                    src={icon.pinMapRed}
                                    alt=""
                                />
                                {formatDistance(item.distance)}
                            </div>
                        )}
                    </div>
                    <button
                        onClick={(e)=>onRouteDirection(e)}
                        className="item-content__btn-direction"
                    >
                        Đường đi
                    </button>
                </div>
            </div>
        </div>
    );
}
