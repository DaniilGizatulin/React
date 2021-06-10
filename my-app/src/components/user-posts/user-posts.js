import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router';
import Spinner from '../spinner';
import { getAllPosts } from '../../redux/posts/actions'

const UserPosts = ({ Server }) => {
    const refPostsContainer = useRef()

    //useSelectors
    const loading = useSelector(state => state.postState.loading)
    const allPosts = useSelector(state => state.postState.allPosts)

    //useDispatch
    const dispatch = useDispatch()

    //useHistory
    const history = useHistory()

    //useParams
    const { id } = useParams()

    const goToUserPost = async (idPost) => {
        history.push(`/post/${idPost}`)
    }

    useEffect(() => {
        if (id) {
            dispatch(getAllPosts(0, 0))
        }
    }, [id, dispatch])

    let idx = 0;

    // eslint-disable-next-line array-callback-return
    const postList = allPosts.map((postItem, i) => {
        idx++

        if (postItem.postedBy === id) {
            return (
                <div className="post" key={idx}>
                    <div className="post-list-item" >
                        <div className="cards">
                            <p className="title">{postItem.title}</p>
                            <ul className="full-text">{postItem.description}</ul>
                            <div className="full-post">
                                <button
                                    className='view'
                                    onClick={() => goToUserPost(postItem._id)}>
                                    View
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

            )
        }
    })

    return (
        <div className="post-list" ref={refPostsContainer}>
            {
                !loading
                    ? postList
                    : <Spinner />
            }
        </div>
    )
}

export default UserPosts;