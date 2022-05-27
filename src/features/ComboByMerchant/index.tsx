/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { Container } from '@mui/material';
import ComboItem from './components/ComboItem';
import './comboByMerchant.css'
import { useSelector, useDispatch } from 'react-redux';
import { fetchAsyncCombosOrg } from '../../redux/org_combos/orgCombosSlice';
import { STATUS } from '../../redux/status'

const tab_id = 4
function ComboByMerchant(props: any) {
    const { activeTab } = props;
    const dispatch = useDispatch();
    const { org, status } = useSelector((state: any) => state.ORG);
    const { combos } = useSelector((state: any) => state.ORG_COMBOS);
    const callCombosByOrg = () => {
        if (status === STATUS.SUCCESS) {
            const values = {
                page: 1,
                org_id: org?.id
            }
            dispatch(fetchAsyncCombosOrg(values))
        }
    }

    useEffect(() => {
        callCombosByOrg()
    }, [status])
    return (
        <div
            style={tab_id === activeTab ? { display: 'block' } : { display: 'none' }}
        >
            <Container>
                <div className="flex-column cmb-cnt">
                    <ul className="cmb-list">
                        {
                            combos.map((item: any) => (
                                <ComboItem
                                    key={item.id}
                                    detail={item}
                                    org={org}
                                />
                            ))
                        }
                    </ul>
                </div>
            </Container>
        </div>
    );
}

export default ComboByMerchant;