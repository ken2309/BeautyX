import React from 'react';

interface IProps{
      title:string | any
}

function HeadTitle(props:IProps) {
      const {title} = props;
      document.title = `${title} - BeautyX`
      return (
            <></>
      );
}

export default HeadTitle;