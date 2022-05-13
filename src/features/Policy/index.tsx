import React from 'react';
import { policies } from '../../data/policies';
import { useLocation } from 'react-router-dom';
import parser from 'html-react-parser';
import './policy.css';
import Head from '../Head';
import { Container } from '@mui/material'

function Policy() {
    const location: any = useLocation();
    const state = location.state;
    const id = state?.id
    const dataRender = policies.find((item: any) => item.id === id)
    return (
        state && dataRender &&
        <>
            <Head />
            <Container>
                <div className="po-container">
                    <div>
                        {parser(dataRender.templateHtml)}
                    </div>
                </div>
            </Container>
        </>
    );
}

export default Policy;