import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import icon from "../../../constants/icon";
import { Combo } from "../../../interface/combo";
import { IOrganization } from "../../../interface/organization";
import {
    onDeleteFavorite,
    onFavoriteProduct,
} from "../../../redux/org_products/productSlice";
import onErrorImg from "../../../utils/errorImg";
import formatPrice from "../../../utils/formatPrice";

interface IProps {
    combo: Combo;
    org: IOrganization;
}

function ComboDetailLeft(props: IProps) {
    const { combo, org } = props;
    console.log("combo", combo);
    const dispatch = useDispatch();
    const history = useHistory();
    const percent = Math.round(100 - (combo?.use_value / combo?.price) * 100);
    const { USER } = useSelector((state: any) => state.USER);
    //  const onFavorite = () => {
    //      if (USER) {
    //          const values = {
    //              combo: combo,
    //              org_id: org?.id,
    //          };
    //          if (combo.is_favorite) {
    //              dispatch(onDeleteFavorite(values));
    //          } else {
    //              dispatch(onFavoriteProduct(values));
    //          }
    //      } else {
    //          history.push("/sign-in?1");
    //      }
    //  };
    return (
        <>
            <div className="service-detail__left">
                <div className="detail-left__img">
                    <img
                        src={
                            combo?.image_url ? combo?.image_url : org?.image_url
                        }
                        alt=""
                        onError={(e) => onErrorImg(e)}
                    />
                </div>
                {/* detail service mobile */}
                <div className="service-detail__mobile">
                    <div className="service-detail__mobile-top">
                        <p className="service-detail__mobile-name">
                            {/* {combo.service_name} */}
                        </p>
                        <div className="service-detail__mobile-favorite">
                            <img src={icon.heart} alt="" />
                        </div>
                    </div>

                    <div className="service-detail__mobile-mid">
                        <img src={icon.alarmClock} alt="" />
                        <p className="service-detail__mobile-duration">
                            {combo.expired} phút
                        </p>
                    </div>

                    <div className="service-detail__mobile-bottom">
                        {combo?.use_value > 0 && (
                            <div className="service-detail__mobile-percent">
                                Giảm {percent}%
                            </div>
                        )}
                        <div className="service-detail__mobile-price">
                            {combo?.use_value > 0 ? (
                                <>
                                    <span>
                                        {formatPrice(combo?.use_value)}đ
                                    </span>
                                    <span>{formatPrice(combo?.price)}đ</span>
                                </>
                            ) : (
                                <span>{formatPrice(combo?.price)}đ</span>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ComboDetailLeft;
