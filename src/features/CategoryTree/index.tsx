/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import "./style.css";
import CateLeft from "./components/CateLeft";
import CateRight from "./components/CateRight";
import { useSelector, useDispatch } from "react-redux";
import { STATUS } from "../../redux/status";
import { fetchOrgsByTag } from "../../redux/CateTree/cateTreeSlice";
import { cateChild1 } from "../../data/category";
import Bottom from "../../featuresMobile/Bottom";
// ==== api tracking ====
 import tracking from "../../api/trackApi";
// end

function HomeCategory(props: any) {
    const { CATE, ORGS, SERVICES, VALUE, PRODUCTS } = useSelector(
        (state: any) => state.CATE_TREE
    );
    const dispatch = useDispatch();
    const catesChild = cateChild1.filter(
        (item) => item.cate_id === CATE.cate_id
    );
    const callOrgsByCateTag = () => {
        if (ORGS.status !== STATUS.SUCCESS) {
            const action = {
                tags: CATE.title,
                page: 1,
            };
            dispatch(fetchOrgsByTag(action));
        }
    };
    useEffect(() => {
        callOrgsByCateTag();
           if( ORGS.status === STATUS.SUCCESS || SERVICES.status === STATUS.SUCCESS || PRODUCTS.status === STATUS.SUCCESS)
            {
                tracking.CATEGORY_TREE_LOAD();
            }
    }, []);

    return (
        <>
            <div className="cate-tree-cnt">
                <CateLeft CATE={CATE} VALUE={VALUE} />
                <CateRight
                    CATE={CATE}
                    VALUE={VALUE}
                    catesChild={catesChild}
                    ORGS={ORGS}
                    SERVICES={SERVICES}
                    PRODUCTS={PRODUCTS}
                />
            </div>
            <Bottom />
        </>
    );
}

export default HomeCategory;
