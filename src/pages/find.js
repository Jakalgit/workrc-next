import {useEffect, useState} from 'react';
import FindLineStyle from "@/css/components/find_line.module.css"
import style_css from "@/css/pages/find.module.css"
import height from "@/css/general.module.css"
import {fetchItems} from "@/http/API/itemAPI";
import Item from "@/components/CatalogItem";
import Alert from "../components/Alert";
import Footer from "../components/Footer";
import general from "../css/General.module.css";
import {Spinner} from "react-bootstrap";
import Fade from "react-reveal/Fade";
import {fetchColorByIDs} from "@/http/API/colorAPI";
import {getDownloadURL, getStorage, ref} from "firebase/storage";
import {BUCKET_URL} from "@/utils/consts";
import {useTypedSelector} from "@/hooks/useTypedSelector";
import Head from "next/head";

function FindPage() {

    const user = useTypedSelector(state => state.user)

    const [searchValue, setSearchValue] = useState(String(user._searchValue))
    const [items, setItems] = useState([])
    const [filteredItems, setFilteredItems] = useState([])

    const [start, setStart] = useState(false)
    const [message, setMessage] = useState('')
    const [style, setStyle] = useState('primary')

    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchItems().then(data => {
            if (data.length !== 0) {
                let _itemIDs = []
                let _items = []
                data.forEach(item => {
                    _itemIDs.push({itemId: item.id})
                })
                fetchColorByIDs(JSON.stringify(_itemIDs)).then(colors => {
                    colors.forEach(color => {
                        getDownloadURL(ref(getStorage(), BUCKET_URL + color.img1)).then((url) => {
                            const item = data.find(el => el.id === color.itemId)
                            _items.push({...item, image: url, color: color})
                            if (_items.length === colors.length) {
                                setLoading(false)
                                _items.sort((prev, next) => prev.id < next.id ? 1 : -1)
                                setItems(_items)
                            }
                        })
                    })
                })
            } else {
                setLoading(false)
            }
        })
    }, [])

    useEffect(() => {
        if (String(user._searchValue)) {
            setFilteredItems(Object.values(items).filter(item => {
                return item.name.toLowerCase().includes(searchValue.toLowerCase()) ||
                    item.article.toLowerCase().includes(searchValue.toLowerCase())
            }))
        }
    }, [items])

    useEffect(() => {
        if (start) {
            setTimeout(() => {
                setStart(false)
            }, 2500)
        }
    }, [start])

    const searchClick = () => {
        if (searchValue) {
            setFilteredItems(Object.values(items).filter(item => {
                return item.name.toLowerCase().includes(searchValue.toLowerCase()) ||
                    item.article.toLowerCase().includes(searchValue.toLowerCase())
            }))
        } else {
            setFilteredItems([])
            setStyle('danger')
            setMessage("Введите текст")
            setStart(true)
        }

    }

    const updateMessage = (value) => {
        setMessage(value)
    }

    const updateStart = (value) => {
        setStart(value)
    }

    const updateStyle = (value) => {
        setStyle(value)
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
                <title>Поиск товаров</title>
            </Head>
            <Alert start={start} variant={style} text={message} updateStart={(value) => updateStart(value)}/>
            <div className={height.height} style={{marginTop: "6rem"}}>
                <Fade top>
                    <div className="container">
                        <div className="row">
                            <div className="col-12">
                                <div className={FindLineStyle.back_shadow +
                                    ' col-xxl-10 offset-xxl-1 col-xl-10 offset-xl-1 col-lg-10 offset-lg-1 col-md-10 offset-md-1 col-sm-10 offset-sm-1 col-10 offset-1'}>
                                    <div className={FindLineStyle.padding + ' container'}>
                                        <div className="row">
                                            <input type="text"
                                                   value={searchValue}
                                                   onChange={event => setSearchValue(event.target.value)}
                                                   className={FindLineStyle.input + ' col-xxl-9 col-xl-9 col-lg-9 col-md-9 col-sm-9 col-9'}
                                                   placeholder="Поиск товаров..."
                                            />
                                            <button onClick={searchClick}
                                                    className={FindLineStyle.find + ' col-xxl-3 col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3'}>
                                                Найти
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Fade>
                {searchValue && filteredItems.length !== 0 ?
                    <div className={style_css.items}>
                        <div className="container">
                            <div className="row">
                                {filteredItems.map(item =>
                                    <Item
                                        key={item.id}
                                        name={item.name}
                                        id={item.id}
                                        image={item.image}
                                        article={item.article}
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
                        </div>
                    </div>
                    :
                    <Fade>
                        <div className="row">
                            <h2 className={style_css.empty_text}>Пусто...</h2>
                        </div>
                    </Fade>
                }
            </div>
            <Footer />
        </div>
    );
};

export default FindPage;