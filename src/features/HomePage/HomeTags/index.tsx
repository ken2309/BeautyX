import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { AppContext } from "../../../context/AppProvider";
import { imgTag } from "../../../constants/img";

function HomeTags(props: any) {
    const history = useHistory();
    const { t } = useContext(AppContext);
    const tags = [
        { id: 4, title: "Spa", text: "Spa", img: imgTag.spa },
        { id: 3, title: "Salon", text: "Salon", img: imgTag.hairSalon },
        { id: 1, title: "Nail", text: "Nail", img: imgTag.nails },
        {
            id: 6,
            title: "Message Center",
            text: "Message Center",
            img: imgTag.message,
        },
        {
            id: 5,
            title: "Thẩm mỹ viện",
            text: t("home_2.beauty_salon"),
            img: imgTag.skinCare,
        },
        {
            id: 2,
            title: "Phòng khám",
            text: t("home_2.clinic"),
            img: imgTag.nhaKhoa,
        },
        //{ id: 7, title: 'Yoga', img: imgTag.yoga },
    ];
    const gotoDetail = (tag: string) => {
        history.push({
            pathname: "/danh-muc/",
            search: `${tag}`,
        });
    };
    return (
        <>
            {/* <div className="home-title__tag">
                <HomeTitleSection title={`${t("home_2.categories")}`} />
            </div> */}
            <div className="home-tags">
                <ul className="home-tags-list">
                    {tags.map((item) => (
                        <li
                            onClick={() => gotoDetail(item.title)}
                            key={item.id}
                        >
                            <div className="flex-column tag-item-cnt">
                                <img src={item.img} alt="" />
                                <span>{item.text}</span>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
}

export default HomeTags;
