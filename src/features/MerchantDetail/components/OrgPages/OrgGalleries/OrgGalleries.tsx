import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Masonry } from '@mui/lab';
import OrgGalleryItem from './OrgGalleryItem';
import useFullScreen from '../../../../../utils/useDeviceMobile';
import OrgGalleriesDialog from './OrgGalleriesDialog';

function OrgGalleries() {
    const ORG = useSelector((state: any) => state.ORG);
    const IS_MOBILE = useFullScreen();
    const { GALLERIES } = ORG;
    const [chooseThumb, setChooseThumb] = useState(GALLERIES.galleries[0]);
    const [openImages, setOpenImages] = useState(false);

    const onChooseThumb = (thumb: any) => {
        setChooseThumb(thumb)
        if (IS_MOBILE) {
            setOpenImages(true)
        }
    }

    return (
        <div className="org-galleries-cnt">
            <div className="org-galleries__thumb-section">
                <ul className="thumb-list">
                    {
                        GALLERIES.galleries.map((item: any, index: number) => (
                            <li
                                key={index}
                                onClick={() => onChooseThumb(item)}
                            >
                                <div className="thumb-list__item-cnt">
                                    <div className="thumb-img__box">
                                        <img src={item.image_url} alt="" />
                                    </div>
                                    <div className="thumb-img__title">
                                        <span className="title">{item.name}</span>
                                        <span className="count">
                                            {item.images?.length} Hình
                                        </span>
                                    </div>
                                </div>
                            </li>
                        ))
                    }
                </ul>
            </div>
            {
                IS_MOBILE === false &&
                <div className="org-galleries__images-section">
                    <span className="title">
                        {chooseThumb?.name}
                    </span>
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
            }
            <OrgGalleriesDialog
                open={openImages}
                setOpen={setOpenImages}
                chooseThumb={chooseThumb}
            />
        </div>
    );
}

export default OrgGalleries;