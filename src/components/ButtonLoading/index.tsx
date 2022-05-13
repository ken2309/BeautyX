import React from 'react';
import { CircularProgress } from '@mui/material';
import './style.css';

interface IProps {
    loading: boolean,
    title: string,
    onClick: () => void
}

function ButtonLoading(props: IProps) {
    const { loading, title, onClick } = props;
    //const loading = true
    return (
        <button
            disabled={loading === true}
            className='btn-loading'
            onClick={onClick}
        >
            {
                loading === true &&
                <div className="loading-cnt">
                    <CircularProgress size="25px" color="primary" />
                </div>
            }
            {title}
        </button>
    );
}

export default ButtonLoading;