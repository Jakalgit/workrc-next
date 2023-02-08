import {useEffect, useState} from 'react';
import CreateOrderCss from "@/css/pages/create-order.module.css"
import Footer from "../components/Footer";
import OrderWidget from "../components/OrderWidget";
import {CHECKORDER_ROUTE} from "@/utils/consts";
import {Helmet} from "react-helmet";
import {Modal, Spinner} from "react-bootstrap";
import {fetchOneItem} from "@/http/API/itemAPI";
import general from "../css/General.module.css";
import {Fade} from "react-reveal";
import Script from "next/script";
import Head from "next/head";
import {useTypedSelector} from "@/hooks/useTypedSelector";
import {useRouter} from "next/router";
import {useActions} from "@/hooks/useActions";

if (typeof window !== "undefined") {
    window.typeCDEK = ''
    window.postId = ''
    window.address = ''
    window.price = ''
    window.goods = []
}

function CreateOrder() {

    const user = useTypedSelector(state => state.user)
    const item = useTypedSelector(state => state.item)
    const order = useTypedSelector(state => state.order)

    const actions = useActions()

    const router = useRouter()

    const [showModal, setShowModal] = useState(false)
    const [showMap, setShowMap] = useState(false)

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [secondName, setSecondName] = useState('')

    const [phoneNumber, setPhoneNumber] = useState('')
    const [email, setEmail] = useState('')

    const [index, setIndex] = useState('')
    const [street, setStreet] = useState('')
    const [house, setHouse] = useState('')
    const [flat, setFlat] = useState('')

    const [typePay, setTypePay] = useState('1')
    const [typeDelivery, setTypeDelivery] = useState('2')

    const [loading, setLoading] = useState(true)

    const [stateGoods, setStateGoods] = useState([{}])
    useEffect(() => {
        let count = item._basketItems.length
        let k = 0
        let _goods = []
        item._basketItems.forEach(item => {
            fetchOneItem(item.itemId).then(data => {
                for (let i = 0; i < item.count; i++) {
                    _goods.push({length: Number(data.length), width: Number(data.width), height: Number(data.height), weight: Number(data.weight)})
                }
                k++
                if (k === count) {
                    setStateGoods(_goods)
                }
            })
        })
        setLoading(false)
    }, [])

    useEffect(() => {
        window.goods = stateGoods
    }, [stateGoods])

    const clickButton = () => {
        let number = String(Date.now())
        switch (typeDelivery) {
            case '1':
                if (firstName && phoneNumber && typePay) {
                    actions.setToken(user._user.token)
                    actions.setNumber(number)
                    actions.setFirstName(firstName)
                    actions.setLastName(lastName)
                    actions.setSecondName(secondName)
                    actions.setPhone(phoneNumber)
                    actions.setEmail(email)
                    actions.setPrice('0')
                    actions.setTypePay(typePay)
                    actions.setTypeDelivery(typeDelivery)
                    router.push(CHECKORDER_ROUTE).then()
                } else {
                    setShowModal(true)
                }
                return;
            case '2':
                if (firstName && phoneNumber && street && house && flat && typePay && typeDelivery) {
                    actions.setToken(user._user.token)
                    actions.setNumber(number)
                    actions.setFirstName(firstName)
                    actions.setLastName(lastName)
                    actions.setSecondName(secondName)
                    actions.setPhone(phoneNumber)
                    actions.setEmail(email)
                    actions.setIndex(index)
                    actions.setStreet(street)
                    actions.setHouse(house)
                    actions.setFlat(flat)
                    actions.setPrice('300')
                    actions.setTypePay(typePay)
                    actions.setTypeDelivery(typeDelivery)
                    router.push(CHECKORDER_ROUTE).then()
                } else {
                    setShowModal(true)
                }
                return;
            case '3':
                if (window.typeCDEK === 'до пункта') {
                    if (firstName && lastName && secondName && phoneNumber && typePay && typeDelivery && window.postId && window.price) {
                        actions.setToken(user._user.token)
                        actions.setNumber(number)
                        actions.setFirstName(firstName)
                        actions.setLastName(lastName)
                        actions.setSecondName(secondName)
                        actions.setPhone(phoneNumber)
                        actions.setEmail(email)
                        actions.setIndex(window.postId)
                        actions.setStreet('Доставка СДЭК до пункта')
                        actions.setHouse('Доставка СДЭК до пункта')
                        actions.setFlat('Доставка СДЭК до пункта')
                        actions.setPrice(window.price)
                        actions.setTypePay(typePay)
                        actions.setTypeDelivery(typeDelivery)
                        router.push(CHECKORDER_ROUTE).then()
                    } else {
                        setShowModal(true)
                    }
                } else if (window.typeCDEK === 'до двери') {
                    if (firstName && lastName && secondName && phoneNumber && typePay && typeDelivery && window.address && window.price) {
                        actions.setToken(user._user.token)
                        actions.setNumber(number)
                        actions.setFirstName(firstName)
                        actions.setLastName(lastName)
                        actions.setSecondName(secondName)
                        actions.setPhone(phoneNumber)
                        actions.setEmail(email)
                        actions.setIndex('Доставка СДЭК до двери')
                        actions.setStreet(window.address)
                        actions.setHouse('Доставка СДЭК до двери')
                        actions.setFlat('Доставка СДЭК до двери')
                        actions.setPrice(window.price)
                        actions.setTypePay(typePay)
                        actions.setTypeDelivery(typeDelivery)
                        router.push(CHECKORDER_ROUTE).then()
                    } else {
                        setShowModal(true)
                    }
                } else {
                    setShowModal(true)
                }
                return;
            default:
                setShowModal(true)
        }
    }

    const handleClose = () => setShowMap(false)

    if (loading) {
        return (
            <div className={general.loading}>
                <Spinner animation="border" variant="secondary" />
            </div>
        )
    }

    return (
        <>
            <Head>
                <title>Создание заказа</title>
            </Head>
            <Script type="text/javascript" src="https://widget.cdek.ru/widget/widjet.js" id="ISDEKscript" />
            {item._basketItems.length !== 0 && stateGoods.length !== 0 ?
                <div>
                    <div className={CreateOrderCss.create_section + ' ' + general.height}>
                        <div className="container">
                            <div className="row">
                                <h2 className={CreateOrderCss.create_text + ' col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12'}>Оформление заказа</h2>
                                <div className={CreateOrderCss.left_block + ' col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12'}>
                                    <div className='name col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12'>
                                        {typeDelivery === '3' ?
                                            <div className="row">
                                                <Fade cascade>
                                                    <input type="text"
                                                           className={CreateOrderCss.data + ' col-xxl-12 offset-xxl-0 col-xl-12 offset-xl-0 col-lg-12 offset-lg-0 col-md-12 offset-md-0 col-sm-12 offset-sm-0 col-10 offset-1'}
                                                           placeholder="*Фамилия"
                                                           onChange={(e) => {setLastName(e.target.value)}}/>
                                                    <input type="text"
                                                           className={CreateOrderCss.data + ' col-xxl-12 offset-xxl-0 col-xl-12 offset-xl-0 col-lg-12 offset-lg-0 col-md-12 offset-md-0 col-sm-12 offset-sm-0 col-10 offset-1'}
                                                           placeholder="*Имя"
                                                           onChange={(e) => {setFirstName(e.target.value)}}/>
                                                    <input type="text"
                                                           className={CreateOrderCss.data + ' col-xxl-12 offset-xxl-0 col-xl-12 offset-xl-0 col-lg-12 offset-lg-0 col-md-12 offset-md-0 col-sm-12 offset-sm-0 col-10 offset-1'}
                                                           placeholder="*Отчество"
                                                           onChange={(e) => {setSecondName(e.target.value)}}/>
                                                </Fade>
                                            </div>
                                            :
                                            <div className="row">
                                                <Fade cascade>
                                                    <input type="text"
                                                           className={CreateOrderCss.data + ' col-xxl-12 offset-xxl-0 col-xl-12 offset-xl-0 col-lg-12 offset-lg-0 col-md-12 offset-md-0 col-sm-12 offset-sm-0 col-10 offset-1'}
                                                           placeholder="Фамилия"
                                                           onChange={(e) => {setLastName(e.target.value)}}/>
                                                    <input type="text"
                                                           className={CreateOrderCss.data + ' col-xxl-12 offset-xxl-0 col-xl-12 offset-xl-0 col-lg-12 offset-lg-0 col-md-12 offset-md-0 col-sm-12 offset-sm-0 col-10 offset-1'}
                                                           placeholder="*Имя"
                                                           onChange={(e) => {setFirstName(e.target.value)}}/>
                                                    <input type="text"
                                                           className={CreateOrderCss.data + ' col-xxl-12 offset-xxl-0 col-xl-12 offset-xl-0 col-lg-12 offset-lg-0 col-md-12 offset-md-0 col-sm-12 offset-sm-0 col-10 offset-1'}
                                                           placeholder="Отчество"
                                                           onChange={(e) => {setSecondName(e.target.value)}}/>
                                                </Fade>
                                            </div>
                                        }
                                    </div>
                                    <div className={CreateOrderCss.num_mail + ' col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12'}>
                                        <div className="row">
                                            <Fade cascade>
                                                <input type="text"
                                                       className={CreateOrderCss.data + ' col-xxl-12 offset-xxl-0 col-xl-12 offset-xl-0 col-lg-12 offset-lg-0 col-md-12 offset-md-0 col-sm-12 offset-sm-0 col-10 offset-1'}
                                                       placeholder="Номер телефона*"
                                                       onChange={(e) => {setPhoneNumber(e.target.value)}}/>
                                                <input type="text"
                                                       className={CreateOrderCss.data + ' col-xxl-12 offset-xxl-0 col-xl-12 offset-xl-0 col-lg-12 offset-lg-0 col-md-12 offset-md-0 col-sm-12 offset-sm-0 col-10 offset-1'}
                                                       placeholder="Электронная почта"
                                                       onChange={(e) => {setEmail(e.target.value)}}/>
                                            </Fade>
                                        </div>
                                    </div>
                                    {typeDelivery === '1' ?
                                        <div/>
                                        :
                                        <div>
                                            {typeDelivery === '2' ?
                                                <div className={CreateOrderCss.address + ' col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12'}>
                                                    <div className="row">
                                                        <Fade>
                                                            <input type="text"
                                                                   className={CreateOrderCss.data + ' col-xxl-12 offset-xxl-0 col-xl-12 offset-xl-0 col-lg-12 offset-lg-0 col-md-12 offset-md-0 col-sm-12 offset-sm-0 col-10 offset-1'}
                                                                   placeholder="*Улица"
                                                                   onChange={(e) => {setStreet(e.target.value)}}/>
                                                        </Fade>
                                                    </div>
                                                    <div className={CreateOrderCss.address_help + ' row'}>
                                                        <Fade cascade>
                                                            <input type="text" className={CreateOrderCss.data + ' ' + CreateOrderCss.small + ' col-sm-12'}
                                                                   placeholder="*Дом"
                                                                   onChange={(e) => {setHouse(e.target.value)}}/>
                                                            <input type="text" className={CreateOrderCss.data + ' ' + CreateOrderCss.small + ' ' + CreateOrderCss.middle + ' col-sm-12'}
                                                                   placeholder="*Квартира"
                                                                   onChange={(e) => {setFlat(e.target.value)}}/>
                                                            <input type="text" className={CreateOrderCss.data + ' ' + CreateOrderCss.small + ' col-sm-12'}
                                                                   placeholder="Индекс"
                                                                   onChange={(e) => {setIndex(e.target.value)}}/>
                                                        </Fade>
                                                    </div>
                                                </div>
                                                :
                                                <div className={CreateOrderCss.address + ' col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12'}>
                                                    <Fade bottom>
                                                        <button onClick={() => setShowMap(true)}
                                                                className={CreateOrderCss.next + ' ' + CreateOrderCss.mt + ' col-xxl-12 offset-xxl-0 col-xl-12 offset-xl-0 col-lg-12 offset-lg-0 col-md-12 offset-md-0 col-sm-12 offset-sm-0 col-10 offset-1'}>
                                                            Открыть карту
                                                        </button>
                                                    </Fade>
                                                </div>
                                            }
                                        </div>
                                    }
                                </div>
                                <div className={CreateOrderCss.right_block + ' col-xxl-5 offset-xxl-1 col-xl-5 offset-xl-1 col-lg-5 offset-lg-1 col-md-5 offset-md-1 col-sm-5 offset-sm-1 col-10 offset-1'}>
                                    <div className="row">
                                        {typeDelivery === '3' ?
                                            <Fade>
                                                <div className='pay col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-6'>
                                                    <h2 className={CreateOrderCss.header_way + ' col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12'}>Способ оплаты:</h2>
                                                    <div className={CreateOrderCss.way_line + ' col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12'}>
                                                        <input type="radio" className={CreateOrderCss.radio} name="pay"
                                                               onClick={() => setTypePay('1')} checked={typePay === '1'}/>
                                                        <h2 className={CreateOrderCss.variant}>Оплата онлайн</h2>
                                                    </div>
                                                    <div className={CreateOrderCss.way_plug}></div>
                                                </div>
                                            </Fade>
                                            :
                                            <Fade>
                                                <div className="pay col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-6">
                                                    <h2 className={CreateOrderCss.header_way + ' col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12'}>Способ оплаты:</h2>
                                                    <div className={CreateOrderCss.way_line + ' col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12'}>
                                                        <input type="radio" className={CreateOrderCss.radio} name="pay"
                                                               onClick={() => setTypePay('1')} checked={typePay === '1'}/>
                                                        <h2 className={CreateOrderCss.variant}>Оплата онлайн</h2>
                                                    </div>
                                                    <Fade>
                                                        <div className={CreateOrderCss.way_line + ' col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12'}>
                                                            <input type="radio" className={CreateOrderCss.radio} name="pay"
                                                                   onClick={() => setTypePay('2')} checked={typePay === '2'}/>
                                                            <h2 className={CreateOrderCss.variant}>Оплата при получении</h2>
                                                        </div>
                                                    </Fade>
                                                </div>
                                            </Fade>
                                        }
                                        <Fade>
                                            <div className='delivery col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-6'>
                                                <h2 className={CreateOrderCss.header_way + ' ' + CreateOrderCss.margin + ' col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12'}>Способ доставки:</h2>
                                                <div className={CreateOrderCss.way_line}>
                                                    <input type="radio" className={CreateOrderCss.radio} name="address"
                                                           onClick={() => setTypeDelivery('1')}/>
                                                    <h2 className={CreateOrderCss.variant}>Самовывоз</h2>
                                                </div>
                                                <h2 className={CreateOrderCss.mini}>Метро Бауманская<br/>г. Москва, Спартаковская площадь д. 10,
                                                    стр. 12<br/>Индекс: <p className={CreateOrderCss.par}>105082</p></h2>
                                                <div className={CreateOrderCss.way_line}>
                                                    <input type="radio" className={CreateOrderCss.radio} name="address"
                                                           onClick={() => setTypeDelivery('2')}/>
                                                    <h2 className={CreateOrderCss.variant}>Доставка по Москве</h2>
                                                </div>
                                                <div className={CreateOrderCss.way_line}>
                                                    <input type="radio" className={CreateOrderCss.radio} name="address"
                                                           onClick={() => setTypeDelivery('3')}/>
                                                    <h2 className={CreateOrderCss.variant}>{'Доставка СДЭК ' + window.typeCDEK}</h2>
                                                </div>
                                            </div>
                                        </Fade>
                                        <Fade bottom>
                                            <button onClick={clickButton}
                                                    className={CreateOrderCss.next + ' col-xxl-10 col-xl-10 col-lg-10 col-md-12 col-sm-12 col-12'}>Далее
                                            </button>
                                        </Fade>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Modal
                        show={showMap}
                        onHide={handleClose}
                        backdrop="static"
                        keyboard={false}
                    >
                        <Modal.Header closeButton>
                            <Modal.Title><h2 className={CreateOrderCss.variant}>Выберете пункт выдачи</h2></Modal.Title>
                        </Modal.Header><div>
                        <Helmet>
                            <script>
                                {`{                   
                                   var widjet = new ISDEKWidjet({
                                       detailAddress: true,
                                       inregion: true,
                                       defaultCity: 'Москва',
                                       cityFrom: 'Москва',
                                       link: 'forpvz',
                                       path: 'https://widget.cdek.ru/widget/scripts/',
                                       servicepath: 'https://widget.cdek.ru/widget/scripts/service.php',
                                       goods: window.goods,
                                       onChoose: onChoose,
                                       onChooseAddress: onChooseAddress
                                   });
                   
                                   function onChoose(wat) {
                                       window.typeCDEK = "до пункта"
                                       window.postId = wat.id
                                       window.price = wat.price
                                       alert('Выбранный тип доставки: доставка до пунтка выдачи                       ' + 'Стоимость доставки: ' + wat.price + ' рублей')
                                   }
                   
                                   function onChooseAddress(wat) {
                                       window.typeCDEK = "до двери"
                                       window.address = wat.address
                                       window.price = wat.price
                                       alert('Выбранный тип доставки: доставка до двери                       ' + 'Стоимость доставки: ' + wat.price + ' рублей')
                                   }
                               }`}
                            </script>
                        </Helmet>
                        <div id="forpvz" style={{height: '600px'}}></div>
                    </div>
                    </Modal>
                    <OrderWidget show={showModal} text={'Заполните все поля'} onHide={() => setShowModal(false)} />
                    <Footer />
                </div>
                :
                <Fade>
                    <h2 className={CreateOrderCss.empty_text}>Заполните корзину</h2>
                </Fade>
            }
        </>
    );
};

export default CreateOrder;