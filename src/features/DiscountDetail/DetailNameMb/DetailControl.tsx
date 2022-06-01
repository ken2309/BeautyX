import React from "react";
import { Drawer } from "@mui/material";
import DetailRight from "../components/DetailRight";
import DetailCard from "../../ProductDetail/components/DetailCard";

function DetailControl(props: any) {
    const { open, setOpen, discount } = props;
    return (
        <Drawer open={open} anchor="bottom" onClose={() => setOpen(false)}>
            <div className="mb-de-control">
                <div className="mb-de-control_x"></div>
                <DetailRight
                    discount={discount}
                />
            </div>
        </Drawer>
    );
}

export default DetailControl;
