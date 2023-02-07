import React, {useState} from 'react';
import NavBar from "@/components/Navbar";
import Contacts from "@/components/Contacts";
import {useEffect} from "react";
import {init} from "@/http/user";
import {initBasket} from "@/http/API/basketAPI";
import {getAllBasketItems} from "@/http/API/basketItemAPI";
import firebase from "firebase/compat/app";
import {useTypedSelector} from "@/hooks/useTypedSelector";
import {useActions} from "@/hooks/useActions";
import {firebaseConfig} from "@/utils/config";
import {setCookie} from "cookies-next";

function PagesWrapper({Component, pageProps}) {

    const user = useTypedSelector(state => state.user)
    const item = useTypedSelector(state => state.item)
    const order = useTypedSelector(state => state.order)
    const {setUser, setBasket, setBasketItems} = useActions()
    const [loading, setLoading] = useState(true)
    firebase.initializeApp(firebaseConfig)

    useEffect(() => {
        init().then(data => {
            const _user = data.data
            setUser(_user)
            initBasket(_user.id).then(data => {
                const _basket = data
                setBasket(_basket)
                getAllBasketItems(_basket.id).then(data => {
                    data.sort((prev, next) => prev.id - next.id)
                    setBasketItems(data)
                    setLoading(false)
                })
            })
        })
    }, [])

    useEffect(() => {
        setCookie('user', JSON.stringify(user))
    }, [user])

    useEffect(() => {
        setCookie('item', JSON.stringify(item))
    }, [item])

    useEffect(() => {
        setCookie('order', JSON.stringify(order))
    }, [order])

    return (
        <>
            <NavBar />
            {!loading && user._user.id !== undefined ?
                <Contacts />
                :
                <div/>
            }
            <Component {...pageProps}/>
        </>
    );
}

export default PagesWrapper;