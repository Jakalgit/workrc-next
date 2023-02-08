import {useEffect, useState} from 'react';
import CheckOrderCss from '@/css/pages/check-order.module.css'
import ModalWindow from "../components/OrderWidget";
import {createOrder} from "@/http/API/orderAPI";
import {createOrderItem} from "@/http/API/orderItemAPI"
import ReCAPTCHA from "react-google-recaptcha";
import {THANKS_ROUTE} from "@/utils/consts";
import Footer from "../components/Footer";
import general from "../css/General.module.css";
import {Spinner} from "react-bootstrap";
import {Fade} from "react-reveal";
import Head from "next/head";
import {useTypedSelector} from "@/hooks/useTypedSelector";
import {useRouter} from "next/router";
import {useActions} from "@/hooks/useActions";
import BasketPageCss from "@/css/pages/basket.module.css";

function CheckOrder() {

    const user = useTypedSelector(state => state.user)
    const item = useTypedSelector(state => state.item)
    const order = useTypedSelector(state => state.order)

    const router = useRouter()

    const actions = useActions()

    const [showModal, setShowModal] = useState(false)
    const [modalText, setModalText] = useState('')
    const [captcha, setCaptcha] = useState(false)

    const [flagLoading, setFlagLoading] = useState(false)

    const cleanOrder = () => {
        actions.setToken('')
        actions.setFirstName('')
        actions.setLastName('')
        actions.setSecondName('')
        actions.setPhone('')
        actions.setEmail('')
        actions.setIndex('')
        actions.setStreet('')
        actions.setHouse('')
        actions.setFlat('')
        actions.setPrice('')
        actions.setTypePay('')
        actions.setTypeDelivery('')
    }

    const createOrderUser = () => {
        if (captcha) {
            setModalText('Ошибка')
            if (order._typeDelivery) {
                switch (order._typeDelivery) {
                    case '1':
                        if (order._firstName && order._phoneNumber && order._typePay && order._price) {
                            createOrder(user._user.token, order._number, order._firstName, order._lastName, order._secondName, order._phoneNumber,
                                order._email, '', '', '', '', order._price, order._typePay, order._typeDelivery, 'Ожидает подтверждения').then(data => {
                                cleanOrder()
                                router.push(THANKS_ROUTE).then()
                                item._basketItems.forEach(basketItem => {
                                    createOrderItem(basketItem.itemId, basketItem.name, basketItem.price, basketItem.img, basketItem.count, data.id).then(() => {})
                                })
                            })
                        } else {
                            setShowModal(true)
                        }
                        return;
                    case '2':
                        if (order._firstName && order._phoneNumber && order._street && order._house && order._flat && order._price && order._typePay && order._typeDelivery) {
                            createOrder(user._user.token, order._number, order._firstName, order._lastName, order._secondName, order._phoneNumber, order._email,
                                order._index, order._street, order._house, order._flat, order._price, order._typePay, order._typeDelivery, 'Ожидает подтверждения').then(data => {
                                cleanOrder()
                                router.push(THANKS_ROUTE).then()
                                item._basketItems.forEach(basketItem => {
                                    createOrderItem(basketItem.itemId, basketItem.name, basketItem.price, basketItem.img, basketItem.count, data.id).then(() => {})
                                })
                            })
                        } else {
                            setShowModal(true)
                        }
                        return;
                    case '3':
                        if (order._firstName && order._lastName && order._secondName && order._phoneNumber && order._index &&
                            order._street && order._house && order._flat && order._price && order._typePay && order._typeDelivery) {
                            createOrder(user._user.token, order._number, order._firstName, order._lastName, order._secondName, order._phoneNumber, order._email,
                                order._index, order._street, order._house, order._flat, order._price, order._typePay, order._typeDelivery, 'Ожидает подтверждения').then(data => {
                                cleanOrder()
                                router.push(THANKS_ROUTE).then()
                                item._basketItems.forEach(basketItem => {
                                    createOrderItem(basketItem.itemId, basketItem.name, basketItem.price, basketItem.img, basketItem.count, data.id).then(() => {})
                                })
                            })
                        } else {
                            setShowModal(true)
                        }
                        return;
                }
            } else {
                setShowModal(true)
            }
        } else {
            setModalText('Нажмите "Я не робот"')
            setShowModal(true)
        }
    }

    function isEmpty(obj) {
        for (let key in obj) {
            // если тело цикла начнет выполняться - значит в объекте есть свойства
            return false;
        }
        return true;
    }

    useEffect(() => {
        if (!isEmpty(order._typeDelivery)) {
            switch (order._typeDelivery) {
                case '1':
                    if (!isEmpty(order._firstName) && !isEmpty(order._phoneNumber) && !isEmpty(order._typePay)) {
                        setFlagLoading(true)
                    } else {
                        setFlagLoading(false)
                    }
                    return;
                case '2':
                    if (!isEmpty(order._firstName) && !isEmpty(order._phoneNumber) && !isEmpty(order._street)
                        && !isEmpty(order._house) && !isEmpty(order._flat) && !isEmpty(order._typePay)) {
                        setFlagLoading(true)
                    } else {
                        setFlagLoading(false)
                    }
                    return;
                case '3':
                    if (!isEmpty(order._firstName) && !isEmpty(order._lastName) && !isEmpty(order._secondName) && !isEmpty(order._phoneNumber) && !isEmpty(order._index)
                        && !isEmpty(order._street) && !isEmpty(order._house) && !isEmpty(order._typePay)) {
                        setFlagLoading(true)
                    } else {
                        setFlagLoading(false)
                    }
                    return;
            }
        } else {
            setFlagLoading(false)
        }
    }, [])


    if (!flagLoading) {
        return (
            <div className={general.loading}>
                <Spinner animation="border" variant="secondary" />
            </div>
        )
    }

    return (
        <div>
            <Head>
                <title>Проверка данных</title>
            </Head>
            {order._number ?
                <div className={CheckOrderCss.check_order}>
                    <div className="container">
                        <div className="row">
                            <h2 className={CheckOrderCss.check_order_text + ' col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12'}>Проверьте
                                введённые данные</h2>
                            <Fade>
                                <div className={CheckOrderCss.left_block + ' col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12'}>
                                    <h2 className={CheckOrderCss.header_info}>ФИО:</h2>
                                    <h2 className={CheckOrderCss.info}>{order._lastName + ' ' + order._firstName + ' ' + order._secondName}</h2>
                                    <h2 className={CheckOrderCss.header_info}>Контактные данные:</h2>
                                    <h2 className={CheckOrderCss.info}>{order._phoneNumber}</h2>
                                    {order._email ?
                                        <h2 className={CheckOrderCss.info}>{order._email}</h2>
                                        :
                                        <h2 className={CheckOrderCss.info}>Адрес почты: не указано</h2>
                                    }
                                    {order._typeDelivery !== '1' &&
                                        <>
                                            <h2 className={CheckOrderCss.header_info}>Адрес:</h2>
                                            {order._house === 'Доставка СДЭК до пункта' ?
                                                <div/>
                                                :
                                                <div>
                                                    {order._house === 'Доставка СДЭК до двери' ?
                                                        <h2 className={CheckOrderCss.info}>{order._street}</h2>
                                                        :
                                                        <h2 className={CheckOrderCss.info}>{order._street + ', ' + order._house + ', ' + order._flat}</h2>
                                                    }
                                                </div>
                                            }
                                            {order._index !== '' && order._index !== 'Доставка СДЭК до двери' &&
                                                <h2 className={CheckOrderCss.info}>{'Индекс: ' + order._index}</h2>
                                            }
                                        </>
                                    }
                                </div>
                            </Fade>
                            <Fade>
                                <div className={CheckOrderCss.right_block + ' col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12'}>
                                    <h2 className={CheckOrderCss.header_info}>Способ оплаты:</h2>
                                    {order._typePay === '1' ?
                                        <h2 className={CheckOrderCss.info}>Оплата онлайн</h2>
                                        : order._typePay === '2' ?
                                            <h2 className={CheckOrderCss.info}>Оплата при получении</h2>
                                            :
                                            <div/>
                                    }
                                    <h2 className={CheckOrderCss.header_info}>Способ доставки:</h2>
                                    {order._typeDelivery === '1' ?
                                        <h2 className={CheckOrderCss.info}>Самовывоз</h2>
                                        : order._typeDelivery === '2' ?
                                            <h2 className={CheckOrderCss.info}>Доставка по Москве</h2>
                                            :
                                            <h2 className={CheckOrderCss.info}>{order._house}</h2>
                                    }
                                    <h2 className={CheckOrderCss.info}>{order._price + ' ₽'}</h2>
                                </div>
                            </Fade>
                            <Fade bottom>
                                <div className="row">
                                    <div className={CheckOrderCss.captcha_block + ' col-xxl-6 offset-xxl-0 col-xl-5 offset-xl-0 col-lg-5 ' +
                                        'offset-lg-0 col-md-5 offset-md-0 col-sm-12 offset-sm-0 col-10 offset-1'}>
                                        <ReCAPTCHA sitekey={'6Lc3XqwfAAAAANThcBTPkUFT38GRBA6IvTK7oUpi'} onChange={() => setCaptcha(true)} onExpired={() => setCaptcha(false)} />
                                    </div>
                                    <button onClick={createOrderUser}
                                            className={CheckOrderCss.right + ' col-xxl-4 offset-xxl-1 col-xl-5 offset-xl-2 col-lg-5 ' +
                                                'offset-lg-2 col-md-5 offset-md-2 col-sm-8 offset-sm-2 col-10 offset-1'}>
                                        Всё верно
                                    </button>
                                </div>
                            </Fade>
                        </div>
                    </div>
                </div>
                :
                <Fade>
                    <h2 className={BasketPageCss.empty_text}>Ошибка, вернитесь в корзину</h2>
                </Fade>
            }
            <Footer />
            <ModalWindow show={showModal} text={modalText} onHide={() => setShowModal(false)} />
        </div>
    );
};

export default CheckOrder;