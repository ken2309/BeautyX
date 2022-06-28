/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { IOrganization } from "../../../interface/organization";
import OrgItem from "../../ViewItemCommon/OrgItem";
import HomeTitle from "../Components/HomeTitle";
import "./homeFavorite.css";
import { fetchAsyncOrgsFavorite } from '../../../redux/home/homePageSlice'
import { useDispatch, useSelector } from "react-redux";
import { STATUS } from '../../../redux/status'



export default function HomeFavorite() {
    const { ORGS_FAVORITE } = useSelector((state: any) => state.HOME_PAGE);
    const dispatch = useDispatch();
    const { orgs, status } = ORGS_FAVORITE;
    const callOrgsFavorite = () => {
        if (status !== STATUS.SUCCESS) {
            dispatch(fetchAsyncOrgsFavorite({
                page: 1
            }))
        }
    }
    useEffect(() => {
        callOrgsFavorite();
    }, [])

    return (
        <div className="home-favorite">
            <HomeTitle title={"Địa điểm yêu thích"} />
            <ul className="home-favorite__list">
                {orgs?.map((item: IOrganization, index: number) => (
                    <li key={index} className="home-favorite__item">
                        <OrgItem org={item} />
                    </li>
                ))}
            </ul>
        </div>
    );
}
