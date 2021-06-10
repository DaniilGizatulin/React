import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import SimpleSnackbar from '../snackbar';

import './loginForm.sass';

import { loginUser } from '../../redux/user/actions'


const LoginForm = ({ show, setShow, Server }) => {
    //useState
    const [authorizedForm, setFormDate] = useState({ email: '', password: '' })
    const [errorLogin, setError] = useState({ error: false, message: '' })

    //useDispatch
    const dispatch = useDispatch()

    //useHistory
    let history = useHistory();

    //useSelector
    const deleteUser = useSelector(state => state.userState.deleteUser)

    const nav = (link) => {
        history.push(link)
    }

    const loginError = ({ email, password }) => {
        if (!email && password) {
            setError({ error: true, message: 'Введите email!' })
        }
        if (!password && email) {
            setError({ error: true, message: 'Введите пароль!' })
        }
        if (!email && !password) {
            setError({ error: true, message: 'Заполните все поля!' })
        }
        if (!email || !password) {
            setTimeout(() => setError({ error: false, message: '' }), 2000)
        }
    }

    const customLogin = (e) => {
        e.preventDefault()
        if (show) {
            dispatch(loginUser(authorizedForm, setError))
            loginError(authorizedForm)
            setShow(false)
        } else {
            dispatch(loginUser(authorizedForm, setError, nav))
            loginError(authorizedForm)
        }
    }

    const cancelEvent = () => {
        if (show) {
            setShow(false)
        } else {
            nav(`/list/page${1}/?limit=10&skip=${0}`)
        }
    }

    return (
        <div className={`login-form`} >
            <div className={`modal-authorization ${show && 'back-shadow'}`}>
                <form onSubmit={(e) => customLogin(e)} id='sign'>
                    <div className="form-group">
                        <label>Email address</label>
                        <input
                            type="email"
                            className={`form-control ${errorLogin.error && !authorizedForm.email && 'shadow-error'}`}
                            aria-describedby="emailHelp"
                            placeholder="Enter email"
                            title='Enter your email'
                            value={authorizedForm.email}
                            onChange={(e) => setFormDate({ ...authorizedForm, email: e.target.value })}
                        />
                        <small className="form-text text-muted"></small>
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input
                            type="password"
                            className={`form-control ${errorLogin.error && !authorizedForm.password && 'shadow-error'}`}
                            placeholder="Password"
                            title='Enter your password'
                            value={authorizedForm.password}
                            onChange={(e) => setFormDate({ ...authorizedForm, password: e.target.value })}
                        />
                        <div className="auth-group">
                            <Link className="forgotPass authHover" to='/login' >Forgot password</Link>
                            <Link className="signUp authHover" to='/signUp'>sign up</Link>
                        </div>

                        <small className="form-text text-muted"></small>
                    </div>
                    <input className="cancel" type='button' onClick={() => cancelEvent()} value='Сancel' />
                    <input htmlFor='sign' type="submit" className="confirm" value="Sign In" />
                    {errorLogin.error && <p className='error'>{errorLogin.message}</p>}
                </form>
            </div>
            <SimpleSnackbar isSnackbar={deleteUser} color={'success'} message={'Deleted successful!'} />
        </div >
    )
}


export default LoginForm;
