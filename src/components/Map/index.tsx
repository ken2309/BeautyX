import { Dialog } from "@mui/material";
import React from "react";
import icon from "../../constants/icon";
import MapContent from "./MapContent";
import "./style.css";
export default function Map(props: any) {
    const { open, setOpenMap, data } = props;
    return (
        <Dialog
            fullScreen
            open={open}
            onClose={() => {
                setOpenMap(false);
            }}
        >
            <div className="map">
                <div
                    onClick={() => setOpenMap(false)}
                    className="dialog-map__close"
                >
                    <div className="dialog-map__close-img">
                        <img src={icon.closeCircleWhite} alt="" />
                    </div>
                </div>
                <MapContent org={data} />
            </div>
        </Dialog>
    );
}
