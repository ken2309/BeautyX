import React, { useContext } from "react";
import { useHistory, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { AppContext } from "../../../context/AppProvider";
import { IProvince } from "../../../interface/provinces";
import scrollTop from "../../../utils/scrollTop";
import HomeTitle from "../Components/HomeTitle";
import { formatRoundOrgCount } from "../../../utils/format";

function HomeProvince(props: any) {
    const { t } = useContext(AppContext);
    const HOME = useSelector((state: any) => state.HOME);
    const { provinces_org } = HOME;
    //const history = useHistory();
    // const gotoResult = (province: IProvince) => {
    //     history.push({
    //         pathname: `/khu-vuc/`,
    //         search: `${province.name},${province.province_code}`,
    //     });
    //     scrollTop();
    // };

    return (
        <div className="home-province">
            <HomeTitle
                title={t("home_2.places_you_are_interested_in")}
                url={"/dia-diem-quan-tam"}
                seemore={t("trending.watch_all") + " > "}
            />
            <div className="home-province_list">
                {provinces_org
                    ?.slice(0, 6)
                    .map((item: IProvince, index: number) => (
                        <Link
                            to={{
                                pathname: "/ket-qua/",
                                search: `?province=${item.province_code}&&name=${item.name}`,
                            }}
                            onClick={() => scrollTop()}
                            key={index}
                            className="home-province_item"
                        >
                            <img src={`${item.media[1].original_url}`} alt="" />
                            <div className="province-item-cnt">
                                <span>{item.name}</span>
                                <span>
                                    {formatRoundOrgCount(item.organizations_count +
                                        item.branches_count)}{" "}
                                    {t("home_2.beauty_places")}{" "}
                                </span>
                            </div>
                        </Link>
                    ))}
            </div>
        </div>
    );
}

export default HomeProvince;
