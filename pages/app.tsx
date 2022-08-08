import React from 'react';
import Home from './home/index';


function App(props:any) {
    const {services} = props;
    return (
        <Home
        services={services}
        />
    );
}

export default App;