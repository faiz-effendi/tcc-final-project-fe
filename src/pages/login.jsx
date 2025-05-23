import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

import PopupMessage from "../components/popup_message.jsx";

function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [popupStatus, setPopupStatus] = useState({
    isOpen: false,
    type: "",
    message: ""
  });

  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    if(location.state?.type) {
      if(location.state.type === "error") {
        setPopupStatus({
          isOpen: true,
          type: "error",
          message: location.state.message
        });
        window.history.replaceState({}, document.title);
      } else if(location.state.type === "success") {
        setPopupStatus({
          isOpen: true,
          type: "success",
          message: location.state.message
        });
        window.history.replaceState({}, document.title);
      } 
    }
  }, [])

  const tryToLogin = async() => {
    try {
      await axios
        .post(`${API_URL}/login`, { email, password }, { withCredentials: true })
        .then((response) => {
          const user = { 
            id: response.data.safeUserData.id, 
            accessToken: response.data.accessToken  
          };  
          localStorage.setItem("localSavedUserData", JSON.stringify(user));
          navigate("/home");
        })
        .catch((error) => {
          console.log("Error during login:", error);
          setPopupStatus({
            isOpen: true,
            type: "error",
            message: "Make sure the email or password you entered is correct and already registered."
          });
        });
    } catch (error) {
      console.error("Error during loginlay:", error);
    }
  }

  return (
    <>
      { popupStatus.isOpen && <PopupMessage state={ popupStatus } setState={ setPopupStatus }/> }

      <div className="h-screen flex items-center justify-center">
        <div className="relative w-[400px] h-[580px] flex items-center justify-center object-cover">
          <img src="/home_player.png" className="relative z-10 h-full object-cover" />
          
          {/* Background Cream */}
          <div
            className="absolute inset-0 bg-[#FFF2DB] rounded-lg z-0 object-cover ml-9 mt-4 w-[325px] h-[540px]"
            style={{ clipPath: "polygon(5% 0%, 95% 0%, 100% 5%, 100% 95%, 95% 100%, 5% 100%, 0% 95%, 0% 5%)" }}
          ></div>

          {/* Login Form */}
          <div className="absolute inset-0 top-[195px] left-[60px] z-10 w-[280px]">
            <div className="flex flex-col gap-2">
              <h1 className="text-2xl font-bold text-orange-400 mb-1 text-center">Hello, welcome back!</h1>
              <input
                type="email"
                placeholder="Email"
                className="border-2 border-orange-300 focus:border-orange-400 rounded-md px-4 py-1 text-orange-400 focus:outline-none"
                onChange={ e => { setEmail(e.target.value) } }
              />
              <input
                type="password"
                placeholder="Password"
                className="border-2 border-orange-300 focus:border-orange-400  rounded-md px-4 py-1 text-orange-400"
                onChange={ e => { setPassword(e.target.value) } }
              />
              <button
                className="bg-orange-400 text-white text-center rounded-md px-4 py-1 mt-2 hover:bg-orange-500 transition duration-200 cursor-pointer z-20"
                onClick={ tryToLogin }
              >Login</button>
              <p className="text-center text-sm text-gray-500">
                Don't have an account? 
                <a
                  className="text-blue-500 rounded-md p-1 hover:text-blue-600 transition duration-200 text-center cursor-pointer"
                  onClick={ ()=>{
                    navigate('/signup');
                  } }
                >Signup</a>
              </p>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}

export default LoginPage;