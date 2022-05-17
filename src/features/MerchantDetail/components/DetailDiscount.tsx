import React, { useEffect, useState } from 'react';
import { IITEMS_DISCOUNT, IDiscountPar } from '../../../interface/discount';
import { IOrganization } from '../../../interface/organization'
import discountApi from '../../../api/discountApi';
import DiscountItem from '../../Account/components/UserDiscounts/DiscountItem';

interface IProps {
    org: IOrganization | any;
}

function DetailDiscount(props: IProps) {
    const { org } = props;
    const [discounts, setDiscounts] = useState<IDiscountPar[]>([])
    const handleGetDiscountByOrg = async () => {
        const org_id = (await org)?.id
        try {
            const res = await discountApi.getByOrgId({
                org_id: org_id
            })
            setDiscounts(res.data.context.data)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        if(org?.id){
            handleGetDiscountByOrg()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [org?.id])

    return (
        discounts.length > 0 ?
            <div
                className='org-dis-cnt'
            >
                <ul className="org-dis-list">
                    {
                        discounts.map((discount: IDiscountPar, index: number) => (
                            <li key={index} >
                                {
                                    discount.items.map((item: IITEMS_DISCOUNT, i: number) => (
                                        <DiscountItem
                                            key={i}
                                            discountPar={discount}
                                            discountItem={item}
                                        />
                                    ))
                                }
                            </li>
                        ))
                    }
                </ul>
            </div>
            :
            <></>
    );
}

export default DetailDiscount;