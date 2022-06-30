import { useMemo, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
//import parse from "html-react-parser";
import { fetchAsyncVideos } from "../../../redux/video/videosSlice";
import Head from "../../Head";
import { Container } from "@mui/material";
import ContainerPc from "./components/ContainerPc";
import Trends from "../../Trends";
import "./style.css";

function Videos() {
    const dispatch = useDispatch();
    const videos = useSelector((state: any) => state.VID).LISTVIDs;
    useEffect(() => {
        dispatch(fetchAsyncVideos());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <>
            <Head />
            <Container maxWidth="xl">
                <Container maxWidth="md">
                    {/* <Trends
                    videos={videos.data}
                /> */}
                    <div className="video-cnt-des">
                        <ContainerPc videos={videos} />
                    </div>
                </Container>
            </Container>
        </>
    );
}

export default Videos;
