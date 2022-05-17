import React, { useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import icon from '../../../constants/icon';
import { AppContext } from '../../../context/AppProvider';
import { clearProducts, fetchAsyncProducts } from '../../../redux/org_products/orgProductsSlice';

function ProductsCateMb(props: any) {
    const { t } = useContext(AppContext)
    const { cate_id, setCate_id, org } = props;
    const dispatch = useDispatch();
    const { CATE } = useSelector((state: any) => state.ORG_PRODUCTS);
    const { categories } = CATE
    const handleActiveCateClick = (cate: any) => {
        setCate_id(cate.id);
        const values = {
            page: 1,
            cate_id: cate.id,
            org_id: org?.id
        }
        dispatch(clearProducts())
        dispatch(fetchAsyncProducts(values))
    };
    return (
        <div className="mb-cate-wrapper">
            <div className="flex-row-sp mb-cate__filter">
                <input type="text" placeholder='Tim kiem  ' />
                <img className="mb-cate__filter-search" src={icon.searchPurple} alt="" />
                <img src={icon.filter} alt="" />
            </div>
            <div className="mb-cate__list-cate">
                <ul className="mb-cate__list">
                    <li>
                        <button
                            onClick={() => setCate_id(null)}
                            style={!cate_id ?
                                { backgroundColor: 'var(--purple)', color: 'var(--bgWhite)' }
                                :
                                {}}
                            className="mb-cate__list-item"
                        >
                            {t("cart.all")}
                        </button>
                    </li>
                    {
                        categories.map((item: any) => (
                            <li key={item.id} >
                                <button
                                    style={cate_id === item.id ?
                                        {
                                            backgroundColor: 'var(--purple)',
                                            color: 'var(--bgWhite)'
                                        }
                                        :
                                        {}}
                                    onClick={() => handleActiveCateClick(item)}
                                    className="mb-cate__list-item"
                                >
                                    {item.name}
                                </button>
                            </li>
                        ))
                    }
                </ul>
            </div>
        </div>
    );
}

export default ProductsCateMb;