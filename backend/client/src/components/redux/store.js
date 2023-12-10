import {legacy_createStore,applyMiddleware,combineReducers} from "redux"
import {composeWithDevTools} from "redux-devtools-extension"
import {thunk} from "redux-thunk"
import {reducer as alertReducer} from "./alert/reducer"
import {reducer as authReducer} from "../redux/auth/reducer"
import {reducer as profileReducer} from "../redux/profile/reducer"
import { reducer as postReducer } from "./post/reducer"

const rootReducer=combineReducers({

    alertReducer,authReducer,profileReducer,postReducer
})

const store=legacy_createStore(rootReducer,composeWithDevTools(applyMiddleware(thunk)))

export default store