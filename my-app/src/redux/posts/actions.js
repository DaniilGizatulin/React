import axios from 'axios';
import {
    POSTS,
    LOADED,
    ERROR,
    DELETED,
    POST,
    ALL_POSTS,
    FULL_POST
} from './types'

import api from '../../apiBase';

const setPosts = (posts) => {
    return (dispatch) =>
        dispatch({ type: POSTS, payload: posts })
}

const getPosts = (skip = 0, limit = 10) => {
    return (dispatch) =>
        api.get(`/api/v1/posts?limit=${limit}&skip=${skip}`)
            .then(res => {
                dispatch({ type: POSTS, payload: res.data })
                dispatch({ type: LOADED })
            })
            .catch(e => dispatch({ type: ERROR }))

}

const getAllPosts = (skip = 0, limit = 10) => {
    return (dispatch) =>
        api.get(`/api/v1/posts?limit=${limit}&skip=${skip}`)
            .then(res => {
                dispatch({ type: ALL_POSTS, payload: res.data })
                dispatch({ type: LOADED })
            })
}

const loaded = () => {
    return (dispatch) =>
        dispatch({ type: LOADED })
}

const fault = () => {
    return (dispatch) =>
        dispatch({ type: ERROR })
}

const deletePost = (id, token, history) => {
    return (dispatch) =>
        api.delete(`/api/v1/posts/${id}`)
            .then(res => {
                dispatch({ type: DELETED, payload: true })
                setTimeout(() => {
                    history.push(`/list/page${1}/?limit=10&skip=${0}`)
                    dispatch({ type: DELETED, payload: false })
                }, 500)
            })
    //.catch(e => )

}

const getPost = (id) => {
    return (dispatch) =>
        api.get(`/api/v1/posts/${id}`)
            .then(res => {
                dispatch({ type: POST, payload: res.data })
                dispatch({ type: LOADED })
            })
            .catch(e => dispatch({ type: ERROR }))
}

const getFullPost = (id) => {
    return (dispatch) =>
        api.get(`/api/v1/posts/${id}`)
            .then(res => {
                dispatch({ type: FULL_POST, payload: res.data })
                dispatch({ type: LOADED })
                //console.log(res)
            })
            .catch(e => dispatch({ type: ERROR }))
}

const setLikePost = (id) => {
    return () =>
        api({
            method: 'PUT',
            url: `/api/v1/posts/like/${id}`,
        })

}

const createNewPost = (postForm, setError, history, id, image) => {
    return (dispatch) =>
        api.post("/api/v1/posts",
            { ...postForm },
        )
            .then(res => {
                if (res.status === 200) {
                    if (image) {
                        let formData = new FormData()
                        formData.append('image', image)
                        dispatch(updatePostImage(res.data._id, formData))
                    }
                    setTimeout(() => history.push(`/user-posts/${id}`), 1500)
                }
            })
            .catch(e => {
                console.log(e.response)
                setError(e.response.data.error[0].message)
            })
}

const updatePostImage = (id, image, refImagePost) => {
    return (dispatch) =>
        api.put(`/api/v1/posts/upload/${id}`, image, {
            headers: {
                "Content-Type": ' multipart/form-data'
            }
        })
            .then(res => {
                console.log(res)
                dispatch(getImage(refImagePost, res.data.image))
            })


}

const getImage = (ref, image, defaultImage, alt) => {
    return () =>
        axios.get(`${image}`)
            .then(res => {
                if (res.statusText === 'OK') {
                    ref.current.src = `${image}`
                }
            })
            .catch(e => {
                if (e.status >= 400) {
                    ref.current.src = defaultImage;
                    ref.current.alt = alt;
                }
            })
}

const updatePost = (id, postForm, history, user, setError) => {
    return () =>
        api({
            method: 'PATCH',
            url: `/api/v1/posts/${id}`,
            data:
                { ...postForm },
        })
            .then(res => setTimeout(() => history.push(`/user-posts/${user._id}`), 1500))
            .catch(e => setError(e.response.data.error[0].message))
}

export {
    getPosts,
    setPosts,
    loaded,
    fault,
    deletePost,
    getPost,
    getAllPosts,
    getFullPost,
    setLikePost,
    createNewPost,
    updatePostImage,
    updatePost
}
