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
import {Carousel} from "react-bootstrap";
import CHECK from "@/img/check.webp"
import X_BLACK from "@/img/x_black.webp"
import CHEVRON_LEFT from "@/img/chevron-left.webp"
import CHEVRON_RIGHT from "@/img/chevron-right.webp"
import {useRouter} from "next/router";
import {useTypedSelector} from "@/hooks/useTypedSelector";
import {useActions} from "@/hooks/useActions";
import Head from "next/head";
import {wrapper} from "@/store";
import Image from "next/image";

function ItemPage({ itemServer, title }) {

    const [count, setCount] = useState(0)

    const [start, setStart] = useState(false)

    const [price, setPrice] = useState('')

    useEffect(() => {
        if (itemServer.price) {
            let priceSTR = itemServer.price.toString()
            if (priceSTR.length > 3) {
                setPrice(priceSTR.slice(0, priceSTR.length - 3) + ' ' + priceSTR.slice(priceSTR.length - 3, priceSTR.length))
            } else {
                setPrice(priceSTR)
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

    const increment = () => {
        if (count < 99) setCount(prevState => prevState + 1)
    }

    const decrement = () => {
        if (count > 0) setCount(prevState => prevState - 1)
    }

    const addToBasket = () => {
        alert("Внимание! Онлайн заказ временно не работает, вы можете позвонить по номеру +7(916)-639-88-04")
    }

    return (
        <div>
            <Head>
                <title>{title}</title>
            </Head>
            <div>
                <div className={style_css.item_block}>
                    <div className="container">
                        <div className="row">
                            <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-5 col-12">
                                <Carousel variant={"dark"}>
                                    {itemServer.images.map(image =>
                                        <Carousel.Item>
                                            <div className={style_css.img}>
                                                <img src={`${process.env.NEXT_PUBLIC_BACKEND_URL}static/image/${image.filename}`} alt="" className={style_css.image} />
                                            </div>
                                        </Carousel.Item>
                                    )}
                                </Carousel>
                            </div>
                            <div className={style_css.inf + ' col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-7 col-12'}>
                                <div className='flex-block col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12'>
                                    <div className={style_css.name_block}>
                                        <h2 className={style_css.item_name}>{itemServer.name}</h2>
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
                                    <button
                                        onClick={addToBasket}
                                        className={style_css.add_to_bag + ' col-xxl-8 offset-xxl-2 col-xl-8 offset-xl-2 col-lg-8 offset-lg-2 col-md-10 offset-md-1 col-sm-8 offset-sm-2 col-10 offset-1'}
                                    >
                                        Добавить в корзину
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div>
                <div className={style_css.des_back}>
                    <div className="container">
                        <div className="row">
                            {itemServer.infoBlocks.map(i =>
                                <div>
                                    <h2 className={style_css.description + ' col-xxl-12 offset-xxl-0 col-xl-12 offset-xl-0 col-lg-12 offset-lg-0 col-md-12 offset-md-0 col-sm-12 offset-sm-0 col-10 offset-1'}>
                                        {i.text}
                                    </h2>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export const getServerSideProps = wrapper.getServerSideProps((store) => async ({ query, req, res  }) => {
    const {id} = query;

    const item =  await fetchOneItem(id)
    const title = item.name

    return {
        props: {
            itemServer: item,
            title,
        }
    }
})

export default ItemPage;