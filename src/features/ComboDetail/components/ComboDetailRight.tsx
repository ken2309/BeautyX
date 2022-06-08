import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import icon from '../../../constants/icon';
import { Combo } from '../../../interface/combo';
import { IOrganization } from '../../../interface/organization';
import { addCart } from '../../../redux/cartSlice';
import { onDeleteFavoriteOrg, onFavoriteOrg } from '../../../redux/org/orgSlice';
import { formatAddCart } from '../../../utils/cart/formatAddCart';
import onErrorImg from '../../../utils/errorImg';
import formatPrice from '../../../utils/formatPrice';
import '../../ProductDetail/product.css'

interface IProps {
    combo: Combo,
    org: IOrganization
}

function ComboDetailRight(props: IProps) {
    const { combo, org } = props;

    const { USER } = useSelector((state: any) => state.USER);
    const dispatch = useDispatch();
    const history = useHistory();
    const onClickFavoriteOrg = () => {
        if (USER) {
            if (org?.is_favorite) {
                dispatch(onDeleteFavoriteOrg(org))
            } else {
                dispatch(onFavoriteOrg(org))
            }
        } else {
            history.push('/sign-in?1')
        }
    }
    const percent = Math.round(100 - combo?.use_value / combo?.price * 100)
    //handle add cart
    const [quantity, setQuantity] = useState(1)
    const onDescQuantity = () => {
        if (quantity > 1) setQuantity(quantity - 1)
    }
    const handleAddCart = () => {
        const sale_price = combo?.use_value === combo.price ? combo.price : combo?.use_value
        const is_type = 3
        const values = formatAddCart(combo, org, is_type, quantity, sale_price)
        dispatch(addCart(values))
    }
    return (
        <div className="service-detail__right">
            <div className="detail-right__head">
                <div className="detail-right__org">
                    <p>{org?.name}</p>
                    <p>{"Đang mở cửa"}</p>
                </div>
                <div className="detail-right__name">
                    <p>{combo?.name}</p>
                    <div
                        //onClick={onFavorite} 
                        className="favorite"
                    >
                        <img src={icon.heart} alt="" />
                    </div>
                </div>
                <div className="detail-right__evaluate">
                    <div className="evaluate-item">
                        <p>5</p>
                        <img src={icon.star} alt="" />
                    </div>
                    <div className="evaluate-item">
                        <p>112+</p>
                        <img src={icon.Favorite} alt="" />
                    </div>
                    <div className="evaluate-item">
                        <p>10</p>
                        <img src={icon.ShoppingCartSimple} alt="" />
                    </div>
                </div>
            </div>

            <div className="detail-right__body">
                <div className="detail-right__info">
                    <div className="flexX-gap-8">
                        <div className="detail-right__price">
                            {
                                combo?.price > combo?.use_value ?
                                    <>
                                        <span>{formatPrice(combo?.use_value)}đ</span>
                                        <span>{formatPrice(combo?.price)}đ</span>
                                    </>
                                    :
                                    <span>{formatPrice(combo?.price)}đ</span>
                            }
                        </div>
                        {
                            combo?.use_value < combo?.price &&
                            <div className="detail-right__percent">
                                <p>Giảm {percent}%</p>
                            </div>
                        }
                    </div>
                    {/* <div style={{ padding: "8px 0" }}>
                        <p style={{ fontWeight: "bold", marginBottom: "8px" }}>
                            Thời gian:
                        </p>
                        <div className="detail-right__duration flexX-gap-4">
                            <img src={icon.Clock_purple} alt="" />
                            <p>{service.duration} Phút</p>
                        </div>
                    </div> */}
                </div>

                <div className="detail-right__infoMer">
                    <div className="infoMer-top">
                        <div className="infoMer-top__img">
                            <img
                                onError={(e) => onErrorImg(e)}
                                src={org.image_url}
                                alt=""
                            />
                        </div>
                        <div className="infoMer-top__right">
                            <p className="infoMer-top__name">{org.name}</p>
                            <p className="infoMer-top__address">
                                {org.address ? org.address : org.full_address}
                            </p>
                        </div>
                    </div>
                    <div className="infoMer-mid">
                        <div className="infoMer-item">
                            <div className="infoMer-item__wrap flexX-gap-4">
                                <p>{"4.5/5"}</p>
                                <img src={icon.star} alt="" />
                            </div>
                            <p className="infoMer-item__text">Đánh giá</p>
                        </div>
                        <div className="infoMer-item">
                            <div className="infoMer-item__wrap flexX-gap-4">
                                <p>{org?.favorites_count}</p>
                                <img src={icon.Favorite} alt="" />
                            </div>
                            <p className="infoMer-item__text">Yêu thích</p>
                        </div>
                        <div className="infoMer-item">
                            <div className="infoMer-item__wrap flexX-gap-4">
                                <p>{"5"}</p>
                                <img src={icon.chatAll} alt="" />
                            </div>
                            <p className="infoMer-item__text">Bình luận</p>
                        </div>
                    </div>
                    <div className="infoMer-bottom">
                        <button className="infoMer-bottom__left">
                            <Link
                                className='flex-row'
                                to={{ pathname: `/org/${org.subdomain}` }}
                            >
                                <img src={icon.archive} alt="" />
                                <p>Xem Spa</p>
                            </Link>
                        </button>
                        <button
                            onClick={onClickFavoriteOrg}
                            className="infoMer-bottom__right"
                        >
                            {org?.is_favorite && <img src={icon.rss} alt="" />}
                            <p>{org?.is_favorite ? "Đang theo dõi" : "Theo dõi"}</p>
                        </button>
                    </div>
                </div>
            </div>
            <div className="detail-right__bottom">
                <div className="bottom-quantity">
                    <p className="bottom-quantity__text">Số lượng:</p>
                    <div className="bottom-quantity__wrap">
                        <button onClick={onDescQuantity} className="quantity-btn">
                            <p>-</p>
                        </button>
                        <input
                            value={quantity}
                            disabled
                            className="quantity-input"
                            type="text"
                        />
                        <button
                            onClick={() => setQuantity(quantity + 1)}
                            className="quantity-btn"
                        >
                            <p>+</p>
                        </button>
                    </div>
                </div>
                <div
                    onClick={handleAddCart}
                    className="bottom-addCart"
                >
                    <img src={icon.ShoppingCartSimpleWhite} alt="" />
                    <p>Thêm vào giỏ hàng</p>
                </div>
            </div>
        </div>
    );
}

export default ComboDetailRight;