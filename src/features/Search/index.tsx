import React, { useCallback, KeyboardEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dialog } from '@mui/material';
import {
    onToggleSearchCnt,
    fetchOrgsBySearch,
    onSetKeyword,
    fetchProductsBySearch,
    fetchServicesBySearch
} from '../../redux/search/searchSlice';
import icon from '../../constants/icon';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import _, { debounce } from 'lodash';
import './style.css'
import { useHistory } from 'react-router-dom';
import SectionOrgs from './SectionOrgs';
import SectionServices from './SectionServices';
import SectionProducts from './SectionProducts';
import SectionEmpty from './SectionEmpty';
import useFullScreen from '../../utils/useFullScreen';

function Search() {
    const IS_MB = useFullScreen();
    const { open, keyword, ORGS, SERVICES, PRODUCTS } = useSelector((state: any) => state.SEARCH);
    const dispatch = useDispatch();
    const history = useHistory();
    const onClose = () => {
        dispatch(onToggleSearchCnt(false))
    }

    const callByFilter = (keyword: string) => {
        dispatch(fetchOrgsBySearch({
            keyword: keyword
        }))
        dispatch(fetchProductsBySearch({
            keyword: keyword
        }))
        dispatch(fetchServicesBySearch({
            keyword: keyword
        }))
    }


    // eslint-disable-next-line react-hooks/exhaustive-deps
    const debounceDropDown = useCallback(debounce((nextValue) => callByFilter(nextValue), 1000), [])
    const handleOnChangeInput = (e: any) => {
        debounceDropDown(e.target.value)
        dispatch(onSetKeyword(e.target.value))
    }
    const onGotoFilterResult = () => {
        history.push({
            pathname: "/ket-qua-tim-kiem/",
            search: `${keyword}`,
        });
    }
    const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.code === "Enter" || event?.nativeEvent.keyCode === 13) {
            onGotoFilterResult()
            dispatch(onToggleSearchCnt(false))
        }
    };
    const listSection = [
        { element: <SectionOrgs ORGS={ORGS} />, total: ORGS.totalItem },
        { element: <SectionProducts PRODUCTS={PRODUCTS} />, total: PRODUCTS.totalItem },
        { element: <SectionServices SERVICES={SERVICES} />, total: SERVICES.totalItem },
    ]
    const listSectionDisplay = listSection.sort((a, b) => b.total - a.total)
    return (
        <Dialog
            open={open}
            onClose={onClose}
            fullScreen={IS_MB ? true : false}
        >
            <div className="search-cnt">
                <div className="search-cnt__head">
                    {IS_MB && <img onClick={() => dispatch(onToggleSearchCnt(false))} src={icon.chevronLeft} alt="" />}
                    <div className="search-cnt__head-input">
                        <img src={icon.searchPurple} alt="" className="search-cnt__head-icon" />
                        <input
                            value={keyword}
                            onChange={handleOnChangeInput}
                            onKeyDown={handleKeyDown}
                            type="text"
                            placeholder='Nhập từ khóa tìm kiếm...'
                        />
                        {
                            keyword.length > 0 &&
                            <img
                                onClick={() => dispatch(onSetKeyword(""))}
                                src={icon.closeCircle}
                                alt=""
                                className="search-cnt__head-icon-x"
                            />
                        }
                    </div>
                </div>
                {
                    keyword.length > 0 ?
                        <div className="search-cnt__body">
                            {
                                listSectionDisplay.map((item, index) => (
                                    <div key={index}>
                                        {item.element}
                                    </div>
                                ))
                            }
                        </div>
                        :
                        <div className="search-cnt__body">
                            <SectionEmpty />
                        </div>
                }
            </div>
        </Dialog>
    );
}

export default Search;