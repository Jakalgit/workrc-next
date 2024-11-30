import React from 'react';
import style_css from "@/css/components/alert.module.css"
import {CSSTransition} from "react-transition-group";

const Alert = (props) => {

    return (
        <CSSTransition
            in={props.start}
            timeout={350}
            classNames="alert"
            mountOnEnter
            unmountOnExit
        >
            <div className={style_css.alert + ' alert'} onClick={() => props.updateStart(false)}>
                {props.variant === 'primary' ?
                    <div className={style_css.alert_block + ' ' + style_css.alert_primary}>
                        <h2 className={style_css.alert_text}>{props.text}</h2>
                    </div>
                    :
                    <div className={style_css.alert_block + ' ' + style_css.alert_danger}>
                        <h2 className={style_css.alert_text}>{props.text}</h2>
                    </div>
                }
            </div>
        </CSSTransition>
    );
};

export default Alert;