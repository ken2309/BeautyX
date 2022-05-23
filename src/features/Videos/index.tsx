import React from 'react';
//import parse from "html-react-parser";
import Head from '../Head';
import { Container } from '@mui/material'
import { useSelector } from 'react-redux';
import ContainerPc from './components/ContainerPc';
import './style.css'

function Videos() {
    const { videos } = useSelector((state: any) => state.BLOG.VIDEOS);
    console.log(videos)
    return (
        <>
            <Head />
            <Container>
                <div className="video-cnt-des">
                    <ContainerPc videos={videos} />
                </div>
            </Container>
        </>
    );
}

export default Videos;