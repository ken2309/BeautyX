import React, { useContext, useState } from "react";
import { IOrganization } from "../../../interface/organization";
import "./org-item.css";
import icon from "../../../constants/icon";
import img from "../../../constants/img";
import { useHistory } from "react-router-dom";
import scrollTop from "../../../utils/scrollTop";
import onErrorImg from "../../../utils/errorImg";
import { AppContext } from "../../../context/AppProvider";
import { useDispatch, useSelector } from "react-redux";
import {
    onDeleteFavoriteOrg,
    onFavoriteOrg,
} from "../../../redux/org/orgSlice";
import { onToggleFavoriteOrg } from "../../../redux/search/searchResultSlice";
import useDeviceMobile from "../../../utils/useDeviceMobile";
import { Drawer } from "@mui/material";
import OrgMapWrapper from "../../MerchantDetail/components/OrgMap/OrgMapWrapper";
import { fakeOrgStar } from "../../../utils/format";

interface IProps {
    org: IOrganization;
    changeStyle?: boolean;
}

function OrgItem(props: IProps) {
    const { org, changeStyle } = props;
    const { t } = useContext(AppContext);
    const history = useHistory();
    const { USER } = useSelector((state: any) => state.USER);
    const dispatch = useDispatch();
    const IS_MB = useDeviceMobile();
    const gotoDetail = () => {
        scrollTop();
        history.push({
            pathname: `/org/${org.subdomain}`,
            state: org,
        });
    };
    const [open, setOpen] = useState(false);
    const [openPopupMap, setOpenPopupMap] = useState(false);

    const handleFavoriteOrg = (org: any) => {
        if (USER) {
            dispatch(onToggleFavoriteOrg(org.id));
            if (org?.is_favorite) {
                dispatch(onDeleteFavoriteOrg(org));
            } else {
                dispatch(onFavoriteOrg(org));
            }
        } else {
            history.push("/sign-in?1");
        }
    };
    const handleOpenMap = () => {
        if (org?.branches.length > 0) {
            // open lit branch
            setOpen(true);
        } else {
            setOpenPopupMap(true);
        }
    };
    return (
        <>
            <div onClick={gotoDetail} className="re-org-item">
                {org?.is_momo_ecommerce_enable && (
                    <div className="re-org-item__enable">
                        <img src={icon.checkFlowOrange} alt="" />
                    </div>
                )}
                {changeStyle && IS_MB === true ? (
                    <>
                        <div className="re-change-banner">
                            <img
                                className="re-change-banner-bg"
                                src={
                                    org.image
                                        ? `${org.image_url}`
                                        : `${img.imgDefault}`
                                }
                                alt=""
                                onError={(e) => onErrorImg(e)}
                            />
                            <img
                                className="re-change-banner-img"
                                src={
                                    org.image
                                        ? `${org.image_url}`
                                        : `${img.imgDefault}`
                                }
                                alt=""
                                onError={(e) => onErrorImg(e)}
                            />
                            <div
                                className="re-change-favorite"
                                onClick={(e) => {
                                    handleFavoriteOrg(org);
                                    e.preventDefault();
                                    e.stopPropagation();
                                }}
                            >
                                <img
                                    src={
                                        org?.is_favorite
                                            ? icon.Favorite
                                            : icon.favoriteStroke
                                    }
                                    alt=""
                                />
                            </div>
                        </div>
                        <div className="re-change-wrap">
                            <div className="re-change-img">
                                <img
                                    src={
                                        org.image
                                            ? `${org.image_url}`
                                            : `${img.imgDefault}`
                                    }
                                    alt=""
                                    onError={(e) => onErrorImg(e)}
                                />
                            </div>
                            <div className="re-change-cnt">
                                <p className="re-change-cnt-name">{org.name}</p>
                                <p className="re-change-cnt-add">
                                    {org?.address}
                                </p>
                                <div className="re-change-cnt-review">
                                    <div className="change-review-item">
                                        <img src={icon.star} alt="" />
                                        <span>{org?.favorites.length}</span>
                                    </div>
                                    <div className="change-review-item">
                                        <img src={icon.Favorite} alt="" />
                                        <span>{org?.favorites.length}</span>
                                    </div>
                                    {org?.distance ? (
                                        <div className="change-review-item">
                                            <img src={icon.mapPinRed} alt="" />
                                            <span>
                                                {org?.distance < 1000
                                                    ? `${Math.round(
                                                          org?.distance
                                                      )}(m)`
                                                    : `${Math.round(
                                                          org?.distance / 1000
                                                      )}(km)`}
                                            </span>
                                        </div>
                                    ) : (
                                        <></>
                                    )}
                                </div>
                            </div>
                            <div
                                onClick={(e) => {
                                    handleOpenMap();
                                    e.preventDefault();
                                    e.stopPropagation();
                                }}
                                className="re-change-map"
                            >
                                <img src={icon.mapMarkerOrg} alt="" />
                                <span className="re-change-map-text">
                                    {t("pr.map")}
                                </span>
                                {org?.branches.length > 0 ? (
                                    <>
                                        <span className="re-change-map-total">
                                            {org?.branches.length} CN
                                        </span>
                                    </>
                                ) : null}
                            </div>
                        </div>
                    </>
                ) : (
                    <>
                        <div className="org-img-cnt">
                            <img
                                src={
                                    org.image
                                        ? `${org.image_url}`
                                        : `${img.imgDefault}`
                                }
                                alt=""
                                className="re-org-item__img"
                                onError={(e) => onErrorImg(e)}
                            />
                            <div className="flex-row org-img-cnt__rate">
                                <div
                                    style={{
                                        justifyContent: "flex-start",
                                        width: "100%",
                                    }}
                                    className="flex-row"
                                >
                                    <div className="flexX-gap-4 org-img-cnt__rate-item">
                                        <img src={icon.heart} alt="" />
                                        <span>{org?.favorites.length}</span>
                                    </div>
                                    <div className="flexX-gap-4 org-img-cnt__rate-item">
                                        <img src={icon.star} alt="" />
                                        <span>
                                            {fakeOrgStar(org.favorites.length)}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="re-org-item__cnt">
                            <span className="org_name">{org.name}</span>
                            <div className="org_address">
                                <img src={icon.mapPinRed} alt="" />
                                <span>{org?.address}</span>
                            </div>
                            {org?.distance ? (
                                <div className="flex-row org_distance">
                                    <div></div>
                                    {t("se.distance")}
                                    {": "}
                                    {org?.distance < 1000
                                        ? `${Math.round(org?.distance)}(m)`
                                        : `${Math.round(
                                              org?.distance / 1000
                                          )}(km)`}
                                </div>
                            ) : (
                                <></>
                            )}
                            {org?.tags && org?.tags.length > 0 && (
                                <>
                                    <span className="org_tag">
                                        <img src={icon.Menu} alt="" />
                                        {org?.tags
                                            ?.map((t: any) => t.name)
                                            .join(",")}
                                    </span>
                                </>
                            )}
                        </div>
                    </>
                )}
            </div>
            <Drawer open={open} anchor="bottom" onClose={() => setOpen(false)}>
                <div className="se-branch__drawer">
                    <p className="se-branch__title">
                        {t("Mer_de.list_branch")}
                    </p>
                    <div className="se-branch__list">
                        {org?.branches.map((item: any, index: number) => (
                            <div key={index} className="se-branch__item">
                                <div>
                                    <div className="branch-item__top">
                                        <div className="item-top__distance">
                                            <img src={icon.mapPinRed} alt="" />
                                            <span>3km</span>
                                        </div>
                                        <div className="item-top__name">
                                            <p>{item?.name}</p>
                                        </div>
                                    </div>
                                    <div className="branch-item__bottom">
                                        <div className="item-bottom__address">
                                            <p>{item?.address}</p>
                                        </div>
                                    </div>
                                </div>
                                <div
                                    onClick={(e) => {
                                        setOpenPopupMap(true);
                                        e.preventDefault();
                                        e.stopPropagation();
                                    }}
                                    className="branch-item__pinmap"
                                >
                                    <img src={icon.mapMarkerOrg} alt="" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </Drawer>
            <OrgMapWrapper
                open={openPopupMap}
                setOpen={setOpenPopupMap}
                org={org}
            />
        </>
    );
}

export default OrgItem;
