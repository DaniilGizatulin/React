import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import Spinner from '../spinner';
import SimpleSnackbar from '../snackbar';
import Error from '../error';

import './post-list-item.sass';

import { getPosts } from '../../redux/posts/actions'

const PostListItem = ({ Server }) => {
    //useParams
    function useQuery() {
        return new URLSearchParams(useLocation().search);
    }
    let query = useQuery()
    let skip = query.get('skip')
    let limit = query.get('limit')

    //useSelector
    //new
    const postOnPage = useSelector(state => state.postState.postOnPage)
    const loading = useSelector(state => state.postState.loading)
    const error = useSelector(state => state.postState.error)
    const deletePost = useSelector(state => state.postState.deletePost)
    const allPosts = useSelector(state => state.postState.allPosts)

    //useDispatch
    const dispatch = useDispatch()

    //useState
    const [countBtn, setCountBtn] = useState([]);
    const [activeNum, setActiveNum] = useState(+skip)

    //useHistory
    const history = useHistory();

    const navHistory = (url) => {
        history.push(url)
    }

    useEffect(() => {
        dispatch(getPosts(skip, limit))
    }, [skip, limit, dispatch])


    useEffect(() => {
        if (!loading && allPosts.length > 0) {
            setCountBtn(allPosts.filter((item, i) => allPosts[i / 10]))
        }
    }, [allPosts, loading])


    let idx = 0;

    const postList = postOnPage.map((postItem, i) => {
        idx++

        return (
            <div className="post" key={idx}>
                <div className="post-list-item">
                    <div className="cards">
                        <p className="title">{postItem.title}</p>
                        <ul className="full-text">{postItem.description}</ul>
                        <div className="full-post">
                            <button
                                className='view'
                                onClick={() => navHistory(`/post/${postItem._id}`)}>
                                View
                            </button>
                        </div>
                    </div>
                </div>
            </div>

        )
    })

    if (error) {
        return <Error message={"Sorry, we are already working on a solution to this problem. ..."} />
    }

    return (
        <>
            <div className="post-list">
                {
                    !loading
                        ? postList
                        : <Spinner />
                }
            </div>
            {postList.length !== 0 &&
                <div className='nav-posts'>
                    <div className='nav-posts-overflow'>
                        {countBtn.map((item, i) => {
                            return <button
                                key={idx++}
                                className={`btn-nav-posts ${activeNum === i * 10 ? 'active-btn' : ''}`}
                                onClick={(e) => {
                                    setActiveNum(i * 10)
                                    navHistory(`/list/page${i + 1}/?limit=10&skip=${i * 10}`)
                                }}
                            >{i + 1}</button>
                        })}
                    </div>
                </div>
            }
            <SimpleSnackbar isSnackbar={deletePost} color={"success"} message={'Deleted successful!'} />
        </>
    )
}


export default PostListItem;

