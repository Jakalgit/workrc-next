import {$host} from "../index";

/* Работа с цветами */

export const fetchColor = async (itemId) => {
    const {data} = await $host.get('api/color/get', {params: {itemId}})
    return data
}

export const fetchColorByIDs = async (IDs) => {
    const {data} = await $host.get('api/color/by-ids', {params: {IDs}})
    return data
}