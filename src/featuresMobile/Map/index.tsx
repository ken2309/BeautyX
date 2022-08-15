import React, { useState } from "react";
import { TransitionProps } from "@mui/material/transitions";
import { Dialog, Slide } from "@mui/material";
import BackButton from "../../components/BackButton";
import MapWrapper from "./components/MapWrapper";
import MapCard from "./components/MapCard";
import "./map.css";

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement;
    },
    ref: React.Ref<unknown>
) {
    return <Slide direction="left" ref={ref} {...props} />;
});

function Map(props: any) {
    const { openMap, setOpenMap, list } = props;
    const [itemCenter, setItemCenter] = useState(list[0]);
    return (
        <Dialog fullScreen open={openMap} TransitionComponent={Transition}>
            <BackButton setOpenFilter={setOpenMap} />
            <div className="mb-map">
                <MapWrapper itemCenter={itemCenter} />
                <MapCard setItemCenter={setItemCenter} list={list} />
            </div>
        </Dialog>
    );
}

export default Map;
