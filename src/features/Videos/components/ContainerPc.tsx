import React, { useState } from 'react';
import VideoItemPc from './VideoItemPc';

function ContainerPc(props: any) {
    const { videos } = props;
    const [videoCur, setVideoCur] = useState<any>()
    return (
        <div className="video-list-des">
            <ul className="video-list">
                {
                    videos.map((item: any, index: number) => (
                        <li key={index} className="video-item-pc">
                            <VideoItemPc
                                video={item}
                                videoCur={videoCur}
                                setVideoCur={setVideoCur}
                            />
                        </li>
                    ))
                }
            </ul>
        </div>
    );
}

export default ContainerPc;