import React from 'react';
import './style.css'
import { Skeleton } from '@mui/material'
import useFullScreen from '../../utils/useFullScreen';

const arr = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
export const LoadingOrgs = () => {
    return (
        <ul className="result-orgs-loading-cnt">
            {
<<<<<<< HEAD
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1].map((i: number, index: number) => (
=======
               arr.map((i:number, index:number) => (
>>>>>>> 9da253a08397015fb54540801fe24651cf140229
                    <li key={index} className="result-orgs-loading-cnt__item">
                        <Skeleton animation="wave" />
                        <Skeleton animation="wave" />
                    </li>
                ))
            }
        </ul>
    );
}
interface IPropsSer {
    width?: string
}
export const LoadingServices = (props: IPropsSer) => {
    const { width } = props;
    const IS_MB = useFullScreen();
    return (
        <ul className="result-orgs-loading-cnt">
            {
<<<<<<< HEAD
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1].map((i: number, index: number) => (
                    <li style={(!IS_MB && width) ? { width: width } : {}} key={index} className="result-orgs-loading-cnt__item service-item">
=======
               arr.map((i:number, index:number) => (
                    <li key={index} className="result-orgs-loading-cnt__item service-item">
>>>>>>> 9da253a08397015fb54540801fe24651cf140229
                        <Skeleton animation="wave" />
                        <Skeleton animation="wave" />
                    </li>
                ))
            }
        </ul>
    );
}
export const LoadingServicesRow = () => {
    return (
        <ul className="result-orgs-loading-cnt-row">
            {
               arr.map((i:number, index:number) => (
                    <li key={index} className="result-orgs-loading-cnt__item service-item">
                        <Skeleton animation="wave" />
                        <Skeleton animation="wave" />
                        <Skeleton animation="wave" />
                        <Skeleton animation="wave" />
                    </li>
                ))
            }
        </ul>
    );
}