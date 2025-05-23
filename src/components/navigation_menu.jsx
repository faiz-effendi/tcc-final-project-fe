import { useNavigate, Navigate } from "react-router-dom";
import axios from "axios";

function NavMenu({ isHideLogout, isHideNewPlaylist }) {
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;

  const goToBack = () => {
    navigate(-1);
  }

  const goToNewPlaylist = () => {
    navigate('/create-playlist');
  }

  const handleLogout = async() => {
    await axios
      .delete(`${API_URL}/logout`, { withCredentials: true })
      .then((response) => {
        if (response.status == 200) {
        console.log("Logout successful");
        localStorage.removeItem('localSavedUserData');
        navigate('/', { state: { type: "success", message: "Logout successful!" } });
      } else {
        console.log("Logout failed: ", response);
      }
      })
      .catch((error) => {
        console.log("Error during logout: ", error.response.data.message);
      })
  }

  return (
    <div className="absolute flex flex-col gap-1.5 justify-center right-[385px] top-[10px] rounded-lg bg-[#FFF2DB] p-1.5 z-20">
      <div className="h-[45px] w-[45px] bg-gray-400 hover:bg-gray-500 cursor-pointer rounded-lg flex items-center justify-center"
        onClick={goToBack}
        title="Back"  
      >
        <i className="fa-solid fa-arrow-left text-2xl text-white"></i>
      </div>
      <div className={ `${isHideNewPlaylist ? "hidden" : ""} h-[45px] w-[45px] bg-green-400 hover:bg-green-500 cursor-pointer rounded-lg flex items-center justify-center` }
        onClick={goToNewPlaylist} 
        title="New Playlist" 
      >
        <i className="fa-solid fa-plus text-2xl text-white"></i>
      </div>
      <div
        className={ `${isHideLogout ? "hidden" : ""} h-[45px] w-[45px] bg-red-400 hover:bg-red-500 cursor-pointer rounded-lg flex items-center justify-center` }
        onClick={handleLogout}
        title="Logout"
      >
        <i className="fa-solid fa-power-off text-2xl text-white"></i>
      </div>
    </div>
  )
}

export default NavMenu;