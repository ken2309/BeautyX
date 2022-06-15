import React from "react";
import { IOrganization } from "../../../interface/organization";
import "./org-item.css";
import icon from "../../../constants/icon";
import img from "../../../constants/img";
import { useHistory } from "react-router-dom";
import scrollTop from "../../../utils/scrollTop";
import onErrorImg from "../../../utils/errorImg";

interface IProps {
    org: IOrganization;
}

function OrgItem(props: IProps) {
    const { org } = props;
    const history = useHistory();
    const gotoDetail = () => {
        scrollTop();
        history.push({
            pathname: `/org/${org.subdomain}`,
            state: org,
        });
    };
    return (
        <div onClick={gotoDetail} className="re-org-item">
            <div className="org-img-cnt">
                <img
                    src={org.image ? `${org.image_url}` : `${img.imgDefault}`}
                    alt=""
                    className="re-org-item__img"
                    onError={(e) => onErrorImg(e)}
                />
                <div className="flex-row org-img-cnt__rate">
                    <div
                        style={{ justifyContent: "flex-start", width: "100%" }}
                        className="flex-row"
                    >
                        <div className="flexX-gap-4 org-img-cnt__rate-item">
                            <img src={icon.heart} alt="" />
                            <span>{org.favorites_count}</span>
                        </div>
                        <div className="flexX-gap-4 org-img-cnt__rate-item">
                            <img src={icon.star} alt="" />
                            <span>5</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="re-org-item__cnt">
                <span className="org_name">{org.name}</span>
                <div className="org_address">
                    <img src={icon.pinMap} alt="" />
                    <span>{org?.address}</span>
                </div>
                {org.distance ? (
                    <div className="flex-row org_distance">
                        <div></div>
                        khoảnh cách:
                        {org.distance < 1000
                            ? `${Math.round(org.distance)}(m)`
                            : `${Math.round(org.distance / 1000)}(km)`}
                    </div>
                ) : (
                    <></>
                )}
                {org.tags.length > 0 && (
                    <>
                        <span className="org_tag">
                            <img src={icon.Menu} alt="" />
                            {org.tags?.map((t: any) => t.name).join(",")}
                        </span>
                    </>
                )}
            </div>
        </div>
    );
}

export default OrgItem;
