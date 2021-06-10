import {
    POSTS,
    LOADED,
    ERROR,
    DELETED,
    POST,
    ALL_POSTS,
    FULL_POST
} from './types'

const initialState = {
    postOnPage: [],
    post: null,
    allPosts: [],
    fullPost: {},
    loading: true,
    error: false,
    deletePost: false
}

function postsReducer(state = initialState, action) {
    switch (action.type) {
        case POSTS:
            if (state.postOnPage === []) {
                return {
                    ...state,
                }
            }
            return {
                ...state,
                postOnPage: action.payload,
            }
        case LOADED:
            return {
                ...state,
                loading: false
            }
        case ERROR:
            return {
                ...state,
                error: true
            }
        case DELETED:
            return {
                ...state,
                deletePost: action.payload
            }
        case POST:
            return {
                ...state,
                post: action.payload
            }
        case ALL_POSTS:
            return {
                ...state,
                allPosts: action.payload
            }
        case FULL_POST:
            return {
                ...state,
                fullPost: action.payload
            }
        default: return state;
    }

}

export default postsReducer;