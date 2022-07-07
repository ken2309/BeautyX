import React from 'react';
import './style.css'
import { Skeleton } from '@mui/material'

const arr = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
export const LoadingOrgs = () => {
    return (
        <ul className="result-orgs-loading-cnt">
            {
               arr.map((i:number, index:number) => (
                    <li key={index} className="result-orgs-loading-cnt__item">
                        <Skeleton animation="wave" />
                        <Skeleton animation="wave" />
                    </li>
                ))
            }
        </ul>
    );
}
export const LoadingServices = () => {
    return (
        <ul className="result-orgs-loading-cnt">
            {
               arr.map((i:number, index:number) => (
                    <li key={index} className="result-orgs-loading-cnt__item service-item">
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