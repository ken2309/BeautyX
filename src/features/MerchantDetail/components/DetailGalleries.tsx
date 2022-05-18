import React from 'react';
import { Dialog } from '@mui/material';
import '../merGalleries.css';
import Carousel from 'react-gallery-carousel';
import 'react-gallery-carousel/dist/index.css';
import useFullScreen from '../../../utils/useFullScreen';
import Head from '../../Head';
import icon from '../../../constants/icon';
import { Transition } from '../../../utils/transition';

const onToggleImgThumb = () => {
    document.querySelector('.org-ga__cnt-left')?.classList.toggle('left-mb-ac')
}

function DetailGalleries(props: any) {
    const { open, setOpen, GALLERIES, imgThumb, setImgThumb } = props;
    const { galleries } = GALLERIES;
    const fullScreen = useFullScreen();
    const list_images = imgThumb?.images?.map((item: any) => ({
        src: item?.image_url
    })) || []
    const settings = {
        hasLeftButton: false,
        hasRightButton: false,
        hasMediaButton: false
    }
    return (
        <Dialog
            fullScreen={fullScreen}
            open={open}
            TransitionComponent={fullScreen ? Transition : undefined}
            onClose={() => setOpen(false)}
        >
            <div className="org-ga__head">
                <Head setCloseDialog={setOpen} />
            </div>
            <div className="flex-row-sp org-ga__cnt">
                <div className="org-ga__cnt-left">
                    <ul className="org-ga__cnt-left-cnt">
                        {
                            galleries.map((item: any, index: number) => (
                                <li
                                    className='ga-thumb__item'
                                    key={index}
                                    onClick={() => setImgThumb(item)}
                                >
                                    <img style={
                                        item.id === imgThumb?.id ?
                                            { boxShadow: "0px 0px 7px 2px rgba(0,0,0,0.52)" }
                                            :
                                            {}
                                    } className='ga-thumb__item-img' src={item.image_url} alt="" />
                                    <span className="ga-thumb__item-title">
                                        {item.name}
                                    </span>
                                </li>
                            ))
                        }
                    </ul>
                </div>
                <div className="org-ga__cnt-right">
                    <Carousel
                        {...settings}
                        images={list_images}
                        className="org-ga__cnt-right-img"
                    />
                    <button onClick={onToggleImgThumb} className='org-ga__cnt-right-btn'>
                        <img src={icon.menuWhite} alt="" />
                    </button>
                </div>
            </div>
        </Dialog>
    );
}

export default DetailGalleries;