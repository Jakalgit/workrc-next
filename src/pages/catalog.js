import {useEffect, useRef, useState} from 'react';
import CatalogCss from '@/css/pages/catalog.module.css'
import CatalogItem from '@/components/CatalogItem'
import {Fade} from 'react-reveal';
import Footer from "../components/Footer";
import {fetchPageItems} from "@/http/API/itemAPI"
import Pagination from "@/components/Pagination";
import Alert from "@/components/Alert";
import {Spinner} from "react-bootstrap";
import {REPAIR_ROUTE} from "@/utils/consts";
import general from "../css/General.module.css";
import FindLine from "../components/FindLine";
import TagsLine from "@/components/TagsLine";
import {useRouter} from "next/router";
import Head from "next/head";
import {useTypedSelector} from "@/hooks/useTypedSelector";
import {useActions} from "@/hooks/useActions";
import {wrapper} from "@/store";
import {connect} from "react-redux";
import {setTotalCount} from "@/store/actions-creators/item";
import {setStore} from "@/pages/_app";

function Catalog({ serverItems, queryPage, pageCount, maxPrice, minPrice, tagIds, finder }) {

    const user = useTypedSelector(state => state.user)
    const {setCurrentTags, setTotalCount} = useActions()
    const router = useRouter()

    const itemsRef = useRef(null);

    const [start, setStart] = useState(false)
    const [message, setMessage] = useState('')
    const [style, setStyle] = useState('primary')

    const [lineTags, setLineTags] = useState(user._currentTags)

    const [finderText, setFinderText] = useState(finder);

    const [page, setPage] = useState({page: queryPage, count: pageCount});

    const [filters, setFilters] = useState({
        maxPrice, minPrice, tagIds: tagIds
    });

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
                    {serverItems.length !== 0 ?
                        <div className="row">
                            {serverItems.map(item =>
                                <CatalogItem
                                    key={item.id}
                                    item={item}
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

export const getServerSideProps = wrapper.getServerSideProps(() => async ({query, req, res, ...etc}) => {

    const page = query.page ? Number(query.page) : 1;
    let maxPrice = query.max | null;
    let minPrice = query.min | null;
    let tagIds = []
    try {
        tagIds = query.tagIds ? JSON.parse(query.tagIds) : [];
    } catch {}
    let finder = query.finder | null;

    let dataItems = {rows: [], pageCount: 1};

    try {
        dataItems = await fetchPageItems({minPrice, maxPrice, page, tagIds, finder});
    } catch (e) {
        console.log(e);
    }

    console.log(dataItems)

    return {
        props: {
            serverItems: dataItems.rows,
            queryPage: page, maxPrice, minPrice, tagIds, finder, pageCount: dataItems.totalPages,
        }
    }
});

export default connect(state => state)(Catalog);
