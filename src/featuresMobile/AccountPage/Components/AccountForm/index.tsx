import React from 'react';
import { Slide, Dialog } from '@mui/material'
import { TransitionProps } from '@mui/material/transitions';
import Information from '../../../../features/Account/components/Information/index';
import HeadMobile from '../../../../features/HeadMobile';

const Transition = React.forwardRef(function Transition(
      props: TransitionProps & {
            children: React.ReactElement<any, any>;
      },
      ref: React.Ref<unknown>,
) {
      return <Slide direction="left" ref={ref} {...props} />;
});

function AccountForm(props: any) {
      const { open } = props;
      return (
            <Dialog
                  fullScreen
                  TransitionComponent={Transition}
                  open={open}
            >
                  <div
                        style={{ minHeight: '100vh' }}
                  >
                        <HeadMobile title='Địa chỉ giao hàng' />
                        <Information />
                  </div>
            </Dialog>
      );
}

export default AccountForm;