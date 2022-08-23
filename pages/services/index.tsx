import { useRouter } from 'next/router';
import React from 'react';

function Services(props) {
    const route = useRouter();
    const {ser_id} = route.query;
    console.log(ser_id)
    return (
        <div>
            Services List
        </div>
    );
}

export default Services;