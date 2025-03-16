import React from 'react';
import NavBar from "@/components/Navbar";

function PagesWrapper({Component, pageProps}) {

    return (
        <>
            <NavBar />
            <Component {...pageProps}/>
        </>
    );
}

export default PagesWrapper;