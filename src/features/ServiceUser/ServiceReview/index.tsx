import React, { useState } from 'react';
import { Alert, Dialog, Snackbar } from '@mui/material';
import onErrorImg from '../../../utils/errorImg';
import HeadMobile from '../../HeadMobile';
import icon from '../../../constants/icon';
import ButtonLoading from '../../../components/ButtonLoading';
import { postAsyncComment } from '../../../redux/org_services/serviceSlice';
import './style.css'
import { useDispatch, useSelector } from 'react-redux';
import { STATUS } from '../../../redux/status'
import useFullScreen from '../../../utils/useFullScreen';

function ServiceReview(props: any) {
    const { open, setOpen, service, org } = props;
    const IS_MB = useFullScreen();
    const dispatch = useDispatch();
    const { USER } = useSelector((state: any) => state.USER);
    const { status_cmt } = useSelector((state: any) => state.SERVICE.COMMENTS)
    const rateStars = [
        { id: 1, icon: icon.star, iconActive: icon.starLine, title: "Rất tệ" },
        { id: 2, icon: icon.star, iconActive: icon.starLine, title: "Tệ" },
        { id: 3, icon: icon.star, iconActive: icon.starLine, title: "Bình thường" },
        { id: 4, icon: icon.star, iconActive: icon.starLine, title: "Tốt" },
        { id: 5, icon: icon.star, iconActive: icon.starLine, title: "Rất tốt" },
    ]
    const [comment, setComment] = useState({
        text: "",
        image_url: null,
        star: 0,
        used: true
    })
    //const [alert, setAlert] = useState(false)
    const onRateStar = (id: number) => {
        setComment({
            ...comment,
            star: id
        })
    }
    const onSubmitComment = async () => {
        const values = {
            type: "SERVICE",
            id: service?.id,
            org_id: org?.id,
            body: JSON.stringify(comment)
        }
        if (USER && comment.text.length > 0) {
            const res = await dispatch(postAsyncComment({ values }))
            if (res?.meta?.requestStatus === "fulfilled") {
                setOpen(false)
                //setAlert(true)
                setComment({
                    text: "",
                    image_url: null,
                    star: 0,
                    used: true
                })
            }
        }
    }
    let loading = false;
    if (status_cmt === STATUS.LOADING) {
        loading = true
    }
    return (
        <>
            {/* <Snackbar
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center'
                }}
                open={alert}
                autoHideDuration={3500}
                onClose={() => setAlert(false)}
            >
                <Alert onClose={() => setAlert(false)} severity="success" sx={{ width: '100%' }}>
                    Cảm ơn {USER?.fullname} đã đánh giá dịch vụ
                </Alert>
            </Snackbar> */}
            <Dialog
                fullScreen={IS_MB}
                open={open}
                onClose={() => setOpen(false)}
            >
                {IS_MB && open && <HeadMobile onBack={() => setOpen(false)} title="Đánh giá" />}
                <div className='review-service' >
                    <div className="review-service-head">
                        <div className="review-service__title">
                            Đánh giá dịch vụ
                        </div>
                        <div className="flex-row-sp review-service__item">
                            <img
                                // src={service?.image ? service?.image_url : org?.image_url}
                                src='https://cdn2.cellphones.com.vn/358x/media/catalog/product/o/p/op-lung-samsung-galaxy-s22-ultra-plyo-ice-2_.jpg'
                                alt=""
                                className="left"
                                onError={(e) => onErrorImg(e)}
                            />
                            <div className="right">
                                <div>
                                    <span className="service-name">{service?.service_name}</span>
                                    <span className="service-desc">{service?.description}</span>
                                </div>
                                <div className="flex-row right_org">
                                    <img
                                        src={org?.image_url}
                                        alt=""
                                        className="right_org_img"
                                        onError={(e) => onErrorImg(e)}
                                    />
                                    <span className="right_org_name">{org?.name}</span>
                                </div>
                            </div>
                        </div>
                        <div className="review-service__star">
                            <span className='title'>Bạn cảm thấy dịch vụ thế nào ?</span>
                            <ul className="star-list">
                                {
                                    rateStars.map(item => (
                                        <li
                                            onClick={() => onRateStar(item.id)}
                                            className='flex-column' key={item.id}
                                        >
                                            <img src={
                                                item.id <= comment.star ? item.icon : item.iconActive
                                            } alt="" className='start-icon' />
                                            <span className="star-feed">{item.title}</span>
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>
                        <div className="review-service__text">
                            <textarea
                                value={comment.text}
                                onChange={(e) => setComment({
                                    ...comment,
                                    text: e.target.value
                                })}
                                rows={6}
                                className='review-service__ip'
                            />
                        </div>
                    </div>
                    <div className="review-service__btn">
                        <ButtonLoading
                            title='Gửi đánh giá'
                            loading={loading}
                            onClick={onSubmitComment}
                        />
                    </div>
                </div>
            </Dialog>
        </>
    );
}

export default ServiceReview