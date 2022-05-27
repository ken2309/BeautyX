import React from 'react';
import { Combo, ComboService, ComboProduct } from '../../../interface/combo';
import { IOrganization } from '../../../interface/organization';
import onErrorImg from '../../../utils/errorImg';

interface IProps {
    combo: Combo
    org: IOrganization
}


function TabDetail(props: IProps) {
    const { combo, org } = props;
    return (
        <div>
            <span className="combo-name">
                {combo?.name}
            </span>
            <div className="combo-detail__list-item">
                <span className="title">Dịch vụ</span>
                <ul className="list">
                    {
                        combo.services?.map((item: ComboService, index: number) => (
                            <li key={index} className="item">
                                <div className="item-combo__cnt">
                                    <img
                                        src={item?.image ? item?.image_url : org?.image_url}
                                        alt=""
                                        onError={(e) => onErrorImg(e)}
                                        className="item-combo__img"
                                    />
                                    <div className="item-combo__detail">
                                        <span className="name">{item?.service_name}</span>
                                    </div>
                                </div>
                            </li>
                        ))
                    }
                </ul>
            </div>
            <div className="combo-detail__list-item">
                <span className="title">Sản phẩm</span>
                <ul className="list">
                    {
                        combo.products?.map((item: ComboProduct, index: number) => (
                            <li key={index} className="item">
                                <div className="item-combo__cnt">
                                    <img
                                        src={item?.image ? item?.image_url : org?.image_url}
                                        alt=""
                                        onError={(e) => onErrorImg(e)}
                                        className="item-combo__img"
                                    />
                                    <div className="item-combo__detail">
                                        <span className="name">{item?.product_name}</span>
                                    </div>
                                </div>
                            </li>
                        ))
                    }
                </ul>
            </div>
        </div>
    );
}

export default TabDetail;