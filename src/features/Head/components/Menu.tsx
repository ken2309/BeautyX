import React, { useContext } from 'react';
import icon from '../../../constants/icon';
import ButtonCus from '../../../components/ButtonCus';
import { AppContext } from '../../../context/AppProvider';
import MenuBox from './MenuBox';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../../../redux/USER/userSlice';
import { onClearApps } from '../../../redux/appointment/appSlice';
import { onSetStatusServicesUser } from '../../../redux/order/orderSlice';

function Menu(props: any) {
      const { openMenu, setOpenMenu, USER } = props;
      const { t, setSign } = useContext(AppContext)
      const dispatch = useDispatch();
      const handleSignOut = () => {
            setSign(false);
            setOpenMenu(!openMenu)
            dispatch(logoutUser());
            dispatch(onClearApps());
            dispatch(onSetStatusServicesUser())
            localStorage.removeItem('_WEB_TK')
            window.sessionStorage.removeItem('_WEB_TK')
      }
      return (
            <div
                  style={openMenu === true ? { top: '3rem', opacity: '1', visibility: 'visible' } : { top: '5rem', opacity: '0', visibility: 'hidden' }}
                  className="hd-menu"
            >
                  <div className="hd-menu__title">Menu</div>
                  <MenuBox />
                  {
                        USER ?
                              <div className="hd-menu-box__bot">
                                    <img src={icon.signOut} alt="" />
                                    <ButtonCus
                                          text={t('Header.sign_out')}
                                          color='var(--purple)'
                                          fontSize='14px'
                                          lineHeight='20px'
                                          paddingLeft='4px'
                                          onClick={handleSignOut}
                                    />
                              </div>
                              :
                              ''
                  }
            </div>
      );
}

export default Menu;