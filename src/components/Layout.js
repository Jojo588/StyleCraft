import React from 'react'
import Header from './Header'
import Footer from './Footer'
import { Outlet } from 'react-router-dom'


const Layout = ({handleLogOut, isLoggedIn}) => {
  return (
    <div>
        <Header
        handleLogOut = {handleLogOut}
        isLoggedIn ={isLoggedIn}
        />
        <main>
            <Outlet />
        </main>
        <Footer
          handleLogOut = {handleLogOut}
          isLoggedIn ={isLoggedIn}
        />
    </div>
  )
}

export default Layout