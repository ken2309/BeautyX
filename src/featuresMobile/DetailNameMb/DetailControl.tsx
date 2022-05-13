import React from 'react';
import { Drawer } from '@mui/material';
import DetailCard from '../../features/ProductDetail/components/DetailCard';


function DetailControl(props: any) {
      const { open, setOpen, detail, is_type, org } = props;
      return (
            <Drawer
                  open={open}
                  anchor="bottom"
                  onClose={()=>setOpen(false)}
            >
                  <div className="mb-de-control">
                        <div className="mb-de-control_x">
                        </div>
                        <DetailCard
                              product={detail}
                              is_type={is_type}
                              org={org}
                        />
                  </div>
            </Drawer>
      );
}

export default DetailControl;