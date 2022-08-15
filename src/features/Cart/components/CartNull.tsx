import React, {useContext} from 'react';
import { Container } from '@mui/material';
import SectionTitle from '../../SectionTitle/index';
import img from '../../../constants/img';
import ButtonCus from '../../../components/ButtonCus';
import {AppContext} from '../../../context/AppProvider';
import {useHistory} from 'react-router-dom'


function CartNull() {
      const {t} = useContext(AppContext)
      const history = useHistory();
      return (
            <Container>
                  <div className="cart-null">
                        <SectionTitle
                              title={t('cart.noti')}
                              textAlign='center'
                        />
                        <div className="flex-column cart-null__cnt">
                              <span>
                                    {t('cart.cart_null_text')} !
                              </span>
                              <img src={img.resultNull} alt="" />
                              <ButtonCus
                                    text={t('cart.shopping_now')}
                                    padding="8px 16px"
                                    backColor="var(--purple)"
                                    color="var(--bgWhite)"
                                    margin="16px 0px 0px 0px"
                                    borderRadius="16px"
                                    onClick={()=>history.push('/')}
                              />
                        </div>
                  </div>
            </Container>
      );
}

export default CartNull;