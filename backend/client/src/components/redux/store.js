import {legacy_createStore,applyMiddleware,combineReducers} from "redux"
import {thunk} from "redux-thunk"
import {reducer as alertReducer} from "./alert/reducer"

const rootReducer=combineReducers({

    alertReducer
})

const store=legacy_createStore(rootReducer,applyMiddleware(thunk))

export default store