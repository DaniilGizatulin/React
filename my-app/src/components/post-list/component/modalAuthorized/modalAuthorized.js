import React, { useRef, useState } from 'react';
import LoginForm from '../../../login-form';
//style
import './modalAuthorized.sass';
//helpers
import { useOnClickOutside } from '../../../../helpers'

const ModalAuthorized = ({ showModal, setShowModal }) => {
    //useSelector

    //useRef
    const refModalLiked = useRef()
    const refModolLikedBtn = useRef()

    const claz = showModal

    //useState
    const [showLogin, setShowLogin] = useState(false)

    useOnClickOutside(refModalLiked, (e) => {
        if (refModolLikedBtn.current && !refModolLikedBtn.current.contains(e.target)) {
            setShowModal('hidden')
        }
    })

    return (
        <>
            <div className={`modal-liked ${claz}`} ref={refModalLiked}>
                <div className='header-modal-liked'>
                    <p className='modal-liked-title'>Do u like post?</p>
                    <button className='close-modal-like' ref={refModolLikedBtn} onClick={() => setShowModal('hidden')}>X</button>
                </div>
                <p className='login-first'>login first</p>
                <hr />
                <button className='login-modal-liked' onClick={() => {
                    setShowLogin(true)
                    setShowModal('hidden')
                }}>Sign in</button>
            </div>
            <div className={`small-login-form ${showLogin ? 'show' : 'hidden'}`}>
                <LoginForm show={showLogin} setShow={setShowLogin} />
            </div>

        </>
    )
}

export default ModalAuthorized;