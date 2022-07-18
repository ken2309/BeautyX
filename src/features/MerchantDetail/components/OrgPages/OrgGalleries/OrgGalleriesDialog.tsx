import React from 'react';
import { Dialog } from '@mui/material'
import { Masonry } from '@mui/lab';
import useFullScreen from '../../../../../utils/useDeviceMobile';
import OrgGalleryItem from './OrgGalleryItem';
import { Transition } from '../../../../../utils/transition';
import icon from '../../../../../constants/icon';

function OrgGalleriesDialog(props: any) {
    const { chooseThumb, open, setOpen } = props;
    const IS_MOBILE = useFullScreen();
    return (
        <Dialog
            fullScreen
            open={open}
            TransitionComponent={Transition}
        >
            <div className="org-galleries__images-section">
                <div className="flex-row title">
                    <button className='org-image-btn' onClick={() => setOpen(false)} >
                        <img src={icon.chevronLeft} alt="" />
                    </button>
                    {chooseThumb?.name}
                </div>
                <div className="images-section__wrap">
                    <Masonry
                        columns={IS_MOBILE ? 2 : 5}
                        spacing={IS_MOBILE ? 1 : 2}
                    >
                        {chooseThumb?.images?.map((item: any, index: number) => (
                            <OrgGalleryItem
                                key={index}
                                image_url={item?.image_url}
                            />
                        ))}
                    </Masonry>
                </div>
            </div>
        </Dialog>
    );
}

export default OrgGalleriesDialog;