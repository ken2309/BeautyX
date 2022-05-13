import React from 'react';
import { Dialog } from '@mui/material';
import icon from '../../../constants/icon';
import ButtonCus from '../../../components/ButtonCus';

function PopupNoti(props:any) {
      const {open, setOpen} = props;
      return (
            <Dialog
                  open={open}
                  onClose={() => setOpen(false)}
            >
                  <div className="flex-column my-ser-popup">
                        <span
                              className='flex-row my-ser-popup__title'
                        >
                              <img src={icon.warning} alt="" />
                              <h4>Lưu ý</h4>
                        </span>
                        <span
                              className="my-ser-popup__text"
                        >
                              Để thuận lơi cho khâu đặt hẹn, quý khách hàng chỉ được chọn các dịch vụ trong cùng một gói dịch vụ
                        </span>
                        <ButtonCus
                              text='Đã hiểu'
                              padding="6px 18px"
                              backColor='var(--purple)'
                              color='var(--bgWhite)'
                              borderRadius='14px'
                              onClick={()=>setOpen(false)}
                        />
                  </div>
            </Dialog>
      );
}

export default PopupNoti;