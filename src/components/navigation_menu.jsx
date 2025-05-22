import { useNavigate, Navigate } from "react-router-dom";
import axios from "axios";

function NavMenu() {
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;

  const goToBack = () => {
    navigate(-1);
  }

  const handleLogout = async() => {
    await axios
      .delete(`${API_URL}/logout`, { withCredentials: true })
      .then((response) => {
        if (response.status == 200) {
          console.log("Logout successful");
          localStorage.removeItem('localSavedUserData');
          navigate('/', state={ alert: "Logout Berhasil!" });
        } else {
          console.log("Logout failed: ", response.data.message);
        }
      })
      .catch((error) => {
        console.log("Error during logout: ", error.response.data.message);
      })
  }

  return (
    <div className="absolute flex flex-col gap-1.5 justify-center right-[375px] top-[10px] rounded-lg bg-[#FFF2DB] p-1.5 z-20">
      <div 
        className="h-[45px] w-[45px] bg-green-300 hover:bg-green-500 cursor-pointer rounded-lg flex items-center justify-center"
        onClick={goToBack}  
      >
        <i class="fa-solid fa-arrow-left text-2xl text-white"></i>
      </div>
      <div 
        className="h-[45px] w-[45px] bg-red-300 hover:bg-red-500 cursor-pointer rounded-lg flex items-center justify-center"
        onClick={handleLogout}
      >
        <i class="fa-solid fa-power-off text-2xl text-white"></i>
      </div>
    </div>
  )
}

export default NavMenu;