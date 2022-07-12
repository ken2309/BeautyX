import React from 'react';
import { useSelector } from 'react-redux';

function MessageItem(props: any) {
    const { item } = props;
    const { USER } = useSelector((state: any) => state.USER);
    return (
        <div
            style={item.uid === USER?.id ? {
                justifyContent: "flex-end"
            } : {}}
            className="chat-org__body-wrap-item"
        >
            <div
                style={item.uid === USER?.id ? { flexDirection: "row-reverse" } : {}}
                className="chat-org__body-item"
            >
                <img
                    src={
                        item.uid === USER?.id ?
                            USER?.avatar : "https://pmt.myspa.vn/files/pmt/avatar/20211208223905.jpg"
                    }
                    alt=""
                    className="avatar"
                />
                <div
                    className={
                        item.uid === USER?.id ?
                            "chat-org__body-item__text chat-item-user"
                            :
                            "chat-org__body-item__text"
                    }
                >
                    {item.text}
                </div>
            </div>
        </div>
    );
}

export default MessageItem;