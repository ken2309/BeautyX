import React from 'react';
import { IProductPromo } from '../../interface/productPromo';
import ProductResultItem from './components/ProductResultItem';

function SectionProducts(props: any) {
    const { PRODUCTS } = props;
    return (
        PRODUCTS.products.length > 0 ?
            <div className='search-section-item'>
                <span className="search-section-item__title">
                    Sản phẩm
                </span>
                <div className="search-section-item__list">
                    <ul className="list">
                        {
                            PRODUCTS.products.slice(0, 4).map((item: IProductPromo, index: number) => (
                                <li key={index}>
                                    <ProductResultItem
                                        product={item}
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