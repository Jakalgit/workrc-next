import React, {useContext, useEffect, useState} from 'react';
import style_css from "@/css/pages/item_page.module.css"
import Footer from "@/components/Footer";
import {fetchColor} from "@/http/API/colorAPI";
import {fetchAllInfo, fetchOneItem} from "@/http/API/itemAPI"
import {
    createBasketItem,
    decrementBasketItem, getAllBasketItems,
    getBasketItem,
    incrementBasketItem, setCountBasketItem
} from "@/http/API/basketItemAPI"
import {Carousel, Spinner} from "react-bootstrap";
import {Fade} from "react-reveal";
import LoadImage from "@/components/LoadImage";
import CHECK from "@/img/check.webp"
import X_BLACK from "@/img/x_black.webp"
import CHEVRON_LEFT from "@/img/chevron-left.webp"
import CHEVRON_RIGHT from "@/img/chevron-right.webp"
import {useRouter} from "next/router";
import {useTypedSelector} from "@/hooks/useTypedSelector";
import {useActions} from "@/hooks/useActions";
import Alert from "@/components/Alert";
import Head from "next/head";
import {wrapper} from "@/store";
import {getCookie} from "cookies-next";
import {setUserState} from "@/store/actions-creators/user";
import {setItemState} from "@/store/actions-creators/item";
import Image from "next/image";

function ItemPage({ itemServer, title, infoServer, colorServer, countServer}) {

    const item = useTypedSelector(state => state.item)
    const user = useTypedSelector(state => state.user)

    const {setBasketItems} = useActions()

    const router = useRouter()

    const [count, setCount] = useState(countServer)
    const [itemPg, setItem] = useState(itemServer)

    const {id} = router.query

    const [start, setStart] = useState(false)
    const [message, setMessage] = useState('')
    const [style, setStyle] = useState('primary')

    const [price, setPrice] = useState('')
    const [oldPrice, setOldPrice] = useState('')

    useEffect(() => {
        if (itemServer.price) {
            let priceSTR = itemServer.price.toString()
            if (priceSTR.length > 3) {
                setPrice(priceSTR.slice(0, priceSTR.length - 3) + ' ' + priceSTR.slice(priceSTR.length - 3, priceSTR.length))
            } else {
                setPrice(priceSTR)
            }
        }

        if (itemServer.old_price) {
            let priceSTR = itemServer.old_price.toString()
            if (priceSTR.length > 3) {
                setOldPrice(priceSTR.slice(0, priceSTR.length - 3) + ' ' + priceSTR.slice(priceSTR.length - 3, priceSTR.length))
            } else {
                setOldPrice(priceSTR)
            }
        }
    }, [itemServer])

    useEffect(() => {
        if (start) {
            setTimeout(() => {
                setStart(false)
            }, 2500)
        }
    }, [start])

    useEffect(() => {
        if (count < 1) {
            setCountBasketItem(itemServer.id, user._basket.id, 1).then(() => {
                setCount(1)
                const prMas = item._basketItems.map(item => item.id === props.id ? {...item, count: 1} : item)
                setBasketItems(prMas)
                props.setItems(prMas)
            })
        }
        if (count > 99) {
            setCountBasketItem(itemServer.id, user._basket.id, 99).then(() => {
                setCount(99)
                const prMas = item._basketItems.map(item => item.id === props.id ? {...item, count: 99} : item)
                setBasketItems(prMas)
                props.setItems(prMas)
            })
        }
    }, [count])

    const increment = () => {
        let _count = count
        if (count < 99) {
            incrementBasketItem(id, user._basket.id, _count + 1).then(() => {
                setCount(prevState => prevState + 1)
                setBasketItems(item._basketItems.map(el => el.id === id ? {...el, count: _count + 1} : el))
            })
        }
    }

    const decrement = () => {
        let _count = count
        if (count > 1) {
            decrementBasketItem(id, user._basket.id, _count - 1).then(() => {
                setCount(prevState => prevState - 1)
                setBasketItems(item._basketItems.map(el => el.id === id ? {...el, count: _count - 1} : el))
            })
        }
    }

    const addToBasket = () => {
        if (itemPg.availability) {
            createBasketItem(itemPg.id, user._basket.id, count, colorServer.img1, itemPg.name, itemPg.price, colorServer.id,
                itemPg.article).then(() => {
                getAllBasketItems(user._basket.id).then(data => {
                    if (data !== "Error" && data !== "Ошибка") {
                        setBasketItems(data)
                    }
                })
                setMessage("Товар добавлен в корзину")
                setStyle("primary")
                setStart(true)
            })
        } else {
            setMessage("Данного товара нет в наличии")
            setStyle("danger")
            setStart(true)
        }
    }

    const updateStart = (value) => {
        setStart(value)
    }

    return (
        <div>
            <Head>
                <title>{title}</title>
            </Head>
            <Alert start={start} variant={style} text={message} updateStart={(value) => updateStart(value)} />
            <Fade top>
                <div className={style_css.item_block}>
                    <div className="container">
                        <div className="row">
                            <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-5 col-12">
                                <Carousel variant={"dark"}>
                                    <Carousel.Item>
                                        <div className={style_css.img}>
                                            <LoadImage name={colorServer.img1} className={style_css.image} />
                                        </div>
                                    </Carousel.Item>
                                    <Carousel.Item>
                                        <div className={style_css.img}>
                                            <LoadImage name={colorServer.img2} className={style_css.image} />
                                        </div>
                                    </Carousel.Item>
                                    <Carousel.Item>
                                        <div className={style_css.img}>
                                            <LoadImage name={colorServer.img3} className={style_css.image} />
                                        </div>
                                    </Carousel.Item>
                                    <Carousel.Item>
                                        <div className={style_css.img}>
                                            <LoadImage name={colorServer.img4} className={style_css.image} />
                                        </div>
                                    </Carousel.Item>
                                </Carousel>
                            </div>
                            <div className={style_css.inf + ' col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-7 col-12'}>
                                <div className='flex-block col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12'>
                                    <div className={style_css.name_block}>
                                        <h2 className={style_css.item_name}>{itemServer.name}</h2>
                                        {itemServer.discount_flag ?
                                            <h2 className={style_css.discount}>{'-' + itemServer.discount + '%'}</h2>
                                            :
                                            <div/>
                                        }
                                    </div>
                                    {itemServer.availability ?
                                        <div className={style_css.help_ava + ' col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12'}>
                                            <div className={style_css.availability + ' ' + style_css.availability_green}>
                                                <Image src={CHECK} alt="" className={style_css.ava}/>
                                            </div>
                                            <h2 className={style_css.availability_text}>В наличии</h2>
                                        </div>
                                        :
                                        <div className={style_css.help_ava + ' col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12'}>
                                            <div className={style_css.availability + ' ' + style_css.availability_red}>
                                                <Image src={X_BLACK} alt="" className={style_css.ava}/>
                                            </div>
                                            <h2 className={style_css.availability_text}>Нет в наличии</h2>
                                        </div>
                                    }
                                    <h1 className={style_css.article}>{itemServer.article}</h1>
                                    <div className={style_css.counter + ' col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12'}>
                                        <div className={style_css.change} onClick={decrement}>
                                            <Image src={CHEVRON_LEFT} alt="" className={style_css.chevron}/>
                                        </div>
                                        <h2 className={style_css.count}>{count}</h2>
                                        <div className={style_css.change} onClick={increment}>
                                            <Image src={CHEVRON_RIGHT} alt="" className={style_css.chevron}/>
                                        </div>
                                    </div>
                                    <h2 className={style_css.price + ' col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12'}>{price + ' ₽'}</h2>
                                    {itemServer.discount_flag ?
                                        <h2 className={style_css.old_price}>{oldPrice + ' ₽'}</h2>
                                        :
                                        <div/>
                                    }
                                    <button onClick={addToBasket}
                                            className={style_css.add_to_bag + ' col-xxl-8 offset-xxl-2 col-xl-8 offset-xl-2 col-lg-8 offset-lg-2 col-md-10 offset-md-1 col-sm-8 offset-sm-2 col-10 offset-1'}>
                                        Добавить в корзину
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Fade>

            <Fade bottom>
                <div className={style_css.des_back}>
                    <div className="container">
                        <div className="row">
                            {infoServer.map(i =>
                                <Fade>
                                    <h2 className={style_css.description + ' col-xxl-12 offset-xxl-0 col-xl-12 offset-xl-0 col-lg-12 offset-lg-0 col-md-12 offset-md-0 col-sm-12 offset-sm-0 col-10 offset-1'}>
                                        {i.info}
                                    </h2>
                                </Fade>
                            )}
                        </div>
                    </div>
                </div>
            </Fade>
            <Footer />
        </div>
    );
}

export const getServerSideProps = wrapper.getServerSideProps((store) => async ({ query, req, res  }) => {
    const {id} = query

    const userCookie = getCookie('user',{ req, res });
    const itemCookie = getCookie('item',{ req, res });

    store.dispatch(setUserState(JSON.parse(userCookie)))
    store.dispatch(setItemState(JSON.parse(itemCookie)))

    const user = await store.getState().user

    const item =  await fetchOneItem(id)
    const title = item.name
    const info = await fetchAllInfo(item.id)
    const color = await fetchColor(id)

    let count

    const data = await getBasketItem(id, user._basket.id)
    if (data === "Ошибка" || data === "Error") {
        count = 1
    } else {
        count = data.count
    }

    return {
        props: {
            itemServer: item,
            title,
            infoServer: info.rows,
            colorServer: color,
            countServer: count
        }
    }
})

export default ItemPage;