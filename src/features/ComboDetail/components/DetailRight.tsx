/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useContext, useState } from 'react';
import { IOrganization } from '../../../interface/organization';
import { Combo } from '../../../interface/combo';
import { AppContext } from '../../../context/AppProvider';
import icon from '../../../constants/icon';
import formatPrice from '../../../utils/formatPrice';
import { addCart } from '../../../redux/cartSlice';
import { useDispatch } from 'react-redux'

interface IProps {
    combo: Combo,
    org: IOrganization
}

function DetailRight(props: IProps) {
    const { t } = useContext(AppContext);
    const { org, combo } = props;
    let old_price: number = 0;
    let sale_price: number = 0;
    if (combo?.discount > combo?.price) {
        old_price = combo?.discount;
        sale_price = combo?.price
    } else if (combo?.price > combo?.discount) {
        old_price = combo?.price
        sale_price = combo?.discount
    } else if (combo?.discount === combo?.price) {
        sale_price = combo?.discount
    }
    const discount_percent = 100 - Math.round(sale_price / old_price * 100)

    const [quantity, setQuantity] = useState(1);
    const dispatch = useDispatch();
    const handleDesc = useCallback(() => {
        if (quantity > 1) {
            setQuantity(quantity - 1)
        }
    }, [quantity])
    const handleAddCart = () => {
        const values = {
            id: combo?.id,
            org_id: org.id,
            org: org,
            org_name: org.name,
            cart_id: parseInt(`${3}${org.id}${combo?.id}`),
            name: combo?.name,
            quantity: quantity,
            is_type: 3,
            isConfirm: false,
            price: sale_price
        }
        const action = addCart(values);
        dispatch(action)
    }
    return (
        <div className='product-cnt__right'>
            <div className="combo-cnt__right-head">
                <span className="right-combo__name">
                    {combo?.name}
                </span>
                <span className="right-combo__org-name">
                    {org?.name}
                </span>
                <span className="right-combo__old-price">
                    {old_price}đ
                </span>
                <div className="flex-row right-combo__sale">
                    {
                        discount_percent > 0 &&
                        <span className="right-combo__sale-percent">
                            Giảm {discount_percent} %
                        </span>
                    }
                    <span className="right-combo__sale-price">{sale_price}đ</span>
                </div>
            </div>
            <div className="product-cnt__right-body">
                <div className="product-cnt__right-body-item">
                    <span>{t("pr.quantity")}</span>
                    <div className="flex-row product-quantity">
                        <button onClick={handleDesc}>-</button>
                        <div className="product-quantity__number">{quantity}</div>
                        <button onClick={() => setQuantity(quantity + 1)}>+</button>
                    </div>
                </div>
            </div>
            <div className="product-cnt__right-bot">
                <div className="flex-row-sp product-cnt__right-bot__total">
                    <span>{t("pr.total")}</span>
                    <span>{formatPrice(quantity * sale_price)}đ</span>
                </div>
                <div className="flex-row" style={{ justifyContent: "flex-end" }}>
                    <button
                        onClick={handleAddCart}
                        className="flex-row product-cnt__right-bot__add"
                    >
                        <img src={icon.ShoppingCartSimpleWhite} alt="" />
                        {t("pr.add_to_cart")}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default DetailRight;