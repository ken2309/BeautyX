/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import './style.css';
import { category } from '../../data/category';
import Bottom from '../../featuresMobile/Bottom/index';
import CateLeft from './components/CateLeft';
import CateRight from './components/CateRight';
import { onChooseCate } from '../../redux/cate/cateSlice'
import { useDispatch, useSelector } from 'react-redux';

function CategoryTree() {
    const dispatch = useDispatch();
    const { CATE } = useSelector((state: any) => state.CATE)
    useEffect(() => {
        if (!CATE) {
            dispatch(onChooseCate(category[0]))
        }
    }, [])

    return (
        <>
            <div className="cate-cnt">
                <CateLeft />
                <CateRight />
            </div>
            <Bottom />
        </>
    );
}

export default CategoryTree;