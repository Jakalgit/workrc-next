import * as UserActionCreators from "./user"
import * as ItemActionCreators from "./item"
import * as OrderActionCreators from "./order"

export default {
    ...UserActionCreators,
    ...ItemActionCreators,
    ...OrderActionCreators
}