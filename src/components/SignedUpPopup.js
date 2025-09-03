import React from 'react'
import { Check } from 'lucide-react'
import { Button } from './ui/Button'

const SignedUpPopup = ({ signupEntry, closeSignedupPopup }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black opacity-50"></div>

      {/* Popup */}
      <div className="relative space-y-3 rounded-md text-center bg-teal-100 p-7 z-50 capitalize shadow-lg">
        <span className="flex justify-center items-center">
          <Check className="bg-teal-500 text-white w-16 h-16 p-1 rounded-full -mt-14" />
        </span>
        <h1 className="font-bold text-lg">{`Congratulations!!! ${signupEntry}`}</h1>
        <h2>You have successfully signed up!</h2>
        <Button
          className="bg-teal-500 text-white w-full hover:bg-teal-700 transition-all duration-300"
          onClick={closeSignedupPopup}
        >
          OK
        </Button>
      </div>
    </div>
  )
}

export default SignedUpPopup
