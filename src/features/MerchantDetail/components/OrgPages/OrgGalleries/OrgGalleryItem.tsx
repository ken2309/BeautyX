import React, { useState } from 'react';
import FullImage from '../../../../OpenFullImage';

function OrgGalleryItem(props: any) {
    const { image_url } = props;
    const [open, setOpen] = useState(false);
    return (
        <>
            <div onClick={() => setOpen(true)} className="org-image-items__box">
                <img src={image_url} alt="" />
            </div>
            <FullImage
                open={open}
                setOpen={setOpen}
                image_url={image_url}
            />
        </>
    );
}

export default OrgGalleryItem;