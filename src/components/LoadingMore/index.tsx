import React from 'react';
import img from '../../constants/img';
import './style.css';

function LoadingMore() {
    return (
        <div
            className='load-more-cnt'
        >
            <img src={img.beautyx} alt="" />
        </div>
    );
}

export default LoadingMore;