import React from 'react';
import { Container } from '@mui/material';
import './style.css';
import FilterOrgs from '../Filter/FilterOrgs';

function Result() {
    return (
        <Container>
            <div className="result-cont">
                <div className="result-cont__left">
                    <FilterOrgs />
                </div>
            </div>
        </Container>
    );
}

export default Result;