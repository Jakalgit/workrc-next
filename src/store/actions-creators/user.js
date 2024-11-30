import {
    SET_BASKET,
    SET_CURRENT_TAGS,
    SET_SEARCH_VALUE,
    SET_USER, SET_USER_STATE
} from "@/store/reducers/userReducer/userReducerActions";

export const setUserState = (payload) => {
    return {type: SET_USER_STATE, payload}
}
export const setUser = (payload) => {
    return {type: SET_USER, payload}
}
export const setBasket = (payload) => {
    return {type: SET_BASKET, payload}
}
export const setSearchValue = (payload) => {
    return {type: SET_SEARCH_VALUE, payload}
}
export const setCurrentTags = (payload) => {
    return {type: SET_CURRENT_TAGS, payload}
}