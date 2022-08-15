import React, { useContext } from 'react';
import { Container } from '@mui/material';
import { AppContext } from '../../context/AppProvider'
import './detailTabMb.css'
import { onActiveTab } from '../../redux/org/orgSlice';
import { useDispatch } from 'react-redux';

function DetailTabMb(props: any) {
      const { t } = useContext(AppContext)
      const { tab } = props;
      const dispatch = useDispatch();
      const tabList = [
            { id: 1, name: t('Mer_de.about') },
            { id: 2, name: t('Mer_de.services') },
            { id: 3, name: t('Mer_de.products') },
            { id: 4, name: 'Combo' },
            { id: 5, name: t('Mer_de.sale') }
      ]
      const chooseTabClick = (id: any) => {
            dispatch(onActiveTab(id))
      }
      return (
            <div className="mb-mer-detail__cnt">
                  <Container>
                        <ul className="mb-mer-detail__tab">
                              {
                                    tabList.map(item => (
                                          <li key={item.id}>
                                                <div
                                                      style={
                                                            tab === item.id ?
                                                                  { color: 'var(--purple)', borderBottom: 'solid 2px var(--purple)' }
                                                                  :
                                                                  {}
                                                      }
                                                      onClick={() => chooseTabClick(item.id)}
                                                      className="mb-mer-detail__tab-item"
                                                >
                                                      {item.name}
                                                </div>
                                          </li>
                                    ))
                              }
                        </ul>
                  </Container>
            </div>
      );
}

export default DetailTabMb;