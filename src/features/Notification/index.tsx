import React, { useEffect, useState } from 'react';
import Bottom from '../../featuresMobile/Bottom';
import Head from '../Head';
import Footer from '../Footer';
import NotificationNav from './components/NotificationNav';
import NotificationContent from './components/NotificationContent';
import { Container } from '@mui/material';
import './notification.css';
import notifications from '../../data/listNotifications'

interface Noti {
      id: number,
      orgName: string,
      detail: string,
      isRead: boolean
}
function Notification() {
      const [chooseTab, setChooseTab] = useState(1);
      const [notiList, setNotiList] = useState<Noti[]>([]);
      useEffect(() => {
            if (chooseTab === 1) {
                  setNotiList(notifications)
            } else if (chooseTab === 2) {
                  setNotiList(notifications.filter((item: any) => item.isRead === false))
            } else if (chooseTab === 3) {
                  setNotiList(notifications.filter((item: any) => item.isRead === true))
            }
      }, [chooseTab])
      return (
            <>
                  <Head />
                  <div className="noti">
                        <Container>
                              <div className="flex-row-sp noti-cnt">
                                    <NotificationNav
                                          chooseTab={chooseTab}
                                          setChooseTab={setChooseTab}
                                          notifications={notifications}
                                    />
                                    <NotificationContent
                                          notiList={notiList}
                                    />
                              </div>
                        </Container>
                  </div>
                  <Footer/>
                  <Bottom />
            </>
      );
}

export default Notification;