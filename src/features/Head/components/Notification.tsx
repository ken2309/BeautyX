import React from 'react';
import icon from '../../../constants/icon';
import ButtonCus from '../../../components/ButtonCus';
import {useHistory} from 'react-router-dom'

const notifications = [
      {
            id: 1,
            orgName: 'Kanessa Beauty & Spa',
            detail: 'Chào Bình, 14h00 chiều này bạn có lịch hẹn điều trị buổi 2 liệu trình trị nám chuyên sâu tại Kanessa....',
            isRead: true
      },
      {
            id: 2,
            orgName: 'Spa',
            detail: 'Chào Bình, 14h00 chiều này bạn có lịch hẹn điều trị buổi 2 liệu trình trị nám chuyên sâu tại Kanessa....',
            isRead: true
      },
      {
            id: 3,
            orgName: 'Kanessa ',
            detail: 'Chào Bình, 14h00 chiều này bạn có lịch hẹn điều trị buổi 2 liệu trình trị nám chuyên sâu tại Kanessa....',
            isRead: false
      }
]
function Notification(props: any) {
      const { openNo } = props;
      const history = useHistory();
      return (
            <div
                  style={openNo === true ? { top: '3rem', opacity: '1', visibility: 'visible' } : { top: '5rem', opacity: '0', visibility: 'hidden' }}
                  className='hd-noti' id="notification"
            >
                  <div className='flex-row-sp hd-noti__head'>
                        <span className='hd-noti__head-text'>
                              Thông báo
                        </span>
                        <span className='flex-row hd-noti__head-count'>
                              Đánh dấu tất cả đã xem
                              <img src={icon.Check} alt="" />
                        </span>
                  </div>
                  <ul className='hd-noti__list'>
                        {
                              notifications.map(item => (
                                    <li
                                          key={item.id}
                                    >
                                          <div className='flex-row'>
                                                <img src={item.isRead === true ? icon.Check2 : icon.dotPurple} alt="" />
                                                <div
                                                      style={
                                                            item.isRead === true ?
                                                                  { opacity: '0.5' }
                                                                  :
                                                                  { opacity: '1' }
                                                      }
                                                      className='no-box-item__text'
                                                >
                                                      <p className='no-box-item__text-name'>
                                                            {item.orgName}
                                                      </p>
                                                      <p className='no-box-item__text-content'>
                                                            {item.detail}
                                                      </p>
                                                      <p className='no-box-item__text-time'>2 giờ trước</p>
                                                </div>
                                          </div>
                                    </li>
                              ))
                        }
                  </ul>
                  <ButtonCus
                        width='fit-content'
                        text='Xem tất cả thông báo'
                        fontSize='14px'
                        lineHeight='20px'
                        color='var(--purple)'
                        border='solid 1px var(--purple)'
                        borderRadius='26px'
                        imgIcon={icon.next}
                        onClick={() => history.push('/notifications')}
                  />
            </div>
      );
}

export default Notification;