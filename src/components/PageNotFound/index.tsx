import React from 'react';
import './style.css';
import img from '../../constants/img';
import ButtonLoading from '../ButtonLoading';
import { useHistory } from 'react-router-dom';

function PageNotFound() {
    const history = useHistory();
    const goBack = () => {
        history.goBack();
    }
    return (
        <div className="page-not-found">
            <div className="flex-column page-not-found-cnt">
                <div className="flex-row page-not-found__head">
                    <h1>4</h1>
                    <img src={img.beautyx} alt="" />
                    <h1>4</h1>
                </div>
                <span>OOPS !</span>
                <span>Not found</span>
                <ButtonLoading
                    title='Trở lại'
                    onClick={goBack}
                    loading={false}
                />
            </div>
        </div>
    );
}

export default PageNotFound;