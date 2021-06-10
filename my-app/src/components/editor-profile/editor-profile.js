import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Spinner from '../spinner';
import SpinnerImage from './component/spinner-image'
import ModalConfirm from '../modalConfirm';
import { useHistory } from 'react-router';
//style
import './editor-profile.sass';
//actions
import { deleteUser, updateUserName, updateUserAvatar } from '../../redux/user/actions'
//image
import defaultAvatar from '../../image/no-avatar.jpg'
//helpers
import { checkImage } from '../../helpers'

const EditorProfile = ({ Server }) => {
    //useSelector
    const user = useSelector(state => state.userState.user)

    // Modal 
    const [show, setShow] = useState(false)
    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    //useState
    const [name, setName] = useState('')
    const [loadingImage, setLoadingImage] = useState(false)
    const [errorName, setError] = useState({ error: false, message: '' })
    const [image, setImage] = useState(defaultAvatar)

    //History
    const history = useHistory()

    //useDispatch
    const dispatch = useDispatch()

    const changeName = (id, name) => {
        if (!name) {
            setError({ error: true, message: 'Заполните поле!' })
            setTimeout(() => setError({ error: false, message: '' }), 1700)
        } else {
            dispatch(updateUserName(id, name, setName))
        }
    }

    const updateAvatar = (e) => {
        setLoadingImage(true)
        let formData = new FormData()
        formData.append('avatar', e.target.files[0])
        dispatch(updateUserAvatar(user._id, formData, setLoadingImage))
    }

    const delUser = () => {
        dispatch(deleteUser(user._id, history))
        handleClose()
    }

    //if user = true - get avatar
    useEffect(() => {
        if (user._id) {
            checkImage(
                `https://nodejs-test-api-blog.herokuapp.com${user.avatar}`,
                () => { setImage(`https://nodejs-test-api-blog.herokuapp.com${user.avatar}`) },
                () => { setImage(defaultAvatar) }
            )
        }
    }, [user])

    if (!user._id) {
        return <Spinner />
    }

    return (
        <div className='container-editor-profile'>
            <form className='editor-profile' onSubmit={(e) => e.preventDefault()}>
                <header className='editor-header'>
                    <div className='editor-avatar'>
                        {loadingImage ? <SpinnerImage /> : <img alt='img' src={image} />}
                        <label htmlFor='file-upload' className='inp-upload' >
                            <i className="fa fa-camera"></i>
                            <input
                                type='file'
                                accept="image/*"
                                id="file-upload"
                                onChange={(e) => updateAvatar(e)}
                            />
                        </label>
                    </div>
                    <p className='editor-name'>{user.name}</p>
                </header>
                <div className='inp-name'>
                    <label >Name:</label>
                    <input
                        type="text"
                        className={`form-control ${errorName.error && 'shadow-error'}`}
                        placeholder="Change your name"
                        title='Enter your new name'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <button className='btn btn-primary save' onClick={() => changeName(user._id, name)}>Save</button>
                <button type='button' className='btn btn-danger remove' onClick={handleShow}>Delete user</button>
                {errorName.error && <p className='error-name'>{errorName.message}</p>}
            </form>
            <ModalConfirm show={show} handleClose={handleClose} remove={delUser} label={'Are you sure , what you want to delete the user?'} />
        </div>
    )
}

export default EditorProfile;