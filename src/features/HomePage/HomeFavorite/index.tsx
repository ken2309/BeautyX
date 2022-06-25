import React, { useEffect, useState } from "react";
import orgApi from "../../../api/organizationApi";
import { IOrganization } from "../../../interface/organization";
import OrgItem from "../../ViewItemCommon/OrgItem";
import HomeTitle from "../Components/HomeTitle";
import "./homeFavorite.css";

interface IData {
    orgs: IOrganization[];
}
export default function HomeFavorite() {
    const [data, setData] = useState<IData>({
        orgs: [],
    });
    const getAllOrg = async () => {
        try {
            const res = await orgApi.getAll();
            setData({ ...data, orgs: res?.data?.context?.data });
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        getAllOrg();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="home-favorite">
            <HomeTitle title={"Địa điểm yêu thích"} seemore={"Xem tất cả >"} />
            <ul className="home-favorite__list">
                {data?.orgs?.map((item: IOrganization, index: number) => (
                    <li key={index} className="home-favorite__item">
                        <OrgItem org={item} />
                    </li>
                ))}
            </ul>
        </div>
    );
}
