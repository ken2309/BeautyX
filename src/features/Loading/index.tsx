import React from 'react';
import './loading.css';
import {CircularProgress} from '@mui/material';
import {makeStyles} from '@mui/styles'

const loadingStyle = makeStyles({
      loadingContent:{
            display:'flex',
            flexDirection:'row',
            alignItems:'center',
            justifyContent:'center'
      }
})
function Loading(props: any) {
      const classes = loadingStyle();
      return (
            <div className={classes.loadingContent}>
                  <CircularProgress />
            </div>
      );
}

export default Loading;