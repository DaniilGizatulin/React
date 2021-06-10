import React, { useEffect, useRef, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import ModalConfirm from '../modalConfirm';
import Spinner from '../spinner'
//style
import './createEdit-post.sass'
//image
import defaultImage from '../../image/default-image.jpg'
import defimg from '../../image/defimg.jpg'
//actions
import { deletePost, createNewPost, updatePostImage, getPost, updatePost } from '../../redux/posts/actions'
//helpers func
import { checkImage } from '../../helpers'

const CreateEditPost = ({ Server }) => {
    //useSelector
    const loading = useSelector(state => state.postState.loading)
    const token = useSelector(state => state.userState.isAuthorized);
    const user = useSelector(state => state.userState.user)
    const post = useSelector(state => state.postState.post)

    //refs
    const refImagePost = useRef()

    // Modal 
    const [show, setShow] = useState(false)
    const closeDeleteModal = () => setShow(false)
    const openDeleteModal = () => setShow(true)


    //useState
    const [postForm, setForm] = useState({ title: '', description: '', fullText: '' })
    const [image, setImage] = useState(null)
    const [checkedImg, setChekedImg] = useState()
    const [errorForm, setError] = useState({ error: false, message: '' })


    const formError = (text) => {
        setError({ error: true, message: text })
        if (!postForm.title || !postForm.description || !postForm.fullText) {
            setTimeout(() => setError({ error: false, message: '', success: false }), 1600)
        }
    }

    //useDispatch
    const dispatch = useDispatch()

    //History
    const history = useHistory()

    //useParams
    const { id } = useParams()


    //Effect and func

    //?Edit..........................................................

    useEffect(() => {
        if (id && post) {
            checkImage(
                `https://nodejs-test-api-blog.herokuapp.com${post.image}`,
                () => { setChekedImg(`https://nodejs-test-api-blog.herokuapp.com${post.image}`) },
                () => { setChekedImg(defaultImage) }
            )
        }
    }, [id, post])

    const changePost = (id, postForm) => {
        dispatch(updatePost(id, postForm, history, user, formError))
    }

    const changePostImage = (img, id) => {
        let formData = new FormData()
        formData.append('image', img)
        dispatch(updatePostImage(id, formData, refImagePost))
    }

    const delPost = () => {
        dispatch(deletePost(id, token, history))
        closeDeleteModal()
    }

    //?Create..........................................................

    const createPost = () => {
        if (!postForm.title || !postForm.description || !postForm.fullText) {
            formError('Заполните все поля!')
        } else {
            dispatch(createNewPost(postForm, formError, history, user._id, image))
        }
    }

    useEffect(() => {
        if (id) {
            dispatch(getPost(id))
        }
    }, [dispatch, id])


    if (loading && post) {
        return <Spinner />
    }

    return (
        <>
            <div className='editor' >
                <ModalConfirm
                    show={show}
                    handleClose={closeDeleteModal}
                    remove={delPost}
                    label={'Are you sure you want to delete this post?'}
                />
                <div className='editor-body'>

                    <div className="item">
                        <div className="item-post">
                            <div className="post-item-list">
                                {post && id && <button
                                    className='menu-post delete'
                                    onClick={() => openDeleteModal()}
                                ><i className="fa fa-trash-o"></i></button>}
                                <div className="info-post">
                                    <div className='editor-header-post'>
                                        <input type="text"
                                            title='Title your post'
                                            className={`title editor-title ${errorForm.error && !postForm.title && 'border-error'}`}
                                            placeholder={post && id ? post.title : 'Title your post'}
                                            value={postForm.title}
                                            onChange={(e) => setForm({ ...postForm, title: e.target.value })}
                                        />
                                    </div>
                                    <div className='editor-description'>
                                        <input
                                            title='Description your post'
                                            type="text"
                                            className={`editor-description ${errorForm.error && !postForm.description && 'border-error'}`}
                                            placeholder={post && id ? post.description : 'Description your post'}
                                            value={postForm.description}
                                            onChange={(e) => setForm({ ...postForm, description: e.target.value })}
                                        />
                                    </div>
                                    <div className='editor-image'>
                                        {post && id
                                            ? <img src={checkedImg} alt='post_image' className="post-image" ref={refImagePost} />
                                            : <img src={defimg} alt='post_img' className="post-image" />
                                        }
                                        <label htmlFor='file-upload' className='inp-upload' >
                                            <i className="fa fa-camera"></i>
                                            <input
                                                type='file'
                                                accept="image/*"
                                                id="file-upload"
                                                onChange={(e) => post && id ? changePostImage(e.target.files[0], id) : setImage(e.target.files[0])}
                                            />
                                        </label>
                                    </div>
                                    <div className='editor-full-text'>
                                        <textarea
                                            title='Full text your post'
                                            className={`form-control editor-full-text ${errorForm.error && !postForm.fullText && 'border-error'}`}
                                            rows="2"
                                            placeholder={post && id ? post.fullText : 'Full text your post'}
                                            value={postForm.fullText}
                                            onChange={(e) => setForm({ ...postForm, fullText: e.target.value })}
                                        >
                                        </textarea>

                                    </div>
                                    {id
                                        ? <button
                                            className='save save-edit'
                                            onClick={() => changePost(id, postForm)}>
                                            Edit</button>
                                        : <button
                                            className='btn-create'
                                            onClick={createPost}>
                                            Create post</button>
                                    }
                                    {errorForm.error && <p className={`form-error`}>{errorForm.message}</p>}
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}

export default CreateEditPost;
