import React, { useState } from 'react';
import MerchantWrap from './components/MerchantWrap'
import './merchantMb.css'
import icon from '../../constants/icon';
import {IOrganization} from '../../interface/organization'

interface IProps {
      org: IOrganization | any
}

function MerchantMb(props: IProps) {
      const { org } = props;
      const [open, setOpen] = useState(false);
      const [display, setDisplay] = useState<number>(1);
      const cards = [
            { id: 1, title: 'Tiện tích', icon: icon.bed },
            { id: 2, title: 'Chi nhánh', icon: icon.branches },
            { id: 3, title: 'Đội ngũ nhân sự', icon: icon.staff },
            { id: 4, title: 'Đánh giá', icon: icon.chatAll }
      ]
      const onCardClick = (id: number) => {
            setOpen(true)
            setDisplay(id);
            //setOpenModal(true);
      }
      return (
            <div className="mb-mer-wrap">
                  <ul className="mb-mer">
                        {
                              cards.map(item => (
                                    <li
                                          key={item.id}
                                          onClick={() => onCardClick(item.id)}
                                    >
                                          <div className="mb-mer__item">
                                                <span className="mb-mer__item-title">
                                                      {item.title}
                                                </span>
                                                <img src={item.icon} alt="" />
                                          </div>
                                    </li>
                              ))
                        }
                  </ul>
                  <MerchantWrap
                        display={display}
                        open={open}
                        setOpen={setOpen}
                        org={org}
                  />
            </div>
      );
}

export default MerchantMb;