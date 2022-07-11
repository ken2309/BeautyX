import React from 'react';


interface IProps {
    onClickBtn?: () => void,
    iconBtn?: string
}

function ButtonHeadChat(props: IProps) {
    const { onClickBtn, iconBtn } = props;
    const handleClickBtn = () => {
        if (onClickBtn) {
            onClickBtn()
        }
    }
    return (
        <button onClick={handleClickBtn} className='chat-all-cnt__head-btn'>
            <img src={iconBtn} alt="" />
        </button>
    );
}

export default ButtonHeadChat;