import React from "react";
import { useHistory } from "react-router-dom";
import "./homeTitle.css";

interface IProps {
    title: string;
    url?: string;
    seemore?: string;
}

function HomeTitle(props: IProps) {
    const { title, url, seemore } = props;
    const history = useHistory();
    return (
        <div className="home-title">
            <p className="home-title__text">{title}</p>
            <div
                onClick={() => history.push(`${url}`)}
                className="home-title__seemore"
            >
                <p>{seemore ? seemore : "Xem thêm >"}</p>
            </div>
        </div>
    );
}

export default HomeTitle;
