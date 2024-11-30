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
import {setCookie} from "cookies-next";

function PagesWrapper({Component, pageProps}) {

    return (
        <>
            <NavBar />
            <Component {...pageProps}/>
        </>
    );
}

export default PagesWrapper;