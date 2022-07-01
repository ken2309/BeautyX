/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useMemo } from 'react';
import Search from '../Search';
import icon from '../../constants/icon';
import './style.css'
import { useDispatch, useSelector } from 'react-redux';
import { onToggleSearchCnt } from '../../redux/search/searchSlice';
import { useHistory } from 'react-router-dom';
import { getTotal } from '../../redux/cartSlice';
import { AppContext } from '../../context/AppProvider';

function HeadHomeMobile() {
    const { t } = useContext(AppContext);
    const { appsToday } = useSelector((state: any) => state.APP.APPS);
    const dispatch = useDispatch();
    const history = useHistory();
    const { cartList, cartQuantity } = useSelector((state: any) => state.carts);
    useMemo(() => {
        dispatch(getTotal())
    }, [dispatch, cartList])
    const { USER } = useSelector((state: any) => state.USER);
    const onGotoCart = () => {
        if (USER) {
            history.push("/gio-hang")
        } else {
            history.push("/sign-in?1")
        }
    }

    return (
        <>
            <Search />
            <div className='flex-row-sp head-home-mb'>
                <div
                    onClick={() => dispatch(onToggleSearchCnt(true))}
                    className="flex-row head-home-mb__input"
                >
                    <img src={icon.searchPurple} alt="" />
                    <span>{t("se.search_title")}</span>
                </div>
                <div className="head-home-mb__button">
                    <button
                        onClick={() => history.push("/lich-hen")}
                        className="head-home-mb__button-item"
                    >
                        {
                            appsToday.length > 0 &&
                            <span className="badge">{appsToday.length}</span>
                        }
                        <img src={icon.calendarPurpleBold} alt="" className="img-con" />
                    </button>
                    <button
                        onClick={onGotoCart}
                        className="head-home-mb__button-item"
                    >
                        <span className="badge">{cartQuantity}</span>
                        <img src={icon.cartPurpleBold} alt="" className="img-con" />
                    </button>
                </div>
            </div>
        </>
    );
}

export default HeadHomeMobile;