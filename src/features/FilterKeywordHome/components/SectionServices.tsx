import React, { useContext } from "react";
import icon from "../../../constants/icon";
import { IServicePromo } from "../../../interface/servicePromo";
import onErrorImg from "../../../utils/errorImg";
import formatPrice from "../../../utils/formatPrice";
import slugify from "../../../utils/formatUrlString";
import scrollTop from "../../../utils/scrollTop";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchAsyncServiceDetail } from "../../../redux/org_services/serviceSlice";

// google tag event
import { GoogleTagPush, GoogleTagEvents } from "../../../utils/dataLayer";
import { AppContext } from "../../../context/AppProvider";
// end
function SectionServices(props: any) {
    const { services, setOpenSearch, hiddenFilter } = props;
    const history = useHistory();
    const { t } = useContext(AppContext);
    const dispatch = useDispatch();
    const gotoDetail = (service: IServicePromo) => {
        GoogleTagPush(GoogleTagEvents.PRODUCT_CLICK);
        if (hiddenFilter) {
            hiddenFilter();
        }
        if (setOpenSearch) {
            setOpenSearch(false);
        }
        scrollTop();
        history.push({
            pathname: `/dich-vu/${slugify(service.service_name)}`,
            search: `id=${service.service_id}?org=${service.org_id}`,
        });
        const values = {
            org_id: service.org_id,
            ser_id: service.service_id,
        };
        dispatch(fetchAsyncServiceDetail(values));
    };
    return (
        <div className="filter-home-sec-item">
            <span className="sec-title">{t("Mer_de.services")}</span>
            <ul className="org-lits">
                {services
                    .slice(0, 3)
                    .map((item: IServicePromo, index: number) => (
                        <li key={index} onClick={() => gotoDetail(item)}>
                            <div className="org-item">
                                <img
                                    onError={(e) => onErrorImg(e)}
                                    src={
                                        item?.image_url
                                            ? `${item.image_url}`
                                            : `${item?.org_image}`
                                    }
                                    alt=""
                                    className="org-item__img"
                                />
                                <div className="org-item__cnt">
                                    <span className="org-name">
                                        {item.service_name}
                                    </span>
                                    <div className="org-address">
                                        <img src={icon.pinMap} alt="" />
                                        <span>
                                            {item.org_district_name},
                                            {item.org_province_name}
                                        </span>
                                    </div>
                                    {item._geoDistance ? (
                                        <>
                                            <div className="org-address">
                                                <div className="dot"></div>
                                                <div>
                                                    <span>
                                                        {t("se.distance")} :
                                                        {item._geoDistance <
                                                        1000
                                                            ? `${Math.round(
                                                                  item._geoDistance
                                                              )}(m)`
                                                            : `${Math.round(
                                                                  item._geoDistance /
                                                                      1000
                                                              )}(km)`}
                                                    </span>
                                                </div>
                                            </div>
                                        </>
                                    ) : (
                                        <></>
                                    )}
                                    <div className="flex-row ser-price">
                                        {item.special_price > -1 ? (
                                            <>
                                                <span>
                                                    {formatPrice(
                                                        item.special_price
                                                    )}
                                                    đ
                                                </span>
                                                {/* <span>{formatPrice(item.price)}đ</span> */}
                                            </>
                                        ) : (
                                            <span
                                                style={{
                                                    color: "var(--purple)",
                                                }}
                                            >
                                                {formatPrice(item.price)}đ
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </li>
                    ))}
            </ul>
        </div>
    );
}

export default SectionServices;
