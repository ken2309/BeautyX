import React, { useContext, useState } from "react";
import icon from "../../../../constants/icon";
import TabTrust from "./TabTrust";
import TabDealHot from "./TabDealHot";
import TabDistance from "./TabDistance";
import { AppContext } from "../../../../context/AppProvider";
import useFullScreen from "../../../../utils/useFullScreen";
import slugify from "../../../../utils/formatUrlString";
import { useHistory } from "react-router-dom";

function HomeCard(props: any) {
    const { t } = useContext(AppContext);
    const fullScreen = useFullScreen();
    const history = useHistory();
    const cards = [
        { id: 1, title: t("home_2.hot_deal_locations"), icon: icon.fire },
        { id: 2, title: t("home_2.trusted_place"), icon: icon.shield },
        { id: 3, title: t("home_2.places_near_you_2"), icon: icon.distance },
    ];
    const handleGoPage = (cardItem: any) => {
        history.push({
            pathname: `/doanh-nghiep/${slugify(cardItem.title)}`,
            search: `${cardItem.id}`,
        });
    };
    const onActiveTab = (cardItem: any) => {
        if (fullScreen) {
            handleGoPage(cardItem);
        } else {
            setAcTab(cardItem.id);
        }
    };
    const [acTab, setAcTab] = useState(cards[0].id);
    const switchTab = () => {
        switch (acTab) {
            case 1:
                return <TabDealHot  card={cards[0]}/>;
            case 2:
                return <TabTrust  card={cards[1]}/>
            case 3:
                return <TabDistance  card={cards[2]}/>
            default:
                break;
        }
    };
    const gotoHomeResult = (e: any, cardItem: any) => {
        e.stopPropagation();
        handleGoPage(cardItem);
    };
    return (
        <div className="home-card-cnt">
            <div className="flex-row-sp home-card-cnt__left">
                <ul className="card-list">
                    {cards.map((item) => (
                        <li
                            onClick={() => onActiveTab(item)}
                            key={item.id}
                            className="flex-row-sp"
                            style={
                                item.id === acTab
                                    ? {
                                          backgroundColor:
                                              "rgba(227, 227, 227, 0.796)",
                                      }
                                    : {}
                            }
                        >
                            <div className="flex-row card-item-cnt">
                                <img src={item.icon} alt="" />
                                <span>{item.title}</span>
                            </div>
                            <div onClick={(e) => gotoHomeResult(e, item)}>
                                <img src={icon.chevronRightBlack} alt="" />
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="home-card-cnt__right">{switchTab()}</div>
        </div>
    );
}

export default HomeCard;
