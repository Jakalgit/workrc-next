import "@/css/_app.css"
import "@/css/components/modal_transition.css"
import PagesWrapper from "@/components/PagesWrapper";
import {wrapper} from "@/store";

function App({Component, pageProps}) {
    return (
        <PagesWrapper Component={Component} pageProps={pageProps} />
    )
}

export default wrapper.withRedux(App)