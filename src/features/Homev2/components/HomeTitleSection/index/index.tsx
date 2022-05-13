import React from 'react';
import '../../../home-se.css'

interface IProps{
    title: string
}

function HomeTitleSection(props: IProps) {
    const {title} = props;
    return (
        <div className="home-se-sec-title">
            {title}
        </div>
    );
}

export default HomeTitleSection;