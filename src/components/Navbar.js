import style_css from '../css/components/navbar.module.css'
import {Container, Nav, Navbar} from "react-bootstrap";
import Link from "next/link";
import {
    ABOUT_ROUTE,
    BASKET_ROUTE,
    CATALOG_ROUTE,
    DELANDPAY_ROUTE,
    FIND_ROUTE,
    FINDYOURORDER_ROUTE
} from "@/utils/consts";
import {useTypedSelector} from "@/hooks/useTypedSelector";

function NavBar() {

    const item = useTypedSelector(state => state.item)

    return (
        <Navbar className={style_css.header} variant="dark" expand="lg">
            <Container>
                <Navbar.Brand><Link className={style_css.navbar_brand} href={"/"}>WORK-RC</Link></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav" style={{justifyContent: "flex-end"}}>
                    <Nav>
                        <Link className={style_css.navbar_link + ' ' + style_css.navbar_link_user} href={CATALOG_ROUTE}>Каталог</Link>
                        <Link className={style_css.navbar_link + ' ' + style_css.navbar_link_user} href={FIND_ROUTE}>Поиск</Link>
                        <Link className={style_css.navbar_link + ' ' + style_css.navbar_link_user} href={FINDYOURORDER_ROUTE}>Ваш заказ</Link>
                        <Link className={style_css.navbar_link + ' ' + style_css.navbar_link_user} href={DELANDPAY_ROUTE}>Доставка и оплата</Link>
                        <Link className={style_css.navbar_link + ' ' + style_css.navbar_link_user} href={ABOUT_ROUTE}>О нас</Link>
                        <Link className={style_css.navbar_link + ' ' + style_css.navbar_link_user} href={BASKET_ROUTE}>
                            <div className={style_css.svg}>
                                <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="M5 21q-.425 0-.775-.262-.35-.263-.475-.688L.95 9.95q-.125-.35.112-.65Q1.3 9 1.7 9h5.05l4.4-6.55q.125-.2.35-.325.225-.125.475-.125.25 0 .475.125.225.125.35.325L17.2 9h5.1q.4 0 .638.3.237.3.112.65l-2.8 10.1q-.125.425-.475.688Q19.425 21 19 21Zm7-4q.825 0 1.413-.587Q14 15.825 14 15q0-.825-.587-1.413Q12.825 13 12 13q-.825 0-1.412.587Q10 14.175 10 15q0 .825.588 1.413Q11.175 17 12 17ZM9.175 9H14.8l-2.825-4.2Z"/></svg>
                                {item._basketItems.length !== 0 &&
                                    <p className={style_css.basket_count}>{item._basketItems.length}</p>
                                }
                            </div>
                        </Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default NavBar;