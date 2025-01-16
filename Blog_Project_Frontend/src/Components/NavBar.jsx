import React from 'react'
import './NavBar.css'
import { Link } from 'react-router-dom'

const NavBar = ({loginUser,loginStatus}) => {
  // console.log(loginStatus);
  

  return (
    <>
        <nav className="navbar">
            <div className="logo">
              Hi {loginUser.Name ? loginUser.Name : "Guest"}
              </div>
            <ul className="nav-links">
                <li><Link to="/blogs">Home</Link></li>

                { loginUser.Role === "writer" ? (
                  <li><Link to="/createBlog">Create Blog</Link></li>
                ): null }

                {loginStatus ? (
                    <li id='logout'><Link to="/logout">Logout</Link></li>
                  ): (
                    <li><Link to="/">Login</Link></li>
                  )}
            </ul>
        </nav>
    </>
  )
}

export default NavBar