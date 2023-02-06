import "@/css/_app.css"
import "@/css/components/modal_transition.css"
import PagesWrapper from "@/components/PagesWrapper";
import {wrapper} from "@/store";
import {getCookie, getCookies, setCookie} from "cookies-next";

function App({Component, pageProps, cookies}) {
    return (
        <PagesWrapper Component={Component} pageProps={pageProps} />
    )
}

export async function getStaticPath({ req, res }) {
    setCookie('server-key', 'value', { req, res, maxAge: 60 * 60 * 24 })
    const cookies = getCookies({ req, res })
    console.log(cookies)
    return {
        props: {cookies}
    }
}

export default wrapper.withRedux(App)