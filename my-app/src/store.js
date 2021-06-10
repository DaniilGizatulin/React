
import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunk from 'redux-thunk';
import userReducer from './redux/user/reducer'
import postsReducer from './redux/posts/reducer'

const enhancer = window.__REDUX_DEVTOOLS_EXTENSION__ ?
    compose(applyMiddleware(thunk), window.__REDUX_DEVTOOLS_EXTENSION__()) :
    applyMiddleware(thunk);

const reducer = combineReducers({ userState: userReducer, postState: postsReducer })
const store = createStore(reducer, enhancer)

export default store;