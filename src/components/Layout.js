import React from 'react'
import Header from './Header'
import Footer from './Footer'
import { Outlet } from 'react-router-dom'


const Layout = ({handleLogOut, isLoggedIn, confirmLogOut, setShowLogoutPopup, setChoseToLogout, showLogoutPopup}) => {
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
          confirmLogOut={confirmLogOut}
          setShowLogoutPopup={setShowLogoutPopup}
          setChoseToLogout={setChoseToLogout}
          showLogoutPopup={showLogoutPopup}
        />
    </div>
  )
}

export default Layout