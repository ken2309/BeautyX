import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../../../context/AppProvider";
import { imgTag } from "../../../constants/img";
import icon from "../../../constants/icon";
import { useSelector } from "react-redux";
import { ITag } from "../../../interface/tags";
import onErrorImg from "../../../utils/errorImg";
import scrollTop from "../../../utils/scrollTop";

function HomeTags(props: any) {
    //const history = useHistory();
    const { t } = useContext(AppContext);
    const tagsList: ITag[] = useSelector((state: any) => state.HOME.tags);
    const tags = tagsList.filter(e => e.children && e.children?.length > 0 && e.organizations_count > 0);
    // console.log(t)
    const tags_data = [
        // { id: 9, title: t("home_2.places_near_you"), text: t("home_2.places_near_you"), img: icon.distance },
        { id: 4, title: "Spa", text: "Spa", img: imgTag.spa },
        { id: 3, title: "Salon", text: "Salon", img: imgTag.hairSalon },
        { id: 1, title: "Nail", text: "Nail", img: imgTag.nails },
        {
            id: 6,
            title: "clinic",
            text: "clinic",
            img: imgTag.clinic,
        },
        {
            id: 8,
            title: "Massage",
            text: "Massage",
            img: imgTag.massage,
        },
        {
            id: 5,
            title: "Thẩm mỹ viện",
            text: t("home_2.beauty_salon"),
            img: imgTag.skinCare,
        },
        {
            id: 2,
            title: "nha khoa",
            text: t("home_2.dentistry"),
            img: imgTag.nhaKhoa,
        },
        // { id: 7, title: 'Yoga', text: "Yoga", img: imgTag.yoga },
    ];
    // const gotoDetail = (tag: string) => {
    //     history.push({
    //         pathname: "/danh-muc/",
    //         search: `${tag}`,
    //     });
    // };
    return (
        <>
            {/* <div className="home-title__tag">
                <HomeTitleSection title={`${t("home_2.categories")}`} />
            </div> */}
            <div className="home-tags">
                <ul className="home-tags-list">
                    <li
                    //onClick={() => gotoDetail(item.title)}
                    >
                        <Link
                            to={{
                                pathname: "/ban-do",
                            }}
                            onClick={() => scrollTop()}
                            className="flex-column tag-item-cnt">
                            <img
                                // src={item.img.length > 0 ? item.img[0].original_url : ""} 
                                src={icon.locationCate}
                                onError={(e) => onErrorImg(e)} alt="" />
                            <div className="tag-item-title">Gần bạn</div>
                        </Link>
                    </li>
                    {tags_data.map((item) => (
                        <li
                            //onClick={() => gotoDetail(item.title)}
                            key={item.id}
                        >
                            <Link
                                to={{
                                    pathname: "/ket-qua/",
                                    search: `?tag=${item.title}`,
                                }}
                                onClick={() => scrollTop()}
                                className="flex-column tag-item-cnt">
                                <img
                                    // src={item.img.length > 0 ? item.img[0].original_url : ""} 
                                    src={item.img}
                                    onError={(e) => onErrorImg(e)} alt="" />
                                <div className="tag-item-title">{item.text}</div>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
}

export default HomeTags;
