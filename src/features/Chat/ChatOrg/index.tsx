/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import icon from '../../../constants/icon';
import { onToggleOpenChat } from '../../../redux/chat/chatOrgSlice';
import MessageItem from '../ChatAll/components/MessageItem';
import './style.css'

export const chats = [
    { uid: 1, text: "Thành lập năm 2018, PMT AESTHETIC CLINIC là thương hiệu uy tín hàng đầu trong ngành công nghệ spa," },
    { uid: 8, text: "Hế lô" },
    { uid: 1, text: "Sương Nguyệt Ánh, Phường Bến Thành, Quận 1, Thành phố Hồ Chí Minh" },
    { uid: 1, text: "Sương Nguyệt Ánh, Phường Bến Thành, Quận 1, Thành phố Hồ Chí Minh" },
    { uid: 8, text: "Tư vấn đê" },
    { uid: 1, text: "Sương Nguyệt Ánh, Phường Bến Thành, Quận 1, Thành phố Hồ Chí Minh" },
    { uid: 1, text: "Sương Nguyệt Ánh, Phường Bến Thành, Quận 1, Thành phố Hồ Chí Minh" },
    { uid: 8, text: "Tư vấn đê" },
    { uid: 1, text: "Tư vấn cái ... á man" },
    { uid: 1, text: "Sương Nguyệt Ánh, Phường Bến Thành, Quận 1, Thành phố Hồ Chí Minh" },
    { uid: 8, text: "Tư vấn đê" },
    { uid: 1, text: "Sương Nguyệt Ánh, Phường Bến Thành, Quận 1, Thành phố Hồ Chí Minh" },
    { uid: 1, text: "Sương Nguyệt Ánh, Phường Bến Thành, Quận 1, Thành phố Hồ Chí Minh" },
    { uid: 8, text: "Tư vấn đê" },
    { uid: 1, text: "Tư vấn cái ... á man" },
]

function ChatOrg(props: any) {
    const { openChat } = useSelector((state: any) => state.CHAT_ORG)
    const dispatch = useDispatch();
    const onCloseChatCnt = useCallback(() => {
        dispatch(onToggleOpenChat(false));
    }, [])
    return (
        <div
            className={openChat ? "chat-org-cnt chat-org-cnt__act" : "chat-org-cnt"}
        >
            <div className="chat-org-wrap">
                <div className="flex-row-sp chat-org__head">
                    <div className="flex-row left">
                        <img src="https://pmt.myspa.vn/files/pmt/avatar/20211208223905.jpg" alt="" className="chat-org-left__avt" />
                        <span className="chat-org-left__name">
                            Đây là tên Spa
                        </span>
                    </div>
                    <div className="flex-row right">
                        <button className="chat-org__head-btn">
                            <img src={icon.minusPurple} alt="" />
                        </button>
                        <button
                            onClick={onCloseChatCnt}
                            className="chat-org__head-btn"
                        >
                            <img src={icon.crossPurple} alt="" />
                        </button>
                    </div>
                </div>
                <div className="chat-org__body">
                    {
                        chats.map((item: any, index: number) => (
                            <MessageItem
                                key={index}
                                item={item}
                            />
                        ))
                    }
                </div>
                <div className="flex-row-sp chat-org__bottom">
                    <button className="icon-btn">
                        <img src={icon.plus} alt="" />
                    </button>
                    <div className="chat-org__bottom-inp">
                        <input type="text" placeholder='Aa...' />
                        <img src={icon.sendComment} alt="" className="chat-org__bottom-inp-icon" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ChatOrg;