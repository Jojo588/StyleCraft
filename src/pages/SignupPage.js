import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/Card";
import { Separator } from "../components/ui/Separator";
import { Mail, Lock, User, Chrome, Eye, EyeOff, OctagonAlert} from "lucide-react";
import SignedUpPopup from "../components/SignedUpPopup";

export default function SignupPage({ setData, setCurrentUser }) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [checkMatchingpasswords, setCheckMatchingPasswords] = useState (false);
  const [showSignedupPopup, setShowSignedupPopup]= useState(false);
  const navigate = useNavigate();

  const [signupEntry, setSignupEntry] = useState({
    firstName: "",
    lastName: "",
    email: "",
    createPassword: "",
    confirmPassword: ""
  });

  function handleChange(e) {
    setSignupEntry(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (signupEntry.createPassword !== signupEntry.confirmPassword) {
       setCheckMatchingPasswords(true);
      setTimeout(() => {
        setCheckMatchingPasswords(false);
      }, 2000);
      return;
    }

    const newUser = {
      id: Date.now(),
      firstName: signupEntry.firstName,
      lastName: signupEntry.lastName,
      email: signupEntry.email,
      password: signupEntry.createPassword,
    };

    setData(prev => [...prev, newUser]);
    setCurrentUser(newUser);
    localStorage.setItem("styleCraftCurrentUser", JSON.stringify(newUser));

    setShowSignedupPopup(true);

  }

  function closeSignedupPopup(){
    setShowSignedupPopup(false);
        navigate('/sign-in');

  }
  return (
    <div className="min-h-screen bg-[#FAF9F6]">
      {showSignedupPopup && <SignedUpPopup signupEntry={signupEntry.firstName} closeSignedupPopup={closeSignedupPopup}/>}
      <main className="py-20">
        <div className="container px-4">
          <div className="max-w-md mx-auto">
            <Card className="border-2 border-[#A3B18A]/20 shadow-2xl">
              <CardHeader className="text-center space-y-4">
                <CardTitle className="text-3xl font-bold text-[#333333]">
                  Join<span className="text-teal-500"> StyleCraft</span>
                </CardTitle>
                <p className="text-[#666666]">Start your zero-waste journey today</p>
              </CardHeader>

              <CardContent className="space-y-6">
                <Button
                  variant="outline"
                  className="w-full py-6 text-lg border-2 border-[#A3B18A]/20 hover:bg-yellow-600 duration-300 transition-all bg-transparent"
                >
                  <Chrome className="mr-2 h-5 w-5" />
                  Continue with Google
                </Button>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <Separator className="w-full" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-white text-[#666666]">
                      or create account with email
                    </span>
                  </div>
                </div>

                <form className="space-y-4" onSubmit={handleSubmit}>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-[#333333]">First Name</label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-[#666666]" />
                        <Input
                          placeholder="First name"
                          className="pl-10 py-6 border-2 border-[#A3B18A]/20 focus:border-yellow-600"
                          name="firstName"
                          onChange={handleChange}
                          value={signupEntry.firstName}
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-[#333333]">Last Name</label>
                      <Input
                        placeholder="Last name"
                        className="py-6 border-2 border-[#A3B18A]/20 focus:border-yellow-600"
                        name="lastName"
                        onChange={handleChange}
                        value={signupEntry.lastName}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-[#333333]">Email</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-[#666666]" />
                      <Input
                        type="email"
                        placeholder="Enter your email"
                        className="pl-10 py-6 border-2 border-[#A3B18A]/20 focus:border-yellow-600"
                        name="email"
                        onChange={handleChange}
                        value={signupEntry.email}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-[#333333]">Password</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-[#666666]" />
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="Create a password"
                        className="pl-10 pr-10 py-6 border-2 border-[#A3B18A]/20 focus:border-yellow-600"
                        name="createPassword"
                        onChange={handleChange}
                        value={signupEntry.createPassword}
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#666666] hover:text-[#A3B18A]"
                      >
                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-[#333333]">Confirm Password</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-[#666666]" />
                      <Input
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirm your password"
                        className="pl-10 pr-10 py-6 border-2 border-[#A3B18A]/20 focus:border-yellow-600"
                        name="confirmPassword"
                        onChange={handleChange}
                        value={signupEntry.confirmPassword}
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#666666] hover:text-[#A3B18A]"
                      >
                        {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>
                  </div>
                  {checkMatchingpasswords && <h2 className="text-red-600 flex gap-1 font-bold"><OctagonAlert/>Passwords do not match</h2>}

                  <Button className="w-full bg-teal-500 hover:bg-teal-700 duration-300 transition-all text-white py-6 text-lg font-semibold">
                    Create Account
                  </Button>
                </form>

                <div className="text-center">
                  <p className="text-[#666666]">
                    Already have an account?{" "}
                    <Link to="/sign-in" className="text-teal-500 hover:underline font-medium">
                      Sign in here
                    </Link>
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
