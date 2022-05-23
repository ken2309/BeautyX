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
    const gotoListProvince = () => {
        history.push("/dia-diem-quan-tam");
        scrollTop();
    };

    return (
        <div className="home-province">
            <Container>
                <div className="flex-row-sp home-se-promo__header">
                    <HomeTitleSection
                        title={`${t("home_2.places_you_are_interested_in")}`}
                    />
                    <div onClick={gotoListProvince}>
                        <div className="flex-row cursor-pointer ">
                            <p
                                style={{
                                    fontSize: "14px",
                                    color: "var(--purple)",
                                }}
                            >
                                Xem thêm {">"}
                            </p>
                        </div>
                    </div>
                </div>
                <div className="home-province_list">
                    {provinces_org
                        ?.slice(0, 6)
                        .map((item: IProvince, index: number) => (
                            <div
                                onClick={() => gotoResult(item)}
                                key={index}
                                className="home-province_item"
                            >
                                <img
                                    src={`${item.media[1].original_url}`}
                                    alt=""
                                />
                                <div className="province-item-cnt">
                                    <span>{item.name}</span>
                                    <span>
                                        {item.organizations_count}{" "}
                                        {t("home_2.beauty_places")}{" "}
                                    </span>
                                </div>
                            </div>
                        ))}
                </div>
            </Container>
        </div>
    );
}

export default HomeProvince;
