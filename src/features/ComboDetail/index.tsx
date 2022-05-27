/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react';
import { shareLink } from '../../utils/formatUrlString';
import { useLocation } from 'react-router-dom';
import { fetchAsyncComboDetail } from '../../redux/org_combos/orgCombosSlice';
import { fetchAsyncOrg } from '../../redux/org/orgSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Container } from '@mui/material'
import HeadTitle from '../HeadTitle';
import Head from '../Head';
import onErrorImg from '../../utils/errorImg';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Box, Tab } from '@mui/material'
import './style.css';
import '../ProductDetail/product.css'
import { AppContext } from '../../context/AppProvider';
import DetailRight from './components/DetailRight';
import TabDetail from './components/TabDetail';

function ComboDetail() {
    const { t } = useContext(AppContext)
    const [value, setValue] = useState('1');
    const location: any = useLocation();
    const params: any = shareLink();
    const dispatch = useDispatch();
    const org_reducer = useSelector((state: any) => state.ORG.org);
    const combo_reducer = useSelector((state: any) => state.ORG_COMBOS.COMBO_DETAIL.combo);
    const org = location.state ? location.state.org_state : org_reducer;
    const combo = location.state ? location.state.combo_state : combo_reducer;

    const callComboDetail = () => {
        if (!location.state) {
            const values = {
                org_id: params.org_id,
                com_id: params.id
            }
            dispatch(fetchAsyncOrg(params.org_id))
            dispatch(fetchAsyncComboDetail(values))
        }
    }
    useEffect(() => {
        callComboDetail()
    }, [])

    const onTabChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue)
    }

    return (
        <>
            <Head />
            <HeadTitle
                title={combo?.name ? combo.name : "Loading..."}
            />
            <Container>
                <div className="combo-cnt">
                    <div className="combo-cnt__left">
                        <img
                            src={combo?.image ? combo?.image_url : org?.image_url}
                            onError={(e) => onErrorImg(e)}
                            alt=""
                            className="combo-cnt__left-img"
                        />
                        <div className="product-cnt__left-tabs">
                            <div className="product-cnt__tab-wrapper">
                                <Box sx={{ width: '100%', typography: 'body1' }}>
                                    <TabContext value={value}>
                                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                            <TabList onChange={onTabChange} aria-label="lab API tabs example">
                                                <Tab label={t('pr.description')} value="1" />
                                                <Tab label={t('Mer_de.feedback')} value="2" />
                                                <Tab label={t('pr.recommend')} value="3" />
                                                <Tab label={t('pr.merchant_detail')} value="4" />
                                            </TabList>
                                        </Box>
                                        <TabPanel value="1">
                                            <TabDetail combo={combo} org={org} />
                                        </TabPanel>
                                        <TabPanel value="2">

                                        </TabPanel>
                                        <TabPanel value="3">

                                        </TabPanel>
                                        <TabPanel value="4">

                                        </TabPanel>
                                    </TabContext>
                                </Box>
                            </div>
                        </div>
                    </div>
                    <DetailRight
                        org={org}
                        combo={combo}
                    />
                </div>
            </Container>
        </>
    );
}

export default ComboDetail;