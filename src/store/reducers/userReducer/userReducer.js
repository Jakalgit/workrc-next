import {
    SET_BASKET,
    SET_CURRENT_TAGS,
    SET_SEARCH_VALUE,
    SET_USER, SET_USER_STATE
} from "@/store/reducers/userReducer/userReducerActions";

const initialState = {
    _user: {},
    _basket: {},
    _searchValue: '',
    _currentTags: [],
}

export const userReducer = (state = initialState, action) => {
    switch (action.type){
        case SET_USER_STATE:
            return action.payload
        case SET_USER:
            return {...state, _user: action.payload}
        case SET_BASKET:
            return {...state, _basket: action.payload}
        case SET_SEARCH_VALUE:
            return {...state, _searchValue: action.payload}
        case SET_CURRENT_TAGS:
            return {...state, _currentTags: action.payload}
        default:
            return state
    }
}