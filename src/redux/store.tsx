import { createStore, combineReducers } from "redux";
import UserReducer from "./reducers/userReducer";
const rootReducer = combineReducers({
    User: UserReducer
})

const configureStore = () => createStore(rootReducer);
export default configureStore;