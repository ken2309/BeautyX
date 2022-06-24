import React, { useContext } from "react";
import { AppContext } from "../../../../context/AppProvider";
import HomeTitleSection from "../HomeTitleSection/index";
import { IProvince } from "../../../../interface/provinces";
import { Container } from "@mui/material";
import icon from "../../../../constants/icon";
import { useHistory } from "react-router-dom";
import scrollTop from "../../../../utils/scrollTop";
import { useSelector } from "react-redux";

function HomeProvince(props: any) {
    const HOME = useSelector((state: any) => state.HOME);
    const { provinces_org } = HOME;
    const { t } = useContext(AppContext);
    const history = useHistory();
    const gotoResult = (province: IProvince) => {
        history.push({
            pathname: `/khu-vuc/`,
            search: `${province.name},${province.province_code}`,
        });
        scrollTop();
    };

    return (
        <div className="home-province">
            <HomeTitleSection
                title={`${t("home_2.places_you_are_interested_in")}`}
                url={`/dia-diem-quan-tam`}
                seemore={"Xem tất cả >"}
            />

            <div className="home-province_list">
                {provinces_org
                    ?.slice(0, 6)
                    .map((item: IProvince, index: number) => (
                        <div
                            onClick={() => gotoResult(item)}
                            key={index}
                            className="home-province_item"
                        >
                            <img src={`${item.media[1].original_url}`} alt="" />
                            <div className="province-item-cnt">
                                <span>{item.name}</span>
                                <span>
                                    {item.organizations_count + item.branches_count}{" "}
                                    {t("home_2.beauty_places")}{" "}
                                </span>
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    );
}

export default HomeProvince;
