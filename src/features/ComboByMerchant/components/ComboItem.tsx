import React from 'react';
import icon from '../../../constants/icon';
import formatPrice from '../../../utils/formatPrice';
import { addCart } from '../../../redux/cartSlice';
import { useDispatch } from 'react-redux';
import onErrorImg from '../../../utils/errorImg';
import { useHistory } from 'react-router-dom';
import slugify from '../../../utils/formatUrlString';

function ComboItem(props: any) {
      const { detail, org } = props;
      const history = useHistory();
      const dispatch = useDispatch();
      let old_price: number = 0;
      let sale_price: number = 0;
      if (detail.discount > detail.price) {
            old_price = detail?.discount;
            sale_price = detail?.price
      } else if (detail.price > detail.discount) {
            old_price = detail?.price
            sale_price = detail.discount
      } else if (detail.discount === detail.price) {
            sale_price = detail.discount
      }
      const discount = Math.round(sale_price / old_price * 100)
      const handleAddCart = () => {
            const quantity = 1;
            const values = {
                  id: detail.id,
                  org_id: org.id,
                  org: org,
                  org_name: org.name,
                  cart_id: parseInt(`${3}${org.id}${detail.id}`),
                  name: detail.name,
                  quantity: quantity,
                  is_type: 3,
                  isConfirm: false,
                  price: sale_price
            }
            const action = addCart(values);
            dispatch(action)
      }
      const onDetail = () => {
            history.push({
                  pathname: `/combo-detail/${slugify(detail?.name)}`,
                  search: `org_id=${org?.id}&id=${detail?.id}`,
                  state: { org_state: org, combo_state: detail }
            })
      }
      return (
            <li
                  onClick={onDetail}
            >
                  <div className="cmb-list__item">
                        <div className="cmb-list__item-box">
                              <div
                                    style={detail.discount === detail.price ? { display: 'none' } : {}}
                                    className="card-discount"
                              >
                                    Giảm {100 - discount}%
                              </div>
                              <img
                                    src={detail?.image ? detail?.image_url : org?.image_url}
                                    alt=""
                                    className="cmb-list__item-img"
                                    onError={(e) => onErrorImg(e)}
                              />
                              <div className="cmb-list__item-detail">
                                    <div className="cmb-list__item-name">
                                          {detail.name}
                                    </div>
                                    <div className="cmb-list__item-spa-name">
                                          {org?.name}
                                    </div>
                                    <div className="flex-row-sp cmb-list__item-price">
                                          <div className="flex-column left">
                                                <span
                                                      style={detail.discount === detail.price ? { display: 'none' } : {}}
                                                >
                                                      {formatPrice(old_price)}
                                                </span>
                                                <span
                                                      style={detail.discount === detail.price ? { color: 'var(--purple)' } : {}}
                                                >
                                                      {formatPrice(sale_price)}đ
                                                </span>
                                          </div>
                                          <span className="flex-row right">
                                                4.5
                                                <img src={icon.star} alt="" />
                                          </span>
                                    </div>
                                    <span className="cmb-list__item-date">
                                          HD: 20-01-2077
                                    </span>
                              </div>
                        </div>
                        {/* <div className="flex-column cmb-list__item-view">
                              <button>Xem chi tiết Combo</button>
                              <button
                                    onClick={handleAddCart}
                              >
                                    Thêm vào giỏ hàng
                              </button>
                        </div> */}
                  </div>
            </li>
      );
}

export default ComboItem;