import React from "react";
import { useHistory } from "react-router-dom";
import "../../../home-se.css";

interface IProps {
    title: string;
    url?: string;
    seemore?: string;
}

function HomeTitleSection(props: IProps) {
    const { title, url, seemore } = props;
    const history = useHistory();
    return (
        <div className="flex-row-sp home-se-promo__header">
            <div className="home-se-sec-title">{title}</div>
            <div onClick={() => history.push({ url })}>
                <div className="flex-row cursor-pointer">
                    <p
                        style={{
                            fontSize: "16px",
                            color: "var(--purple)",
                            fontWeight: "bold",
                        }}
                    >
                        {seemore ? seemore : "Xem thêm >"}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default HomeTitleSection;
