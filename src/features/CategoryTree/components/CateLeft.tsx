import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { category } from '../../../data/category';
import { onChooseCate, fetchAsyncOrgCate } from '../../../redux/cate/cateSlice'

function CateLeft(props: any) {
    const dispatch = useDispatch();
    const { CATE } = useSelector((state: any) => state.CATE);
    const onClickChooseCate = (item: any) => {
        dispatch(onChooseCate(item))
        const values = {
            page: 1,
            tag: item?.title
        }
        dispatch(fetchAsyncOrgCate(values))
    }
    return (
        <div className="cate-cnt__left">
            <ul className="cate-list">
                {
                    category.map((item: any, index: number) => (
                        <li
                            onClick={() => onClickChooseCate(item)}
                            key={index}
                            style={
                                item.id === CATE?.id ? { backgroundColor: "var(--bgWhite)" } : {}
                            }
                        >
                            <div className="flex-column cate-list__item">
                                <img src={item.image} alt="" className="cate-list__item-img" />
                                <span className="cate-list__item-title">
                                    {item.title}
                                </span>
                            </div>
                        </li>
                    ))
                }
            </ul>
        </div>
    );
}

export default CateLeft;