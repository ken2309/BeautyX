import React from 'react';
import { Dialog } from '@mui/material';
import HeadMobile from '../../../../features/HeadMobile';
import { Transition } from '../../../../utils/transition';
import step1 from '../../../../assets/image/user_guide/step_1.png';
import step2 from '../../../../assets/image/user_guide/step_2.png'
import step3 from '../../../../assets/image/user_guide/step_3.png';
import step4 from '../../../../assets/image/user_guide/step_4.png';
//import Slider from 'react-slick';

function AccountGuide(props: any) {
    const { open } = props;
    const steps = [
        { id: 1, title: "Tìm kiếm/ lựa chọn sản phẩm dịch vụ spa, salon yêu thích", img: step1 },
        { id: 2, title: "Thanh toán sản phẩm dịch vụ", img: step2 },
        { id: 3, title: "Đặt hẹn ngay khi thanh toánhoặc Đặt hẹn sau tại Gói dịch vụ", img: step3 },
        { id: 4, title: "Đến cơ sở trải nghiệm và đánh giá dịch vụ", img: step4 }
    ]
    // const settings = {
    //     dots: true,
    //     infinite: true,
    //     speed: 500,
    //     arrows: true,
    //     slidesToShow: 1,
    //     slidesToScroll: 1,
    //     //autoplay: true,
    //     //nextArrow: <NextButton />,
    //     //prevArrow: <PrevButton />,
    //     swipe: true,
    // }
    return (
        <Dialog
            open={open}
            fullScreen
            TransitionComponent={Transition}
        >
            <HeadMobile title='Hướng dẫn sử dụng' />
            <div className="account-guide-cnt">
                <ul className="step-list">
                    {
                        steps.map((item: any, index: number) => (
                            <li className='flex-row-sp' key={item.id} >
                                <img src={item.img} alt="" />
                                <div className="right">
                                    <div className="step">{index + 1}</div>
                                    <span className="title">{item.title}</span>
                                </div>
                            </li>
                        ))
                    }
                </ul>
            </div>
        </Dialog>
    );
}

export default AccountGuide;