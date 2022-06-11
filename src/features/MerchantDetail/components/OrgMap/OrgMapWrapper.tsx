import { Dialog } from "@mui/material";
import React from "react";
import Slider from "react-slick";
import icon from "../../../../constants/icon";
import onErrorImg from "../../../../utils/errorImg";
import Map from "../../../Map";
import WrapperMap from "../../../Map/MapWarraper/WrapperMap";
import MapOrg from "./MapOrg";
import "./orgMap.css";

export default function OrgMapWrapper(props: any) {
    const { open, setOpen, org } = props;
    function handleClose() {
        setOpen(false);
    }

    return (
        <Dialog open={open} onClose={handleClose}>
            <div className="dialog-map__org">
                <div
                    onClick={() => handleClose()}
                    className="dialog-map__close"
                >
                    <div className="dialog-map__close-img">
                        <img src={icon.closeCircleWhite} alt="" />
                    </div>
                </div>
                <MapOrg org={org} />
            </div>
        </Dialog>
    );
}
