import React, { useContext, useState } from 'react';
import './bottom.css';
//import icon from '../../constants/icon';
import { ICON } from '../../constants/icon2';
import { useHistory } from 'react-router-dom';
import SearchFilter from '../SearchResult/SearchFilter';
import { AppContext } from '../../context/AppProvider';
import scrollTop from '../../utils/scrollTop';
//import notifications from '../../data/listNotifications';
import { useLocation } from 'react-router-dom'

function Bottom(props: any) {
    const { t } = useContext(AppContext);
    const location = useLocation();
    const pathname = location.pathname;
    const Btns = [
        {
            id: 1,
            title: t('Home.location'),
            icon: ICON.location,
            iconAct: ICON.locationAct,
            path: "/home"
        },
        {
            id: 2,
            title: t('Home.trending'),
            icon: ICON.trend,
            iconAct: ICON.trendAct,
            path: "/beautyx-videos"
        },
        {
            id: 3,
            title: t('Home.cate'),
            icon: ICON.cate,
            iconAct: ICON.cateAct,
            path: "/",
        },
        {
            id: 4,
            title: t('Bottom.appointment'),
            icon: ICON.calendar,
            iconAct: ICON.calendarAct,
            path: "/Calendar"
        },
        {
            id: 5,
            title: t('Bottom.account'),
            icon: ICON.user,
            iconAct: ICON.userAct,
            path: "/tai-khoan/thong-tin-ca-nhan"
        }
        // {
        //       id: 2,
        //       title: t('Bottom.appointment'),
        //       icon_active: icon.Calendar,
        //       icon: icon.Calendar_1,
        //       path: '/Calendar',
        //       is_badge: false,
        // },
        // {
        //       id: 3,
        //       title: t('cart.noti'),
        //       icon_active: icon.Bell,
        //       icon: icon.Bell_1,
        //       path: '/Notifications',
        //       is_badge: true,
        //       count: notifications.filter((item: any) => item.isRead === false).length
        // },
        // {
        //       id: 1,
        //       title: t('Bottom.home'),
        //       icon_active: icon.home,
        //       icon: icon.home_1,
        //       path: '/home',
        //       is_badge: false,
        // },
        // {
        //       id: 5,
        //       title: "Video",
        //       icon_active: icon.playCirclePurple,
        //       icon: icon.playCircle,
        //       path: '/beautyx-videos',
        //       is_badge: false,
        //       count: notifications.filter((item: any) => item.isRead === false).length
        // },
        // {
        //       id: 4,
        //       title: t('Bottom.account'),
        //       icon_active: icon.User,
        //       icon: icon.User_1,
        //       path: '/tai-khoan/thong-tin-ca-nhan',
        //       is_badge: false,
        // },
    ]
    const [openFilter, setOpenFilter] = useState(false);
    const history = useHistory();
    const chooseBtn = (item: any) => {
        scrollTop();
        history.push(`${item.path}`)
    }
    return (
        <div className='bt'>
            <div className="flex-row-sp bt-cnt">
                {
                    Btns.map(item => (
                        <div
                            key={item.id}
                            onClick={() => chooseBtn(item)}
                            className="flex-column bt-cnt__item"
                        >
                            <img src={item.path === pathname ? item.iconAct : item.icon} alt="" />
                            {/* {
                                item.is_badge === true ?
                                    <span className="bt-cnt__item-badge">
                                        {item.count}
                                    </span>
                                    :
                                    <></>
                            } */}
                            <span
                                style={item.path === pathname ? { color: 'var(--purple)', fontWeight: '700' } : {}}
                                className="bt-cnt__item-title"
                            >
                                {item.title}
                            </span>
                        </div>
                    ))
                }
                {/* <div
                              onClick={() => setOpenFilter(true)}
                              className="flex-column bt-cnt__item"
                        >
                              <img src={icon.searchPurple} alt="" />
                              <span
                                    className="bt-cnt__item-title"
                              >
                                    {t('Bottom.search')}
                              </span>
                        </div> */}
            </div>
            <SearchFilter
                openFilter={openFilter}
                setOpenFilter={setOpenFilter}
            />
        </div>
    );
}

export default Bottom;