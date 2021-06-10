//import axios from 'axios';
import {
    LOGIN_USER,
    LOGOUT, LOADED,
    DELETED,
    ALL_USERS,
    POST_USER,
    AUTH_TOKEN
} from './types'

import api from '../../apiBase';

const authorizationUser = () => {
    return (dispatch) =>
        api.get('/api/v1/auth/user')
            .then(res => {
                dispatch({ type: LOGIN_USER, payload: res.data })
                let saveUser = JSON.stringify(res.data)
                localStorage.setItem('user', saveUser)
            })
            .catch(e => console.log(e.response))

}

function loginUser(authorizedForm, setError, nav) {
    return (dispatch) =>
        api.post("/api/v1/auth", { ...authorizedForm })
            .then(res => {
                api.defaults.headers['Authorization'] = `Bearer ${res.data.token}`
                dispatch({ type: AUTH_TOKEN, payload: res.data.token })
                if (nav) {
                    nav(`/list/page${1}/?limit=10&skip=${0}`)
                }
                localStorage.setItem('token', res.data.token)
                dispatch(authorizationUser())
            })
            .catch(e => {
                e.response.status === 404
                    && setError({ error: true, message: 'Такого пользователя не существует' })
                if (nav) {
                    nav('/login')
                }
            })
}

const setUser = (user) => {
    return (dispatch) =>
        dispatch({ type: LOGIN_USER, payload: user })
}

const logout = (history) => {
    return (dispatch) => {
        dispatch({ type: LOGOUT })
        dispatch({ type: AUTH_TOKEN, payload: null })
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        history.push("/login");
    }
}

const loaded = () => {
    return (dispatch) =>
        dispatch({ type: LOADED })
}

const deleteUser = (id, history) => {
    return (dispatch) => {
        api.delete(`/api/v1/users/${id}`)
            .then(res => {
                dispatch({ type: LOGOUT })
                dispatch({ type: DELETED, payload: true })
                localStorage.removeItem('user');
                localStorage.removeItem('token');
                setTimeout(() => {
                    history.push("/login")
                    dispatch({ type: DELETED, payload: false })
                }, 500)
            })
    }
}

const createNewUser = (registerForm, history) => {
    return (dispatch) =>
        api.post("/api/v1/users", { ...registerForm })
            .then(res => setTimeout(() => history.push('/login')), 2000)
            .catch(e => {
                console.log(e.response)
            })

}

const getUserAvatar = (ref, image, defaultImage, alt) => {
    api.get(`${image}`)
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

const getAllUsers = () => {
    return (dispatch) =>
        api.get('/api/v1/users')
            .then(res => {
                dispatch({ type: ALL_USERS, payload: res.data })
                dispatch({ type: LOADED })
            })


}

const getPostUser = (id, setError) => {
    return (dispatch) =>
        api.get(`/api/v1/users/${id}`)
            .then(res => {
                dispatch({ type: POST_USER, payload: res.data })
                //console.log(res)
            })
            .catch(e => dispatch({ type: POST_USER, payload: e.response.data }))
}

const updateUserName = (id, name, setName) => {
    return (dispatch) =>
        api({
            method: 'PATCH',
            url: `/api/v1/users/${id}`,
            data:
            {
                name,
            },
        })
            .then(res => {
                localStorage.setItem('user', JSON.stringify(res.data))
                dispatch(setUser(res.data))
                setName('')
            })
}

const updateUserAvatar = (id, avatar, setLoadingImage) => {
    return (dispatch) =>
        api.put(`/api/v1/users/upload/${id}`, avatar, {
            headers: {
                "Content-Type": ' multipart/form-data'
            }
        }
        )
            .then(res => {
                localStorage.setItem('user', JSON.stringify(res.data))
                dispatch(setUser(res.data))
                setLoadingImage(false)
            })
}

export {
    loginUser,
    setUser,
    logout,
    loaded,
    deleteUser,
    createNewUser,
    getUserAvatar,
    getAllUsers,
    getPostUser,
    updateUserName,
    updateUserAvatar
}

