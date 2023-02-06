import {
    SET_EMAIL,
    SET_FIRST_NAME, SET_FLAT, SET_HOUSE, SET_INDEX,
    SET_LAST_NAME,
    SET_NUMBER, SET_PHONE, SET_PRICE,
    SET_SECOND_NAME, SET_STREET,
    SET_TOKEN, SET_TYPE_DELIVERY, SET_TYPE_PAY
} from "@/store/reducers/orderReducer/orderReducerActions";

const initialState = {
    _token: '',
    _number: '',
    _firstName: '',
    _lastName: '',
    _secondName: '',
    _phoneNumber: '',
    _email: '',
    _index: '',
    _street: '',
    _house: '',
    _flat: '',
    _price: '',
    _typePay: '',
    _typeDelivery: '',
}

export const orderReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_TOKEN:
            return {...state, _token: action.payload}
        case SET_NUMBER:
            return {...state, _number: action.payload}
        case SET_FIRST_NAME:
            return {...state, _firstName: action.payload}
        case SET_LAST_NAME:
            return {...state, _lastName: action.payload}
        case SET_SECOND_NAME:
            return {...state, _secondName: action.payload}
        case SET_PHONE:
            return {...state, _phoneNumber: action.payload}
        case SET_EMAIL:
            return {...state, _email: action.payload}
        case SET_INDEX:
            return {...state, _index: action.payload}
        case SET_STREET:
            return {...state, _street: action.payload}
        case SET_HOUSE:
            return {...state, _house: action.payload}
        case SET_FLAT:
            return {...state, _flat: action.payload}
        case SET_PRICE:
            return {...state, _price: action.payload}
        case SET_TYPE_PAY:
            return {...state, _typePay: action.payload}
        case SET_TYPE_DELIVERY:
            return {...state, _typeDelivery: action.payload}
        default:
            return state
    }
}