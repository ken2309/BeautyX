import React from 'react';
import './style.css'
import { Skeleton } from '@mui/material'

export const LoadingOrgs = () => {
    return (
        <ul className="result-orgs-loading-cnt">
            {
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1].map((i:number, index:number) => (
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
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1].map((i:number, index:number) => (
                    <li key={index} className="result-orgs-loading-cnt__item service-item">
                        <Skeleton animation="wave" />
                        <Skeleton animation="wave" />
                    </li>
                ))
            }
        </ul>
    );
}