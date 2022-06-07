import React from 'react';
import { useSelector } from 'react-redux';
import {} from '@mui/material'

function Search() {
    const { open } = useSelector((state: any) => state.SEARCH);
    console.log(open)
    return (
        <div>

        </div>
    );
}

export default Search;