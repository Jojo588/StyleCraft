import React from 'react'
import {LogOut} from 'lucide-react'
import { Button } from './ui/Button'

const LogoutPopup = ({confirmLogOut, setChoseToLogout, setShowLogoutPopup}) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black opacity-50"></div>

      {/* Popup */}
      <div className="relative space-y-3 rounded-md text-center bg-teal-100 p-7 z-50 capitalize shadow-lg">
        <span className="flex justify-center items-center">
          <LogOut className="bg-red-500 text-white w-20 h-20 p-5 rounded-full -mt-16" />
        </span>
        <h1 className="font-bold text-2xl">logout</h1>
        <h1 >are you sure you want to logout?</h1>
        <div className='flex gap-3 justify-center '>
        <Button
          className="bg-red-500 capitalize text-white hover:bg-red-700 transition-all duration-300"
          onClick={() => {
                    confirmLogOut();
                    setChoseToLogout('yes');
                    setShowLogoutPopup(false);
                    }}
        >
          yes
        </Button>
        <Button
          className="bg-teal-300 capitalize text-black hover:bg-teal-500 transition-all duration-300"
          onClick={() => {
                    setChoseToLogout('no');
                    setShowLogoutPopup(false);
                    }}
        >
          no
        </Button>
        </div>
      </div>
    </div>
  )
}

export default LogoutPopup