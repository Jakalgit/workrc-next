import {useEffect, useRef, useState} from 'react';
import style_css from "@/css/components/message_widget.module.css"
import {CSSTransition} from "react-transition-group";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore"
import {useCollectionData} from "react-firebase-hooks/firestore"
import {changeLastMessage, createDialog, getOneDialog} from "@/http/API/dialogAPI";
import X_WHITE from "../img/x_white.webp"
import ARROW from "../img/arrow.webp"
import Image from "next/image";
import {useTypedSelector} from "@/hooks/useTypedSelector";

function MessageModal(props) {

    const user = useTypedSelector(state => state.user)

    const scrollableRef = useRef(null)
    const firestore = firebase.firestore()

    const [message, setMessage] = useState('')

    const [messages, loading] = useCollectionData(
        firestore.collection('messages').orderBy('createdAt').where('uid', '==', user._user.id)
    )

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' || e.key === 'NumpadEnter') {
            setMessage(e.target.value)
            if (e.target.value.length !== 0) {
                sendMessage(e.target.value)
            }
            e.preventDefault()
        }
    }

    const sendMessage = (mess) => {
        if (mess) {
            firestore.collection('messages').add({
                uid: user._user.id,
                text: mess,
                createdAt: Date.now(),
                type: 'user',
            }).then(() => {
                setMessage('')
                getOneDialog(user._user.id).then((data) => {
                    if (data) {
                        changeLastMessage(user._user.id, Date.now()).then()
                    } else {
                        createDialog(user._user.id, 'Введите название диалога', Date.now())
                            .then()
                    }
                })
            })
        }
    }

    useEffect(() => {
        if (scrollableRef.current) {
            const lastItem = scrollableRef.current.lastElementChild;
            if (lastItem) {
                lastItem.scrollIntoView({ behavior: "smooth", block: "nearest" });
            }
        }
    }, [messages, props.show])

    if (loading) {
        return (
            <div></div>
        )
    }

    return (
        <CSSTransition
            in={props.show}
            timeout={480}
            classNames="messages"
            mountOnEnter
            unmountOnExit
        >
            <div className={style_css.messages + ' messages'}>
                <div className={style_css.up_line}>
                    <h1 className={style_css.text}>Сообщения</h1>
                    <Image src={X_WHITE} alt="" className={style_css.close} onClick={() => props.updateShow(false)}/>
                </div>
                <div className={style_css.scrollable} ref={scrollableRef}>
                    {messages !== undefined ?
                        <div className={style_css.ribbon}>
                            {messages.length === 0 ?
                                <h1 className={style_css.wel_text}>Задайте ваш вопрос,<br/> вам ответят через некторое время</h1>
                                :
                                <div/>
                            }
                            {messages.map(mess =>
                                <div key={mess.createdAt}>
                                    {mess.type === 'user' ?
                                        <div className={style_css.mes_block + ' ' + style_css.right} key={mess.createdAt + ' 1'}>
                                            <div className={style_css.user + ' ' + style_css.message} key={mess.createdAt + ' 2'}>{mess.text}</div>
                                        </div>
                                        :
                                        <div className={style_css.mes_block + ' ' + style_css.left} key={mess.createdAt + ' 1'}>
                                            <div className={style_css.admin + ' ' + style_css.message} key={mess.createdAt + ' 2'}>{mess.text}</div>
                                        </div>
                                    }
                                </div>
                            )}
                        </div>
                        :
                        <div/>
                    }
                    <div/>
                </div>
                <div className={style_css.input_message}>
                    <div className={style_css.down_line}>
                        <textarea
                            className={style_css.in_message}
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            onKeyDown={(e) => handleKeyDown(e)}
                            placeholder="Введите сообщение"
                            rows="2"
                        />
                        <div className={style_css.send} onClick={() => sendMessage(message)}>
                            <Image src={ARROW} alt="" className={style_css.arr}/>
                        </div>
                    </div>
                </div>
            </div>
        </CSSTransition>
    );
};

export default MessageModal;