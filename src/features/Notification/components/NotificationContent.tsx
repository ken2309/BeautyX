import React from 'react';
import icon from '../../../constants/icon';

function NotificationContent(props: any) {
    const { notiList } = props;
    return (
        <div className="noti-cnt__ct">
            <div className="flex-row-sp noti-cnt__ct-head">
                <span>Tất cả</span>
                <span className="flex-row">
                    Đánh dấu tất cả đã xem
                    <img src={icon.Check} alt="" />
                </span>
            </div>
            <div className="noti-cnt__ct-list">
                <ul>
                    {
                        notiList.map((item: any) => (
                            <li
                                key={item.id}
                                style={item.isRead === true ? { opacity: '0.6' } : {}}
                            >
                                <div className="flex-row noti-cnt__ct-list-item">
                                    <img
                                        src={item.isRead === true ? icon.Check2 : icon.dotPurple}
                                        alt=""
                                    />
                                    <div className="item-text">
                                        <span className="item-text__name">
                                            {item.orgName}
                                        </span>
                                        <div className="item-text__detail">
                                            {item.detail}
                                        </div>
                                        <div className="flex-row item-text__bottom">
                                            <span>2 giờ trước</span>
                                            <div>Xem chi tiết</div>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        ))
                    }
                </ul>
            </div>
        </div>
    );
}

export default NotificationContent;