import { useRouter } from 'next/router';
import React from 'react';

function Services(props) {
    const route = useRouter();
    console.log(route)
    return (
        <div>
            Services List
        </div>
    );
}

export default Services;