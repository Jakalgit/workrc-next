import Footer from "../components/Footer";
import {CATALOG_ROUTE, REPAIR_ROUTE} from "@/utils/consts"
import styles from "../css/pages/index.module.css"
import general from "../css/General.module.css"
import {Carousel} from "react-bootstrap";
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
    
    const carouselItems = [
        {
            text: 'Акции',
            symbol: <span className={styles.discount}>%</span>,
            tagId: 1
        },
        {
            text: 'Новинки',
            symbol: <span style={{backgroundColor: "#00E5FF"}} className={styles.discount + ' ' + styles.new}>new</span>,
            tagId: 2
        },
        {
            text: 'Популярное',
            symbol: <span style={{backgroundColor: "#FDD835"}} className={styles.discount}>★</span>,
            tagId: 0
        },
        {
            text: 'Ремонт',
            symbol: <span style={{backgroundColor: "#000"}} className={styles.discount}>🛠</span>,
            href: REPAIR_ROUTE,
        }
    ];

    const toCatalog = async (tagId) => {
        await router.push({
            pathname: CATALOG_ROUTE,
            query: { ...router.query, tagIds: JSON.stringify([tagId]) },
        })
    }

    return (
        <div style={{marginTop: "6rem"}} className={general.height}>
        <Head>
                <title>Добро пожаловать!</title>
            </Head>
            <div>
                <FindLine length={10} />
            </div>
            <div>
                <Carousel variant={'dark'}>
                    <Carousel.Item>
                        <div className={styles.carousel_block}>
                            <h1 className={styles.welcome_text}>
                                Добро пожаловать!
                            </h1>
                        </div>
                    </Carousel.Item>
                    {carouselItems.map((item, i) =>
                        <Carousel.Item key={i}>
                            <div
                                onClick={() => {
                                    if (item.href) {
                                        router.push(item.href).then();
                                    } else {
                                        toCatalog(item.tagId).then();
                                    }
                                }}
                                className={`${styles.carousel_block} ${styles.hover}`}
                            >
                                <h2 className={styles.welcome_text}>
                                    {item.text}
                                </h2>
                                {item.symbol}
                            </div>
                            <Carousel.Caption>
                                <p className={styles.prompt}>Нажмите чтобы посмотреть</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                    )}
                </Carousel>
            </div>

            <div className="container">
                <div className="row">
                    <div className={styles.cards}>
                        <div className={styles.card_block + ' col-xxl-3 col-xl-3 col-lg-3 col-md-3 col-sm-3 col-6'}>
                            <div className={styles.card}
                                 onClick={() => {setCurrentTags(['Модели']); router.push(CATALOG_ROUTE).then()}}>
                                <Image src={model} alt="" className={styles.card_image}/>
                                <h2 className={styles.card_name}>Модели</h2>
                            </div>
                        </div>
                        <div className={styles.card_block + ' col-xxl-3 col-xl-3 col-lg-3 col-md-3 col-sm-3 col-6'}>
                            <div className={styles.card}
                                 onClick={() => {setCurrentTags(['Аккумуляторы']); router.push(CATALOG_ROUTE).then()}}>
                                <Image src={accu} alt="" className={styles.card_image}/>
                                <h2 className={styles.card_name}>Аккумуляторы</h2>
                            </div>
                        </div>
                        <div className={styles.card_block + ' col-xxl-3 col-xl-3 col-lg-3 col-md-3 col-sm-3 col-6'}>
                            <div className={styles.card}
                                 onClick={() => {setCurrentTags(['Зарядные у-ва']); router.push(CATALOG_ROUTE).then()}}>
                                <Image src={charge} alt="" className={styles.card_image}/>
                                <h2 className={styles.card_name}>Зарядные устройства</h2>
                            </div>
                        </div>
                        <div className={styles.card_block + ' col-xxl-3 col-xl-3 col-lg-3 col-md-3 col-sm-3 col-6'}>
                            <div className={styles.card}
                                 onClick={() => {setCurrentTags(['Электроника']); router.push(CATALOG_ROUTE).then()}}>
                                <Image src={warp} alt="" className={styles.card_image}/>
                                <h2 className={styles.card_name}>Электроника</h2>
                            </div>
                        </div>
                        <div className={styles.card_block + ' col-xxl-3 col-xl-3 col-lg-3 col-md-3 col-sm-3 col-6'}>
                            <div className={styles.card}
                                 onClick={() => {setCurrentTags(['Колёса']); router.push(CATALOG_ROUTE).then()}}>
                                <Image src={wheel} alt="" className={styles.card_image}/>
                                <h2 className={styles.card_name}>Колёса</h2>
                            </div>
                        </div>
                        <div className={styles.card_block + ' col-xxl-3 col-xl-3 col-lg-3 col-md-3 col-sm-3 col-6'}>
                            <div className={styles.card}
                                 onClick={() => {setCurrentTags(['Запчасти']); router.push(CATALOG_ROUTE).then()}}>
                                <Image src={parts} alt="" className={styles.card_image}/>
                                <h2 className={styles.card_name}>Запчасти</h2>
                            </div>
                        </div>
                        <div className={styles.card_block + ' col-xxl-3 col-xl-3 col-lg-3 col-md-3 col-sm-3 col-6'}>
                            <div className={styles.card}
                                 onClick={() => {setCurrentTags(['Тюнинг']); router.push(CATALOG_ROUTE).then()}}>
                                <Image src={tuning} alt="" className={styles.card_image}/>
                                <h2 className={styles.card_name}>Тюнинг</h2>
                            </div>
                        </div>
                        <div className={styles.card_block + ' col-xxl-3 col-xl-3 col-lg-3 col-md-3 col-sm-3 col-6'}>
                            <div className={styles.card}
                                 onClick={() => {setCurrentTags(['Аксессуары']); router.push(CATALOG_ROUTE).then()}}>
                                <Image src={acs} alt="" className={styles.card_image}/>
                                <h2 className={styles.card_name}>Аксессуары</h2>
                            </div>
                        </div>
                    </div>
                    <div>
                        <h2 className={styles.text_catalog + ' col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12'}>Весь
                            ассортимент товаров вы можете посмотреть в <Link className={styles.href} href={CATALOG_ROUTE}>каталоге</Link></h2>
                    </div>
                    <div>
                        <h2 className={styles.phone_number + ' col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12'}>+7(916)-639-88-04</h2>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}

export default Home;