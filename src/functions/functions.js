import {CATALOG_ROUTE} from "@/utils/consts";

export const routerPushCatalogQueryParams = async (router, page, max, min, genreIds, finder) => {
    await router.push({
        pathname: CATALOG_ROUTE,
        query: { page: page, max: max, min: min, gIds: genreIds, finder: finder}
    })
}