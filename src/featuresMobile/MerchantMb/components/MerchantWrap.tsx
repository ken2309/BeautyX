import React, { useEffect, useState } from 'react';
import icon from '../../../constants/icon';
import DetailInfoUtil from '../../../features/MerchantDetail/components/DetailInfoUtil';
import DetailPersonnel from '../../../features/MerchantDetail/components/DetailPersonnel';
import DetailComment from '../../../features/MerchantDetail/components/DetailComment';
import DetailBranchesList from './DetailBranchesList'
import { utilsList } from '../../../features/MerchantDetail/components/DetailInfo';
import { staffList } from '../../../features/MerchantDetail/components/DetailInfo';
import { Drawer } from '@mui/material'
import { IOrganization } from '../../../interface/organization'


interface IProps {
      open: boolean,
      display: number,
      setOpen: (open: boolean) => void,
      org: IOrganization
}

function MerchantWrap(props: IProps) {
      const { open, setOpen, display,org } = props;
      const [element, setElement] = useState(<DetailInfoUtil utilsList={utilsList} />);
      useEffect(() => {
            switch (display) {
                  case 1:
                        return setElement(<DetailInfoUtil utilsList={utilsList} />);
                  case 2:
                        return setElement(<DetailBranchesList branches={org.branches} />);
                  case 3:
                        return setElement(<DetailPersonnel list={staffList} />);
                  case 4:
                        return setElement(<DetailComment org={org} />)
                  default:
                        break;
            }
            // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [display])
      const onClose = () => {
            setOpen(false)
      }
      return (
            <Drawer
                  open={open}
                  onClose={onClose}
                  anchor="bottom"
            >
                  <div className="mb-mer-cnt__box">
                        <div className="flex-row-sp mb-mer-cnt__box-head">
                              <div></div>
                              <img onClick={onClose} src={icon.x} alt="" />
                        </div>
                        <div className="mb-mer-cnt__box-content">
                              {element}
                        </div>
                  </div>
            </Drawer>
      );
}

export default MerchantWrap;