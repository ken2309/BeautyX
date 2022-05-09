import React, { useContext, useState } from 'react';
import SectionTitle from '../../SectionTitle';
import icon from '../../../constants/icon';
import { imgRotate } from '../../../utils/imgRotate'
import { AppContext } from '../../../context/AppProvider';

function DetailDesc(props: any) {
      const { product } = props;
      const [viewMore, setViewMore] = useState(false);
      const { t } = useContext(AppContext)
      return (
            <div className="product-desc">
                  <SectionTitle
                        title={product?.product_name ? product?.product_name : product?.service_name}
                  />
                  <div
                        style={viewMore === true ?
                              {
                                    height: 'max-content',
                                    boxShadow: 'unset',
                                    maxHeight: '1000px'
                              }
                              :
                              {
                                    height:'70px'
                              }
                        }
                        className="product-desc__text"
                  >
                        {product?.description}
                  </div>
                  <span
                        onClick={() => setViewMore(!viewMore)}
                        className="flex-row product-desc__more"
                  >
                        <img style={viewMore === true ? imgRotate : {}} src={icon.down} alt="" />
                        {viewMore === true ? t('Mer_de.hide') : t('Mer_de.view_more')}
                  </span>
            </div>
      );
}

export default DetailDesc;