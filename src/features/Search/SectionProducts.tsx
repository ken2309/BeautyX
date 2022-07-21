import React, { useContext } from 'react';
import { useDispatch } from 'react-redux';
import { AppContext } from '../../context/AppProvider';
import { IProductPromo } from '../../interface/productPromo';
import { onSetTabResult } from '../../redux/search/searchResultSlice';
import { onToggleSearchCnt } from '../../redux/search/searchSlice';
import ProductResultItem from './components/ProductResultItem';

function SectionProducts(props: any) {
    const { PRODUCTS, onGotoFilterResult, keyword } = props;
    const {t} = useContext(AppContext);
    const dispatch = useDispatch();
    const onViewMore = () => {
        if (onGotoFilterResult) {
            onGotoFilterResult()
            dispatch(onSetTabResult(2))
            dispatch(onToggleSearchCnt(false))
        }
    }
    return (
        PRODUCTS.products.length > 0 ?
            <div className='search-section-item'>
                <div className="flex-row-sp search-section-item__title">
                    {t("Mer_de.products")}
                    <span onClick={onViewMore} >{t("trending.watch_all")}</span>
                </div>
                <div className="search-section-item__list">
                    <ul className="list">
                        {
                            PRODUCTS.products.slice(0, 4).map((item: IProductPromo, index: number) => (
                                <li key={index}>
                                    <ProductResultItem
                                        product={item}
                                        keyword={keyword}
                                    />
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </div>
            :
            <></>
    );
}

export default SectionProducts;