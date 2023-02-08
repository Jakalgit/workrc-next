import {useEffect, useRef, useState} from 'react';
import CatalogCss from '@/css/pages/catalog.module.css'
import CatalogItem from '@/components/CatalogItem'
import {Fade} from 'react-reveal';
import Footer from "../components/Footer";
import {fetchPageItems} from "@/http/API/itemAPI"
import Pagination from "@/components/Pagination";
import Alert from "@/components/Alert";
import {Spinner} from "react-bootstrap";
import {BUCKET_URL, DISCOUNT_ROUTE, NEW_ROUTE, POPULAR_ROUTE, REPAIR_ROUTE} from "@/utils/consts";
import general from "../css/General.module.css";
import FindLine from "../components/FindLine";
import TagsLine from "@/components/TagsLine";
import {fetchColorByIDs} from "@/http/API/colorAPI";
import {getDownloadURL, getStorage, ref} from "firebase/storage";
import {useRouter} from "next/router";
import Head from "next/head";
import {useTypedSelector} from "@/hooks/useTypedSelector";
import {useActions} from "@/hooks/useActions";
import {wrapper} from "@/store";
import firebase from "firebase/compat/app";
import {firebaseConfig} from "@/utils/config";
import {connect} from "react-redux";
import {setItemState, setTotalCount} from "@/store/actions-creators/item";
import {getCookie, getCookies} from "cookies-next";
import {setUserState} from "@/store/actions-creators/user";

function Catalog({ serverItems }) {

    firebase.initializeApp(firebaseConfig)
    const item = useTypedSelector(state => state.item)
    const user = useTypedSelector(state => state.user)
    const {setCurrentTags, setTotalCount} = useActions()
    const router = useRouter()

    const [loadingItems, setLoadingItems] = useState(false)

    const itemsRef = useRef(null)

    const [items, setItems] = useState(serverItems)

    const [start, setStart] = useState(false)
    const [message, setMessage] = useState('')
    const [style, setStyle] = useState('primary')

    const [lineTags, setLineTags] = useState(user._currentTags)

    useEffect(() => {
        console.log(user, item)
    }, [user, item])

    useEffect(() => {
        setItems([])
        fetchPageItems(true, true, null, item._page, JSON.stringify(lineTags)).then(data => {
            setTotalCount(data.count)
            window.scrollTo(0, 300)
            if (data.rows.length !== 0) {
                let _itemIDs = []
                let _items = []
                data.rows.forEach(item => {
                    _itemIDs.push({itemId: item.id})
                })
                fetchColorByIDs(JSON.stringify(_itemIDs)).then(colors => {
                    colors.forEach(color => {
                        getDownloadURL(ref(getStorage(), BUCKET_URL + color.img1)).then((url) => {
                            const item = data.rows.find(el => el.id === color.itemId)
                            _items.push({...item, image: url, color: color})
                            if (_items.length === colors.length) {
                                _items.sort((prev, next) => next.id < prev.id ? 1 : -1)
                                setItems(_items)
                            }
                        })
                    })
                })
            }
        })
    }, [lineTags])

    useEffect(() => {
        if (start) {
            setTimeout(() => {
                setStart(false)
            }, 2500)
        }
    }, [start])

    const updateMessage = (value) => {
        setMessage(value)
    }

    const updateStart = (value) => {
        setStart(value)
    }

    const updateStyle = (value) => {
        setStyle(value)
    }

    const updateLineTags = (value) => {
        setLineTags(value)
    }

    const scrollTo = () => {
        window.scrollTo({
            top: itemsRef.current.offsetTop,
            left: 0,
            behavior: "smooth",
        })
    }

    return (
        <div>
            <Head>
                <title>Каталог</title>
            </Head>
            <Alert start={start} variant={style} text={message} updateStart={(value) => updateStart(value)}/>
            <div className={CatalogCss.cards + ' container'}>
                <TagsLine scrollTo={() => scrollTo()} setTags={(value) => updateLineTags(value)} />
            </div>
            <div className="container">
                <div className="row">
                    <Fade left>
                        <div onClick={() => router.push(NEW_ROUTE)} className="col-xxl-3 col-xl-3 col-lg-3 col-md-3 col-sm-6 col-6">
                            <div className={CatalogCss.card}>
                                <h2 className={CatalogCss.card_text}>Новинки</h2>
                                <h2 className={CatalogCss.card_icon} style={{backgroundColor: "#00E5FF"}}>new</h2>
                            </div>
                        </div>
                    </Fade>
                    <Fade left>
                        <div onClick={() => router.push(POPULAR_ROUTE)} className="col-xxl-3 col-xl-3 col-lg-3 col-md-3 col-sm-6 col-6">
                            <div className={CatalogCss.card}>
                                <h2 className={CatalogCss.card_text}>Популярное</h2>
                                <h2 className={CatalogCss.card_icon + ' ' + CatalogCss.star} style={{backgroundColor: "#FDD835"}}>★</h2>
                            </div>
                        </div>
                    </Fade>
                    <Fade right>
                        <div onClick={() => router.push(DISCOUNT_ROUTE)} className="col-xxl-3 col-xl-3 col-lg-3 col-md-3 col-sm-6 col-6">
                            <div className={CatalogCss.card}>
                                <h2 className={CatalogCss.card_text}>Акции</h2>
                                <h2 className={CatalogCss.card_icon} style={{backgroundColor: "#E41515"}}>%</h2>
                            </div>
                        </div>
                    </Fade>
                    <Fade right>
                        <div onClick={() => router.push(REPAIR_ROUTE)} className="col-xxl-3 col-xl-3 col-lg-3 col-md-3 col-sm-6 col-6">
                            <div className={CatalogCss.card}>
                                <h2 className={CatalogCss.card_text}>Ремонт</h2>
                                <h2 className={CatalogCss.card_icon} style={{backgroundColor: "#000"}}>🛠</h2>
                            </div>
                        </div>
                    </Fade>
                </div>
            </div>

            <div ref={itemsRef}/>

            <Fade top>
                <FindLine length={12} />
            </Fade>

            {lineTags.length !== 0 &&
                <div className="container">
                    <div className={CatalogCss.block_clean + ' row'}>
                        <Fade bottom>
                            <button onClick={() => {setLineTags([]); setCurrentTags([])}}
                                    className={CatalogCss.clean_tags}>Очистить теги</button>
                        </Fade>
                    </div>
                </div>
            }

            <div className="items">
                <div className="container">
                    {items.length !== 0 && !loadingItems ?
                        <div className="row">
                            {items.map(item =>
                                <CatalogItem
                                    key={item.id}
                                    name={item.name}
                                    id={item.id}
                                    article={item.article}
                                    image={item.image}
                                    price={item.price}
                                    oldPrice={item.old_price}
                                    discount={item.discount}
                                    discountFlag={item.discount_flag}
                                    availability={item.availability}
                                    color={item.color}
                                    updateMessage={(value) => updateMessage(value)}
                                    updateStart={(value) => updateStart(value)}
                                    updateStyle={(value) => updateStyle(value)}
                                />
                            )}
                        </div>
                        :
                        <Fade>
                            <div className="row">
                                <div className={general.block_loading}>
                                    <Spinner animation="border" variant="secondary"/>
                                </div>
                            </div>
                        </Fade>
                    }
                </div>
            </div>


            <div className="container">
                <div className="row">
                    <Fade left>
                        <div className={CatalogCss.page}>
                            <Pagination />
                        </div>
                    </Fade>
                </div>
            </div>

            <Footer />
        </div>
    );
}

export const getServerSideProps = wrapper.getServerSideProps((store) => async ({ req, res }) => {
    firebase.initializeApp(firebaseConfig)
    let result = []

    const userCookie = getCookie('user',{ req, res });
    const itemCookie = getCookie('item',{ req, res });

    store.dispatch(setUserState(JSON.parse(userCookie)))
    store.dispatch(setItemState(JSON.parse(itemCookie)))

    const user = await store.getState().user
    const item = await store.getState().item

    const currentTags = JSON.stringify(user._currentTags)
    const dataItems = await fetchPageItems(true, true, null, item._page, currentTags)

    store.dispatch(setTotalCount(dataItems.count))
    if (dataItems.rows.length !== 0) {
        let _itemIDs = []
        let _items = []
        dataItems.rows.forEach(item => {
            _itemIDs.push({itemId: item.id})
        })
        const colors = await fetchColorByIDs(JSON.stringify(_itemIDs))
        for (let i = 0; i < colors.length; i++) {
            const color = colors[i]
            const url = await getDownloadURL(ref(getStorage(), BUCKET_URL + color.img1))
            const item = dataItems.rows.find(el => el.id === color.itemId)
            _items.push({...item, image: url, color: color})
            if (_items.length === colors.length) {
                _items.sort((prev, next) => next.id < prev.id ? 1 : -1)
                result = _items
            }
        }
    }
    return {
        props: {
            serverItems: result
        }
    }
});

export default connect(state => state)(Catalog);
