import React from 'react';
import Footer from "../components/Footer";
import {CATALOG_ROUTE, DISCOUNT_ROUTE, NEW_ROUTE, POPULAR_ROUTE, REPAIR_ROUTE} from "@/utils/consts"
import style_css from "../css/pages/index.module.css"
import general from "../css/general.module.css"
import {Carousel} from "react-bootstrap";
import {Fade} from "react-reveal";
import FindLine from "../components/FindLine";
import {useRouter} from "next/router";
import model from "@/img/home/model.webp"
import accu from "@/img/home/accu.webp"
import charge from "@/img/home/charge.webp"
import warp from "@/img/home/warp.webp"
import wheel from "@/img/home/wheel.webp"
import parts from "@/img/home/parts.webp"
import tuning from "@/img/home/tuning.webp"
import acs from "@/img/home/acs.webp"
import Image from "next/image";
import Head from "next/head";
import Link from "next/link";
import {useActions} from "@/hooks/useActions";

function Home() {

    const {setCurrentTags} = useActions()
    const router = useRouter()

    return (
        <div style={{marginTop: "6rem"}} className={general.height}>
            <Head>
                <title>Добро пожаловать!</title>
            </Head>
            <Fade top>
                <FindLine length={10} />
            </Fade>
            <Fade>
                <Carousel variant={'dark'}>
                    <Carousel.Item>
                        <div className={style_css.carousel_block}>
                            <h1 className={style_css.welcome_text}>
                                Добро пожаловать!
                            </h1>
                        </div>
                    </Carousel.Item>
                    <Carousel.Item>
                        <div onClick={() => router.push(DISCOUNT_ROUTE)}
                             className={style_css.carousel_block + ' ' + style_css.hover}>
                            <h1 className={style_css.welcome_text}>
                                Акции
                            </h1>
                            <h1 className={style_css.discount}>%</h1>
                        </div>
                        <Carousel.Caption>
                            <p className={style_css.prompt}>Нажмите чтобы посмотреть</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <div onClick={() => router.push(NEW_ROUTE)}
                             className={style_css.carousel_block + ' ' + style_css.hover}>
                            <h1 className={style_css.welcome_text}>
                                Новинки
                            </h1>
                            <h1 style={{backgroundColor: "#00E5FF"}} className={style_css.discount + ' ' + style_css.new}>new</h1>
                        </div>
                        <Carousel.Caption>
                            <p className={style_css.prompt}>Нажмите чтобы посмотреть</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <div onClick={() => router.push(POPULAR_ROUTE)}
                             className={style_css.carousel_block + ' ' + style_css.hover}>
                            <h1 className={style_css.welcome_text}>
                                Популярное
                            </h1>
                            <h1 style={{backgroundColor: "#FDD835"}} className={style_css.discount}>★</h1>
                        </div>
                        <Carousel.Caption>
                            <p className={style_css.prompt}>Нажмите чтобы посмотреть</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <div onClick={() => router.push(REPAIR_ROUTE)} className={style_css.carousel_block + ' ' + style_css.hover}>
                            <h1 className={style_css.welcome_text}>
                                Ремонт
                            </h1>
                            <h1 style={{backgroundColor: "#000"}} className={style_css.discount}>🛠</h1>
                        </div>
                        <Carousel.Caption>
                            <p className={style_css.prompt}>Нажмите чтобы посмотреть</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel>
            </Fade>

            <div className="container">
                <div className="row">
                    <div className={style_css.cards}>
                        <div className={style_css.card_block + ' col-xxl-3 col-xl-3 col-lg-3 col-md-3 col-sm-3 col-6'}>
                            <div className={style_css.card}
                                 onClick={() => {setCurrentTags(['Модели']); router.push(CATALOG_ROUTE).then()}}>
                                <Image src={model} alt="" className={style_css.card_image}/>
                                <h2 className={style_css.card_name}>Модели</h2>
                            </div>
                        </div>
                        <div className={style_css.card_block + ' col-xxl-3 col-xl-3 col-lg-3 col-md-3 col-sm-3 col-6'}>
                            <div className={style_css.card}
                                 onClick={() => {setCurrentTags(['Аккумуляторы']); router.push(CATALOG_ROUTE).then()}}>
                                <Image src={accu} alt="" className={style_css.card_image}/>
                                <h2 className={style_css.card_name}>Аккумуляторы</h2>
                            </div>
                        </div>
                        <div className={style_css.card_block + ' col-xxl-3 col-xl-3 col-lg-3 col-md-3 col-sm-3 col-6'}>
                            <div className={style_css.card}
                                 onClick={() => {setCurrentTags(['Зарядные у-ва']); router.push(CATALOG_ROUTE).then()}}>
                                <Image src={charge} alt="" className={style_css.card_image}/>
                                <h2 className={style_css.card_name}>Зарядные устройства</h2>
                            </div>
                        </div>
                        <div className={style_css.card_block + ' col-xxl-3 col-xl-3 col-lg-3 col-md-3 col-sm-3 col-6'}>
                            <div className={style_css.card}
                                 onClick={() => {setCurrentTags(['Электроника']); router.push(CATALOG_ROUTE).then()}}>
                                <Image src={warp} alt="" className={style_css.card_image}/>
                                <h2 className={style_css.card_name}>Электроника</h2>
                            </div>
                        </div>
                        <div className={style_css.card_block + ' col-xxl-3 col-xl-3 col-lg-3 col-md-3 col-sm-3 col-6'}>
                            <div className={style_css.card}
                                 onClick={() => {setCurrentTags(['Колёса']); router.push(CATALOG_ROUTE).then()}}>
                                <Image src={wheel} alt="" className={style_css.card_image}/>
                                <h2 className={style_css.card_name}>Колёса</h2>
                            </div>
                        </div>
                        <div className={style_css.card_block + ' col-xxl-3 col-xl-3 col-lg-3 col-md-3 col-sm-3 col-6'}>
                            <div className={style_css.card}
                                 onClick={() => {setCurrentTags(['Запчасти']); router.push(CATALOG_ROUTE).then()}}>
                                <Image src={parts} alt="" className={style_css.card_image}/>
                                <h2 className={style_css.card_name}>Запчасти</h2>
                            </div>
                        </div>
                        <div className={style_css.card_block + ' col-xxl-3 col-xl-3 col-lg-3 col-md-3 col-sm-3 col-6'}>
                            <div className={style_css.card}
                                 onClick={() => {setCurrentTags(['Тюнинг']); router.push(CATALOG_ROUTE).then()}}>
                                <Image src={tuning} alt="" className={style_css.card_image}/>
                                <h2 className={style_css.card_name}>Тюнинг</h2>
                            </div>
                        </div>
                        <div className={style_css.card_block + ' col-xxl-3 col-xl-3 col-lg-3 col-md-3 col-sm-3 col-6'}>
                            <div className={style_css.card}
                                 onClick={() => {setCurrentTags(['Аксессуары']); router.push(CATALOG_ROUTE).then()}}>
                                <Image src={acs} alt="" className={style_css.card_image}/>
                                <h2 className={style_css.card_name}>Аксессуары</h2>
                            </div>
                        </div>
                    </div>
                    <Fade left>
                        <h2 className={style_css.text_catalog + ' col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12'}>Весь
                            ассортимент товаров вы можете посмотреть в <Link className={style_css.href} href={CATALOG_ROUTE}>каталоге</Link></h2>
                    </Fade>
                    <Fade right>
                        <h2 className={style_css.phone_number + ' col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12'}>+7(916)-639-88-04</h2>
                    </Fade>
                </div>
            </div>

            <Footer />
        </div>
    );
}

export default Home;