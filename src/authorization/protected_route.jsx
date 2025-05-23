import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

import LoadingSpinner from "../components/loading_animation.jsx";

const ProtectedRoute = ({ children }) => {
  const [ isValid, setIsValid ] = useState(null);
  const localSavedUserData = JSON.parse(localStorage.getItem("localSavedUserData"));
  const accessToken = localSavedUserData?.accessToken;
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const verifyToken = async() => {
      try {
        await axios
          .get(`${API_URL}/songs`, {
            headers: {
              Authorization: `Bearer ${accessToken}`
            },
            timeout: 3000
          });
          setIsValid(true);
      } catch(error) {
        setIsValid(false);
      }
    }

    verifyToken();
  }, []);

  if(isValid === null) return <LoadingSpinner />;
  if(isValid === false) return <Navigate to="/" replace state={{ type: "error", message: "Login first!" }}/>;

  return children;
}

export default ProtectedRoute;