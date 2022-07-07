import React from 'react';
import './style.css'
import { Skeleton } from '@mui/material'
import useFullScreen from '../../utils/useFullScreen';

export const LoadingOrgs = () => {
    return (
        <ul className="result-orgs-loading-cnt">
            {
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1].map((i: number, index: number) => (
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
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1].map((i: number, index: number) => (
                    <li style={(!IS_MB && width) ? { width: width } : {}} key={index} className="result-orgs-loading-cnt__item service-item">
                        <Skeleton animation="wave" />
                        <Skeleton animation="wave" />
                    </li>
                ))
            }
        </ul>
    );
}