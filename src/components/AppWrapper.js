import {wrapper} from "@/store";

function AppWrapper({ children }) {
    return (
        <>
            {children}
        </>
    )
}

export default wrapper.withRedux(AppWrapper)