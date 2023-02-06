import {SET_BASKET_ITEMS, SET_LIMIT, SET_PAGE, SET_TOTAL_COUNT} from "@/store/reducers/itemReducer/itemReducerActions";


const initialState = {
    _basketItems: [],
    _page: 1,
    _totalCount: 0,
    _limit: 12,
}

export const itemReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_BASKET_ITEMS:
            return {...state, _basketItems: action.payload}
        case SET_PAGE:
            return {...state, _page: action.payload}
        case SET_TOTAL_COUNT:
            return {...state, _totalCount: action.payload}
        case SET_LIMIT:
            return {...state, _limit: action.payload}
        default:
            return state
    }
}