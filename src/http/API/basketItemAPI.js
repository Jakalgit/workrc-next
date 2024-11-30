import {$host} from "../index";

/* Работа с товарами в корзине */
export const createBasketItem = async (itemId, basketId, count, image, name, price, itemColorId, article) => {
    const {data} = await $host.post('api/basketitem/',
        {itemId, itemColorId, basketId, count, image, name, price, article})
    return data
}

export const incrementBasketItem = async (itemId, basketId, count) => {
    const {data} = await $host.post('api/basketitem/increment/', {itemId, basketId, count})
    return data
}

export const decrementBasketItem = async (itemId, basketId, count) => {
    const {data} = await $host.post('api/basketitem/decrement/', {itemId, basketId, count})
    return data
}

export const setCountBasketItem = async (itemId, basketId, count) => {
    const {data} = await $host.post('api/basketitem/set-count/', {itemId, basketId, count})
    return data
}

export const deleteOneBasketItem = async (id) => {
    const {data} = await $host.post('api/basketitem/deleteone/', {id})
    return data
}

export const deleteAllBasketItem = async (basketId) => {
    const {data} = await $host.post('api/basketitem/delete/', {basketId})
    return data
}

export const getAllBasketItems = async (basketId) => {
    const {data} = await $host.get('api/basketitem/', {params: {basketId}})
    return data
}

export const getBasketItem = async (itemId, basketId) => {
    const {data} = await $host.get('api/basketitem/one/', {params: {itemId, basketId}})
    return data
}