import React, { useEffect, useState } from 'react';
import orgApi from '../../../../api/organizationApi';
import { IOrganization } from '../../../../interface/organization';
import OrgItem from '../../../ViewItemCommon/OrgItem/index'

interface IData {
    orgs: IOrganization[],
    page: number,
    lastPage: number
}

function TabDealHot(props: any) {
    const [data, setData] = useState<IData>({
        orgs: [],
        page: 1,
        lastPage: 1
    })
    async function getOrgsManyDealHot() {
        try {
            const res = await orgApi.getOrgsByManyDealHot({
                page:1
            });
            setData({
                ...data,
                orgs: res.data.context.data
            })
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        getOrgsManyDealHot()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
        <div className='home-card-list-org'>
            <ul className='org-list'>
                {
                    data.orgs.slice(0, 8).map((item: IOrganization, index: number) => (
                        <li
                            key={index}
                        >
                            <OrgItem
                                org={item}
                            />
                        </li>
                    ))
                }
            </ul>
        </div>
    );
}

export default TabDealHot;