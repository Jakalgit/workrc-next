import {
    SET_EMAIL,
    SET_FIRST_NAME, SET_FLAT, SET_HOUSE, SET_INDEX,
    SET_LAST_NAME,
    SET_NUMBER, SET_ORDER_STATE, SET_PHONE, SET_PRICE,
    SET_SECOND_NAME, SET_STREET,
    SET_TOKEN, SET_TYPE_DELIVERY, SET_TYPE_PAY
} from "@/store/reducers/orderReducer/orderReducerActions";

export const setOrderState = (payload) => {
    return {type: SET_ORDER_STATE, payload}
}
export const setToken = (payload) => {
    return {type: SET_TOKEN, payload}
}
export const setNumber = (payload) => {
    return {type: SET_NUMBER, payload}
}
export const setFirstName = (payload) => {
    return {type: SET_FIRST_NAME, payload}
}
export const setLastName = (payload) => {
    return {type: SET_LAST_NAME, payload}
}
export const setSecondName = (payload) => {
    return {type: SET_SECOND_NAME, payload}
}
export const setPhone = (payload) => {
    return {type: SET_PHONE, payload}
}
export const setEmail = (payload) => {
    return {type: SET_EMAIL, payload}
}
export const setIndex = (payload) => {
    return {type: SET_INDEX, payload}
}
export const setStreet = (payload) => {
    return {type: SET_STREET, payload}
}
export const setHouse = (payload) => {
    return {type: SET_HOUSE, payload}
}
export const setFlat = (payload) => {
    return {type: SET_FLAT, payload}
}
export const setPrice = (payload) => {
    return {type: SET_PRICE, payload}
}
export const setTypePay = (payload) => {
    return {type: SET_TYPE_PAY, payload}
}
export const setTypeDelivery = (payload) => {
    return {type: SET_TYPE_DELIVERY, payload}
}

