import React from 'react';
import Head from '../../Head';
import HeadTitle from '../../HeadTitle';
import icon from '../../../constants/icon';
import ButtonHeadChat from './components/ButtonHead';
import './style.css';

function ChatAll(props: any) {
    return (
        <>
            <HeadTitle title="Chat" />
            <Head />
            <div className="chat-all-cnt">
                <div className="chat-all-cnt-left">
                    <div className="flex-row-sp chat-all-cnt-left__head">
                        <input
                            className='chat-all-cnt-left__head-inp'
                            type="text"
                            placeholder='Tìm kiếm trên kênh Chat'
                        />
                        <div className="flex-row chat-all-cnt-left__head-ctrl">
                            <ButtonHeadChat
                                iconBtn={icon.friendsPurple}
                            />
                            <ButtonHeadChat
                                iconBtn={icon.plusPurple}
                            />
                        </div>
                    </div>
                    <div className="chat-all-cnt-left__body">
                        <div className="chat-all-cnt-left__body-item-cnt">
                            <div className="flex-row chat-all-cnt-left__body-item">
                                <img src="https://nangtho.myspa.vn/files/nangtho/service/20220610142543.jpg" alt="" className="avatar" />
                                <div className="act"></div>
                                <span className="name">Đây là tên span</span>
                            </div>
                            <div className="flex-row chat-all-cnt-left__body-item">
                                <img src="https://nangtho.myspa.vn/files/nangtho/service/20220610142543.jpg" alt="" className="avatar" />
                                <div className="act"></div>
                                <span className="name">Đây là tên span</span>
                            </div>
                            <div className="flex-row chat-all-cnt-left__body-item">
                                <img src="https://nangtho.myspa.vn/files/nangtho/service/20220610142543.jpg" alt="" className="avatar" />
                                <div className="act"></div>
                                <span className="name">Đây là tên span</span>
                            </div>
                            <div className="flex-row chat-all-cnt-left__body-item">
                                <img src="https://nangtho.myspa.vn/files/nangtho/service/20220610142543.jpg" alt="" className="avatar" />
                                <div className="act"></div>
                                <span className="name">Đây là tên span</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="chat-all-cnt-right">
                    <div className="flex-row-sp chat-all-cnt-right__head">
                        <div className="flex-row head-left">
                            <div className="head-left-avatar">
                                <img src="https://nangtho.myspa.vn/files/nangtho/service/20220610142543.jpg" alt="" />
                                {/* <div className="dot"></div> */}
                            </div>
                            <div className="head-left-title">
                                <span>Đây là tên của Spa</span>
                                <span> Đang hoạt động </span>
                            </div>
                        </div>
                        <div className="head-right">
                            <ButtonHeadChat
                                iconBtn={icon.exclamationPurple}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ChatAll;