import {SET_BASKET_ITEMS, SET_LIMIT, SET_PAGE, SET_TOTAL_COUNT} from "@/store/reducers/itemReducer/itemReducerActions";

export const setBasketItems = (payload) => {
    return {type: SET_BASKET_ITEMS, payload}
}
export const setPage = (payload) => {
    return {type: SET_PAGE, payload}
}
export const setTotalCount = (payload) => {
    return {type: SET_TOTAL_COUNT, payload}
}
export const setLimit = (payload) => {
    return {type: SET_LIMIT, payload}
}