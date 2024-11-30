import {useState} from 'react';
import {Pagination} from "react-bootstrap";
import PageItem from "./PainationItem";
import {useTypedSelector} from "@/hooks/useTypedSelector";
import {useActions} from "@/hooks/useActions";
import {useRouter} from "next/router";
import {CATALOG_ROUTE} from "@/utils/consts";

function Page({ queryPage, pageCount }) {

    const router = useRouter();

    let pages = [];

    for (let i = 1; i <= pageCount; i++) {
        pages.push(i)
    }

    const setCurrentPage = (page, not) => {
        if (page !== not) {
            router.push({
                pathname: CATALOG_ROUTE,
                query: {...router.query, page: page}
            }).then()
        }
    }

    return (
        <></>
    )
}

export default Page;