import React, { useRef } from 'react';
import Head from '../../Head';
import HeadTitle from '../../HeadTitle';
import icon from '../../../constants/icon';
import ButtonHeadChat from './components/ButtonHead';
import { chats } from '../ChatOrg/index';
import MessageItem from './components/MessageItem';
import { Link, useLocation, useHistory } from 'react-router-dom'
import './style.css';
import { extraParamsUrl } from '../../../utils/extraParamsUrl';
import useDeviceMobile from '../../../utils/useDeviceMobile';

function ChatAll(props: any) {
    const chatRooms = [
        { id: 1, name: "Tên của spa 1" },
        { id: 2, name: "Tên của spa 1" },
        { id: 3, name: "Tên của spa 1" },
        { id: 4, name: "Tên của spa 1" },
        { id: 5, name: "Tên của spa 1" },
        { id: 6, name: "Tên của spa 1" },
        { id: 7, name: "Tên của spa 1" },
        { id: 8, name: "Tên của spa 1" },
    ]
    const params: any = extraParamsUrl();
    const messageRoomId = parseInt(params?.message_room);
    const location = useLocation();
    const history = useHistory();
    const IS_MB = useDeviceMobile();
    let prevUrl: any = "/";
    if (location.state) {
        prevUrl = location.state
    }
    const refChatLeft = useRef<any>();
    const refChatRight = useRef<any>()
    const onOpenChatRoom = () => {
        refChatLeft?.current?.classList.add("chat-all-cnt-left__hide");
        refChatRight?.current?.classList.add("chat-all-cnt-right__act")
    }
    const onBackChatRoom = () => {
        refChatLeft?.current?.classList.remove("chat-all-cnt-left__hide");
        refChatRight?.current?.classList.remove("chat-all-cnt-right__act")
    }
    const onGoBack = () => {
        history.push(prevUrl)
    }
    return (
        <>
            <HeadTitle title="Chat" />
            {!IS_MB && <Head prev_url={prevUrl} />}
            <div className="chat-all-cnt">
                <div ref={refChatLeft} className="chat-all-cnt-left">
                    <div className="flex-row-sp chat-all-cnt-left__head">
                        {
                            IS_MB &&
                            <ButtonHeadChat
                                iconBtn={icon.chevronLeft}
                                onClickBtn={onGoBack}
                            />
                        }
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
                            {
                                chatRooms.map((item: any, index: number) => (
                                    <Link
                                        onClick={onOpenChatRoom}
                                        style={
                                            item.id === messageRoomId ?
                                                { backgroundColor: "#EAF3FF" } : {}
                                        }
                                        to={{
                                            pathname: "/chat",
                                            search: `?message_room=${item.id}`
                                        }}
                                        key={index}
                                        className="flex-row chat-all-cnt-left__body-item"
                                    >
                                        <img
                                            src="https://nangtho.myspa.vn/files/nangtho/service/20220610142543.jpg"
                                            alt=""
                                            className="avatar"
                                        />
                                        <div className="act"></div>
                                        <span className="name">{item.name}</span>
                                    </Link>
                                ))
                            }
                        </div>
                    </div>
                </div>
                <div ref={refChatRight} className="chat-all-cnt-right">
                    <div className="flex-row-sp chat-all-cnt-right__head">
                        <div className="flex-row head-left">
                            {
                                IS_MB &&
                                <ButtonHeadChat
                                    onClickBtn={onBackChatRoom}
                                    iconBtn={icon.chevronLeft}
                                />
                            }
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
                    <div className="chat-all-cnt-right__body">
                        <div className="chat-all-cnt-right__body-mess">
                            {
                                chats.map((item: any, index: number) => (
                                    <MessageItem
                                        item={item}
                                        key={index}
                                    />
                                ))
                            }
                        </div>
                        <div className="flex-row-sp chat-all-cnt-right__body-inp">
                            <ButtonHeadChat
                                iconBtn={icon.plus}
                            />
                            <div className="flex-row input-wrap">
                                <input type="text" placeholder='Aa' />
                                <button className='chat-all-cnt-right__body-inp-send-btn'>
                                    <img src={icon.sendComment} alt="" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ChatAll;