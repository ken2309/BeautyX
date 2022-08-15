import React from 'react';
import { Dialog, Slide } from '@mui/material'
import { TransitionProps } from '@mui/material/transitions';
import ServicesUser from '../../../features/ServiceUser/index'

const Transition = React.forwardRef(function Transition(
      props: TransitionProps & {
            children: React.ReactElement<any, any>;
      },
      ref: React.Ref<unknown>,
) {
      return <Slide direction="left" ref={ref} {...props} />;
});

function ServicesUserMb(props: any) {
      const { open, setOpen } = props;
      return (
            <Dialog
                  fullScreen
                  open={open}
                  TransitionComponent={Transition}
            >
                  <div className="mb-order">
                        <ServicesUser
                              setOpen={setOpen}
                        />
                  </div>
            </Dialog>
      );
}

export default ServicesUserMb;