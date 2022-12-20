import React, { useState } from 'react'
import './Header.css'
import { faIdCard, faRightToBracket, faUser, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useNavigate } from 'react-router-dom'

const Header = () => {
    let navigate = useNavigate();
    const [searchIsActive, setSearchIsActive] = useState(false);
    const toggleSearch = () => {
        setSearchIsActive(!searchIsActive);
    }
  return (
    <div className='header-container'>
        <div className="header-categories">Blogs</div>
        <div className="header-logo">
            <h1 className='header-name' onClick={() => setTimeout(() =>{navigate("/")}, 500)}>BLOGUE GUIDES</h1>
            <h2 className='header-subtitle'>LIFESTYLE & TRAVEL</h2>
        </div>
        <div className="header-nav">
            <FontAwesomeIcon className='nav-icon' icon={faIdCard} onClick={() => setTimeout(() =>{navigate("/userProfile")}, 500)} />
            <FontAwesomeIcon className='nav-icon' icon={faRightToBracket} onClick={() => setTimeout(() =>{navigate("/login")}, 500)} />
            <FontAwesomeIcon className='nav-icon' icon={faUser} onClick={() => setTimeout(() =>{navigate("/register")}, 500)} />
            <FontAwesomeIcon className='nav-icon' icon={faMagnifyingGlass} onClick={searchIsActive} />
            {/* user profile / login / register / search */}
        </div>
    </div>
  )
}

export default Header