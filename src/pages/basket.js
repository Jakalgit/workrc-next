import React, {useEffect, useState} from 'react';
import BasketPageCss from '@/css/pages/basket.module.css'
import {deleteAllBasketItem, getAllBasketItems} from "@/http/API/basketItemAPI";
import BasketItem from "../components/BasketItem";
import Footer from "../components/Footer";
import {Spinner} from "react-bootstrap";
import Fade from "react-reveal/Fade"
import general from "../css/General.module.css";
import X_BLACK from "../img/x_black.webp"
import SHOP_CARD from "../img/shopping-cart.webp"
import {CREATEORDER_ROUTE} from "@/utils/consts";
import Head from "next/head";
import {useTypedSelector} from "@/hooks/useTypedSelector";
import {useActions} from "@/hooks/useActions";
import {useRouter} from "next/router";
import Image from "next/image";

function BasketPage() {

    const user = useTypedSelector(state => state.user)
    const item = useTypedSelector(state => state.item)

    const {setBasketItems} = useActions()
    const router = useRouter()

    const [loading, setLoading] = useState(true)
    const [drawBasketItems, setDrawBasketItems] = useState([])

    useEffect(() => {
        if (user._basket.id !== undefined) {
            getAllBasketItems(user._basket.id).then(data => {
                if (data !== "Ошибка" ?? data !== "Error") {
                    data.sort((prev, next) => prev.id - next.id)
                    setBasketItems(data)
                    setDrawBasketItems(data)
                    setLoading(false)
                }
            })
        }
    }, [user])

    const createOrder = () => {
        router.push(CREATEORDER_ROUTE).then()
    }

    const updateItems = (value) => {
        setDrawBasketItems(value)
    }

    const deleteAllBasketItems = () => {
        deleteAllBasketItem(user._basket.id).then(() => {
            setBasketItems([])
            setDrawBasketItems([])
        })
    }

    if (loading) {
        return (
            <div className={general.loading}>
                <Spinner animation="border" variant="secondary" />
            </div>
        )
    }

    return (
        <div>
            <Head>
                <title>Корзина</title>
            </Head>
            {item._basketItems.length !== 0 ?
                <div>
                    <div className={general.height}>
                        <Fade>
                            <div className={BasketPageCss.section_line}>
                                <div className="container">
                                    <div className="row">
                                        <h1 className={BasketPageCss.your_basket + ' col-xxl-4 offset-xxl-0 col-xl-4 offset-xl-0 col-lg-4 offset-lg-0 col-md-5 offset-md-0 col-sm-6 offset-sm-0 col-12'}>Ваша
                                            корзина</h1>
                                        <div className={BasketPageCss.help_clean + ' col-xxl-1 offset-xxl-4 col-xl-1 offset-xl-4 col-lg-1 offset-lg-4 col-md-1 offset-md-2 col-sm-2 offset-sm-0 col-2 offset-2'}>
                                            <div className={BasketPageCss.clean_all} onClick={deleteAllBasketItems}>
                                                <Image src={X_BLACK} alt="" className={BasketPageCss.close}/>
                                            </div>
                                        </div>
                                        <button className={BasketPageCss.checkout + ' col-xxl-3 col-xl-3 col-lg-3 col-md-4 col-sm-4 col-5'}
                                                onClick={createOrder}>
                                            Оформить заказ
                                            <Image src={SHOP_CARD} alt="" className={BasketPageCss.card}/>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </Fade>

                        <div className="list-item">
                            <div className="container">
                                <div className="row">
                                    {drawBasketItems.map(item =>
                                        <BasketItem
                                            article={item.article}
                                            id={item.id}
                                            itemId={item.itemId}
                                            name={item.name}
                                            price={item.price}
                                            count={item.count}
                                            basketId={item.basketId}
                                            itemColorId={item.itemColorId}
                                            image={item.img}
                                            setItems={(value) => updateItems(value)}
                                        />
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    <Footer/>
                </div>
                :
                <Fade>
                    <h2 className={BasketPageCss.empty_text}>Добавьте товары</h2>
                </Fade>
            }
        </div>
    );
}

export default BasketPage;