import React, { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { logout } from '../../../../redux/user/actions'
//helpers
import { useOnClickOutside } from '../../../../helpers'

const NavUserDesktop = ({ avatar, user, refSearchBtn, showSearch, setShowSearch }) => {

    //useState
    const [showBurger, setShowBurger] = useState(false);

    //Ref
    const refMenuList = useRef()
    const reftHamburgerBtn = useRef()

    const history = useHistory()
    const dispatch = useDispatch()
    //logout
    const logOut = () => {
        dispatch(logout(history));
    }

    const navMobile = (link) => {
        history.push(link)
        setShowBurger(false)
    }

    //Close outside searchMobile and Hamburger
    useOnClickOutside(refMenuList, (e) => {
        if (reftHamburgerBtn.current && !reftHamburgerBtn.current.contains(e.target)) {
            setShowBurger(false)
        }
    })

    return (
        <>
            <div className='nav-user'>
                <img src={avatar} className="user-avatar" alt="Your prof" />
                <button className='menu-user' >
                    <i className="fa fa-angle-up fa-1x"></i>
                </button>
                <div className='test-tabs'>
                    <ul className='list-unstyled ps-0'>
                        <li className='mb-1'>
                            <Link to={`/user-posts/${user._id}`}>
                                <i className="fa fa-envelope"></i>Your posts</Link>
                        </li>
                        <li className='mb-1'>
                            <Link to='/editor-profile'>
                                <i className="fa fa-user-circle"></i>Edit profile</Link>
                        </li>
                        <li className='mb-1'>
                            <Link to='/post-page'>
                                <i className="fa fa-plus"></i>Create post</Link>
                        </li>
                        <li><hr /></li>
                        <li className='mb-1'>
                            <button onClick={() => logOut()}>
                                <i className="fa fa-chevron-right"></i>Log out</button>
                        </li>

                    </ul>
                </div>
            </div>

            {/*Dropdown mobile*/}

            <div className='burger-nav'>
                <button ref={refSearchBtn} type="button" className="mobile-search" onClick={() => {
                    history.push(`/list/page${1}/?limit=10&skip=${0}`)
                    setShowSearch(!showSearch)
                }}>
                    {showSearch
                        ? <p>X</p>
                        : <i className="fa fa-search"></i>}
                </button>
                <div className={`hamburger ${showBurger && 'hamburger-active'}`} ref={reftHamburgerBtn} onClick={() => setShowBurger(!showBurger)}>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
                <div className={`burger-menu ${showBurger && 'burger-active'}`} ref={refMenuList}>
                    <div className='menu-list'>
                        <ul className='list-unstyled ps-0'>
                            <li className='mb-1' onClick={() => navMobile(`/user-posts/${user._id}`)}>
                                <button >
                                    <i className="fa fa-envelope"></i>Your posts</button>
                            </li>
                            <li className='mb-1' onClick={() => navMobile('/editor-profile')}>
                                <button >
                                    <i className="fa fa-user-circle"></i>Edit profile</button>
                            </li>
                            <li className='mb-1' onClick={() => navMobile('/post-page')}>
                                <button >
                                    <i className="fa fa-plus"></i>Create post</button>
                            </li>

                            <li className='mb-1' onClick={() => logOut()}>
                                <button >
                                    <i className="fa fa-chevron-right"></i>Log out</button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}

export default NavUserDesktop;
