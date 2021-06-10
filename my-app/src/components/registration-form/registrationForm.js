import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
//import { loaded } from '../../actions'
import { loaded, createNewUser } from '../../redux/user/actions'
import Spinner from '../spinner'

import './registrationForm.sass';

const RegistrationForm = ({ Server }) => {
    //useSelector
    const loading = useSelector(state => state.loading)

    //useDispatch
    const dispatch = useDispatch()

    //useState
    const [errorRegistration, setError] = useState({ error: false, message: '' })

    const [registrationData, setData] = useState({ name: '', email: '', password: '' })

    //useHistory
    let history = useHistory();

    const nav = (link) => {
        history.push(link)
    }

    useEffect(() => dispatch(loaded()), [dispatch, loading])

    const registerError = ({ name, email, password }) => {
        if (!name && !email && !password) { setError({ error: true, message: "Заполните все поля!" }) }
        if (!name && !email && password) { setError({ error: true, message: "Введите Имя и Email! " }) }
        if (!name && !password && email) { setError({ error: true, message: "Введите Имя и Пароль! " }) }
        if (!email && !password && name) { setError({ error: true, message: "Введите Email и Пароль! " }) }
        if (!email && password && name) { setError({ error: true, message: "Введите Email! " }) }
        if (!password && email && name) { setError({ error: true, message: "Введите Пароль! " }) }
        if (!name && password && email) { setError({ error: true, message: "Введите Имя! " }) }
        if (!name || !password || !email) {
            setTimeout(() => setError({ error: false, message: '' }), 1800)
        }
    }

    const registerUser = () => {
        if (registrationData.name && registrationData.email && registrationData.password) {
            dispatch(createNewUser(registrationData, history))
        }
        registerError(registrationData)
    }


    if (loading) {
        return <Spinner />
    }

    return (
        <div className="registration-form" onClick={() => console.log(registrationData)}>
            <div className="modal-registration">
                <form onSubmit={(e) => e.preventDefault()}>
                    <div className="form-group">
                        <label>Name</label>
                        <input
                            type="name"
                            className={`form-control ${errorRegistration.error && !registrationData.name && 'shadow-error'}`}
                            aria-describedby="emailHelp"
                            placeholder="Enter name"
                            value={registrationData.name}
                            onChange={(e) => setData({ ...registrationData, name: e.target.value })}
                        />
                        <small className="form-text text-muted">What is your name ?</small>
                    </div>
                    <div className="form-group">
                        <label >Email address</label>
                        <input
                            type="email"
                            className={`form-control ${errorRegistration.error && !registrationData.email && 'shadow-error'}`}
                            aria-describedby="emailHelp"
                            placeholder="Enter email"
                            value={registrationData.email}
                            onChange={(e) => setData({ ...registrationData, email: e.target.value })}
                        />
                        <small className="form-text text-muted">We'll never share your email with anyone else.</small>
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input
                            type="password"
                            className={`form-control ${errorRegistration.error && !registrationData.password && 'shadow-error'}`}
                            placeholder="Password"
                            value={registrationData.password}
                            onChange={(e) => setData({ ...registrationData, password: e.target.value })}
                        />
                        <small className="form-text text-muted">Password must be at least 5 characters. <br /> We will
                 never share your password with anyone.</small>
                    </div>
                    <button type="submit" className="cancel" onClick={() => nav(`/list/page${1}/?limit=10&skip=${0}`)}>Сancel</button>
                    <button type="submit" className="confirm" onClick={registerUser}>Sign Up</button>
                    {errorRegistration.error && <p className='error'>{errorRegistration.message}</p>}
                </form>
            </div>
        </div>
    )
}

export default RegistrationForm;