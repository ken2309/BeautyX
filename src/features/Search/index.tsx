import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dialog } from '@mui/material';
import { onToggleSearchCnt } from '../../redux/search/searchSlice';
import icon from '../../constants/icon';
import './style.css'

function Search() {
    const { open } = useSelector((state: any) => state.SEARCH);
    const dispatch = useDispatch();
    const onClose = () => {
        dispatch(onToggleSearchCnt(false))
    }
    return (
        <Dialog
            open={open}
            onClose={onClose}
        >
            <div className="search-cnt">
                <div className="search-cnt__head">
                    <div className="search-cnt__head-input">
                        <img src={icon.searchPurple} alt="" className="search-cnt__head-icon" />
                        <input type="text" placeholder='Nhập từ khóa tìm kiếm...' />
                        <img src={icon.closeCircle} alt="" className="search-cnt__head-icon-x" />
                    </div>
                </div>
            </div>
        </Dialog>
    );
}

export default Search;