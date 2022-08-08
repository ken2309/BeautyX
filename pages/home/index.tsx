import React from 'react';
import { Container } from '@mui/material';
import styles from './home.module.css'
import HomeDealHot from './components/HomeDealHot';


function Home(props:any) {
    const {services} = props;
    return (
        <div>
            <Container>
                <HomeDealHot
                    services={services}
                />
            </Container>
        </div>
    );
}

export default Home;