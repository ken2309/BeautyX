import React, { useEffect, useState } from 'react';
import { IOrganization } from '../../../../interface/organization';
import orgApi from '../../../../api/organizationApi';
import OrgItem from '../../../ViewItemCommon/OrgItem';
import { useHistory } from 'react-router-dom';
import slugify from '../../../../utils/formatUrlString';
import icon from '../../../../constants/icon';
interface IData {
    orgs: IOrganization[],
    page: number,
    lastPage: number
}

function TabDistance(props: any) {
    const [data, setData] = useState<IData>({
        orgs: [],
        page: 1,
        lastPage: 1
    })
    const {card} = props;
    const history = useHistory();
    async function getOrgsByTrust() {
        try {
            const res = await orgApi.getAll({
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
        getOrgsByTrust()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
        <div className='home-card-list-org'>
            <ul className='org-list'>
                {
                    data.orgs.slice(0, 9).map((item: IOrganization, index: number) => (
                        <li
                            key={index}
                        >
                            <OrgItem
                                org={item}
                            />
                        </li>
                    ))}
                {
                    data.orgs.length>9&&(
                        <li
                        className="card-read-more"
                        >
                            <div className="read-more"
                                onClick={
                                    ()=>
                                    history.push({
                                    pathname: `/doanh-nghiep/${slugify(card.title)}`,
                                    search: `${card.id}`
                                    }
                                )}
                            >
                                xem tat ca
                                <img style={{
                                    display: 'inline-block'
                                }} src={icon.chevronRightBlack} alt="" />
                            </div>
                        </li>
                    )
                }
            </ul>
        </div>
    );
}

export default TabDistance;