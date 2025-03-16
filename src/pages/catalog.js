import {useEffect, useRef, useState} from 'react';
import CatalogCss from '@/css/pages/catalog.module.css'
import CatalogItem from '@/components/CatalogItem'
import Footer from "../components/Footer";
import {fetchPageItems} from "@/http/API/itemAPI"
import Pagination from "@/components/Pagination";
import Alert from "@/components/Alert";
import {Spinner} from "react-bootstrap";
import {CATALOG_ROUTE, REPAIR_ROUTE} from "@/utils/consts";
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

function Catalog({ serverItems, queryPage, pageCount, maxPrice, minPrice, tagIds, finder }) {

    const user = useTypedSelector(state => state.user)
    const {setCurrentTags} = useActions();
    const router = useRouter();

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

    const toCatalog = async (tagId) => {
        const query = router.query;
        let tagIds = []
        try {
            tagIds = JSON.parse(query.tagIds) || [];
        } catch {}
        await router.push({
            pathname: CATALOG_ROUTE,
            query: { ...router.query, tagIds: JSON.stringify([...tagIds, tagId]) },
        })
    }

    return (
        <>
            <Head>
                <title>Каталог</title>
            </Head>
            <Alert start={start} variant={style} text={message} updateStart={(value) => updateStart(value)}/>
            <div className={CatalogCss.cards + ' container'}>

            </div>
            <div className="container">
                <div className="row">
                    <div onClick={() => toCatalog(2)}
                         className="col-xxl-3 col-xl-3 col-lg-3 col-md-3 col-sm-6 col-6">
                        <div className={CatalogCss.card}>
                            <h2 className={CatalogCss.card_text}>Новинки</h2>
                            <h2 className={CatalogCss.card_icon} style={{backgroundColor: "#00E5FF"}}>new</h2>
                        </div>
                    </div>
                    <div onClick={() => toCatalog(0)}
                         className="col-xxl-3 col-xl-3 col-lg-3 col-md-3 col-sm-6 col-6">
                        <div className={CatalogCss.card}>
                            <h2 className={CatalogCss.card_text}>Популярное</h2>
                            <h2 className={CatalogCss.card_icon + ' ' + CatalogCss.star}
                                style={{backgroundColor: "#FDD835"}}>★</h2>
                        </div>
                    </div>
                    <div onClick={() => toCatalog(1)}
                         className="col-xxl-3 col-xl-3 col-lg-3 col-md-3 col-sm-6 col-6">
                        <div className={CatalogCss.card}>
                            <h2 className={CatalogCss.card_text}>Акции</h2>
                            <h2 className={CatalogCss.card_icon} style={{backgroundColor: "#E41515"}}>%</h2>
                        </div>
                    </div>
                    <div onClick={() => router.push(REPAIR_ROUTE)}
                         className="col-xxl-3 col-xl-3 col-lg-3 col-md-3 col-sm-6 col-6">
                        <div className={CatalogCss.card}>
                            <h2 className={CatalogCss.card_text}>Ремонт</h2>
                            <h2 className={CatalogCss.card_icon} style={{backgroundColor: "#000"}}>🛠</h2>
                        </div>
                    </div>
                </div>
            </div>
            <div ref={itemsRef}/>
            <FindLine length={12}/>
            {(tagIds.length !== 0 || finder.length !== 0) &&
                <div className="container">
                    <div className={CatalogCss.block_clean + ' row'}>
                        <div>
                            <button
                                onClick={() => router.push(CATALOG_ROUTE)}
                                className={CatalogCss.clean_tags}
                            >
                                Очистить фильтры/поиск
                            </button>
                        </div>
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
                        <div>
                            <div className="row">
                                <div style={{ fontSize: '14px'}} className={general.block_loading}>
                                    Товаров не найдено
                                </div>
                            </div>
                        </div>
                    }
                </div>
            </div>
            <div className="container">
                <div className="row">
                    <div className={CatalogCss.page}>
                        <Pagination queryPage={queryPage} pageCount={pageCount}/>
                    </div>
                </div>
            </div>
            <Footer/>
        </>
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
    let finder = query.finder || "";

    let dataItems = {records: [], totalPages: 1};

    try {
        dataItems = await fetchPageItems({minPrice, maxPrice, page, tagIds, finder});
    } catch (e) {
        console.log(e);
    }

    return {
        props: {
            serverItems: dataItems.records,
            queryPage: page, maxPrice, minPrice, tagIds, finder, pageCount: dataItems.totalPages,
        }
    }
});

export default connect(state => state)(Catalog);
