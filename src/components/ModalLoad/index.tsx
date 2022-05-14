import React from 'react';
import './style.css';
import { CircularProgress } from '@mui/material'

function ModalLoad() {
    return (
        <div className='modal-cnt' >
            <div
                className='modal-cnt__body'
            >
                <CircularProgress
                    size={42}
                />
                <span className="text">
                    Đang xử lý...
                </span>
            </div>
        </div>
    );
}

export default ModalLoad;