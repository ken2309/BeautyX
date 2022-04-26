import React, { useEffect, useState } from 'react';
import servicesUserApi from '../../../api/servicesUser';
import { IServiceUser } from '../../../interface/servicesUser';
import TreatmentCardItem from './TreatmentCardItem';
import { Masonry } from '@mui/lab';
import useFullScreen from '../../../utils/useFullScreen';

interface IData {
    services_user: IServiceUser[],
    page: number,
    totalPage: number
}

function ServiceNotBook(props: any) {
    const { tab_id } = props;
    const [data, setData] = useState<IData>({
        services_user: [],
        page: 1,
        totalPage: 1
    })

    async function handleGetServicesUser() {
        
        try {
            const res = await servicesUserApi.getServices();
            setData({
                ...data,
                services_user: res.data.context.data,
                totalPage: res.data.context.last_page
            })
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        handleGetServicesUser()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    const fullScreen = useFullScreen();
    return (
        <div
            style={tab_id === 1 ? { display: 'block' } : { display: 'none' }}
        >
            <div className="my-ser-book">
                {/* <ul className="my-ser-book__list">
                              {
                                    data.services_user.map((item: IServiceUser, index: number) => (
                                          <li
                                                key={index}
                                          >
                                                <TreatmentCardItem
                                                      card_items={item}
                                                />
                                          </li>
                                    ))
                              }
                        </ul> */}
                <Masonry
                    columns={fullScreen ? 1 : 2}
                    spacing={fullScreen ? 1 : 3}
                >
                    {
                        data.services_user.map((item: IServiceUser, index: number) => (
                            <TreatmentCardItem
                                key={index}
                                card_items={item}
                            />
                        ))
                    }
                </Masonry>
            </div>
        </div>
    );
}

export default ServiceNotBook;