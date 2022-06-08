import React from 'react';
import { Combo } from '../../../interface/combo';
import { IOrganization } from '../../../interface/organization';
import onErrorImg from '../../../utils/errorImg';

interface IProps {
    combo: Combo,
    org: IOrganization
}

function ComboDetailLeft(props: IProps) {
    const { combo, org } = props;
    return (
        <>
            <div className="service-detail__left">
                <div className="detail-left__img">
                    <img
                        src={
                            combo?.image_url
                                ? combo?.image_url
                                : org?.image_url
                        }
                        alt=""
                        onError={(e) => onErrorImg(e)}
                    />
                </div>
            </div>
        </>
    );
}

export default ComboDetailLeft;