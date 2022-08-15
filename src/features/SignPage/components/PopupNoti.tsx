import React, {useContext} from 'react';
import { Dialog } from '@mui/material';
import icon from '../../../constants/icon';
import ButtonCus from '../../../components/ButtonCus';
import { useHistory } from 'react-router-dom'
import { AppContext } from '../../../context/AppProvider';

function PopupNoti(props: any) {
      const { t } = useContext(AppContext);
      const { popup, setPopup, isSignIn, title, setActiveTabSign } = props;
      const history = useHistory();
      const gotoPageSignIn = () => {
            if (isSignIn === true) {
                   setPopup(false)
                  history.push({ pathname: '/sign-up', search: '2' })
            } else {
                   setPopup(false)
                   setActiveTabSign(1)
                  history.push({ pathname: '/sign-in', search: '1' })
            }
      }
      return (
            <Dialog
                  open={popup}
                  onClose={() => setPopup(false)}
            >
                  <div className="flex-column sign-up-noti">
                        <img
                              style={isSignIn ? { display: 'none' } : {}}
                              className="sign-up-noti__check"
                              src={icon.success} alt=""
                        />
                        <span>
                              {isSignIn === true ? title : t('form.register_success')}
                        </span>
                        <div className="flex-row-sp sign-up-noti__btn">
                              <ButtonCus
                                    border="solid 1px var(--purple)"
                                    margin="0px 8px"
                                    borderRadius="16px"
                                    text={isSignIn === true ? `${t('Home.Sign_up')} ${t('form.now')}` : `${t('Home.Sign_in')} ${t('form.now')}`}
                                    backColor="var(--purple)"
                                    color="var(--bgWhite)"
                                    onClick={gotoPageSignIn}
                              />
                              <ButtonCus
                                    border="solid 1px var(--purple)"
                                    margin="0px 8px"
                                    borderRadius="16px"
                                    text={t('pm.later')}
                                    backColor="var(--bgWhite)"
                                    color="var(--purple)"
                                    onClick={()=>setPopup(false)}
                              />
                        </div>
                  </div>
            </Dialog>
      );
}

export default PopupNoti;