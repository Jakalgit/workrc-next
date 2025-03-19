import {useRouter} from "next/router";
import {CATALOG_ROUTE} from "@/utils/consts";

function Page({ queryPage, pageCount }) {

    const router = useRouter();

    let pages = [];

    for (let i = 1; i <= pageCount; i++) {
        pages.push(i)
    }

    const setCurrentPage = async (page) => {
        if (page !== queryPage) {
            await router.push({
                pathname: CATALOG_ROUTE,
                query: {...router.query, page: page}
            })
        }
    }

    return (
        <div style={{ display: "flex", justifyContent: "center", gap: 10, fontSize: 16 }}>
            {queryPage - 1 > 0 && (
                <button onClick={() => setCurrentPage(queryPage - 1)}>
                    {queryPage - 1}
                </button>
            )}
            <button
                style={{ border: '0.1rem solid red' }}
                onClick={() => setCurrentPage(queryPage)}
            >
                {queryPage}
            </button>
            {queryPage + 1 <= pageCount && (
                <button onClick={() => setCurrentPage(queryPage + 1)}>
                    {queryPage + 1}
                </button>
            )}
            {queryPage + 2 <= pageCount && (
                <span>
                    ...
                </span>
            )}
        </div>
    )
}

export default Page;