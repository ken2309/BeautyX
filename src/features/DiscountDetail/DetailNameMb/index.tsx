import React, { useState } from "react";
import DetailControl from "./DetailControl";
import "./detailNameMb.css";

function DetailNameMb(props: any) {
    const { discount } = props;
    const [open, setOpen] = useState(false);
    return (
        <>
            <div className="detail-name-mb">
                <div className="detail-name-mb__add">
                    <button onClick={() => setOpen(true)}>
                        Thêm vào giỏ hàng
                    </button>
                </div>
            </div>
            <DetailControl
                open={open}
                setOpen={setOpen}
                discount={discount}
            />
        </>
    );
}

export default DetailNameMb;
