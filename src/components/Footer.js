import React from 'react'
import {NavLink,Link} from 'react-router-dom';

const Footer = ({isLoggedIn, handleLogOut}) => {
  const footer_navs =[
  {nav:'about',link:'/about'},
  {nav:"Let's Talk Fashion",link:'/lets-talk-fashion'},
  {nav:'Gallery',link:'/gallery'},
]
  return (
      <footer className="border-t border-border bg-muted/30 py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-serif font-bold text-primary mb-2 text-teal-500">StyleCraft</h3>
              <p className="text-muted-foreground">Unleashing creativity in fashion design.</p>
            </div>
            <div className="flex flex-wrap gap-6 md:justify-end">
              {footer_navs.map((footerNavs, index)=> (
                <NavLink
                  to={footerNavs.link}
                  key={index}
                  className={({ isActive }) =>
                    `capitalize transition-colors duration-300 ${
                    isActive ? "text-teal-500 font-semibold" : "text-foreground hover:text-teal-400"
                  }`
                  }
                >
                  {footerNavs.nav}
                </NavLink>
              ))}
              {
                isLoggedIn?
              <button className='capitalize duration-300 transition-all text-red-400 hover:text-red-600'
              onClick={handleLogOut}>
                logout
              </button>
              :
              <Link
              to='/sign-in'>
              <button className='capitalize duration-300 transition-all hover:text-teal-400'>
                sign in
              </button>
              </Link>
              }

            </div>
          </div>
          <div className="border-t border-border mt-8 pt-8 text-center">
            <p className="text-muted-foreground">
              Copyright © {new Date().getFullYear()} | StyleCraft
            </p>
          </div>
        </div>
      </footer>
  )
}

export default Footer