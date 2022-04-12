import React from 'react';
import './cardItem.css';
import icon from '../../constants/icon';
import formatPrice from '../../utils/formatPrice';
import { useHistory } from 'react-router-dom';
import scrollTop from '../../utils/scrollTop';
import slugify from '../../utils/formatUrlString';
import onErrorImg from '../../utils/errorImg';

//note: product : is_type = 1, service: is_type = 2
function CardItem(props: any) {
      const {
            detail,
            style,
            name,
            retail_price,
            special_price,
            org,
            is_type
      } = props;
      const history = useHistory();
      const discount = 100 - (special_price / retail_price * 100)
      const gotoDetail = () => {
            scrollTop()
            // const param = {
            //       org: org_id,
            //       id: detail.id
            // }
            // const search = JSON.stringify(param);
            //console.log(org_id)
            //products: is_type = 1, services: is_type = 2
            //console.log(is_type);   
            if (is_type === 1) {
                  history.push({
                        pathname: `/product-detail/${slugify(name)}`,
                        search: `${org.id},${detail.id},${is_type}`,
                        state: { org, detail, name },
                  })
            } else if (is_type === 2) {
                  history.push({
                        pathname: `/dich-vu/${slugify(name)}`,
                        search: `${org.id},${detail.id},${is_type}`,
                        state: { org, detail, name }
                  })
            }
      }
      return (
            <div
                  onClick={gotoDetail}
                  style={{ width: style?.width }}
                  className="card"
            >
                  <div
                        style={special_price < 0 ? { display: 'none' } : {}}
                        className="card-discount">
                        Giảm {discount.toFixed()}%
                  </div>
                  <img
                        src={`${detail.image ? detail?.image_url : org?.image_url}`}
                        alt=""
                        onError={(e) => onErrorImg(e)}
                        className="card-img"
                  />
                  <div className="card-info">
                        <div className="card-name">
                              {name}
                        </div>
                        <span className="card-spa-name">
                              {org?.name}
                        </span>
                        <div className="flex-row-sp card-price">
                              <span className="flex-row card-price__detail">
                                    <h4
                                          style={special_price < 0 ?
                                                {
                                                      textDecoration: 'none',
                                                      fontSize: '20px',
                                                      lineHeight: '24px',
                                                      fontWeight: "bold",
                                                      color: 'var(--purple)'
                                                }
                                                :
                                                {}
                                          }
                                    >{formatPrice(retail_price)} đ</h4>
                                    <h3
                                          style={special_price < 0 ? { display: 'none' } : {}}
                                    >
                                          {formatPrice(special_price)} đ
                                    </h3>
                              </span>
                              <span className="flex-row card-price__star">
                                    4.5
                                    <img src={icon.star} alt="" />
                              </span>
                        </div>
                        <span
                              style={special_price < 0 ? { display: 'none' } : {}}
                              className="card-date"
                        >
                              HSD: 20-01-2022
                        </span>
                  </div>
                  {/* <button onClick={handleAddCart} >Add cart</button> */}
            </div>
      );
}

export default CardItem;