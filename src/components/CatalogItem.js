import ItemCss from '../css/components/catalog_item.module.css'
import {ITEM_ROUTE} from '@/utils/consts'
import {createBasketItem, getAllBasketItems} from "@/http/API/basketItemAPI";
import Fade from "react-reveal/Fade";
import {useRouter} from "next/router";
import {useTypedSelector} from "@/hooks/useTypedSelector";
import {useActions} from "@/hooks/useActions";

const CatalogItem = (props) => {
    const user = useTypedSelector(state => state.user)
    const {setBasketItems} = useActions()

    const router = useRouter()

    const itemClick = () => {
        router.push(ITEM_ROUTE + '/' + props.id).then()
    }

    let price = props.price.toString()
    if (price.length > 3) {
        price = price.slice(0, price.length - 3) + ' ' + price.slice(price.length - 3, price.length)
    }

    let oldPrice = props.oldPrice.toString()
    if (oldPrice.length > 3) {
        oldPrice = oldPrice.slice(0, oldPrice.length - 3) + ' ' + oldPrice.slice(oldPrice.length - 3, oldPrice.length)
    }

    const addToBasket = () => {
        if (props.availability) {
            createBasketItem(props.id, user._basket.id, 1, props.color.img1, props.name, props.price, props.color.id,
                props.article).then(() => {
                getAllBasketItems(user._basket.id).then(data => {
                    if (data !== "Error" && data !== "Ошибка") {
                        setBasketItems(data)
                    }
                })
                props.updateMessage("Товар добавлен в корзину")
                props.updateStyle("primary")
                props.updateStart(true)
            })
        } else {
            props.updateMessage("Данного товара нет в наличии")
            props.updateStyle("danger")
            props.updateStart(true)
        }
    }

    return (
        <Fade bottom>
            <div className={ItemCss.item + ' col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-6 col-12'}>
                <div className={ItemCss.name_block}>
                    <h2 className={ItemCss.name_item}>{props.name}</h2>
                    {props.discountFlag ?
                        <h2 className={ItemCss.discount}>{'-' + props.discount + '%'}</h2>
                        :
                        <div/>
                    }
                </div>
                <div className={ItemCss.img + ' col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12'}>
                    {props.image ?
                        <img src={props.image} alt="" className={ItemCss.item_image} onClick={itemClick}/>
                        :
                        <div className={ItemCss.item_image}/>
                    }
                </div>
                <h1 className={ItemCss.article}>{props.article}</h1>
                <h2 className={ItemCss.price_item + ' col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12'}>{price + ' ₽'}</h2>
                <h2 className={ItemCss.old_price}>{props.discountFlag ? (oldPrice + ' ₽') : ''}</h2>
                <div className='help-div col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12'>
                    <button onClick={addToBasket}
                            className={ItemCss.add_to_bag + ' col-xxl-8 offset-xxl-2 col-xl-8 offset-xl-2 col-lg-8 offset-lg-2 col-md-8 offset-md-2 col-sm-10 offset-sm-1 col-6 offset-3'}>Добавить
                        в корзину
                    </button>
                </div>
            </div>
        </Fade>
    );
};

export default CatalogItem;