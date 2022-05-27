import React, { useContext } from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import DetailDesc from './DetailDesc';
import DetailMer from '../components/DetailMer';
import SuggestionList from '../../ServiceDetail/components/SuggestionList';
import DetailNameMb from '../../../featuresMobile/DetailNameMb';
import { AppContext } from '../../../context/AppProvider';
import onErrorImg from '../../../utils/errorImg';
import Comments from '../../Comments';

function DetailHead(props: any) {
    const { product, org, listServices, is_type } = props;
    const { t } = useContext(AppContext)
    const [value, setValue] = React.useState('1');
    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };
    const COMMENT_TYPE = is_type === 1 ? "PRODUCT" : "SERVICE";
    return (
        <div className="product-cnt__left">
            <img
                src={product?.image ? product?.image_url : org?.image_url}
                onError={(e) => onErrorImg(e)}
                alt=""
                className="product-cnt__left-img"
            />
            <div className="product-cnt__left-tabs">
                <div className="product-cnt__tab-wrapper">
                    <Box sx={{ width: '100%', typography: 'body1' }}>
                        <TabContext value={value}>
                            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                <TabList onChange={handleChange} aria-label="lab API tabs example">
                                    <Tab label={t('pr.description')} value="1" />
                                    <Tab label={t('Mer_de.feedback')} value="2" />
                                    {
                                        is_type === 2 ? <Tab label={t('pr.recommend')} value="4" /> : ''
                                    }
                                    <Tab label={t('pr.merchant_detail')} value="3" />
                                </TabList>
                            </Box>
                            <TabPanel value="1">
                                <>
                                    <DetailNameMb
                                        detail={product}
                                        is_type={is_type}
                                        org={org}
                                    />
                                </>
                                <DetailDesc product={product} />
                            </TabPanel>
                            <TabPanel value="2">
                                <Comments
                                    org={org}
                                    id={product?.id}
                                    detail={product}
                                    comment_type={COMMENT_TYPE}
                                />
                            </TabPanel>
                            <TabPanel value="3">
                                <DetailMer
                                    t={t}
                                    org={org}
                                />
                            </TabPanel>
                            {
                                is_type === 2 ?
                                    <TabPanel value="4">
                                        <SuggestionList
                                            org={org}
                                            product={product}
                                            listServices={listServices}
                                        />
                                    </TabPanel>
                                    :
                                    ''
                            }
                        </TabContext>
                    </Box>
                </div>
            </div>
        </div>
    );
}

export default DetailHead;