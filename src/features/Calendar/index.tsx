/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import HeadTitle from '../HeadTitle';
import Head from '../Head';
import { Container, Tab } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import './style.css';
import HomeLoggedCalendar from '../Home/components/HomeLogged/HomeLoggedCalendar';
import ServicesUser from '../ServiceUser';
import useFullScreen from '../../utils/useFullScreen';
import icon from '../../constants/icon';
import { clearAllServices } from '../../redux/servicesBookSlice';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { extraParamsUrl } from '../../utils/extraParamsUrl';

function Calendar() {
    const IS_MB = useFullScreen();
    const dispatch = useDispatch();
    const history = useHistory();
    const params: any = extraParamsUrl();
    const tabList = [
        { value: "1", title: "Lịch hẹn" },
        { value: "2", title: "Đặt lịch" },
        { value: "3", title: "Lịch sử" },
    ]
    const [valueTab, setValueTab] = useState(params?.tab || "1");
    const onChangeTab = (event: React.SyntheticEvent, newValue: string) => {
        setValueTab(newValue)
        history.push(`/lich-hen?tab=${newValue}`)

    }
    useEffect(() => {
        dispatch(clearAllServices())
    }, [])

    return (
        <>
            <HeadTitle title="Lịch hẹn" />
            {!IS_MB && <Head />}
            <div className="cal-cnt">
                <div className="cal-cnt__tab-cnt">
                    <TabContext value={valueTab} >
                        <Container>
                            <div className="cal-cnt__tab-cnt-head">
                                <button onClick={() => history.push('/')} className='back-btn'>
                                    <img src={icon.chevronLeft} alt="" />
                                </button>
                                <TabList
                                    className='cal-cnt__tab-list'
                                    onChange={onChangeTab}
                                >
                                    {
                                        tabList.map((item, index) => (
                                            <Tab key={index} label={item.title} value={item.value} />
                                        ))
                                    }
                                </TabList>
                                <div style={{ width: "24px", height: "24px" }} ></div>
                            </div>
                        </Container>
                        <TabPanel value='1' >
                            <HomeLoggedCalendar />
                        </TabPanel>
                        <TabPanel value='2' >
                            <ServicesUser />
                        </TabPanel>
                    </TabContext>
                </div>
            </div>
        </>
    );
}

export default Calendar;