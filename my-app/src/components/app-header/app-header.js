import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';
import NavUser from './component/navuser'
import { setUser } from '../../redux/user/actions'
import { getPosts, setPosts, getAllPosts } from '../../redux/posts/actions'
import DateAndTime from './component/date-time'
//style
import './app-header.sass';
//image
import defaultAvatar from '../../image/no-avatar.jpg'
//helpers func
import { checkImage, useOnClickOutside } from '../../helpers'

const AppHeader = ({ Server }) => {
    //useSelector
    const user = useSelector(state => state.userState.user)
    const allPosts = useSelector(state => state.postState.allPosts)
    const isAuthorized = useSelector(state => state.userState.isAuthorized)

    //useDispatch
    const dispatch = useDispatch()

    //useRef
    const refSearch = useRef()
    const refSearchBtn = useRef()
    const refSearchDesktop = useRef()

    // history
    const history = useHistory();

    //useState
    const [showSearch, setShowSearch] = useState(false)
    const [showSearchDesktop, setShowSearchDesktop] = useState(false)
    const [foundMessage, setFoundMessage] = useState(false);
    const [foundPost, setFoundPost] = useState([])
    const [image, setImage] = useState(defaultAvatar)

    //filterPost 
    const filterPost = (posts, term) => {
        return posts.filter(post => {
            return post.title.indexOf(term) > -1
        })
    }
    // Search Posts

    const autoSerachPost = (allPosts, searchText) => {
        let foundPost = filterPost(allPosts, searchText)
        dispatch(setPosts(foundPost))
        foundPost.length === 0 ? setFoundMessage(true) : setFoundMessage(false);
        if (searchText.length === 0) {
            dispatch(getPosts(0))
        }
    }

    useEffect(() => {
        if (allPosts.length === 0) {
            dispatch(getAllPosts(0, 0))
        }
    }, [dispatch, allPosts])

    // navgition
    const navDesktop = (link, event) => {
        history.push(link)
        setShowSearchDesktop(false)
    }

    // localStorage 
    const isAuthorizedUser = JSON.parse(localStorage.getItem('user'))

    // if user - false , dispatch user in state
    useEffect(() => {
        if (!user._id && isAuthorizedUser) {
            dispatch(setUser(isAuthorizedUser))
        }
    }, [dispatch, isAuthorized, isAuthorizedUser, user])

    // if user = true, get avatar
    useEffect(() => {
        if (user._id && isAuthorized) {
            checkImage(
                `https://nodejs-test-api-blog.herokuapp.com${user.avatar}`,
                () => { setImage(`https://nodejs-test-api-blog.herokuapp.com${user.avatar}`) },
                () => { setImage(defaultAvatar) }
            )
        }
    }, [isAuthorized, user])


    //Close outside searchMobile and Hamburger
    useOnClickOutside(refSearch, (e) => {
        if (refSearchBtn.current && !refSearchBtn.current.contains(e.target)) {
            setShowSearch(false)
        }
    })
    useOnClickOutside(refSearchDesktop, () => setShowSearchDesktop(false))



    return (
        <>
            <header className="header">
                <DateAndTime />
                <Link className='header-logo' to={`/list/page${1}/?limit=10&skip=${0}`}>
                    <span className='logo1'>Ficus</span>
                    <span className='logo2'>Test</span>
                </Link>
                <nav className="navbar navbar-light" ref={refSearchDesktop}>
                    <form >
                        <input
                            type='search'
                            className="form-control search-panel"
                            placeholder='Search...'
                            onChange={(e) => {
                                setFoundPost(filterPost(allPosts, e.target.value))
                                e.target.value === '' ? setShowSearchDesktop(false) : setShowSearchDesktop(true)
                            }}
                        />
                        <div className={`response-search ${showSearchDesktop ? 'show' : 'hidden'}`}>
                            {foundPost.map(post => <button key={post._id} onClick={() => navDesktop(`/post/${post._id}`)}>{post.title}</button>)}
                            {foundPost.length === 0 && <p className='not-found-message'>Not found...</p>}
                        </div>
                    </form>
                </nav>
                {
                    user && isAuthorized
                        ?
                        <NavUser
                            avatar={image}
                            user={user}
                            refSearchBtn={refSearchBtn}
                            showSearch={showSearch}
                            setShowSearch={setShowSearch}
                        />
                        :
                        <div className='navigation'>
                            <button ref={refSearchBtn} type="button" className="mobile-search" onClick={() => {
                                history.push(`/list/page${1}/?limit=10&skip=${0}`)
                                setShowSearch(!showSearch)
                            }}>
                                {showSearch
                                    ? <p>X</p>
                                    : <i className="fa fa-search"></i>}
                            </button>
                            <button className="log" onClick={() => history.push("/login")}>SIGN IN</button>
                        </div>


                }
            </header>
            {/*SearchPanel*/}
            <div className={`inp-search ${showSearch && 'search-active'}`} ref={refSearch}>
                <div className="form-outline">
                    <input
                        type="search"
                        id="form1"
                        className="form-control"
                        placeholder='Search...'
                        onBlur={(e) => e.target.value = ''}
                        onChange={(e) => autoSerachPost(allPosts, e.target.value)}
                    />
                </div>
            </div>
            {foundMessage && <p className='not-found-message'>Not found...</p>}
        </>
    )
}


export default AppHeader;


