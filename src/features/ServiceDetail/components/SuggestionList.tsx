import React, { useContext } from 'react';
import SectionTitle from '../../SectionTitle';
import icon from '../../../constants/icon';
import formatPrice from '../../../utils/formatPrice';
import { useDispatch } from 'react-redux';
import { addCart } from '../../../redux/cartSlice'
import { AppContext } from '../../../context/AppProvider';

function SuggestionList(props: any) {
      const dispatch = useDispatch();
      const { t } = useContext(AppContext)
      const { listServices, product, org } = props;
      const suggestions = listServices.filter((item: any) => item.id !== product.id)
      const handlePushSuggest = (item: any) => {
            const values = {
                  id: item.id,
                  org_id: org.id,
                  cart_item: item,
                  org: org,
                  org_name: org.name,
                  cart_id: parseInt(`${org.id}${item.id}`),
                  name: item.service_name,
                  quantity: 1,
                  is_type: 2,
                  isConfirm: true,
                  price: item.special_price < 0 ? item.price : item.special_price
            }
            const action = addCart(values);
            dispatch(action);
      }
      return (
            <div className="suggest-cnt">
                  <SectionTitle title={t('pr.recommend')} />
                  <span className="suggest-cnt__title">
                        {t('pr.re_text')}
                  </span>
                  <ul className="suggest-cnt__list">
                        {
                              suggestions.map((item: any) => (
                                    <li key={item.id} style={{ padding: '12px 0px' }}>
                                          <div className="flex-row-sp suggest-cnt__list-tem">
                                                <img
                                                      src={"https://picsum.photos/650/976?random=" + item.id}
                                                      alt=""
                                                      className="suggest-cnt__list-tem__img"
                                                />
                                                <div className="suggest-cnt__list-tem__detail">
                                                      <div className="flex-row-sp suggest-cnt__list-tem__top">
                                                            <span>{item.service_name}</span>
                                                            <span>
                                                                  {
                                                                        item.special_price > 0 ?
                                                                              formatPrice(item.special_price)
                                                                              :
                                                                              formatPrice(item.price)
                                                                  }
                                                            </span>
                                                      </div>
                                                      <div className="flex-row-sp suggest-cnt__list-tem__bot">
                                                            <div className="flex-row">
                                                                  <span>200</span>
                                                                  {t('pr.purchases')}
                                                                  <span>4.5</span>
                                                                  <img src={icon.star} alt="" />
                                                                  69
                                                                  <img src={icon.chatAll} alt="" />
                                                            </div>
                                                            <span
                                                                  style={item.special_price < 0 ? { display: 'none' } : {}}
                                                                  className="suggest__retail-pr"
                                                            >
                                                                  {formatPrice(item.price)}
                                                            </span>
                                                      </div>
                                                </div>
                                                <img
                                                      onClick={() => handlePushSuggest(item)}
                                                      className="suggest-cnt__list-tem__btn"
                                                      src={icon.plus} alt=""
                                                />
                                          </div>
                                    </li>
                              ))
                        }
                  </ul>
            </div>
      );
}

export default SuggestionList;