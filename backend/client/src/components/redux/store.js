import {legacy_createStore,applyMiddleware,combineReducers} from "redux"
import {thunk} from "redux-thunk"
import {reducer as alertReducer} from "./alert/reducer"
import {reducer as authReducer} from "../redux/auth/reducer"

const rootReducer=combineReducers({

    alertReducer
})

const store=legacy_createStore(rootReducer,applyMiddleware(thunk))

export default store