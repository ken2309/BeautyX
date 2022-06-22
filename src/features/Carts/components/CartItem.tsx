/* eslint-disable no-useless-concat */
import React, { useState } from "react";
import { Checkbox } from "@mui/material";
import ButtonCus from "../../../components/ButtonCus";
import {
    checkConfirm,
    descItem,
    removeItem,
    ascItem,
    onClearPrevCartItem
} from "../../../redux/cartSlice";
import { useDispatch } from "react-redux";
import icon from "../../../constants/icon";
import formatPrice from "../../../utils/formatPrice";
import PopupConfirm from "../../popupConfirm/index";
import slugify from "../../../utils/formatUrlString";
import { useHistory } from "react-router-dom";
import scrollTop from "../../../utils/scrollTop";
import onErrorImg from "../../../utils/errorImg";
import PopupDiscountQuantity from "../../Cart/components/PopupDiscountQuantity";
import useFullScreen from "../../../utils/useFullScreen";
import {
    SwipeableList,
    SwipeableListItem,
    SwipeAction,
    TrailingActions,
    Type,
} from 'react-swipeable-list';
import 'react-swipeable-list/dist/styles.css';

interface IProps {
    inPayment?: boolean;
    cartItem: any;
    org?: any
}

function CartItem(props: IProps) {
    const { cartItem, inPayment, org } = props;
    const [open, setOpen] = useState(false);
    const IS_MB = useFullScreen();
    const dispatch = useDispatch();
    const history = useHistory();
    const [process, setProcess] = useState(0);
    const [openConfirm, setOpenConfirm] = useState(false);
    const handleConfirm = () => {
        if (!org || org?.id === cartItem.org_id) {
            const action = checkConfirm({ ...cartItem, isConfirm: !cartItem.isConfirm });
            dispatch(action);
        } else {
            dispatch(onClearPrevCartItem())
            const action = checkConfirm({ ...cartItem, isConfirm: !cartItem.isConfirm });
            dispatch(action);
        }
    };
    const handleAscCart = () => {
        if (cartItem.discount && cartItem.quantity === 1) {
            setOpen(true);
        }
        const action = ascItem(cartItem);
        dispatch(action);
    };
    const handleDesc = () => {
        if (cartItem.quantity === 1) {
            setOpenConfirm(true);
        } else {
            const action = descItem(cartItem);
            dispatch(action);
        }
    };
    const handleRemoveItemCart = () => {
        const action = removeItem(cartItem);
        dispatch(action);
    };
    const openConfirmClick = () => {
        setOpenConfirm(true);
    };
    const goBackDetail = () => {
        if (cartItem.is_type === 1) {
            history.push({
                pathname: `/Product-detail/${slugify(cartItem.name)}`,
                search: `${cartItem.org_id},${cartItem.id},${cartItem.is_type}`,
            });
        } else if (cartItem.is_type === 2) {
            if (cartItem.discount) {
                history.push({
                    pathname: `/chi-tiet-giam-gia/${slugify(
                        cartItem.discount.items[0].productable.service_name
                    )}`,
                    search: `org_id=${cartItem.org_id}&id=${cartItem.discount?.id}`,
                });
            } else {
                history.push({
                    pathname: `/dich-vu/${slugify(cartItem.name)}`,
                    search: `${cartItem.org_id},${cartItem.id},${cartItem.is_type}`,
                });
            }
            // history.push({
            //     pathname: `/dich-vu/${slugify(cartItem.name)}`,
            //     search: `${cartItem.org_id},${cartItem.id},${cartItem.is_type}`
            // })
        } else if (cartItem.is_type === 3) {
            //page combo detail
        }
        scrollTop();
    };
    //when quantity discount > 1
    const total = cartItem.price * cartItem.quantity;
    const discount_value = cartItem.discount?.discount_value;
    return (
        <SwipeableList
            type={Type.IOS}
        >
            <SwipeableListItem
                className="re-cart-item-cnt"
                trailingActions={trailingActions(handleRemoveItemCart)}
                onSwipeProgress={progress => setProcess(progress)}
                listType={Type.IOS}
            >
                <div
                    style={process > 15 ? { backgroundColor: "var(--grey)" } : {}}
                    className="flex-row-sp cart-item cart-item"
                >
                    <div className="flex-row cart-item__name">
                        <div className="flex-row">
                            <Checkbox
                                size="small"
                                style={inPayment === true ? { display: "none" } : {}}
                                sx={{
                                    color: "#7161BA",
                                    "&.Mui-checked": {
                                        color: "#7161BA",
                                    },
                                    marginLeft: "-10px",
                                }}
                                checked={cartItem.isConfirm}
                                onChange={handleConfirm}
                            />
                            <img
                                className="cart-item__name-img"
                                src={
                                    cartItem?.cart_item?.image_url
                                        ? cartItem?.cart_item?.image_url
                                        : cartItem?.org?.image_url
                                }
                                onError={(e) => onErrorImg(e)}
                                alt=""
                            />
                        </div>
                        <span onClick={goBackDetail} className="cart-item__name-text">
                            {cartItem.name}
                        </span>
                    </div>
                    <div className="flex-row cart-item__info">
                        <div
                            style={inPayment === true ? { width: "25%" } : {}}
                            className="flex-row cart-item__quantity"
                        >
                            <button
                                onClick={handleDesc}
                                style={{
                                    backgroundColor: "transparent",
                                    color: "var(--purple)",
                                }}
                            >
                                -
                            </button>
                            <span>{cartItem.quantity}</span>
                            <button onClick={handleAscCart}>+</button>
                        </div>
                        <div
                            style={inPayment === true ? { width: "16.6%" } : {}}
                            className="flex-row cart-item__price"
                        >
                            {cartItem.discount && cartItem.quantity === 1
                                ? formatPrice(cartItem.price_discount)
                                : formatPrice(cartItem.price)}{" "}
                            đ
                        </div>
                        {cartItem.discount ? (
                            cartItem.quantity === 1 ? (
                                <div
                                    style={inPayment === true ? { width: "16.6%" } : {}}
                                    className="flex-row cart-item__total"
                                >
                                    {formatPrice(cartItem.price_discount)} đ
                                </div>
                            ) : (
                                <div
                                    style={inPayment === true ? { width: "16.6%" } : {}}
                                    className="flex-column cart-item__total"
                                >
                                    <span>{formatPrice(total)}đ</span>
                                    {!IS_MB && <span>-{formatPrice(discount_value)}đ</span>}
                                    <span>{formatPrice(total - discount_value)}đ</span>
                                </div>
                            )
                        ) : (
                            <div
                                style={inPayment === true ? { width: "16.6%" } : {}}
                                className="flex-row cart-item__total"
                            >
                                {formatPrice(cartItem.price * cartItem.quantity)} đ
                            </div>
                        )}
                        <div
                            style={inPayment === true ? { display: "none" } : {}}
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
                    {cartItem.discount && (
                        <PopupDiscountQuantity
                            open={open}
                            price_display={
                                cartItem.discount?.items[0]?.view_price +
                                cartItem.discount?.discount_value
                            }
                            setOpen={setOpen}
                        />
                    )}
                    <PopupConfirm
                        openConfirm={openConfirm}
                        setOpenConfirm={setOpenConfirm}
                        handleRemoveItemCart={handleRemoveItemCart}
                        title={cartItem.name}
                    />
                </div>
            </SwipeableListItem>
        </SwipeableList>
    );
}

export default CartItem;


const trailingActions = (handleRemoveItemCart: any) => (
    <TrailingActions>
        <SwipeAction
            onClick={() => handleRemoveItemCart()}
        >
            <div className="re-cart-swipe-btn">
                <button>
                    <img src={icon.trash} alt="" />
                </button>
            </div>
        </SwipeAction>
    </TrailingActions>
);
