import React  from 'react';
import HomeTags from './components/HomeTags';
import HomePromo from './components/HomePromo';
import HomeDeal from './components/HomeDeal';
import HomeCard from './components/HomeCard';
import HomeProvince from './components/HomeProvince';
import HomeServicesRe from './components/HomeServicesRe';
import HomeDiscount from '../HomeDiscounts';

import { Container } from '@mui/material';
import './home-se.css'

function HomeSecond(props: any) {
    //const { profile } = useContext(AppContext)
    return (
        <div className="home-se-cnt">
            <Container>
                <HomeTags />
            </Container>
            <HomeDiscount />
            <Container>
                <HomePromo />
                <HomeDeal />
                <HomeCard />
            </Container>
            <HomeProvince />
            {/* <div className="home-ca-cnt">
                {
                    profile ?
                        <HomeLoggedCalendar />
                        :
                        <></>
                }
            </div> */}
            <Container>
                <HomeServicesRe />
            </Container>
        </div>
    );
}

export default HomeSecond;