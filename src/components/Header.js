import React,{useState} from 'react'
import {NavLink,Link} from 'react-router-dom';
import { Button } from './ui/Button';
import SubMenu from './SubMenu';

const Header = ({isLoggedIn, handleLogOut }) => {
  const [submenuOpen, setSubMenuOpen] = useState(false);

const navs =[
  {nav:'about',link:'/about'},
  {nav:"Let's Talk Fashion",link:'/lets-talk-fashion'},
  {nav:'Gallery',link:'/gallery'},
]

  return (
          <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 fixed top-0 w-full z-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex h-16 items-center justify-between">
                <Link to="/" className="flex items-center">
                  <h1 className="text-2xl font-serif font-bold text-primary text-teal-500">StyleCraft</h1>
                </Link>
                <nav className="hidden md:flex items-center space-x-8">
                  {navs.map((item,index) =>(
                    <NavLink
                      to={item.link}
                      key={index}
                      className={({ isActive }) =>
                        `capitalize transition-colors duration-300 ${
                          isActive ? "text-teal-500 font-semibold" : "text-foreground hover:text-teal-400"
                        }`
                      }
                    >
                      {item.nav}
                    </NavLink>
                  ))}
                  <Link to='/fashion-customizer'>
                  <Button className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-lg bg-teal-500 hover:bg-teal-700 duration-300">
                    Get Started
                  </Button>
                  </Link>
                </nav>
                <SubMenu
                  submenuOpen={submenuOpen}
                  setSubMenuOpen={setSubMenuOpen}
                  isLoggedIn ={isLoggedIn}
                  handleLogOut={handleLogOut}
                />
              </div>
            </div>
          </header>
  )
}

export default Header