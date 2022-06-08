import {useMemo,useState} from 'react';
//import parse from "html-react-parser";
import Head from '../Head';
import { Container } from '@mui/material'
import { useSelector } from 'react-redux';
import ContainerPc from './components/ContainerPc';
import Trends from '../Trends';
import './style.css'


function Videos() {
    const { videos } = useSelector((state: any) => state.BLOG.VIDEOS);
    return (
        <>
            <Head />
            <Container
                maxWidth='xl'
            >
                <Container
                    maxWidth='md'
                >
                <Trends
                    videos={videos}
                />
                <div className="video-cnt-des">
                    <ContainerPc videos={videos} />
                </div>
                </Container>
            </Container>
        </>
    );
}

export default Videos;