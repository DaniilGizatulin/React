import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ModalAuthorized from './component/modalAuthorized'
import { useHistory, useParams } from 'react-router';
import Spinner from '../spinner';
import Error from '../error';
import { getFullPost, setLikePost } from '../../redux/posts/actions'
import { getPostUser } from '../../redux/user/actions';
//style
import './post-list.sass';
//image
import prof from '../../image/no-avatar.jpg'
import deletProf from '../../image/delete-user.jpg'
import defaultImage from '../../image/default-image.jpg'
//helpers
import { checkImage } from '../../helpers'

const PostList = ({ Server }) => {
    //Hook

    // useState
    const [date, setDate] = useState('');
    const [heart, setHeart] = useState(0);
    const [showModal, setShowModal] = useState('')
    const [showLike, setShowLike] = useState();
    const [image, setImage] = useState({ userAvatar: prof, postImage: defaultImage })

    //useDispatch 
    const dispatch = useDispatch()

    //useSelector
    const loading = useSelector(state => state.postState.loading)
    const error = useSelector(state => state.postState.error)
    const post = useSelector(state => state.postState.fullPost)
    const postUser = useSelector(state => state.userState.postUser)
    const isAuthorizedUser = useSelector(state => state.userState.user)
    const isAuthorized = useSelector(state => state.userState.isAuthorized)

    // useHistory & useParams
    const history = useHistory()
    const { id } = useParams()

    //Ref
    const refHeart = useRef()
    const refAvatar = useRef()
    const refImagePost = useRef()

    //DateCreated
    const dateСorrector = (postDate) => {
        let date = postDate
        let newDate = date.replace(/[T-Z]/g, ' ')
        setDate(newDate.replace(/\..*/, ''))
    }

    // If an authorized user has a like on a post
    function saveLike(likedUser, e) {
        const idxLike = likedUser.indexOf(isAuthorizedUser._id)
        if (idxLike >= 0) {
            setShowLike(true)
        } else {
            setShowLike(false)
        }
    }

    // Func get post and user
    useEffect(() => {
        dispatch(getPostUser(post.postedBy))
        if (id !== post._id) {
            dispatch(getFullPost(id))
        }
        setHeart(post.likes.length)
        if (isAuthorized) {
            saveLike(post.likes, refHeart.current)
        }
        dateСorrector(post.dateCreated)

        //console.log(postUser, post)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [post, id, isAuthorized])


    // number of likes on the post
    const postLike = (e) => {
        dispatch(getFullPost(id))
        if (post.likes.length !== heart) {
            setHeart(post.likes.length)
            saveLike(post.likes, e)
        }
    }

    // func setlike 
    function setLike(id, e) {
        dispatch(setLikePost(id))
        postLike(e)
    }

    useEffect(() => {
        if (postUser._id) {
            checkImage(
                `https://nodejs-test-api-blog.herokuapp.com${postUser.avatar}`,
                () => { setImage({ ...image, userAvatar: `https://nodejs-test-api-blog.herokuapp.com${postUser.avatar}` }) },
                () => { setImage({ ...image, userAvatar: prof }) }
            )
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    useEffect(() => {
        if (post._id) {
            checkImage(
                `https://nodejs-test-api-blog.herokuapp.com${post.image}`,
                () => { setImage({ ...image, postImage: `https://nodejs-test-api-blog.herokuapp.com${post.image}` }) },
                () => { setImage({ ...image, postImage: defaultImage }) }
            )
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    if (loading || post._id !== id) {
        return <Spinner />
    }

    if (error) {
        return <Error message={'No such post'} />
    }

    return (
        <div className="item" >
            <div className="item-post">
                <div className="post-item-list">
                    {postUser.name
                        ?
                        <div className="info-user">
                            <img src={image.userAvatar} className="post-user-avatar cntr" alt="prof" ref={refAvatar} />
                            <p> {postUser.name}</p>
                        </div>
                        :
                        <div className="info-user">
                            <img src={deletProf} className="post-user-avatar cntr" alt="prof" />
                            <p className="delete-user"> User has been deleted</p>
                        </div>}
                    <div className="info-post">
                        <div className='header-post'>
                            <p className="title">{post.title}</p>

                            {isAuthorized && post.postedBy === isAuthorizedUser._id &&
                                <button className='btn-update-post ' onClick={() => history.push(`/post-page/${id}`)}>
                                    Edit post
                            </button>}

                        </div>
                        <img src={image.postImage} alt={post.description} className="post-image" ref={refImagePost} />
                        <p>{post.description}</p>
                        <ul className="full-text">{post.fullText}</ul>
                        <div className="footer-post">
                            <span className="date">DATE CREATE : <br />{date}</span>
                            <div className="interaction">
                                <button
                                    className='like'
                                    onClick={() => {
                                        isAuthorized
                                            ? setLike(post._id, refHeart.current)
                                            : setShowModal('show')
                                    }
                                    }><i ref={refHeart} className={`fa fa-heart ${showLike ? 'liked' : 'offLiked'}`}></i></button>{heart}
                            </div>
                        </div>
                    </div>

                </div>

            </div>
            <ModalAuthorized showModal={showModal} setShowModal={setShowModal} />
        </div>
    )
}


export default PostList;

