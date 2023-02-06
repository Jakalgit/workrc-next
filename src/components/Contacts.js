import React, {useState} from 'react';
import style_css from "../css/components/contacts.module.css"
import MessageModal from "./MessageWidget";
import TELEGRAM from "../img/telegram.webp"
import CHAT from "../img/chat.webp"
import Image from "next/image";
import {Fade} from "react-reveal";

function Contacts() {

    const [showMessage, setShowMessage] = useState(false)

    const updateShow = (value) => {
        setShowMessage(value)
    }

    return (
        <div>
            <MessageModal show={showMessage} updateShow={(value) => updateShow(value)}/>
            <div>
                {!showMessage ?
                    <div className={style_css.contacts}>
                        <Fade bottom>
                            <a href="https://t.me/Pash_Rc" target="_blank" className={style_css.telegram + ' ' + style_css.circle}>
                                <Image src={TELEGRAM} alt="" className={style_css.tg + ' ' + style_css.image}/>
                            </a>
                        </Fade>
                        <Fade bottom>
                            <div className={style_css.chats + ' ' + style_css.circle} onClick={(e) => {setShowMessage(true); e.stopPropagation()}}>
                                <Image src={CHAT} alt="" className={'chat ' + style_css.image}/>
                            </div>
                        </Fade>
                    </div>
                    :
                    <div/>
                }
            </div>
        </div>
    );
}

export default Contacts;