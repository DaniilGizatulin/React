import {
    LOGIN_USER,
    ERROR,
    LOGOUT,
    LOADED,
    DELETED,
    ALL_USERS,
    POST_USER,
    AUTH_TOKEN
} from './types'

const initialState = {
    user: {},
    allUsers: [],
    postUser: {},
    error: false,
    loading: true,
    deleteUser: false,
    isAuthorized: localStorage.getItem('token')
}

function userReducer(state = initialState, action) {
    switch (action.type) {
        case LOGIN_USER:
            return {
                ...state,
                user: action.payload
            }
        case ERROR:
            return {
                ...state,
                error: true
            }
        case LOGOUT:
            return {
                ...state,
                user: {}
            }
        case LOADED:
            return {
                ...state,
                loading: false
            }
        case DELETED:
            return {
                ...state,
                deleteUser: action.payload
            }
        case ALL_USERS:
            return {
                ...state,
                allUsers: action.payload
            }
        case POST_USER:
            return {
                ...state,
                postUser: action.payload
            }
        case AUTH_TOKEN:
            return {
                ...state,
                isAuthorized: action.payload
            }
        default: return state;
    }

}

export default userReducer;