import style_css from '@/css/components/Footer.module.css'

function Footer() {
    return (
        <div className={style_css.footer}>
            <div className={style_css.block}>
                <p className={style_css.text}>Требуется такой же сайт?</p>
                <p className={style_css.text}>Email: workaddressmisha@gmail(dot)com</p>
                <p className={style_css.text}>Telegram: <a href="https://t.me/lipoyomi" target="_blank">@lipoyomi</a></p>
            </div>
        </div>
    );
};

export default Footer;