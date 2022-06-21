import React from 'react';
import Search from '../Search';
import icon from '../../constants/icon';
import './style.css'
import { useDispatch } from 'react-redux';
import { onToggleSearchCnt } from '../../redux/search/searchSlice';
import { useHistory } from 'react-router-dom'

function HeadHomeMobile() {
    const dispatch = useDispatch();
    const history = useHistory();
    return (
        <>
            <Search />
            <div className='flex-row-sp head-home-mb'>
                <div
                    onClick={() => dispatch(onToggleSearchCnt(true))}
                    className="flex-row head-home-mb__input"
                >
                    <img src={icon.searchPurple} alt="" />
                    <span>Bạn muốn tìm gì ?</span>
                </div>
                <div className="head-home-mb__button">
                    <button
                        onClick={() => history.push("/lich-hen")}
                        className="head-home-mb__button-item"
                    >
                        <img src={icon.calendarPurpleBold} alt="" className="img-con" />
                    </button>
                    <button
                        onClick={() => history.push("/cart")}
                        className="head-home-mb__button-item"
                    >
                        <img src={icon.cartPurpleBold} alt="" className="img-con" />
                    </button>
                </div>
            </div>
        </>
    );
}

export default HeadHomeMobile;