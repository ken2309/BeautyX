import React, { useEffect, useRef, useState } from "react";
import { IOrganization } from "../../../interface/organization";
import { onActiveTab } from "../../../redux/org/orgSlice";
import { useDispatch } from "react-redux";
import OrgDealHot from "./OrgPages/OrgDealHot";
import OrgServices from "./OrgPages/OrgServices";
import OrgProducts from "./OrgPages/OrgProducts";
import OrgCombos from "./OrgPages/OrgCombos";
import OrgInformation from "./OrgPages/OrgInformation";
import OrgReviews from "./OrgPages/OrgReviews";
import OrgGalleries from "./OrgPages/OrgGalleries/OrgGalleries";
import useFullScreen from "../../../utils/useFullScreen";
import { Tab, Tabs } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";

interface IProps {
    org: IOrganization;
    tab: number;
}
interface ITabs {
    id: number;
    title: string;
}

function OrgContainer(props: IProps) {
    const is_mb = useFullScreen();
    const { org, tab } = props;
    const [value, setValue] = useState<any>(1);
    let tabs = [
        { id: 1, title: "Deal Hot" },
        { id: 2, title: "Dịch vụ" },
        { id: 3, title: "Sản phẩm" },
        { id: 4, title: "Combos" },
        { id: 5, title: is_mb ? "Chi tiết" : "Doanh nghiệp" },
        { id: 6, title: "Đánh giá" },
        { id: 7, title: "Hình ảnh" },
    ];
    if (is_mb === false) {
        tabs = tabs.filter((item: any) => item.id !== 5);
    }
    let refMap = useRef<any>();
    let refReview = useRef<any>();
    const scrollMap = refMap?.current?.offsetTop;
    const scrollReview = refReview?.current?.offsetTop;
    const handleChange = (event: React.SyntheticEvent, value: any) => {
        console.log(value);
        setValue(value);
        let top;
        switch (value) {
            case 5:
                top = is_mb && 0;
                break;
            case 6:
                top = refReview?.current?.offsetTop + 180;
                break;
            default:
                break;
        }
        if (is_mb) {
            window.scrollTo({
                top: top,
                behavior: "smooth",
            });
        }
    };
    function handleScroll() {
        if (value === 5 || value === 6) {
            if (window.scrollY - 190 <= scrollReview) {
                setValue(5);
            } else if (window.scrollY >= scrollMap + 180) {
                setValue(6);
            }
        }
    }
    const onSwitchTab = (value: any) => {
        switch (value) {
            case 1:
                return <OrgDealHot />;
            case 2:
                return <OrgServices org={org} />;
            case 3:
                return <OrgProducts org={org} />;
            case 4:
                return <OrgCombos org={org} />;
            case 5:
                return (
                    <div className="org-information-cnt">
                        <OrgInformation refMap={refMap} org={org} />
                        <OrgReviews refReview={refReview} org={org} />
                    </div>
                );
            case 6:
                return (
                    <div className="org-information-cnt">
                        <OrgInformation refMap={refMap} org={org} />
                        <OrgReviews refReview={refReview} org={org} />
                    </div>
                );
            case 7:
                return <OrgGalleries />;
        }
    };
    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        console.log(document.body.offsetWidth);
        return () => {
            window.removeEventListener("scroll", handleScroll, false);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    });
    return (
        <>
            <div className="org-container">
                <div className="org-container__tab-cnt">
                    <TabContext value={value}>
                        <TabList
                            onChange={handleChange}
                            aria-label="lab API tabs example"
                        >
                            {tabs.map((item: ITabs, i: number) => (
                                <Tab
                                    key={i}
                                    label={item.title}
                                    value={item.id}
                                />
                            ))}
                        </TabList>
                        <TabPanel value={value}>{onSwitchTab(value)}</TabPanel>
                    </TabContext>
                    {/* <ul className="flex-row org-tab-list">
                        {
                            tabs.map(item => (
                                <li
                                    onClick={() => handleActiveTab(item.id)}
                                    key={item.id}
                                >
                                    <span
                                        style={
                                            tab === item.id ?
                                                {
                                                    color: "var(--purple)",
                                                    borderBottom: "solid 1px var(--purple)"
                                                }
                                                :
                                                {}
                                        }
                                        className="org-tab-list__item">
                                        {item.title}
                                    </span>
                                </li>
                            ))
                        }
                    </ul> */}
                </div>
            </div>
        </>
    );
}

export default OrgContainer;
