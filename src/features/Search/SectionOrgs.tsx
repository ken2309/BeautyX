import React from "react";
import { IOrganization } from "../../interface/organization";
import { Link } from "react-router-dom";
import { onToggleSearchCnt, addHistory } from "../../redux/search/searchSlice";
import { useDispatch } from "react-redux";

function SectionOrgs(props: any) {
    const { ORGS } = props;
    const handleOnclickItem = (item: any) => {
        const values = {
            TYPE: "ORG",
            id: item.id,
            item: item,
        };
        dispatch(addHistory(values));
    };
    const dispatch = useDispatch();
    return ORGS.orgs.length > 0 ? (
        <div className="search-section-item">
            <span className="search-section-item__title">Doanh nghiệp</span>
            <div className="search-empty-item__list">
                <ul className="list">
                    {ORGS.orgs
                        .slice(0, 6)
                        .map((item: IOrganization, index: number) => (
                            <li
                                onClick={() => handleOnclickItem(item)}
                                key={index}
                            >
                                <Link
                                    to={{
                                        pathname: `/org/${item.subdomain}`,
                                    }}
                                    className="flex-column search-empty-item__list-item"
                                    onClick={() =>
                                        dispatch(onToggleSearchCnt(false))
                                    }
                                >
                                    <img src={item.image_url} alt="" />
                                    <span>{item.name}</span>
                                </Link>
                            </li>
                        ))}
                </ul>
            </div>
        </div>
    ) : (
        <></>
    );
}

export default SectionOrgs;
