import React, { useState } from 'react';
import { Checkbox } from '@mui/material';
import ButtonCus from '../../../components/ButtonCus';
import { checkConfirm, descItem, removeItem, ascItem } from '../../../redux/cartSlice'
import { useDispatch } from 'react-redux'
import icon from '../../../constants/icon';
import formatPrice from '../../../utils/formatPrice';
import PopupConfirm from '../../popupConfirm/index';
import slugify from '../../../utils/formatUrlString';
import { useHistory } from 'react-router-dom';
import scrollTop from '../../../utils/scrollTop';
import onErrorImg from '../../../utils/errorImg';
import { Cart } from '../../../interface/cart';

interface IProps {
      inPayment: boolean,
      cartItem: Cart
}

function CartItem(props: IProps) {
      const { cartItem, inPayment } = props;
      const dispatch = useDispatch();
      const history = useHistory();
      const [isCheck, setIsCheck] = useState(cartItem.isConfirm)
      const [openConfirm, setOpenConfirm] = useState(false)
      const isConfirm = isCheck
      const handleConfirm = (e: any) => {
            setIsCheck(e.target.checked)
            const action = checkConfirm({ ...cartItem, isConfirm });
            dispatch(action)
      }
      const handleAscCart = () => {
            const action = ascItem(cartItem);
            dispatch(action)
      }
      const handleDesc = () => {
            if (cartItem.quantity === 1) {
                  setOpenConfirm(true);
            } else {
                  const action = descItem(cartItem);
                  dispatch(action)
            }
      }
      const handleRemoveItemCart = () => {
            const action = removeItem(cartItem);
            dispatch(action);
      }
      const openConfirmClick = () => {
            setOpenConfirm(true);
      }
      const goBackDetail = () => {
            if (cartItem.is_type === 1) {
                  history.push({
                        pathname: `/Product-detail/${slugify(cartItem.name)}`,
                        search: `${cartItem.org_id},${cartItem.id},${cartItem.is_type}`
                  })
            } else if (cartItem.is_type === 2) {
                  history.push({
                        pathname: `/dich-vu/${slugify(cartItem.name)}`,
                        search: `${cartItem.org_id},${cartItem.id},${cartItem.is_type}`
                  })
            } else if (cartItem.is_type === 3) {
                  //page combo detail
            }
            scrollTop();
      }
      return (
            <div className="flex-row-sp cart-item">
                  <div className="flex-row cart-item__name">
                        <Checkbox
                              size='small'
                              style={inPayment === true ? { display: 'none' } : {}}
                              sx={{
                                    color: "#7161BA",
                                    "&.Mui-checked": {
                                          color: "#7161BA",
                                    },
                                    marginLeft: '-10px'
                              }}
                              checked={cartItem.isConfirm}
                              onChange={handleConfirm}
                        />
                        <img
                              className="cart-item__name-img"
                              src={
                                    cartItem?.cart_item?.image_url ?
                                          cartItem?.cart_item?.image_url
                                          :
                                          cartItem?.org?.image_url
                              }
                              onError={(e) => onErrorImg(e)}
                              alt=""
                        />
                        <span onClick={goBackDetail} className="cart-item__name-text">
                              {cartItem.name} - {cartItem.org_id}
                        </span>
                  </div>
                  <div className="flex-row cart-item__info">
                        <div
                              style={inPayment === true ? { width: '25%' } : {}}
                              className="flex-row cart-item__quantity"
                        >
                              <button onClick={handleDesc} style={{ backgroundColor: 'var(--bg-gray)', color: 'var(--purple)' }}>-</button>
                              <span>{cartItem.quantity}</span>
                              <button onClick={handleAscCart}>+</button>
                        </div>
                        <div
                              style={inPayment === true ? { width: '16.6%' } : {}}
                              className="flex-row cart-item__price"
                        >
                              {formatPrice(cartItem.price)} đ
                        </div>
                        <div
                              style={inPayment === true ? { width: '16.6%' } : {}}
                              className="flex-row cart-item__total"
                        >
                              {formatPrice(cartItem.price * cartItem.quantity)} đ
                        </div>
                        <div
                              style={inPayment === true ? { display: 'none' } : {}}
                              className="flex-row cart-item__control"
                        >
                              <ButtonCus
                                    imgIcon={icon.trash}
                                    padding="4px 4px 4px 4px"
                                    backColor="var(--red-cl)"
                                    borderRadius="8px"
                                    onClick={openConfirmClick}
                              />
                        </div>
                  </div>
                  <PopupConfirm
                        openConfirm={openConfirm}
                        setOpenConfirm={setOpenConfirm}
                        handleRemoveItemCart={handleRemoveItemCart}
                        title={cartItem.name}
                  />
            </div>
      );
}

export default CartItem;