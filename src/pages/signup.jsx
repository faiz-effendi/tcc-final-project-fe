import { useState } from "react"; 
import axios from "axios";

import NavMenu from "../components/navigation_menu";
import PopupMessage from "../components/popup_message";

function SignupPage() {
  const [userData, setUserData] = useState({
    email: "",
    password: ""
  })
  const [popupStatus, setPopupStatus] = useState({
    isOpen: false,
    type: "",
    message: ""
  });
  const API_URL = import.meta.env.VITE_API_URL;

  const tryToSignup = async() => {
    await axios
      .post(`${API_URL}/register`, { email: userData.email, password: userData.password }, { withCredentials: true })
      .then((response) => {
        setPopupStatus({
          isOpen: true,
          type: "success",
          message: "Registration successful! You can login now."
        })
      })
      .catch((error) => {
        console.log("Error during signup: ", error);
        setPopupStatus({
          isOpen: true,
          type: "error",
          message: "Make sure the email or password you entered is correct and already registered."
        })
      })
  }

  return (
    <>
      { popupStatus.isOpen && <PopupMessage state={ popupStatus } setState={ setPopupStatus }/> }

      <div className="h-screen flex items-center justify-center">
        <div className="relative w-[400px] h-[580px] flex items-center justify-center object-cover">
          <NavMenu isHideLogout={ true }/>
          <img src="/home_player.png" className="relative z-10 h-full object-cover" />
          
          {/* Background Cream */}
          <div
            className="absolute inset-0 bg-[#FFF2DB] rounded-lg z-0 object-cover ml-9 mt-4 w-[325px] h-[540px]"
            style={{ clipPath: "polygon(5% 0%, 95% 0%, 100% 5%, 100% 95%, 95% 100%, 5% 100%, 0% 95%, 0% 5%)" }}
          ></div>

          {/* Login Form */}
          <div className="absolute inset-0 top-[195px] left-[60px] z-10 w-[280px]">
            <div className="flex flex-col gap-2">
              <h1 className="text-3xl font-bold text-orange-400 mb-1 text-center">Signup Page</h1>
              <input
                type="email"
                placeholder="Email"
                className="border-2 border-orange-300 focus:border-orange-400 rounded-md px-4 py-1 text-orange-400 focus:outline-none"
                onChange={ e => { 
                  setUserData(prev => {
                    return {
                      ...prev,
                      email: e.target.value
                    }
                  }) 
                } }
              />
              <input
                type="password"
                placeholder="Password"
                className="border-2 border-orange-300 focus:border-orange-400  rounded-md px-4 py-1 text-orange-400"
                onChange={ e => { 
                  setUserData( prev => {
                    return {
                      ...prev,
                      password: e.target.value
                    }
                  }) } }
              />
              <button
                className="bg-orange-400 text-white text-center rounded-md px-4 py-1 mt-2 hover:bg-orange-500 transition duration-200 cursor-pointer z-20"
                onClick={ tryToSignup }
              >Signup</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SignupPage;