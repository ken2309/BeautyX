import React from 'react';
import SectionTitle from '../../SectionTitle';
import icon from '../../../constants/icon';

function NotificationNav(props: any) {
      const { chooseTab, setChooseTab, notifications } = props;
      const notiStatus = [
            { id: 1, title: 'Tất cả' },
            { id: 2, title: 'Chưa xem' },
            { id: 3, title: 'Đã xem' }
      ]
      const handleChooseTab=(id:number)=>{
            if(setChooseTab){
                  setChooseTab(id)
            }
      }
      return (
            <div className="noti-cnt_nav">
                  <SectionTitle
                        title="Thông báo"
                  />
                  <ul className="noti-cnt_nav-list">
                        {
                              notiStatus.map((item) => (
                                    <li
                                          key={item.id}
                                          className="flex-row-sp noti-cnt_nav-item"
                                          onClick={()=>handleChooseTab(item.id)}
                                    >
                                          <div
                                                style={chooseTab === item.id ? { color: 'var(--purple)' } : {}}
                                                className="flex-row noti-cnt_nav-item__cnt"
                                          >
                                                {item.title}
                                                {item.id === 2 ?
                                                      <span>
                                                            {notifications.filter((item: any) => item.isRead === false).length}
                                                      </span>
                                                      :
                                                      ''
                                                }
                                          </div>
                                          <img src={icon.chevronRight} alt="" />
                                    </li>
                              ))
                        }
                  </ul>
            </div>
      );
}

export default NotificationNav;