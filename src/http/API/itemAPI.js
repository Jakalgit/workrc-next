import {$host} from "../index";

/* Работа с товарами */
export const fetchItems = async () => {
    const {data} = await $host.get('api/item/')
    return data
}

export const fetchPageItems = async ({minPrice, maxPrice, page, tagIds, finder}) => {
    const {data} = await $host.post('api/item/by-filter', {
            min_price: minPrice, max_price: maxPrice, page, tagIds: JSON.stringify(tagIds), finder
    });
    return data;
}

export const fetchOneItem = async (id) => {
    const {data} = await $host.get(`api/item/one/${id}`);
    return data
}

export const fetchAllInfo = async (itemId) => {
    const {data} = await $host.get('api/info', {params: {itemId}})
    return data
}