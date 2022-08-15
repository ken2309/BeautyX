import React from 'react';
import { Slide, Dialog } from '@mui/material'
import { TransitionProps } from '@mui/material/transitions';
import Head from '../../../features/Head';
import Information from '../../../features/Account/components/Information/index';

const Transition = React.forwardRef(function Transition(
      props: TransitionProps & {
            children: React.ReactElement<any, any>;
      },
      ref: React.Ref<unknown>,
) {
      return <Slide direction="left" ref={ref} {...props} />;
});

function AccountForm(props: any) {
      const { open, setOpen } = props;
      return (
            <Dialog
                  fullScreen
                  TransitionComponent={Transition}
                  open={open}
            >
                  <div
                        style={{ height: '100vh', overflowY: 'scroll' }}
                  >
                        <Head
                              setCloseDialog={setOpen}
                        />
                        <Information
                              setOpen={setOpen}
                        />
                  </div>
            </Dialog>
      );
}

export default AccountForm;