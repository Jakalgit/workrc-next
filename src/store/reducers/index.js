import {combineReducers} from "redux";
import {userReducer} from "@/store/reducers/userReducer/userReducer";
import {HYDRATE} from "next-redux-wrapper";
import {itemReducer} from "@/store/reducers/itemReducer/itemReducer";
import {orderReducer} from "@/store/reducers/orderReducer/orderReducer";


const rootReducer = combineReducers({
    user: userReducer,
    item: itemReducer,
    order: orderReducer,
})

export const reducer = (state, action) => {
    if (action.type === HYDRATE) {
        const nextState = {
            ...state, // use previous state
            ...action.payload, // apply delta from hydration
        };
        if (state.count) nextState.count = state.count;
        return nextState;
    } else {
        return rootReducer(state, action);
    }
};