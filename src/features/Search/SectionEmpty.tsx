import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import icon from "../../constants/icon";
import { removeKeyWord } from "../../redux/search/searchSlice";
const listRecomment = [
    {
        id: 1,
        title: "Hồ Chí Minh",
    },
    {
        id: 2,
        title: "Gội đầu",
    },
    {
        id: 3,
        title: "Tắm trắng toàn thân",
    },
    {
        id: 4,
        title: "Skin care",
    },
    {
        id: 5,
        title: "Massage",
    },
];
function SectionEmpty() {
    const dispatch = useDispatch();
    const { HISTORY } = useSelector((state: any) => state.SEARCH);
    const filterOrg = HISTORY.filter((item: any) => item.TYPE === "ORG").map(
        (i: any) => {
            return i.item;
        }
    );
    const filterKeyWord = HISTORY.filter(
        (item: any) => item.TYPE === "KEYWORD"
    ).map((i: any) => i.item);
    const handleRemoveKeyWord = (item: any) => {
        dispatch(removeKeyWord(item));
    };

    return (
        <>
            <div className="search-empty-item">
                <div className="flex-row-sp search-empty-item__head">
                    <span>Tìm kiếm gần đây</span>
                    <span>{"Xem tất cả >"}</span>
                </div>
                <div className="search-empty-item__list">
                    <ul className="list">
                        {filterOrg.map((item: any, index: number) => (
                            <li key={index}>
                                <Link
                                    to={{
                                        pathname: `/org/${item.subdomain}`,
                                    }}
                                    className="flex-column search-empty-item__list-item"
                                >
                                    <img src={item.image_url} alt="" />
                                    <span>{item.name}</span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                    <ul className="keyword-list">
                        {filterKeyWord.map((item: any, index: number) => (
                            <li className="keyword-item" key={index}>
                                <div className="flexX-gap-8">
                                    <img
                                        style={{ width: "20px" }}
                                        src={icon.tumerGray}
                                        alt=""
                                    />
                                    <p className="keyword-item__title">
                                        {item}
                                    </p>
                                </div>
                                <img
                                    style={{ width: "24px" }}
                                    onClick={() => handleRemoveKeyWord(item)}
                                    src={icon.x}
                                    alt=""
                                />
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <div className="search-empty-item">
                <div className="flex-row-sp search-empty-item__head">
                    <span>Gợi ý tìm kiếm</span>
                </div>
                <ul className="keyword-list mt-24">
                    {listRecomment.map((item: any, index: number) => (
                        <li
                            style={{ margin: "2px 0" }}
                            key={index}
                            className="keyword-item"
                        >
                            <div className="flexX-gap-8">
                                <img
                                    style={{ width: "18px" }}
                                    src={icon.searchGray}
                                    alt=""
                                />
                                <p
                                    style={{ color: "var(--text-black)" }}
                                    className="keyword-item__title"
                                >
                                    {item.title}
                                </p>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
}

export default SectionEmpty;
