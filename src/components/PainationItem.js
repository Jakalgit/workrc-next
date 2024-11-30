import style_css from "@/css/components/pagination_item.module.css"

const PageItem = (props) => {

    return (
        <div onClick={() => (props.onClick())}>
            {props.active ?
                <div className={style_css.round + ' ' + style_css.round_active}>
                    <h2 className={style_css.round_text}>{props.page}</h2>
                </div>
                :
                <div className={style_css.round}>
                    <h2 className={style_css.round_text}>{props.page}</h2>
                </div>
            }
        </div>
    );
};

export default PageItem;