import "@/css/_app.css"
import "@/css/components/modal_transition.css"
import PagesWrapper from "@/components/PagesWrapper";
import {wrapper} from "@/store";
import {Router} from "next/router";
import {useEffect} from "react";
import general from "@/css/General.module.css";
import {Spinner} from "react-bootstrap";
import React from "react";
import Navbar from "@/components/Navbar";
import {getCookie} from "cookies-next";
import {setUserState} from "@/store/actions-creators/user";
import {setItemState} from "@/store/actions-creators/item";
import firebase from "firebase/compat/app";
import {firebaseConfig} from "@/utils/config";

function App({Component, pageProps}) {

    const [loading, setLoading] = React.useState(false);
    useEffect(() => {
        const start = () => {
            setLoading(true);
        };
        const end = () => {
            setLoading(false);
        };
        Router.events.on("routeChangeStart", start);
        Router.events.on("routeChangeComplete", end);
        Router.events.on("routeChangeError", end);
        return () => {
            Router.events.off("routeChangeStart", start);
            Router.events.off("routeChangeComplete", end);
            Router.events.off("routeChangeError", end);
        };
    }, []);

    if (loading) {
        return (
            <>
                <Navbar />
                <div className={general.loading}>
                    <Spinner animation="border" variant="secondary" />
                </div>
            </>
        )
    }

    return (
        <PagesWrapper Component={Component} pageProps={pageProps} />
    )
}

export const setStore = (store, req, res) => {
    const userCookie = getCookie('user',{ req, res });
    const itemCookie = getCookie('item',{ req, res });

    store.dispatch(setUserState(JSON.parse(userCookie)))
    store.dispatch(setItemState(JSON.parse(itemCookie)))
}

export default wrapper.withRedux(App)