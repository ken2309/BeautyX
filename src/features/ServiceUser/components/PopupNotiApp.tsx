import React, { useContext } from 'react';
import { Dialog } from '@mui/material';
import icon from '../../../constants/icon';
import { AppContext } from "../../../context/AppProvider";
import {useHistory} from 'react-router-dom'

function PopupNotiApp(props: any) {
      const { t } = useContext(AppContext)
      const { open, setOpen, errCode } = props;
      const history = useHistory();
      return (
            <Dialog
                  open={open}
                  onClose={() => setOpen(false)}
            >
                  <div className="flex-column-sp ser-book-noti">
                        {
                              errCode === 200 ?
                                    <>
                                          <img src={icon.success} alt="" />
                                          <span className="flex-column-sp ser-book-noti__title">
                                                {t('my_ser.bk_success')}
                                          </span>
                                          <span 
                                                onClick={()=>history.push('/Calendar')}
                                                className="ser-book-noti__text"
                                          >
                                                {t('my_ser.rv_booked')}
                                                <h4 style={{ color: 'var(--purple)', cursor: 'pointer' }} >{t('booking.here')}</h4>
                                          </span>
                                    </>
                                    :
                                    <>
                                          <span className="flex-column-sp ser-book-noti__title">
                                                {t('my_ser.bk_fail')}
                                          </span>
                                          <span className="ser-book-noti__text">
                                                {t('my_ser.bk_fail_title')}
                                                <h4 style={{ color: 'var(--purple)', cursor: 'pointer' }} >
                                                      ({t('my_ser.code_err')} {errCode})
                                                </h4>
                                          </span>
                                    </>
                        }
                  </div>
            </Dialog>
      );
}

export default PopupNotiApp;