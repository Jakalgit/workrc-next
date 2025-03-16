import ItemCss from '../css/components/catalog_item.module.css'
import {ITEM_ROUTE} from '@/utils/consts'
import {createBasketItem, getAllBasketItems} from "@/http/API/basketItemAPI";
import {useRouter} from "next/router";
import {useTypedSelector} from "@/hooks/useTypedSelector";
import {useActions} from "@/hooks/useActions";

const CatalogItem = (props) => {
    const user = useTypedSelector(state => state.user)
    const {setBasketItems} = useActions()

    const router = useRouter()

    console.log(props);

    const itemClick = () => {
        router.push(ITEM_ROUTE + '/' + props.item.id).then()
    }

    let price = props.item.price.toString()
    if (price.length > 3) {
        price = price.slice(0, price.length - 3) + ' ' + price.slice(price.length - 3, price.length)
    }

    const addToBasket = () => {
        alert("Внимание! Онлайн заказ временно не работает, вы можете позвонить по номеру +7(916)-639-88-04")
    }

    return (
        <div className={ItemCss.item + ' col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-6 col-12'}>
            <div className={ItemCss.name_block}>
                <h3 className={ItemCss.name_item}>{props.item.name}</h3>
            </div>
            <div className={ItemCss.img + ' col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12'}>
                {props.item.image ?
                    <div className={ItemCss.item_image}>
                        <img src={`${process.env.NEXT_PUBLIC_BACKEND_URL}static/image/${props.item.image.filename}`}
                             alt=""
                             style={{ maxHeight: "100%", maxWidth: "100%" }}
                             onClick={itemClick}/>
                    </div>
                    :
                    <div className={ItemCss.item_image}/>
                }
            </div>
            <h3 className={ItemCss.article}>{props.item.article}</h3>
            <h3 className={ItemCss.price_item + ' col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12'}>{price + ' ₽'}</h3>
            <div className='help-div col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12'>
                <button onClick={addToBasket}
                        className={ItemCss.add_to_bag + ' col-xxl-8 offset-xxl-2 col-xl-8 offset-xl-2 col-lg-8 offset-lg-2 col-md-8 offset-md-2 col-sm-10 offset-sm-1 col-6 offset-3'}>Добавить
                    в корзину
                </button>
            </div>
        </div>
    );
};

export default CatalogItem;