import React from 'react';
import style from "./HomeSectionTitle.module.css"

interface IProps {
    title: string
}

function HomeSectionHead(props: IProps) {
    const {title} = props;
    return (
        <div className={style.home_title}>
            <span className={style.title}>
                {title}
            </span>
        </div>
    );
}

export default HomeSectionHead
    ;