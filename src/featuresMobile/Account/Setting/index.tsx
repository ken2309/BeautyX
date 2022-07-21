import React from 'react';
import { Dialog } from "@mui/material";
import Head from '../../../features/Head';
import { Transition } from '../../../utils/transition';
import icon from '../../../constants/icon';
import './style.css'

function Settings(props: any) {
    const { open, setOpen } = props;
    return (
        <Dialog
            open={open}
            fullScreen
            TransitionComponent={Transition}
        >
            <Head setCloseDialog={setOpen} />
            <div className="setting-cnt">
                <ul className="setting-list">
                    <li className="setting-item">
                        <div className="flex-row-sp container">
                            <div className="flex-row left">
                                <img src={icon.languagePurple} alt="" />
                                <span className="left-title">Ngôn ngữ</span>
                            </div>
                            <div className="right">
                                <span className="right-item">Tiếng Việt</span>
                                <span className="right-item">English</span>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </Dialog>
    );
}

export default Settings;