import { Container } from '@mui/material';
import React, { useContext } from 'react';
//import icon from '../../../constants/icon';
import { AppContext } from '../../../context/AppProvider';
import { IProvince } from '../../../interface/provinces';
import HomeTitleSection from '../../Homev2/components/HomeTitleSection/index';
import Head from '../../Head';
import HeadTitle from '../../HeadTitle';
import scrollTop from '../../../utils/scrollTop';
import { useHistory } from 'react-router-dom'

function HomeListProvince(props: any) {
    const { provinces, t } = useContext(AppContext)
    const history = useHistory()
    const gotoResult = (province: IProvince) => {
        history.push({
            pathname: `/khu-vuc/`,
            search: `${province.name},${province.province_code}`
        })
        scrollTop()
    }
    return (
        <>
            <Head />
            <HeadTitle
                title={t("home_2.places_you_are_interested_in")}
            />
            <div className='home-province'>
                <Container>
                    <div className="flex-row-sp home-se-promo__header">
                        <HomeTitleSection
                            title={t("home_2.places_you_are_interested_in")}
                        />
                    </div>
                    <div className="home-province_list">
                        {
                            provinces?.map((item: IProvince, index: number) => (
                                <div
                                    onClick={() => gotoResult(item)}
                                    key={index}
                                    className="home-province_item"
                                >
                                    <img src={`${item.media[1].original_url}`} alt="" />
                                    <div className="province-item-cnt">
                                        <span>{item.name}</span>
                                        <span>{item.organizations_count} {t("home_2.beauty_places")} </span>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </Container>
            </div>
        </>
    );
}

export default HomeListProvince;