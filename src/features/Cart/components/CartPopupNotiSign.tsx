import React,{useContext} from 'react';
import { Dialog } from '@mui/material';
import icon from '../../../constants/icon';
import ButtonCus from '../../../components/ButtonCus';
import { AppContext } from '../../../context/AppProvider';
import { useHistory } from 'react-router-dom';

function CartPopupNotiSign(props: any) {
      const history = useHistory();
      const { t } = useContext(AppContext)
      const { popupSign, setPopupSign } = props;
      const laterClick = () => {
            setPopupSign(false);
      }
      const gotoSignInPage = () => {
            history.push({ pathname: '/sign-in', search: '1' })
      };
      return (
            <>
                  <Dialog
                        open={popupSign}
                        onClose={() => setPopupSign(false)}
                  >
                        <div className="flex-column cart-sign">
                              <div className="flex-row cart-sign__head">
                                    <img src={icon.warning} alt="" />
                                    {t('cart.warning')}
                              </div>
                              <span className="cart-sign__title">
                                    {t('cart.must_sign_in')}
                              </span>
                              <div className="flex-row-sp cart-sign__btn">
                                    <ButtonCus
                                          borderRadius="18px"
                                          margin="0px 8px"
                                          text={t('Home.Sign_in')}
                                          border="solid 1px var(--purple)"
                                          color="var(--bg-gray)"
                                          backColor="var(--purple)"
                                          onClick={gotoSignInPage}
                                    />
                                    <ButtonCus
                                          borderRadius="18px"
                                          margin="0px 8px"
                                          text={t('pm.later')}
                                          border="solid 1px var(--purple)"
                                          color="var(--purple)"
                                          backColor="var(--bg-gray)"
                                          onClick={laterClick}
                                    />
                              </div>
                        </div>
                  </Dialog>
            </>
      );
}

export default CartPopupNotiSign;