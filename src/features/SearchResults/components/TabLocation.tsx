import React, { useEffect, useState } from 'react';
import Map from '../../Map';
import orgApi from '../../../api/organizationApi';

function TabLocation(props: any) {
    const { acTab, searchKey } = props;
    const [data, setData] = useState({
        orgs: [],
        page: 1,
        total: 1
    })
    const handleGetOrgs = async () => {
        try {
            const res = await orgApi.getOrgByKeyword({
                page: data.page,
                keyword: searchKey,
                tags: [],
                province: 0,
                price: {
                    min: 0,
                    max: 0
                }
            })
            setData({
                ...data,
                orgs: res.data.context.data,
                total: res.data.context.total
            })
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        if (acTab === 4) {
            handleGetOrgs();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [acTab])
    return (
        acTab === 4 ?
            <div
                className='se-re-map-cnt'
            >
                <Map
                    data={data}
                    setData={setData}
                />
            </div>
            :
            <></>
    );
}

export default TabLocation;